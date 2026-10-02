import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Pacifico, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { OrdersProvider } from '@/lib/store'
import { ChefAuthProvider } from '@/lib/chef-auth'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})
const pacifico = Pacifico({
  variable: '--font-script',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: "Bernie's Burger Night · Oak Dam Village",
  description:
    "Build your perfect burger for Bernie's Burger Night at Oak Dam Village. Powered by ISS.",
  generator: 'v0.app',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a160f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${jakarta.variable} ${pacifico.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <OrdersProvider>
          <ChefAuthProvider>{children}</ChefAuthProvider>
        </OrdersProvider>
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
