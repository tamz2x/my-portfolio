import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { ratelimit } from '@/lib/ratelimit'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const { pathname } = req.nextUrl

  // ---- Rate limiting ----
  const shouldRateLimit =
    pathname.startsWith('/api') ||
    pathname === '/admin/login'

  if (shouldRateLimit) {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'anonymous'

    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    if (!success) {
      return new NextResponse('Too many requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      })
    }
  }

  // ---- Auth gate for /admin ----
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) =>
          list.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !user
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}