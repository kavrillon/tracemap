import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/libs/session';

const PUBLIC_ROUTES = ['/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // protected by design, whitelisting for public routes
  const isProtectedRoute = !PUBLIC_ROUTES.includes(path);

  const session = await getSession();
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
};
