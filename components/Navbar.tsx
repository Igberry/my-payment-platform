'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'


export default function Navbar() {
    const { data: session } = useSession()
    return (
        <header className="border-b bg-white">
            <nav className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-semibold text-lg">MyPay</Link>
                <div className="flex items-center gap-3">
                    {session?.user ? (
                        <>
                            <Link href="/dashboard" className="btn">Dashboard</Link>
                            <button onClick={() => signOut({ callbackUrl: '/' })} className="btn bg-gray-900 hover:bg-black">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn">Login</Link>
                            <Link href="/register" className="btn bg-gray-900 hover:bg-black">Create account</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}