import { useEffect, useState } from 'react'
import { LoansAPI, ConsolidationAPI } from '../api/client'

export default function ConsolidationPage() {
  const [loans, setLoans] = useState([])
  const [selected, setSelected] = useState([])
  const [tenureMonths, setTenureMonths] = useState('12')
  const [newInterestRate, setNewInterestRate] = useState('12')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => { 
    LoansAPI.list().then(setLoans).catch(() => setError('Failed to load loans'))
  }, [])

  const toggle = (loanId) => {
    setSelected((prev) => {
      const newSelected = prev.includes(loanId) ? prev.filter(id => id !== loanId) : [...prev, loanId]
      if (newSelected.length > 0 && currentStep === 1) {
        setCurrentStep(2)
      } else if (newSelected.length === 0) {
        setCurrentStep(1)
        setResult(null)
      }
      return newSelected
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const data = await ConsolidationAPI.consolidate({
        loanIds: selected,
        tenureMonths: parseInt(tenureMonths),
        newInterestRate: parseFloat(newInterestRate)
      })
      setResult(data)
      setCurrentStep(3)
    } catch (e) {
      setError('Consolidation simulation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotalSelected = () => {
    return selected.reduce((total, loanId) => {
      const loan = loans.find(l => l.loanId === loanId)
      return total + (loan ? loan.principalAmount : 0)
    }, 0)
  }

  const calculateSavings = () => {
    if (!result) return null
    return {
      totalSavings: result.totalPayableBefore - result.totalPayableAfter,
      interestSavings: result.totalInterestBefore - result.totalInterestAfter,
      savingsPercentage: ((result.totalPayableBefore - result.totalPayableAfter) / result.totalPayableBefore * 100).toFixed(1)
    }
  }

  const savings = calculateSavings()

  return (
    <div className="consolidation-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🏦</span>
            Loan Consolidation
          </h1>
          <p className="page-subtitle">
            Combine multiple loans into one with better terms and lower monthly payments
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Select Loans</span>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Configure Terms</span>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">View Results</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="consolidation-content">
        {/* Left Panel - Loan Selection */}
        <div className="panel loan-selection-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="panel-icon">📋</span>
              Available Loans
            </h3>
            {selected.length > 0 && (
              <div className="selection-summary">
                {selected.length} loan{selected.length > 1 ? 's' : ''} selected
                <span className="total-amount">₹{calculateTotalSelected().toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="loan-list">
            {loans.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💳</div>
                <p>No loans available for consolidation</p>
              </div>
            ) : (
              loans.map(loan => (
                <div 
                  key={loan.loanId} 
                  className={`loan-card ${selected.includes(loan.loanId) ? 'selected' : ''}`}
                  onClick={() => toggle(loan.loanId)}
                >
                  <div className="loan-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selected.includes(loan.loanId)} 
                      onChange={() => toggle(loan.loanId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="loan-details">
                    <div className="loan-header">
                      <h4 className="lender-name">{loan.lenderName}</h4>
                      <div className="loan-amount">₹{loan.principalAmount.toLocaleString()}</div>
                    </div>
                    <div className="loan-meta">
                      <span className="interest-rate">{loan.interestRate}% APR</span>
                      <span className="loan-type">Personal Loan</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Configuration Form */}
          {selected.length > 0 && (
            <div className="configuration-section">
              <h4 className="config-title">
                <span className="config-icon">⚙️</span>
                Consolidation Terms
              </h4>
              <form onSubmit={submit} className="consolidation-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">New Interest Rate</span>
                      <span className="label-hint">Annual percentage rate</span>
                    </label>
                    <div className="input-wrapper">
                      <input 
                        type="number" 
                        step="0.01" 
                        min="1"
                        max="30"
                        value={newInterestRate} 
                        onChange={e => setNewInterestRate(e.target.value)} 
                        className="form-input"
                        required 
                      />
                      <span className="input-suffix">%</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Loan Tenure</span>
                      <span className="label-hint">Repayment period</span>
                    </label>
                    <div className="input-wrapper">
                      <input 
                        type="number" 
                        min="6"
                        max="360"
                        value={tenureMonths} 
                        onChange={e => setTenureMonths(e.target.value)} 
                        className="form-input"
                        required 
                      />
                      <span className="input-suffix">months</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`simulate-btn ${isLoading ? 'loading' : ''}`}
                  disabled={!selected.length || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="btn-spinner"></span>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🧮</span>
                      Simulate Consolidation
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Panel - Results */}
        <div className="panel results-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="panel-icon">📊</span>
              Consolidation Results
            </h3>
          </div>

          <div className="results-content">
            {!result ? (
              <div className="empty-results">
                <div className="empty-icon">📈</div>
                <h4>Ready to simulate?</h4>
                <p>Select loans and configure terms to see your potential savings</p>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">✅</span>
                    <span>Lower monthly payments</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✅</span>
                    <span>Simplified loan management</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✅</span>
                    <span>Potential interest savings</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="results-data">
                {/* Savings Highlight */}
                {savings && savings.totalSavings > 0 && (
                  <div className="savings-highlight">
                    <div className="savings-badge">
                      <span className="savings-icon">💰</span>
                      <div className="savings-text">
                        <div className="savings-amount">₹{savings.totalSavings.toLocaleString()}</div>
                        <div className="savings-label">Total Savings ({savings.savingsPercentage}%)</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison Cards */}
                <div className="comparison-grid">
                  <div className="comparison-card before">
                    <div className="card-header">
                      <h4 className="card-title">Before Consolidation</h4>
                      <span className="card-icon">📋</span>
                    </div>
                    <div className="metrics">
                      <div className="metric">
                        <div className="metric-label">Total Payable</div>
                        <div className="metric-value">₹{result.totalPayableBefore.toLocaleString()}</div>
                      </div>
                      <div className="metric">
                        <div className="metric-label">Total Interest</div>
                        <div className="metric-value">₹{result.totalInterestBefore.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="comparison-card after">
                    <div className="card-header">
                      <h4 className="card-title">After Consolidation</h4>
                      <span className="card-icon">✨</span>
                    </div>
                    <div className="metrics">
                      <div className="metric">
                        <div className="metric-label">Total Payable</div>
                        <div className="metric-value">₹{result.totalPayableAfter.toLocaleString()}</div>
                      </div>
                      <div className="metric">
                        <div className="metric-label">Total Interest</div>
                        <div className="metric-value">₹{result.totalInterestAfter.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="btn btn-primary">
                    <span className="btn-icon">📄</span>
                    Apply for Consolidation
                  </button>
                  <button className="btn btn-secondary" onClick={() => {
                    setSelected([])
                    setResult(null)
                    setCurrentStep(1)
                  }}>
                    <span className="btn-icon">🔄</span>
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


