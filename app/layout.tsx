import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'MACS Studio',
  description: 'Portfolio — Crafting digital experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Local Bootstrap CSS from /public/bootstrap/ */}
        <link 
          rel="stylesheet" 
          href="/bootstrap/bootstrap.min.css" 
        />
        {/* Bootstrap Icons */}
        <link 
          rel="stylesheet" 
          href="/bootstrap/icons/bootstrap-icons.min.css" 
        />
      </head>
      <body>
        {children}
        {/* Local Bootstrap JS for mobile toggle, dropdowns, etc */}
        <Script 
          src="/bootstrap/bootstrap.bundle.min.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  )
}