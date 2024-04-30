import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';
import { authMiddleware } from '@clerk/nextjs';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default authMiddleware({
  // For some reason, publicRoutes = ['/'] doesn't work
  publicRoutes: (req: NextRequest) => req.nextUrl.pathname === '/',

  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // eslint-disable-next-line consistent-return
  afterAuth(auth, req, _res) {
    // Handle users who aren't authenticated
    /* if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    } */

    // Redirect logged-in users to /dashboard when they visit /
    if (auth.userId && req.nextUrl.pathname === '/') {
      const orgSelection = new URL('/dashboard', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
