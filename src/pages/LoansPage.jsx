import { useEffect, useState } from 'react'
import { LoansAPI } from '../api/client'

export default function LoansPage() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    lenderName: '', principalAmount: '', interestRate: '', tenureMonths: '', loanType: 'Personal'
  })

  const load = () => {
    setLoading(true)
    LoansAPI.list()
      .then(setLoans)
      .catch(() => setError('Failed to load loans'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        lenderName: form.lenderName,
        principalAmount: parseFloat(form.principalAmount),
        interestRate: parseFloat(form.interestRate),
        tenureMonths: parseInt(form.tenureMonths),
        loanType: form.loanType
      }
      await LoansAPI.add(1, payload) // using userId=1 for now
      setForm({ lenderName: '', principalAmount: '', interestRate: '', tenureMonths: '', loanType: 'Personal' })
      load()
    } catch (e) {
      setError('Failed to add loan')
    }
  }

  const clearAll = async () => {
    await LoansAPI.deleteAll()
    load()
  }

  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h1>Loans</h1>
      {error && <div className="error">{error}</div>}
      <div className="grid-2">
        <div className="card">
          <h3>Add Loan</h3>
          <form onSubmit={submit} className="form">
            <label>
              Lender Name
              <input value={form.lenderName} onChange={e=>setForm({...form, lenderName:e.target.value})} required />
            </label>
            <label>
              Principal Amount
              <input type="number" step="0.01" value={form.principalAmount} onChange={e=>setForm({...form, principalAmount:e.target.value})} required />
            </label>
            <label>
              Interest Rate (%)
              <input type="number" step="0.01" value={form.interestRate} onChange={e=>setForm({...form, interestRate:e.target.value})} required />
            </label>
            <label>
              Tenure (months)
              <input type="number" value={form.tenureMonths} onChange={e=>setForm({...form, tenureMonths:e.target.value})} required />
            </label>
            <label>
              Loan Type
              <select value={form.loanType} onChange={e=>setForm({...form, loanType:e.target.value})}>
                <option>Personal</option>
                <option>Home</option>
                <option>Auto</option>
                <option>Education</option>
              </select>
            </label>
            <button type="submit">Add Loan</button>
          </form>
        </div>
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3>Existing Loans</h3>
            <button onClick={clearAll}>Delete All</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Principal</th>
                <th>Rate</th>
                <th>Tenure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((l, i) => (
                <tr key={i}>
                  <td>{l.lenderName}</td>
                  <td>₹ {l.principalAmount}</td>
                  <td>{l.interestRate}%</td>
                  <td>{l.tenureMonths}m</td>
                  <td>{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


