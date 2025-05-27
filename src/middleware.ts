import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// export async function middleware(request: NextRequest) {
//   // Check cookie for optimistic redirects for protected routes
//   // Use getSession in your RSC to protect a route via SSR or useAuthenticate client side
//   const sessionCookie = getSessionCookie(request);

//   if (!sessionCookie) {
//     const redirectTo = request.nextUrl.pathname + request.nextUrl.search;
//     return NextResponse.redirect(
//       new URL(`/auth/sign-in?redirectTo=${redirectTo}`, request.url)
//     );
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|webp|jpg|jpeg|gif|svg)$).*)",
  ],
};
