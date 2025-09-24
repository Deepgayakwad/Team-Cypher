import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { generateEmiSchedule } from '../utils/emi'
import { useEffect, useState } from 'react'
import { LoansAPI } from '../api/client'

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

  if (error) return <div className="error">{error}</div>
  if (!loan) return <div>Loading...</div>

  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0)
  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0)

  return (
    <div>
      <Link to="/" className="btn secondary">← Back</Link>
      <h1 style={{marginTop:12}}>{loan.lenderName} — ₹ {Number(loan.principalAmount).toFixed(2)}</h1>
      <div className="cards">
        <div className="card stat"><strong>{loan.interestRate}%</strong>Interest Rate</div>
        <div className="card stat"><strong>{loan.tenureMonths} months</strong>Tenure</div>
        <div className="card stat"><strong>₹ {totalInterest.toFixed(2)}</strong>Total Interest</div>
        <div className="card stat"><strong>₹ {totalPayment.toFixed(2)}</strong>Total Payment</div>
      </div>

      <div className="card">
        <h3>EMI Schedule</h3>
        <table className="table">
          <thead>
            <tr>
              <th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(row => (
              <tr key={row.installment}>
                <td>{row.installment}</td>
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


