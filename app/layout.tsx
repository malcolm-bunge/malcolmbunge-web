import type {Metadata} from 'next'
import {Fraunces, Inter, JetBrains_Mono} from 'next/font/google'
import '../styles/globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--nf-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--nf-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--nf-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Malcolm Bunge',
  description: 'Humane Systems Architecture, Operational Design, Functional Build',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
