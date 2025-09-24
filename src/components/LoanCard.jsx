export default function LoanCard({ loan }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-start text-black">
      <h3 className="text-lg font-bold text-green-700 mb-2">{loan.lender_name}</h3>
      <p><span className="font-semibold">Loan Type:</span> {loan.loan_type}</p>
      <p><span className="font-semibold">Principal:</span> {loan.principal_amount}</p>
      <p><span className="font-semibold">Interest:</span> {loan.interest_rate}%</p>
      <p><span className="font-semibold">Tenure:</span> {loan.tenure} months</p>
      <p><span className="font-semibold">Start Date:</span> {loan.start_date}</p>
    </div>
  );
}


