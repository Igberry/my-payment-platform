import { Schema, model, models } from 'mongoose'


const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // hashed
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        balance: { type: Number, default: 0 }, // in minor units (kobo)
    },
    { timestamps: true }
)


export default models.User || model('User', UserSchema)