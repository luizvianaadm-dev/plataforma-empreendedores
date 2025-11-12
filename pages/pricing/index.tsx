'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  cta: string;
  highlight?: boolean;
}

export default function PricingPage() {
  const plans: Plan[] = [
    {
      name: 'Free',
      description: 'Ideal para começar a automatizar',
      price: 'R$ 0',
      period: '/mês',
      cta: 'Começar Grátis',
      features: [
        { name: '1 automação ativa', included: true },
        { name: 'Até 100 mensagens/mês', included: true },
        { name: 'Suporte por email', included: true },
        { name: 'Integrações básicas', included: true },
        { name: 'Automações avançadas', included: false },
        { name: 'Suporte prioritário', included: false },
        { name: 'API access', included: false },
      ],
    },
    {
      name: 'Pro',
      description: 'Para empresas em crescimento',
      price: 'R$ 149',
      period: '/mês',
      cta: 'Assinar Pro',
      highlight: true,
      features: [
        { name: '10 automações ativas', included: true },
        { name: 'Até 10.000 mensagens/mês', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'Todas as integrações', included: true },
        { name: 'Automações avançadas', included: true },
        { name: 'Relatórios detalhados', included: true },
        { name: 'API access', included: false },
      ],
    },
    {
      name: 'Enterprise',
      description: 'Soluções personalizadas',
      price: 'R$ 1.999',
      period: '/mês',
      cta: 'Falar com Vendas',
      features: [
        { name: 'Automações ilimitadas', included: true },
        { name: 'Mensagens ilimitadas', included: true },
        { name: 'Suporte dedicado 24/7', included: true },
        { name: 'Todas as integrações', included: true },
        { name: 'Automações avançadas', included: true },
        { name: 'Relatórios personalizados', included: true },
        { name: 'API access completo', included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Plataforma de Empreendedores
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal para Seu Negócio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando precisar de mais recursos
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                plan.highlight ? 'border-2 border-blue-600 scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-medium transition mb-8 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900 mb-4">Recursos inclusos:</p>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={feature.included ? 'text-gray-900' : 'text-gray-400'}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Posso mudar de plano a qualquer momento?
              </h4>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Como funciona a cobrança?
              </h4>
              <p className="text-gray-600">
                A cobrança é mensal e você pode cancelar a qualquer momento sem multas.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                O que acontece se eu exceder o limite de mensagens?
              </h4>
              <p className="text-gray-600">
                Suas automações serão pausadas até o próximo ciclo ou você pode fazer upgrade.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Vocês oferecem desconto anual?
              </h4>
              <p className="text-gray-600">
                Sim! Ao optar pelo plano anual, você economiza 2 meses de assinatura.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
