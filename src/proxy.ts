import { type NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_KEY } from '@/shared/auth/constants';
import { isPublicPath } from '@/shared/auth/paths';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get(AUTH_COOKIE_KEY)?.value);

  if (isPublicPath(pathname)) {
    if (
      hasToken &&
      (pathname.startsWith('/login') || pathname.startsWith('/signup'))
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!hasToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
