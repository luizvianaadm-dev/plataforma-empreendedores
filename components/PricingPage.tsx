'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { PricingPlan, StripeCheckoutResponse } from '@/lib/types/payment';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (planId: string) => void;
  isLoading: boolean;
}

function PricingCard({ plan, onSelectPlan, isLoading }: PricingCardProps) {
  const isPopular = plan.name === 'Profissional';

  return (
    <div className={`rounded-lg border-2 p-8 transition-all ${
      isPopular ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-4xl font-bold">R$ {(plan.price / 100).toFixed(2)}</span>
        <span className="text-gray-600 ml-2">/mês</span>
      </div>

      <ul className="space-y-3 mb-8 text-sm">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span className="mr-3 text-green-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan(plan.id)}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isPopular
            ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100'
        }`}
      >
        {isLoading ? 'Processando...' : 'Selecionar Plano'}
      </button>
    </div>
  );
}

export function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/payments/pricing');
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError('Erro ao carregar planos de preço');
        console.error(err);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricing_plan_id: planId }),
      });
      
      const data: StripeCheckoutResponse = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Erro ao processar pagamento');
      console.error(err);
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planos de Preço</h1>
          <p className="text-xl text-gray-600">Escolha o plano ideal para sua empresa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
