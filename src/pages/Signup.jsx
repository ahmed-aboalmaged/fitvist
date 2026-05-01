import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FOOTER_LINKS = ['PRIVACY POLICY', 'TERMS OF SERVICE', 'SUPPORT', 'COOKIES']

const FIELDS = [
  { id: 'signup-name',     key: 'name',     label: 'FULL NAME',    icon: '👤', type: 'text',     placeholder: 'Your name',            autoComplete: 'name' },
  { id: 'signup-email',    key: 'email',    label: 'EMAIL',        icon: '✉',  type: 'email',    placeholder: 'athlete@fitverse.com', autoComplete: 'email' },
  { id: 'signup-password', key: 'password', label: 'PASSWORD',     icon: '🔒', type: 'password', placeholder: '••••••••',             autoComplete: 'new-password' },
  { id: 'signup-confirm',  key: 'confirm',  label: 'CONFIRM PASS', icon: '🔒', type: 'password', placeholder: '••••••••',             autoComplete: 'new-password' },
]

export default function Signup() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Required'
    else if (form.password.length < 6) e.password = 'Min 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setGlobalError('')
    const res = await signup(form.name.trim(), form.email, form.password)
    if (res.success) navigate('/dashboard')
    else setGlobalError('Could not create account. Please try again.')
  }

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(p => ({ ...p, [key]: '' }))
  }

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* NAVBAR */}
      <header style={{ background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="fv-brand" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', letterSpacing: '0.12em' }}>FITVERSE</span>
          <Link
            to="/"
            id="signin-nav-btn"
            className="fv-btn-red"
            style={{ padding: '8px 20px', fontSize: 'clamp(0.65rem, 2.5vw, 0.8rem)', borderRadius: 3, letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            SIGN IN
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 16px',
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(228,30,46,0.08) 0%, transparent 70%)',
        }}
      >
        {/* Card */}
        <div
          className="animate-fade-in-up fv-card"
          style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 60px rgba(0,0,0,0.7)' }}
        >
          <div className="fv-red-line" />
          <div style={{ padding: 'clamp(24px, 6vw, 40px) clamp(20px, 6vw, 36px) clamp(24px, 6vw, 40px) clamp(28px, 7vw, 44px)' }}>

            <div style={{ marginBottom: 24 }}>
              <h1 className="fv-heading" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', lineHeight: 0.9, marginBottom: 10 }}>
                START<br />YOUR<br />JOURNEY
              </h1>
              <p className="fv-label" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                BECOME THE ATHLETE YOU WERE BORN TO BE
              </p>
            </div>

            {globalError && (
              <div className="animate-fade-in" style={{ marginBottom: 16, padding: '10px 14px', fontSize: '0.8rem', border: '1px solid rgba(228,30,46,0.35)', borderRadius: 3, background: 'rgba(228,30,46,0.08)', color: '#ff4455' }}>
                {globalError}
              </div>
            )}

            <form id="signup-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
              {FIELDS.map(({ id, key, label, icon, type, placeholder, autoComplete }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="fv-label" htmlFor={id} style={{ fontSize: '0.62rem', letterSpacing: '0.14em' }}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: '0.85rem', pointerEvents: 'none' }}>{icon}</span>
                    <input id={id} className="fv-input" type={type} placeholder={placeholder} value={form[key]} onChange={set(key)} autoComplete={autoComplete} />
                  </div>
                  {errors[key] && <p style={{ color: 'var(--red)', fontSize: '0.72rem', margin: 0 }}>{errors[key]}</p>}
                </div>
              ))}

              <button
                id="signup-submit"
                type="submit"
                disabled={loading}
                className="fv-btn-red"
                style={{ width: '100%', padding: '13px 20px', borderRadius: 3, fontSize: '0.88rem', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}
              >
                {loading
                  ? <><svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> CREATING…</>
                  : <>CREATE ACCOUNT <span style={{ fontSize: '1.1rem' }}>→</span></>
                }
              </button>
            </form>

            <p className="fv-label" style={{ marginTop: 20, textAlign: 'center', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
              ALREADY A MEMBER?{' '}
              <Link to="/" id="login-link" className="fv-label" style={{ color: 'var(--red)', fontWeight: 900, textDecoration: 'underline', textUnderlineOffset: 3, fontSize: '0.62rem', letterSpacing: '0.1em' }}>
                SIGN IN
              </Link>
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in" style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: 3, animationDelay: '0.3s' }}>
          <span style={{ color: 'var(--red)' }}>⚡</span>
          <span className="fv-label" style={{ fontSize: '0.58rem', letterSpacing: '0.24em', color: 'var(--text-muted)' }}>HIGH PERFORMANCE ONLY</span>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span className="fv-brand" style={{ fontSize: '1.1rem', letterSpacing: '0.12em' }}>FITVERSE</span>
            <span className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>© 2026 FIT VERSE. NO EXCUSES</span>
          </div>
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '8px 20px', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            {FOOTER_LINKS.map(link => (
              <button key={link} className="fv-label"
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
