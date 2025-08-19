import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Transaction from '@/models/Transaction'
import { paystackInitialize } from '@/lib/payment'


export const runtime = 'nodejs'


export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })


    const { amount } = await req.json() // amount in NGN (naira)
    if (!amount || amount <= 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })


    await connectDB()
    const user = await User.findById((session as any).user.id)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })


    const amountKobo = Math.round(amount * 100)
    const reference = `psk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`


    const init = await paystackInitialize({
        email: user.email,
        amount: amountKobo,
        reference,
        callback_url: process.env.PAYSTACK_CALLBACK_URL!,
    })


    await Transaction.create({
        userId: user._id,
        reference,
        amount: amountKobo,
        type: 'deposit',
        status: 'pending',
        gateway: 'paystack',
        meta: { access_code: init.access_code },
    })


    return NextResponse.json({ paymentUrl: init.authorization_url, reference })
}