import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import ChoreTable from './components/ChoreTable'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

const AppContent = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    )
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1>Daily Schedule Tracker</h1>
          <div className="user-section">
            <span className="user-name">
              {user?.first_name || user?.email}
            </span>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <ChoreTable />
      </main>
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App