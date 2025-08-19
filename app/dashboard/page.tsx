'use client'
const [balance, setBalance] = useState<number>(0)


const fetchTx = async () => {
    const res = await fetch('/api/transactions')
    const json = await res.json()
    setTxs(json.transactions || [])
}


useEffect(() => { fetchTx() }, [])


useEffect(() => {
    // quick balance from txs (success deposits only). In prod, read from user profile API
    const b = txs.filter(t => t.status === 'success' && t.type === 'deposit').reduce((s, t) => s + t.amount, 0)
    setBalance(b)
}, [txs])


const deposit = async () => {
    setLoading(true)
    const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
    })
    setLoading(false)
    const data = await res.json()
    if (res.ok) window.location.href = data.paymentUrl
    else alert(data.error || 'Failed to start payment')
}


return (
    <section className="grid gap-6">
        <div className="card">
            <h2 className="text-2xl font-semibold">Hi {session?.user?.name || 'there'} 👋</h2>
            <p className="mt-1 text-gray-600">Wallet Balance</p>
            <p className="text-4xl font-bold">₦{(balance / 100).toFixed(2)}</p>
            <div className="mt-4 flex items-center gap-3">
                <input className="input max-w-[200px]" type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value || '0'))} />
                <button className="btn" onClick={deposit} disabled={loading}>{loading ? 'Redirecting…' : 'Deposit with Paystack'}</button>
            </div>
        </div>


        <div className="grid gap-3">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="grid gap-3">
                {txs.length === 0 && <p className="text-gray-600">No transactions yet.</p>}
                {txs.map((t) => (<TransactionCard key={t._id} tx={t} />))}
            </div>
        </div>
    </section>
)
}