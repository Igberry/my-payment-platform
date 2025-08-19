import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from './db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                // Connect to DB
                await connectDB()

                // Find user by email
                const user = await User.findOne({ email: credentials.email }).lean()
                if (!user) return null

                // Compare password
                const isValid = await bcrypt.compare(credentials.password, user.password)
                if (!isValid) return null

                // Return user object
                return {
                    id: String(user._id),
                    name: user.name,
                    email: user.email,
                    role: user.role || 'user',
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                (session.user as any).id = token.id
                    ; (session.user as any).role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
}

export default NextAuth(authOptions)
