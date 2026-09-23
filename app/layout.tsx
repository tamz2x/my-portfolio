import './styles/bootstrap.min.css'
import './globals.css'

import Script from 'next/script'

export const metadata = {
  title: 'My Portfolio',
  description: 'Modern portfolio built with Next.js and Bootstrap',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Icon font CSS — plain link, fine in public/ */}
        <link rel="stylesheet" href="/bootstrap/icons/bootstrap-icons.min.css" />
      </head>
      <body>
        {children}
        <Script src="/bootstrap/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}