import './styles/bootstrap.min.css'
import './globals.css'
import { Toaster } from 'react-hot-toast';
import Script from 'next/script'

export const metadata = {
  title: 'Mac Studio — Portfolio',
  description: 'Designer & Developer crafting digital experiences',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Icon font CSS — plain link, fine in public/ */}
        <link rel="stylesheet" href="/bootstrap/icons/bootstrap-icons.min.css" />
      </head>
      <body>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
        {children}
      </body>
          <Script 
      src="/bootstrap/bootstrap.bundle.min.js" 
      strategy="afterInteractive" 
    />
    </html>
  )
}