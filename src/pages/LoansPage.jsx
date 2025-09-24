import { useEffect, useState } from 'react'
import { LoansAPI } from '../api/client'

export default function LoansPage() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    lenderName: '', principalAmount: '', interestRate: '', tenureMonths: '', loanType: 'Personal', startDate: ''
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
        loanType: form.loanType,
        ...(form.startDate ? { startDate: form.startDate } : {})
      }
      await LoansAPI.add(1, payload) // using userId=1 for now
      setForm({ lenderName: '', principalAmount: '', interestRate: '', tenureMonths: '', loanType: 'Personal', startDate: '' })
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
    <div className="loans-page">
      <div className="page-header" style={{marginBottom:16}}>
        <div className="header-content" style={{marginBottom:0}}>
          <h1 className="page-title"><span className="title-icon">💳</span> Loans</h1>
          <p className="page-subtitle">Add your loans and track them in one place</p>
        </div>
      </div>
      {error && <div className="alert alert-error"><span className="alert-icon">⚠️</span>{error}</div>}
      <div className="grid-2">
        <div className="card">
          <h3 style={{marginTop:0}}>Add Loan</h3>
          <form onSubmit={submit} className="consolidation-form">
            <div className="form-group">
              <label className="form-label"><span className="label-text">Lender Name</span></label>
              <input className="form-input" placeholder="e.g., HDFC Bank" value={form.lenderName} onChange={e=>setForm({...form, lenderName:e.target.value})} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><span className="label-text">Principal Amount</span></label>
                <div className="input-wrapper">
                  <input className="form-input" type="number" step="0.01" min="0" placeholder="e.g., 250000" value={form.principalAmount} onChange={e=>setForm({...form, principalAmount:e.target.value})} required />
                  <span className="input-suffix">₹</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label"><span className="label-text">Interest Rate</span><span className="label-hint">Annual %</span></label>
                <div className="input-wrapper">
                  <input className="form-input" type="number" step="0.01" min="0" max="50" placeholder="e.g., 10" value={form.interestRate} onChange={e=>setForm({...form, interestRate:e.target.value})} required />
                  <span className="input-suffix">%</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><span className="label-text">Tenure</span></label>
                <div className="input-wrapper">
                  <input className="form-input" type="number" min="1" max="480" placeholder="in months" value={form.tenureMonths} onChange={e=>setForm({...form, tenureMonths:e.target.value})} required />
                  <span className="input-suffix">months</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label"><span className="label-text">Start Date</span><span className="label-hint">Optional</span></label>
                <input className="form-input" type="date" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label"><span className="label-text">Loan Type</span></label>
              <select className="form-input" value={form.loanType} onChange={e=>setForm({...form, loanType:e.target.value})}>
                <option>Personal</option>
                <option>Home</option>
                <option>Auto</option>
                <option>Education</option>
              </select>
            </div>
            <button type="submit" className="simulate-btn"><span className="btn-icon">➕</span>Add Loan</button>
          </form>
        </div>
        <div className="card">
          <div className="panel-header" style={{borderTopLeftRadius:16,borderTopRightRadius:16}}>
            <div className="panel-title"><span className="panel-icon">📋</span>Existing Loans</div>
            <button className="btn btn-danger" onClick={clearAll}><span className="btn-icon">🗑️</span>Delete All</button>
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
                  <td>₹ {Number(l.principalAmount).toLocaleString()}</td>
                  <td>{l.interestRate}%</td>
                  <td>{l.tenureMonths}m</td>
                  <td><span className={`status-badge ${String(l.status || '').toLowerCase()}`}>{l.status || 'Active'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


