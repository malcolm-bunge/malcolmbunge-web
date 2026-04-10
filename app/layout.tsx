import type {Metadata} from 'next'
import '../styles/globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,SOFT,wght@0,9..144,0..100,400;0,9..144,0..100,700;0,9..144,0..100,900;1,9..144,0..100,400;1,9..144,0..100,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
