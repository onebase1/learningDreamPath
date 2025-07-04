// File: app/api/webhook/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';


export async function POST(req: Request) {
  // Add detailed logging
  console.log('Webhook received at:', new Date().toISOString());
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error('Production Error: CLERK_WEBHOOK_SECRET is not set');
    return new Response('Configuration Error', { status: 500 });
  }

  // Verify headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers:', { svix_id, svix_timestamp, svix_signature });
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error('Error parsing request body:', err);
    return new Response('Error parsing request body', { status: 400 });
  }

  // Verify the webhook
  let evt: WebhookEvent;
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  const eventType = evt.type;
  console.log('Event type:', eventType);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;
    
    console.log('Processing user data:', {
      id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      image: image_url
    });

    try {
      const email = email_addresses?.[0]?.email_address;
      if (!email) {
        console.error('No email address found in user data');
        return new Response('No email address found', { status: 400 });
      }

      const name = `${first_name || ''} ${last_name || ''}`.trim();
      
      // Upsert user record.
      await db.user.upsert({
        where: { id },
        create: {
          id,
          email,
          name,
          image: image_url,
        },
        update: {
          email,
          name,
          image: image_url,
        },
      });

      // Upsert subscription record: if not present, default to the FREE plan.
      await db.subscription.upsert({
        where: { userId: id },
        update: {},
        create: {
          userId: id,
          status: 'active', // or "trialing" if you prefer
          planId: 'free',
          stripeSubscriptionId: null, // For FREE, there is no Stripe subscription id.
          currentPeriodStart: new Date(),
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
        },
      });

      console.log('User and default subscription synchronized successfully');
      return new Response('User synchronized', { status: 200 });
    } catch (error: any) {
      console.error('Database error:', error);
      return new Response(`Database error: ${error.message}`, { status: 500 });
    }
  }

  console.log('Webhook processed successfully');
  return new Response('Webhook processed', { status: 200 });
}
