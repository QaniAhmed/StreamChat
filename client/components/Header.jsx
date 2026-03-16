import React from 'react'

function Header() {
  return (
    <header className="header">
        <div className="logo-area">
          <div className="logo-icon">SC</div>
          <h1 className="logo-text">StreamChat</h1>
        </div>
        <div className="status-indicator">
          <span className="dot"></span>
          <span>Online</span>
        </div>
      </header>
  )
}

export default Header
