'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        setLoading(false)
        if (res.ok) router.push('/login')
        else alert('Failed to create account')
    }


    return (
        <div className="max-w-md mx-auto card">
            <h2 className="text-2xl font-semibold">Create account</h2>
            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            </form>
        </div>
    )
}