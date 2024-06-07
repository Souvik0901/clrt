import { NextResponse,NextRequest, NextFetchEvent } from 'next/server';

export function middleware(request: NextRequest,event: NextFetchEvent) {
  let cookie = request.cookies.get('token')
  if(!cookie){
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`)
  }
}

export const config = {
  matcher: ['/dashboard','/mycourse','/earning','/studentslist','/orderslist','/editprofile'],
}