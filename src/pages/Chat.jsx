import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import { aiReplies } from '../data/workouts'

const SUGGESTIONS = [
  'HOW DO I BUILD MUSCLE FASTER?',
  'BEST WORKOUT FOR FAT LOSS?',
  'HOW MUCH PROTEIN DO I NEED?',
  'TIPS FOR FASTER RECOVERY?',
]

function ts() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const INIT = [{
  id: 1,
  role: 'ai',
  content: "What's up, athlete! I'm your FitVerse AI Trainer. Ask me anything — workouts, nutrition, recovery, goals. Let's go. 💪",
  time: ts(),
}]

export default function Chat() {
  const [messages, setMessages] = useState(INIT)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || typing) return
    setMessages(p => [...p, { id: Date.now(), role: 'user', content, time: ts() }])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setTyping(true)
    await new Promise(r => setTimeout(r, 900 + Math.random() * 900))
    setTyping(false)
    setMessages(p => [...p, {
      id: Date.now() + 1, role: 'ai',
      content: aiReplies[Math.floor(Math.random() * aiReplies.length)],
      time: ts(),
    }])
  }

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 760, width: '100%', margin: '0 auto', padding: 'clamp(12px, 3vw, 24px) clamp(12px, 4vw, 24px)', paddingTop: 68, gap: 12, minHeight: 0 }}>

        {/* Chat Header */}
        <div
          className="animate-fade-in fv-card"
          style={{ borderRadius: 4, padding: 'clamp(12px, 3vw, 18px)', display: 'flex', alignItems: 'center', gap: 14, borderLeft: '4px solid var(--red)' }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 4, background: 'rgba(228,30,46,0.15)', border: '1px solid rgba(228,30,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
            🤖
          </div>
          <div>
            <h1 className="fv-heading" style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)', marginBottom: 4 }}>FITVERSE AI TRAINER</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
              <span className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>ONLINE · HIGH PERFORMANCE MODE</span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            minHeight: 200,
            maxHeight: 'calc(100svh - 280px)',
            paddingRight: 4,
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <div
                key={msg.id}
                className="animate-fade-in-up"
                style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexDirection: isUser ? 'row-reverse' : 'row' }}
              >
                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: 3, flexShrink: 0,
                  background: isUser ? 'var(--red)' : 'rgba(228,30,46,0.15)',
                  border: isUser ? 'none' : '1px solid rgba(228,30,46,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isUser ? '0.65rem' : '0.9rem', color: 'var(--text-inverted)',
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                }}>
                  {isUser ? 'ME' : '🤖'}
                </div>

                {/* Bubble */}
                <div style={{
                  maxWidth: 'min(72%, 480px)',
                  padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 18px)',
                  borderRadius: 4,
                  background: isUser ? 'var(--red)' : 'var(--bg-card)',
                  border: isUser ? 'none' : '1px solid var(--border)',
                  borderLeft: isUser ? 'none' : '3px solid var(--red)',
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.88rem)',
                  color: isUser ? 'var(--text-inverted)' : 'var(--text)',
                  lineHeight: 1.65,
                  boxShadow: isUser ? '0 0 16px rgba(228,30,46,0.2)' : 'none',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                  <div className="fv-label" style={{ fontSize: '0.55rem', marginTop: 5, opacity: 0.4, letterSpacing: '0.06em' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 3, background: 'rgba(228,30,46,0.15)', border: '1px solid rgba(228,30,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>🤖</div>
              <div style={{ padding: '12px 16px', borderRadius: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--red)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 14 }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips */}
        {messages.length <= 2 && !typing && (
          <div className="animate-fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="fv-label"
                style={{
                  padding: '7px 12px', borderRadius: 3, border: '1px solid var(--border)',
                  background: 'var(--bg-card)', color: 'var(--text-muted)',
                  fontSize: '0.58rem', letterSpacing: '0.09em', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(228,30,46,0.5)' }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div
          style={{
            display: 'flex', alignItems: 'flex-end', gap: 10,
            padding: 'clamp(10px, 2vw, 14px)',
            borderRadius: 4, border: '1px solid var(--border)',
            background: 'var(--bg-card)',
          }}
        >
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
            placeholder="ASK YOUR TRAINER ANYTHING…"
            rows={1}
            disabled={typing}
            className="fv-label"
            style={{
              flex: 1, resize: 'none', background: 'none', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: 'clamp(0.72rem, 2vw, 0.78rem)', letterSpacing: '0.08em',
              minHeight: 28, maxHeight: 120, overflowY: 'auto',
              opacity: typing ? 0.5 : 1, fontFamily: "'Barlow Condensed', sans-serif",
              lineHeight: 1.5,
            }}
          />
          <button
            id="chat-send"
            onClick={() => send()}
            disabled={!input.trim() || typing}
            className="fv-btn-red fv-label"
            style={{
              width: 40, height: 40, borderRadius: 3, border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', flexShrink: 0,
              opacity: (!input.trim() || typing) ? 0.35 : 1,
              cursor: (!input.trim() || typing) ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.15s, background 0.15s',
            }}
            aria-label="Send"
          >
            ↑
          </button>
        </div>

        <p className="fv-label" style={{ textAlign: 'center', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.14em' }}>
          AI RESPONSES ARE SIMULATED · FITVERSE HIGH PERFORMANCE MODE
        </p>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span className="fv-brand" style={{ fontSize: '1.1rem', letterSpacing: '0.12em' }}>FITVERSE</span>
          <span className="fv-label" style={{ fontSize: '0.58rem', color: 'var(--text-dim)' }}>© 2026 FIT VERSE. NO EXCUSES</span>
        </div>
      </footer>
    </div>
  )
}
