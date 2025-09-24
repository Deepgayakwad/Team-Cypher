import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoansPage from './pages/LoansPage'
import ConsolidationPage from './pages/ConsolidationPage'
import LoanDetailsPage from './pages/LoanDetailsPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container header-inner">
          <div className="logo">EMI Planner</div>
          <nav className="nav">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/loans">Loans</NavLink>
            <NavLink to="/consolidation">Consolidation</NavLink>
          </nav>
        </div>
      </header>
      <div className="container content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/loans/:loanId" element={<LoanDetailsPage />} />
          <Route path="/consolidation" element={<ConsolidationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
