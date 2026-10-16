import type { Metadata, Viewport } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'
import './globals.css'

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'MVX Technologies Inc.',
  description:
    'Systems engineering across the full physics spectrum, from simulation software to flight hardware. Engineering firm based in Quebec City.',
  metadataBase: new URL('https://mvxtechnologies.com'),
  openGraph: {
    title: 'MVX Technologies Inc.',
    description: 'Systems engineering across the full physics spectrum, from simulation software to flight hardware.',
    url: 'https://mvxtechnologies.com',
    siteName: 'MVX Technologies Inc.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f3f3f1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body>{children}</body>
    </html>
  )
}
