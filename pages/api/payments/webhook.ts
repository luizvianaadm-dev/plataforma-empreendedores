import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Payment, Subscription } from '@/lib/types/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  try {
    // Verify Stripe webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const { user_id, pricing_plan_id } = session.metadata;
  
  await supabase.from('payments').insert([
    {
      usuario_id: parseInt(user_id),
      plan_id: pricing_plan_id,
      stripe_payment_intent_id: session.payment_intent,
      amount: session.amount_total / 100,
      currency: session.currency.toUpperCase(),
      payment_status: 'succeeded',
      payment_method: 'stripe',
    },
  ]);
}

async function handleSubscriptionCreated(subscription: any) {
  const { user_id } = subscription.metadata;
  
  await supabase.from('subscriptions').insert([
    {
      usuario_id: parseInt(user_id),
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      next_billing_date: new Date(subscription.current_period_end * 1000).toISOString(),
    },
  ]);
}

async function handleSubscriptionUpdated(subscription: any) {
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      next_billing_date: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  const subscription_id = invoice.subscription;
  
  await supabase
    .from('payments')
    .insert([
      {
        stripe_payment_intent_id: invoice.payment_intent,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency.toUpperCase(),
        payment_status: 'succeeded',
        payment_method: 'stripe',
      },
    ]);
}
