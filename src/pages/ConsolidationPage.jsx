import { useEffect, useState } from 'react'
import { LoansAPI, ConsolidationAPI } from '../api/client'

export default function ConsolidationPage() {
  const [loans, setLoans] = useState([])
  const [selected, setSelected] = useState([])
  const [tenureMonths, setTenureMonths] = useState('12')
  const [newInterestRate, setNewInterestRate] = useState('12')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { LoansAPI.list().then(setLoans) }, [])

  const toggle = (loanId) => {
    setSelected((prev) => prev.includes(loanId) ? prev.filter(id => id !== loanId) : [...prev, loanId])
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await ConsolidationAPI.consolidate({
        loanIds: selected,
        tenureMonths: parseInt(tenureMonths),
        newInterestRate: parseFloat(newInterestRate)
      })
      setResult(data)
    } catch (e) {
      setError('Consolidation failed')
    }
  }

  return (
    <div>
      <h1>Consolidation</h1>
      {error && <div className="error">{error}</div>}
      <div className="grid-2">
        <div className="card">
          <h3>Select Loans</h3>
          <ul className="list">
            {loans.map(l => (
              <li key={l.loanId}>
                <label>
                  <input type="checkbox" checked={selected.includes(l.loanId)} onChange={()=>toggle(l.loanId)} />
                  {l.lenderName} — ₹{l.principalAmount} @ {l.interestRate}%
                </label>
              </li>
            ))}
          </ul>
          <form onSubmit={submit} className="form">
            <label>
              New Interest Rate (%)
              <input type="number" step="0.01" value={newInterestRate} onChange={e=>setNewInterestRate(e.target.value)} required />
            </label>
            <label>
              Tenure (months)
              <input type="number" value={tenureMonths} onChange={e=>setTenureMonths(e.target.value)} required />
            </label>
            <button type="submit" disabled={!selected.length}>Simulate Consolidation</button>
          </form>
        </div>
        <div className="card">
          <h3>Result</h3>
          {!result ? (
            <div>Select loans and run simulation</div>
          ) : (
            <div className="grid-2">
              <div className="stat">Total Payable Before: ₹ {result.totalPayableBefore.toFixed(2)}</div>
              <div className="stat">Total Interest Before: ₹ {result.totalInterestBefore.toFixed(2)}</div>
              <div className="stat">Total Payable After: ₹ {result.totalPayableAfter.toFixed(2)}</div>
              <div className="stat">Total Interest After: ₹ {result.totalInterestAfter.toFixed(2)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


