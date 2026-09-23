import { NextRequest } from 'next/server'

export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  // Same-origin requests (no Origin header) are fine
  if (!origin) return true

  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
  ].filter(Boolean)

  return allowed.some((a) => origin === a)
}