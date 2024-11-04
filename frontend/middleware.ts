import { NextRequest, NextResponse } from 'next/server'

function doesPathStartWithAny(path: string, substrings: string[]) {
  return substrings.some((substring) => path.startsWith(substring))
}
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  if (
    doesPathStartWithAny(pathname, [
      '/api',
      '/_next/static',
      '/_next/image',
      '/favicon.ico',
      '/register',
      '/mockServiceWorker.js',
      '/manifest.json',
      '/sw.js',
      '/images',
    ])
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/test/register', req.url))
}
