import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { path: '/dashboard', label: 'DASHBOARD', icon: '▦' },
  { path: '/chat',      label: 'AI TRAINER', icon: '◈' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <header style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>

        {/* Logo */}
        <Link
          to="/dashboard"
          className="fv-brand"
          style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', letterSpacing: '0.12em', textDecoration: 'none', flexShrink: 0 }}
        >
          FITVERSE
        </Link>

        {/* Desktop center nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
          {navLinks.map(link => {
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className="fv-label"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 16px',
                  fontSize: '0.68rem', letterSpacing: '0.12em',
                  color: active ? '#fff' : 'var(--text-muted)',
                  borderBottom: active ? '2px solid var(--red)' : '2px solid transparent',
                  borderTop: '2px solid transparent',
                  textDecoration: 'none',
                  transition: 'color 0.15s, border-color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }} className="desktop-right">
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <span className="fv-label" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            ATHLETE:{' '}
            <span style={{ color: 'var(--red)', fontWeight: 900 }}>{user?.name?.toUpperCase()}</span>
          </span>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="fv-label"
            style={{
              fontSize: '0.62rem', letterSpacing: '0.1em',
              padding: '6px 14px', border: '1px solid var(--border)',
              borderRadius: 3, color: 'var(--text-muted)',
              background: 'none', cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            LOGOUT
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="mobile-hamburger"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '1.4rem', padding: '4px 8px',
            display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-nav)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} className="mobile-dropdown">
          <div style={{ padding: '8px 0' }}>
            {navLinks.map(link => {
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="fv-label"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '14px 24px',
                    fontSize: '0.7rem', letterSpacing: '0.12em',
                    color: active ? '#fff' : 'var(--text-muted)',
                    textDecoration: 'none',
                    borderLeft: active ? '3px solid var(--red)' : '3px solid transparent',
                    background: active ? 'rgba(228,30,46,0.05)' : 'none',
                    transition: 'background 0.15s',
                  }}
                >
                  {link.icon} {link.label}
                </Link>
              )
            })}

            {/* Mobile user info */}
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={toggleTheme}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                {isDarkMode ? '☀️ Day Mode' : '🌙 Dark Mode'}
              </button>
              <span className="fv-label" style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                ATHLETE: <span style={{ color: 'var(--red)', fontWeight: 900 }}>{user?.name?.toUpperCase()}</span>
              </span>
              <button
                onClick={handleLogout}
                className="fv-label"
                style={{ fontSize: '0.62rem', color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                ⏻ LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive CSS injected once */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav  { display: none !important; }
          .desktop-right { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-dropdown { display: none !important; }
        }
      `}</style>
    </header>
  )
}
