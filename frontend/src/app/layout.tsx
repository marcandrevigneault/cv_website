import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GalaxyBackground from '@/components/GalaxyBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MVX Consulting - Physics & Systems Engineering',
  description: 'Freelance consultant specializing in physics, coding, and systems engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <GalaxyBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}