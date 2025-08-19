export default function PaymentSuccess() {
    return (
        <div className="card">
            <h1 className="text-2xl font-semibold">Payment Submitted ✅</h1>
            <p className="mt-2 text-gray-600">If successful, your wallet will update after Paystack confirms the payment (via webhook). Return to the Dashboard to see updates.</p>
        </div>
    )
}