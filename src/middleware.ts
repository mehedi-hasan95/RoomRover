import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  apiPaymentPrefix,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  hotelRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isHotelRoute = nextUrl.pathname.startsWith(hotelRoutes);
  const isApiPaymentRoute = nextUrl.pathname.startsWith(apiPaymentPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //   User allow to login or register API access
  if (isApiAuthRoute) {
    return null;
  }

  // Hotel and single hotel page
  if (isHotelRoute) {
    return null;
  }
  //   User allow to login or register API access
  if (isApiPaymentRoute) {
    return null;
  }

  //   User allow to login or register page. If login redirect to default page
  if (isAuthRoute) {
    if (isLogIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //   Logout user can't visit the spesific page
  if (!isLogIn && !isPublicRoute) {
    // User trying to visite procected route redirect to login after logit redirect the previous page
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // The route
    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
