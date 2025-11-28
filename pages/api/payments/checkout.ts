import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PricingPlan, StripeCheckoutResponse } from '@/lib/types/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function POST(req: NextRequest): Promise<NextResponse<StripeCheckoutResponse>> {
  try {
    const { pricing_plan_id, user_id } = await req.json();

    // Validar entrada
    if (!pricing_plan_id || !user_id) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Buscar plano de preco
    const { data: plan, error: planError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('id', pricing_plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ success: false, error: 'Pricing plan not found' }, { status: 404 });
    }

    // Criar sessao Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: Math.round(plan.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: undefined,
      metadata: {
        user_id,
        pricing_plan_id,
      },
    });

    // Registrar tentativa de pagamento
    const { error: insertError } = await supabase.from('payments').insert([
      {
        payment_intent_id: session.id,
        user_id,
        pricing_plan_id,
        amount: plan.price,
        currency: plan.currency,
        payment_status: 'pending',
        payment_method: 'stripe',
        metadata: { session_id: session.id },
      },
    ]);

    if (insertError) {
      return NextResponse.json({ success: false, error: 'Failed to create payment record' }, { status: 500 });
    }

    return NextResponse.json({ success: true, session_id: session.id });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
