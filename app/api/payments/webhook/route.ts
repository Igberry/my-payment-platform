import { NextResponse } from 'next/server'
import { verifyPaystackSignature } from '@/lib/payment'
import { connectDB } from '@/lib/db'
import Transaction from '@/models/Transaction'
import User from '@/models/User'


export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


export async function POST(req: Request) {
    const rawBody = await req.text()
    const signature = (req.headers.get('x-paystack-signature') || '').trim()
    const valid = verifyPaystackSignature(rawBody, signature)
    if (!valid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })


    const event = JSON.parse(rawBody)
    if (event.event !== 'charge.success') return NextResponse.json({ ok: true })


    const reference = event.data.reference
    const amount = event.data.amount // already in kobo


    await connectDB()
    const tx = await Transaction.findOne({ reference })
    if (!tx) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    if (tx.status === 'success') return NextResponse.json({ ok: true })


    tx.status = 'success'
    await tx.save()


    const user = await User.findById(tx.userId)
    if (user) {
        user.balance = (user.balance || 0) + amount
        await user.save()
    }


    return NextResponse.json({ ok: true })
}