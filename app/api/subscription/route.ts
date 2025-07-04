// File: app/api/subscription/route.ts
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { planId } = await req.json();
    const plans = require('@/config/subscription').PLANS;
    const plan = plans[planId];
    
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    
    const baseUrl = process.env.BASE_URL || process.env.NEXTAUTH_URL;
    
    // For free plan: update subscription record directly
    if (plan.price === 0) {
      await db.subscription.upsert({
        where: { userId },
        update: {
          planId: 'FREE',
          status: 'active',
          stripeSubscriptionId: null, // Explicitly set to null for free plan
        },
        create: {
          userId,
          planId: 'FREE',
          status: 'active',
          stripeSubscriptionId: null,
          currentPeriodStart: new Date(),
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
        },
      });
      return NextResponse.json({ url: `${baseUrl}/dashboard` });
    }
    
    // Verify Stripe price ID exists
    if (!plan.stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    // For paid plans: create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscription`,
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Subscription API error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
