import { useEffect, useMemo, useState } from 'react'
import { LoansAPI } from '../api/client'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    LoansAPI.list()
      .then((data) => { if (mounted) { setLoans(data) } })
      .catch((e) => { if (mounted) { setError('Failed to load loans') } })
      .finally(() => { if (mounted) { setLoading(false) } })
    return () => { mounted = false }
  }, [])

  const totals = useMemo(() => {
    const totalPrincipal = loans.reduce((s, l) => s + (l.principalAmount || 0), 0)
    const active = loans.filter(l => l.status !== 'Closed_Consolidated').length
    const avgRate = loans.length ? (loans.reduce((s, l) => s + (l.interestRate || 0), 0) / loans.length) : 0
    return { totalPrincipal, active, avgRate }
  }, [loans])

  const chartData = useMemo(() => {
    return loans.map((l, idx) => ({ name: l.lenderName || `Loan ${idx+1}`, principal: l.principalAmount }))
  }, [loans])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Compare, plan, and conquer your debt</h1>
          <p>Consolidate loans, simulate EMIs, and find the best path to zero.</p>
          <div>
            <a className="btn" href="/loans">Add a Loan</a>
            <a className="btn secondary" style={{marginLeft:8}} href="/consolidation">Try Consolidation</a>
          </div>
        </div>
      </section>
      <div className="cards">
        <div className="card stat"><strong>₹ {totals.totalPrincipal.toFixed(2)}</strong>Total Principal</div>
        <div className="card stat"><strong>{totals.active}</strong>Active Loans</div>
        <div className="card stat"><strong>{totals.avgRate.toFixed(2)}%</strong>Avg Interest</div>
      </div>
      <div className="card" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="principal" stroke="#8884d8" fillOpacity={1} fill="url(#colorP)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{marginTop:24}}>Your Loans</h2>
      <div className="cards" style={{gridTemplateColumns:'repeat(3, minmax(0, 1fr))'}}>
        {loans.map((l, i) => (
          <Link key={i} to={`/loans/${l.loanId || i}`} className="card" style={{display:'block'}}>
            <div style={{fontWeight:700}}>{l.lenderName || 'Loan'}</div>
            <div className="stat"><strong>₹ {Number(l.principalAmount).toFixed(2)}</strong>Principal</div>
            <div className="stat"><strong>{l.interestRate}%</strong>Interest</div>
            <div className="stat"><strong>{l.tenureMonths} months</strong>Tenure</div>
            <div className="stat"><strong>{l.status}</strong>Status</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


