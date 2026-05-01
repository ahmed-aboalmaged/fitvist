import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import { workouts, stats } from '../data/workouts'

const CATEGORIES = ['ALL', 'CARDIO', 'STRENGTH', 'CORE', 'FLEXIBILITY']

const difficultyStyle = {
  Easy:   { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.25)' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  Hard:   { color: '#e41e2e', bg: 'rgba(228,30,46,0.12)',  border: 'rgba(228,30,46,0.25)' },
}

const gradients = {
  'from-orange-500 to-pink-600':   'linear-gradient(135deg,#f97316,#db2777)',
  'from-violet-500 to-purple-700': 'linear-gradient(135deg,#8b5cf6,#7e22ce)',
  'from-teal-400 to-cyan-600':     'linear-gradient(135deg,#2dd4bf,#0891b2)',
  'from-yellow-400 to-orange-500': 'linear-gradient(135deg,#facc15,#f97316)',
  'from-blue-500 to-indigo-700':   'linear-gradient(135deg,#3b82f6,#4338ca)',
  'from-green-400 to-emerald-600': 'linear-gradient(135deg,#4ade80,#059669)',
}

export default function Dashboard() {
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filtered = (activeCategory === 'ALL'
    ? workouts
    : workouts.filter(w => w.category.toUpperCase() === activeCategory)).slice(0, 3)

  const completedCount = workouts.filter(w => w.completed).length
  const progress = Math.round((completedCount / workouts.length) * 100)

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(16px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 40px)' }}>

        {/* ── HERO BANNER ── */}
        <section className="animate-fade-in-up">
          <div
            style={{
              position: 'relative', overflow: 'hidden', borderRadius: 4,
              padding: 'clamp(20px, 4vw, 32px)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border)',
              borderLeft: '4px solid var(--red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            {/* BG glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 80% at 90% 50%, rgba(228,30,46,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Text */}
            <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
              <p className="fv-label" style={{ color: 'var(--red)', fontSize: '0.6rem', letterSpacing: '0.22em', marginBottom: 6 }}>⚡ WELCOME BACK</p>
              <h1 className="fv-heading" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: 8 }}>
                {user?.name?.toUpperCase() || 'ATHLETE'}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontFamily: "'Barlow', sans-serif" }}>
                Ready to dominate today's session?
              </p>
            </div>

            {/* Progress Ring */}
            <div style={{ position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                <svg width="80" height="80" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#e41e2e" strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${progress} ${100 - progress}`}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(228,30,46,0.6))' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="fv-heading" style={{ fontSize: '1.1rem' }}>{progress}%</span>
                </div>
              </div>
              <p className="fv-label" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textAlign: 'center' }}>{completedCount}/{workouts.length} DONE</p>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section>
          <p className="fv-label" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 14 }}>▸ PERFORMANCE OVERVIEW</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="animate-fade-in-up fv-card"
                style={{ animationDelay: `${i * 0.07}s`, borderRadius: 4, padding: 'clamp(14px, 3vw, 20px)', position: 'relative', overflow: 'hidden', borderLeft: '3px solid var(--red)' }}
              >
                <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '1.5rem', opacity: 0.1 }}>{s.icon}</div>
                <p className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-dim)', letterSpacing: '0.14em', marginBottom: 4 }}>{s.label.toUpperCase()}</p>
                <p className="fv-heading" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: 2 }}>{s.value}</p>
                <p className="fv-label" style={{ fontSize: '0.62rem', color: 'var(--red)' }}>{s.change}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORKOUTS ── */}
        <section>
          {/* Header + filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
            <p className="fv-label" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>▸ TRAINING SESSIONS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className="fv-label"
                  style={{
                    padding: '6px 12px', borderRadius: 3,
                    fontSize: '0.58rem', letterSpacing: '0.12em',
                    background: activeCategory === cat ? 'var(--red)' : 'var(--bg-card)',
                    backdropFilter: activeCategory === cat ? 'none' : 'blur(16px)',
                    WebkitBackdropFilter: activeCategory === cat ? 'none' : 'blur(16px)',
                    color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                    border: `1px solid ${activeCategory === cat ? 'var(--red)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    boxShadow: activeCategory === cat ? '0 0 12px rgba(228,30,46,0.3)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="fv-card" style={{ borderRadius: 4, padding: '48px 24px', textAlign: 'center' }}>
              <p className="fv-heading" style={{ fontSize: '1.5rem', marginBottom: 8 }}>NO SESSIONS FOUND</p>
              <p className="fv-label" style={{ color: 'var(--text-dim)' }}>TRY A DIFFERENT CATEGORY</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
              {filtered.map((w, i) => {
                const diff = difficultyStyle[w.difficulty]
                return (
                  <div
                    key={w.id}
                    className="animate-fade-in-up fv-card"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      borderRadius: 4, overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      transition: 'transform 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Gradient header */}
                    <div style={{ height: 96, background: gradients[w.color] || 'linear-gradient(135deg,#e41e2e,#7e22ce)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <span style={{ fontSize: '2.6rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}>{w.emoji}</span>
                      {w.completed && (
                        <div className="fv-label" style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', color: '#22c55e', padding: '3px 8px', borderRadius: 2, fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                          ✓ DONE
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: 'clamp(14px, 3vw, 18px)', display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '2px solid rgba(228,30,46,0.35)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ minWidth: 0 }}>
                          <h3 className="fv-heading" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: 1.15, marginBottom: 3 }}>{w.title.toUpperCase()}</h3>
                          <p className="fv-label" style={{ color: 'var(--text-dim)', fontSize: '0.58rem' }}>{w.category.toUpperCase()}</p>
                        </div>
                        <span className="fv-label" style={{ flexShrink: 0, padding: '3px 8px', borderRadius: 2, fontSize: '0.55rem', background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, whiteSpace: 'nowrap' }}>
                          {w.difficulty.toUpperCase()}
                        </span>
                      </div>

                      <div className="fv-label" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.62rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span>⏱ {w.duration}</span>
                        <span>🔥 {w.calories}</span>
                        <span>◉ {w.exercises} EX</span>
                      </div>

                      <button
                        className="fv-label"
                        style={{
                          width: '100%', padding: '10px 16px', borderRadius: 3,
                          fontSize: '0.65rem', letterSpacing: '0.14em',
                          background: w.completed ? 'transparent' : 'var(--red)',
                          color: w.completed ? 'var(--text-dim)' : '#fff',
                          border: `1px solid ${w.completed ? 'var(--border)' : 'var(--red)'}`,
                          cursor: w.completed ? 'default' : 'pointer',
                          boxShadow: w.completed ? 'none' : '0 0 14px rgba(228,30,46,0.25)',
                          transition: 'all 0.15s',
                        }}
                      >
                        {w.completed ? 'COMPLETED ✓' : 'START SESSION →'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span className="fv-brand" style={{ fontSize: '1.1rem', letterSpacing: '0.12em' }}>FITVERSE</span>
          <span className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-dim)' }}>© 2026 FIT VERSE. NO EXCUSES</span>
        </div>
      </footer>
    </div>
  )
}
