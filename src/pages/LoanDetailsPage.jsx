import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { generateEmiSchedule } from '../utils/emi'
import { useEffect, useState } from 'react'
import { LoansAPI } from '../api/client'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line, Legend } from 'recharts'

export default function LoanDetailsPage() {
  const { loanId } = useParams()
  const [loan, setLoan] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    LoansAPI.list()
      .then((all) => {
        const found = all.find(l => String(l.loanId) === String(loanId)) || all[Number(loanId)]
        setLoan(found || null)
      })
      .catch(() => setError('Failed to load loan'))
  }, [loanId])

  const schedule = useMemo(() => {
    if (!loan) return []
    return generateEmiSchedule({
      principal: Number(loan.principalAmount || 0),
      annualRatePercent: Number(loan.interestRate || 0),
      tenureMonths: Number(loan.tenureMonths || 0),
    })
  }, [loan])

  // Build dates for each installment
  const scheduleWithDates = useMemo(() => {
    if (!schedule.length) return []
    const baseDate = loan?.startDate || loan?.createdAt || new Date().toISOString()
    const start = new Date(baseDate)
    const opts = { day: '2-digit', month: 'short', year: 'numeric' }
    return schedule.map((row, idx) => {
      const d = new Date(start)
      d.setMonth(start.getMonth() + idx)
      return { ...row, date: d.toLocaleDateString('en-IN', opts) }
    })
  }, [schedule, loan])

  if (error) return <div className="error">{error}</div>
  if (!loan) return <div>Loading...</div>

  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0)
  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0)

  return (
    <div className="loan-details-page">
      <Link to="/" className="btn secondary">← Back</Link>
      <h1 style={{marginTop:12}}>{loan.lenderName} — ₹ {Number(loan.principalAmount).toFixed(2)}</h1>
      <div className="cards">
        <div className="card stat"><strong>{loan.interestRate}%</strong>Interest Rate</div>
        <div className="card stat"><strong>{loan.tenureMonths} months</strong>Tenure</div>
        <div className="card stat"><strong>₹ {totalInterest.toFixed(2)}</strong>Total Interest</div>
        <div className="card stat"><strong>₹ {totalPayment.toFixed(2)}</strong>Total Payment</div>
      </div>

      {/* Chart Card */}
      <div className="chart-card" style={{marginTop: 8}}>
        <div className="chart-header">
          <h3>EMI Composition & Balance</h3>
          <span className="chart-subtitle">Principal vs Interest per installment and remaining balance</span>
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={scheduleWithDates} margin={{ top: 6, right: 24, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={Math.ceil((scheduleWithDates.length || 1)/6)} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" hide />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="principal" name="Principal" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorPrincipal)" stackId="a" />
              <Area yAxisId="left" type="monotone" dataKey="interest" name="Interest" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" stackId="a" />
              <Line yAxisId="right" type="monotone" dataKey="balance" name="Balance" stroke="#334155" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>EMI Schedule</h3>
        <table className="table">
          <thead>
            <tr>
              <th>#</th><th>Date</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {scheduleWithDates.map(row => (
              <tr key={row.installment}>
                <td>{row.installment}</td>
                <td>{row.date}</td>
                <td>₹ {row.payment.toFixed(2)}</td>
                <td>₹ {row.principal.toFixed(2)}</td>
                <td>₹ {row.interest.toFixed(2)}</td>
                <td>₹ {row.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


