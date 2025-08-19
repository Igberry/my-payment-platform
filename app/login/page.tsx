'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await signIn('credentials', { redirect: false, email, password })
        setLoading(false)
        if (!res?.error) router.push('/dashboard')
        else alert('Invalid credentials')
    }


    return (
        <div className="max-w-md mx-auto card">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            </form>
        </div>
    )
}