import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Create a handler
const handler = NextAuth(authOptions)

// Export named methods for App Router
export { handler as GET, handler as POST }
