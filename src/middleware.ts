import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { languages } from './config/languages';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /blog, /about...)
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = Object.keys(languages).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
  const defaultLocale = locale in languages ? locale : 'en';

  // e.g. incoming request is /blog
  // The new URL is now /en/blog
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
