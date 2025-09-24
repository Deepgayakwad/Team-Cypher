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

  if (error) return <div className="alert alert-error"><span className="alert-icon">⚠️</span>{error}</div>

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-inner">
          <div className="hero-text">
            <h1>Compare, plan, and conquer your debt</h1>
            <p>Consolidate loans, simulate EMIs, and find the best path to zero.</p>
            <div className="hero-actions">
              <a className="btn" href="/loans"><span className="btn-icon">➕</span>Add a Loan</a>
              <a className="btn secondary" href="/consolidation"><span className="btn-icon">🧮</span>Try Consolidation</a>
            </div>
          </div>
          <div className="hero-kpis">
            <div className="kpi-card">
              <div className="kpi-icon">💰</div>
              <div className="kpi-meta">
                <div className="kpi-value">₹ {totals.totalPrincipal.toLocaleString()}</div>
                <div className="kpi-label">Total Principal</div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon">📄</div>
              <div className="kpi-meta">
                <div className="kpi-value">{totals.active}</div>
                <div className="kpi-label">Active Loans</div>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon">📈</div>
              <div className="kpi-meta">
                <div className="kpi-value">{totals.avgRate.toFixed(2)}%</div>
                <div className="kpi-label">Average Interest</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Principal by Loan</h3>
            <span className="chart-subtitle">Distribution of outstanding principal</span>
          </div>
          <div className="chart-body">
            {loading ? (
              <div className="chart-skeleton" />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 6, right: 24, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#24a86a" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#24a86a" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip cursor={{ stroke: '#24a86a', strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="principal" stroke="#1f8e59" strokeWidth={2} fillOpacity={1} fill="url(#colorP)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="loans-card">
          <div className="loans-header">
            <h3>Your Loans</h3>
            <Link className="btn secondary" to="/loans"><span className="btn-icon">➕</span>Add</Link>
          </div>
          <div className="loans-grid">
            {loans.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💳</div>
                <p>No loans added yet</p>
              </div>
            ) : (
              loans.map((l, i) => (
                <Link key={i} to={`/loans/${l.loanId || i}`} className="loan-mini-card">
                  <div className="loan-mini-top">
                    <div className="loan-mini-title">{l.lenderName || 'Loan'}</div>
                    <span className={`status-badge ${l.status?.toLowerCase() || 'active'}`}>
                      {l.status || 'Active'}
                    </span>
                  </div>
                  <div className="loan-mini-metrics">
                    <div><span className="metric-label">Principal</span><span className="metric-value">₹ {Number(l.principalAmount).toLocaleString()}</span></div>
                    <div><span className="metric-label">Interest</span><span className="metric-value">{l.interestRate}%</span></div>
                    <div><span className="metric-label">Tenure</span><span className="metric-value">{l.tenureMonths}m</span></div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}


