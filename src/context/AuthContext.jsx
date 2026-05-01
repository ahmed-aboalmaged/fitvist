import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fitverse_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) localStorage.setItem('fitverse_user', JSON.stringify(user))
    else localStorage.removeItem('fitverse_user')
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1000)) // simulate API
    if (email && password.length >= 6) {
      const userData = { email, name: email.split('@')[0], avatar: null }
      setUser(userData)
      setLoading(false)
      return { success: true }
    }
    setError('Invalid credentials. Password must be at least 6 characters.')
    setLoading(false)
    return { success: false }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1200))
    if (name && email && password.length >= 6) {
      const userData = { email, name, avatar: null }
      setUser(userData)
      setLoading(false)
      return { success: true }
    }
    setError('Please fill all fields. Password must be at least 6 characters.')
    setLoading(false)
    return { success: false }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
