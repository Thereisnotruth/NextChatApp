import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  console.log(req.nextUrl)

  return NextResponse.next()
}
