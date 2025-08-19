export type Tx = {
    _id: string
    amount: number
    currency: string
    status: 'pending' | 'success' | 'failed'
    type: 'deposit' | 'withdrawal' | 'transfer'
    reference: string
    createdAt: string
}


export default function TransactionCard({ tx }: { tx: Tx }) {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{tx.type.toUpperCase()} • {tx.reference}</p>
                    <p className="text-2xl font-semibold mt-1">₦{(tx.amount / 100).toFixed(2)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${tx.status === 'success' ? 'bg-green-100 text-green-700' :
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'}`}>{tx.status}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{new Date(tx.createdAt).toLocaleString()}</p>
        </div>
    )
}