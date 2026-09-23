'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setErr(error.message)
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <form onSubmit={submit} className="card-dark p-4" style={{ width: '100%', maxWidth: 380 }}>
        <h1 className="h4 fw-bold mb-4">Admin Login</h1>
        <input className="form-control mb-3 bg-dark text-white border-secondary"
          placeholder="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control mb-3 bg-dark text-white border-secondary"
          placeholder="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        {err && <p className="text-danger small">{err}</p>}
        <button className="btn-light-custom w-100">Sign In</button>
      </form>
    </div>
  )
}