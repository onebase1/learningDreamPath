import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/',                // Protected dashboard route
  '/courses(.*)',
  '/settings(.*)',
  '/credits(.*)'
]);

// Define routes that require active subscription
const requiresSubscription = createRouteMatcher([
  '/courses/premium(.*)',
  '/courses/mock-tests(.*)'
]);

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/landing',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/beta(.*)',
  '/waitlist(.*)',
  '/api/waitlist(.*)',
  '/api/webhook(.*)',
  '/legal/(.*)',
  '/about(.*)',
  '/contact(.*)',
  '/become-a-tutor(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  const url = new URL(req.url);
  
  if (url.pathname === '/' && !userId) {
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  if (isPublicRoute(req)) {
    if (userId && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (requiresSubscription(req)) {
      try {
        const subscription = await db.subscription.findUnique({
          where: { userId }
        });

        if (
          !subscription ||
          (subscription.status !== 'active' && subscription.status !== 'trialing') ||
          (subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) < new Date())
        ) {
          return NextResponse.redirect(new URL('/subscription', req.url));
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        return NextResponse.redirect(new URL('/error', req.url));
      }
    }

    // (Optional) Remove credit-based logic if not used any more
    // if (req.url.includes('/courses/')) { ... }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
