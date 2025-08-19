import Link from 'next/link'


export default function Home() {
    return (
        <section className="grid gap-6">
            <div className="card">
                <h1 className="text-3xl font-bold">Build your online payment platform</h1>
                <p className="mt-2 text-gray-600">This starter wires up auth, MongoDB, and Paystack deposits so you can learn by doing.</p>
                <div className="mt-4 flex gap-3">
                    <Link href="/register" className="btn">Get Started</Link>
                    <Link href="/login" className="btn bg-gray-900 hover:bg-black">Sign in</Link>
                </div>
            </div>
        </section>
    )
}