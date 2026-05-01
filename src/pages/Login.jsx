import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const FOOTER_LINKS = ['PRIVACY POLICY', 'TERMS OF SERVICE', 'SUPPORT', 'COOKIES']

export default function Login() {
  const { login, loading } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Required'
    else if (form.password.length < 6) e.password = 'Min 6 characters'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setGlobalError('')
    const res = await login(form.email, form.password)
    if (res.success) navigate('/dashboard')
    else setGlobalError('Invalid credentials. Use any email + password ≥ 6 chars.')
  }

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ── NAVBAR ── */}
      <header style={{ background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="fv-brand" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', letterSpacing: '0.12em' }}>FITVERSE</span>
            <button
              onClick={toggleTheme}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <Link
            to="/signup"
            id="join-now-btn"
            className="fv-btn-red"
            style={{ padding: '8px 20px', fontSize: 'clamp(0.65rem, 2.5vw, 0.8rem)', borderRadius: 3, letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            JOIN NOW
          </Link>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(228,30,46,0.08) 0%, transparent 70%)',
        }}
      >
        {/* Card with Glow */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
          {/* Glow Blob */}
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '120%', height: '120%', 
            background: 'radial-gradient(circle, rgba(228,30,46,0.12) 0%, transparent 70%)', 
            filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 
          }} />

          <div
            className="animate-fade-in-up fv-card"
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 60px rgba(0,0,0,0.7)',
              zIndex: 1
            }}
          >
          {/* Left red accent */}
          <div className="fv-red-line" />

          {/* Card body */}
          <div style={{ padding: 'clamp(24px, 6vw, 40px) clamp(20px, 6vw, 36px) clamp(24px, 6vw, 40px) clamp(28px, 7vw, 44px)' }}>

            {/* Heading */}
            <div style={{ marginBottom: 24 }}>
              <h1 className="fv-heading" style={{ fontSize: 'clamp(2.4rem, 10vw, 3.5rem)', lineHeight: 0.9, marginBottom: 10 }}>
                WELCOME<br />BACK
              </h1>
              <p className="fv-label" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                UNLEASH THE ATHLETE WITHIN
              </p>
            </div>

            {/* Error */}
            {globalError && (
              <div
                className="animate-fade-in"
                style={{ marginBottom: 16, padding: '10px 14px', fontSize: '0.8rem', border: '1px solid rgba(228,30,46,0.35)', borderRadius: 3, background: 'rgba(228,30,46,0.08)', color: '#ff4455' }}
              >
                {globalError}
              </div>
            )}

            <form id="login-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }} noValidate>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="fv-label" htmlFor="login-email" style={{ fontSize: '0.62rem', letterSpacing: '0.14em' }}>EMAIL / USERNAME</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: '0.85rem', pointerEvents: 'none' }}>✉</span>
                  <input
                    id="login-email"
                    className="fv-input"
                    type="email"
                    placeholder="athlete@fitverse.com"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p style={{ color: 'var(--red)', fontSize: '0.72rem', margin: 0 }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <label className="fv-label" htmlFor="login-password" style={{ fontSize: '0.62rem', letterSpacing: '0.14em' }}>PASSWORD</label>
                  <button
                    type="button"
                    className="fv-label"
                    style={{ fontSize: '0.6rem', color: 'var(--red)', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    FORGOT PASSWORD?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: '0.85rem', pointerEvents: 'none' }}>🔒</span>
                  <input
                    id="login-password"
                    className="fv-input"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={set('password')}
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && <p style={{ color: 'var(--red)', fontSize: '0.72rem', margin: 0 }}>{errors.password}</p>}
              </div>

              {/* Remember */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
                  <input id="login-remember" type="checkbox" checked={form.remember} onChange={set('remember')} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                  <div style={{
                    width: 16, height: 16, border: `1px solid ${form.remember ? 'var(--red)' : 'var(--input-border)'}`,
                    background: form.remember ? 'var(--red)' : 'transparent',
                    borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}>
                    {form.remember && <span style={{ color: '#fff', fontSize: '0.65rem', lineHeight: 1 }}>✓</span>}
                  </div>
                </div>
                <span className="fv-label" style={{ fontSize: '0.62rem', letterSpacing: '0.1em' }}>KEEP ME LOGGED IN</span>
              </label>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="fv-btn-red"
                style={{ width: '100%', padding: '13px 20px', borderRadius: 3, fontSize: '0.9rem', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}
              >
                {loading
                  ? <><svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> LOGGING IN…</>
                  : <>LOGIN <span style={{ fontSize: '1.1rem' }}>→</span></>
                }
              </button>
            </form>

            {/* Signup link */}
            <p className="fv-label" style={{ marginTop: 20, textAlign: 'center', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
              NOT A MEMBER?{' '}
              <Link to="/signup" id="start-journey-link" className="fv-label" style={{ color: 'var(--red)', fontSize: '0.62rem', letterSpacing: '0.1em', fontWeight: 900, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                START YOUR JOURNEY
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div
        className="animate-fade-in"
        style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: 3, animationDelay: '0.3s', position: 'relative', zIndex: 1 }}
      >
        <span style={{ color: 'var(--red)' }}>⚡</span>
        <span className="fv-label" style={{ fontSize: '0.58rem', letterSpacing: '0.24em', color: 'var(--text-muted)' }}>HIGH PERFORMANCE ONLY</span>
      </div>
    </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          {/* Top row */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span className="fv-brand" style={{ fontSize: '1.1rem', letterSpacing: '0.12em' }}>FITVERSE</span>
            <span className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>© 2026 FIT VERSE. NO EXCUSES</span>
          </div>
          {/* Links */}
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '8px 20px', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            {FOOTER_LINKS.map(link => (
              <button
                key={link}
                className="fv-label"
                style={{ fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', transition: 'color 0.15s' }}
                onMouseOver={e => e.target.style.color = '#fff'}
                onMouseOut={e => e.target.style.color = 'var(--text-dim)'}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
