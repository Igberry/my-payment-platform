import { Schema, model, models, Types } from 'mongoose'


const TransactionSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        reference: { type: String, required: true, unique: true },
        amount: { type: Number, required: true }, // kobo
        currency: { type: String, default: 'NGN' },
        type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], default: 'deposit' },
        status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
        gateway: { type: String, enum: ['paystack'], default: 'paystack' },
        meta: { type: Object },
    },
    { timestamps: true }
)


export default models.Transaction || model('Transaction', TransactionSchema)