import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Sensitive reconnaissance paths and backup dump file extensions
const BLOCKED_RECON_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/\.aws/i,
  /^\/\.ssh/i,
  /\.(bak|swp|zip|tar|gz|tar\.gz|sql|log|pem|key|crt)$/i,
];

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Enforces HTTPS redirects in production, blocks sensitive file probing, and injects security headers
 */
export function proxy(request: NextRequest) {
  const { host, pathname, search } = request.nextUrl;
  const forwardedProto = request.headers.get('x-forwarded-proto');

  // 1. Block reconnaissance requests for hidden dotfiles, backup files, and database dumps
  if (BLOCKED_RECON_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 2. Enforce HTTPS in production environments
  if (
    process.env.NODE_ENV === 'production' &&
    forwardedProto &&
    forwardedProto !== 'https'
  ) {
    const httpsUrl = `https://${host}${pathname}${search}`;
    return NextResponse.redirect(httpsUrl, 301);
  }

  const response = NextResponse.next();

  // Force HTTPS Transport Security header
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // MIME type sniffing protection
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Anti-clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
