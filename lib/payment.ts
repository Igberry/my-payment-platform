import crypto from 'crypto'


const PAYSTACK_BASE = 'https://api.paystack.co'


export async function paystackInitialize({ email, amount, reference, callback_url }: {
    email: string
    amount: number // in kobo
    reference: string
    callback_url: string
}) {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount, reference, callback_url }),
    })
    if (!res.ok) throw new Error('Failed to initialize Paystack')
    const data = await res.json()
    return data.data // { authorization_url, access_code, reference }
}


export function verifyPaystackSignature(rawBody: string, signature?: string | null) {
    if (!signature) return false
    const hash = crypto
        .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY || '')
        .update(rawBody)
        .digest('hex')
    return hash === signature
}