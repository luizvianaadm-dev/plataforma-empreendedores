// SPRINT 10: INTEGRACAO PAGAMENTOS - Type Definitions

/**
 * Pricing Plan Interface
 * Define a estrutura de planos de preco disponíveis na plataforma
 */
export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_period: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Payment Interface
 * Define a estrutura de transacoes de pagamento
 */
export interface Payment {
  id: number;
  payment_intent_id: string;
  user_id: string;
  pricing_plan_id: number;
  amount: number;
  currency: string;
  payment_status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  payment_method: 'stripe' | 'pix';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Subscription Interface  
 * Define a estrutura de assinaturas recorrentes
 */
export interface Subscription {
  id: number;
  user_id: string;
  pricing_plan_id: number;
  status: 'active' | 'paused' | 'cancelled';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Stripe Checkout Session Response
 */
export interface StripeCheckoutResponse {
  success: boolean;
  session_id?: string;
  error?: string;
}

/**
 * Webhook Event
 */
export interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
}
