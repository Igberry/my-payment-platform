import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'MyPay — Online Payments',
    description: 'A learning project: Next.js + Tailwind + Paystack',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar />
                    <main className="container py-8">{children}</main>
                </Providers>
            </body>
        </html>
    )
}