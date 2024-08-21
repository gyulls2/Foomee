// export { auth as middleware } from '@/auth';

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('미들웨어 호출', request.nextUrl.href);

  const session = await auth();
  if (!session?.user) {
    // 로그인 되지 않은 경우
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }
}

export const config = {
  matcher: [
    '/signup/:path+',
    '/profile/:path*',
    '/analysis/:path*',
    '/chart/:path*',
    '/home/:path*',
    '/meals/:path*',
    '/nutrition/:path*',
    '/search/:path*',
  ],
  // '/((?!/|api|_next/static|_next/image|favicon.ico|login|signup$|images).*)',
};
