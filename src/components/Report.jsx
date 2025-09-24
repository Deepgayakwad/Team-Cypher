import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export default function Report({ loans }) {
  const data = (loans || []).map((l) => ({
    loan: l.lender_name || l.loan_id || 'Loan',
    principal: Number(l.principal_amount ?? 0),
    emi: Number(l.emi ?? 0),
    interest: Number(l.total_interest ?? 0),
    apr: Number(l.apr ?? 0),
    score: Number(l?.scores?.final ?? 0),
    tenure: Number(l.tenure ?? 0),
  }));

  if (data.length === 0) return null;

  // Find best loan based on highest score
  const bestLoan = data.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), data[0]);

  const COLORS = ['#4ade80', '#60a5fa', '#f59e0b', '#10b981', '#f87171', '#a78bfa'];

  // Prepare pie chart data: total interest distribution
  const pieData = data.map((l) => ({
    name: l.loan,
    value: l.interest,
  }));

  // Prepare line chart data: EMI over months
  const lineData = [];
  data.forEach((loan) => {
    for (let month = 1; month <= loan.tenure; month++) {
      const existing = lineData.find((d) => d.month === month);
      if (existing) {
        existing[loan.loan] = loan.emi;
      } else {
        lineData.push({ month, [loan.loan]: loan.emi });
      }
    }
  });

  return (
    <div className="w-full space-y-8">
      {/* Recommendation */}
      <div className="bg-green-50 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-2">Recommendation</h3>
        <p className="text-lg">
          Based on the analysis, the <span className="font-semibold">{bestLoan.loan}</span> is the
          best choice with the highest score.
        </p>
      </div>

      {/* Bar charts: EMI and Interest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">EMI Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <XAxis dataKey="loan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="emi" fill="#4ade80" name="EMI" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Total Interest Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <XAxis dataKey="loan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="interest" fill="#60a5fa" name="Total Interest" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart: Interest distribution */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Total Interest Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: EMI over months */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Monthly EMI Over Tenure</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'EMI', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {data.map((loan, idx) => (
              <Line
                key={loan.loan}
                type="monotone"
                dataKey={loan.loan}
                stroke={COLORS[idx % COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">Detailed Loan Report</h3>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Loan</th>
              <th className="border p-2 text-right">Principal</th>
              <th className="border p-2 text-right">EMI</th>
              <th className="border p-2 text-right">Total Interest</th>
              <th className="border p-2 text-right">APR %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => (
              <tr key={idx} className={d.loan === bestLoan.loan ? 'bg-green-100' : 'hover:bg-gray-50'}>
                <td className="border p-2">{d.loan}</td>
                <td className="border p-2 text-right">{d.principal}</td>
                <td className="border p-2 text-right">{d.emi}</td>
                <td className="border p-2 text-right">{d.interest}</td>
                <td className="border p-2 text-right">{d.apr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
