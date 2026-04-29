'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DEMO_ACCOUNTS = [
  { role: 'Admin', name: 'Dr. Sarah Mitchell', email: 'admin@campus.edu', password: 'Admin@123', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100', badge: 'bg-blue-100 text-blue-700' },
  { role: 'HR Manager', name: 'Prof. James Carter', email: 'hr@campus.edu', password: 'Manager@123', color: 'bg-green-50 border-green-200 hover:bg-green-100', badge: 'bg-green-100 text-green-700' },
  { role: 'Student', name: 'Aisha Rahman', email: 'student@campus.edu', password: 'Student@123', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100', badge: 'bg-amber-100 text-amber-700' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) setError('Invalid credentials. Please use the demo accounts below.')
    else router.push('/dashboard')
  }

  async function quickLogin(acc: typeof DEMO_ACCOUNTS[0]) {
    setEmail(acc.email)
    setPassword(acc.password)
    setLoading(true)
    const result = await signIn('credentials', { email: acc.email, password: acc.password, redirect: false })
    setLoading(false)
    if (!result?.error) router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🎓</span>
            </div>
            <span className="text-2xl font-semibold text-white">Campus<span className="text-blue-400">Works</span></span>
          </div>
          <p className="text-slate-400 text-sm">On-Campus Student Employment Platform</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Sign in to your account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input className="input" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5">
              {loading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Signing in...</>) : 'Sign in with SSO'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium">Demo accounts – click to sign in instantly:</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.email} onClick={() => quickLogin(acc)} className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${acc.color}`}>
                  <span className={`badge ${acc.badge} shrink-0`}>{acc.role}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-800">{acc.name}</div>
                    <div className="text-xs text-gray-500 truncate">{acc.email} · {acc.password}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          CampusWorks v1.0 · Built for university student employment management
        </p>
      </div>
    </div>
  )
}
