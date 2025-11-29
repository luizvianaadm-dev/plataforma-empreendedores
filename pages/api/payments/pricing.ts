import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { PricingPlan } from '@/lib/types/payment';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Fetch pricing plans from Supabase
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      throw error;
    }

    // Transform to match PricingPlan type
    const plans: PricingPlan[] = (data || []).map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      features: plan.features || [],
      stripe_price_id: plan.stripe_price_id,
      created_at: plan.created_at,
      updated_at: plan.updated_at,
    }));

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}
