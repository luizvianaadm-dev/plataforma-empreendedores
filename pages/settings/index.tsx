'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User, Mail, Lock, Bell, CreditCard, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { id: 'account', name: 'Conta', icon: User },
    { id: 'security', name: 'Segurança', icon: Lock },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'billing', name: 'Pagamento', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Plataforma de Empreendedores
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{session.user?.name || session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 transition"
          >
            ← Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Configurações</h1>
          <p className="text-gray-600 mt-2">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="col-span-12 md:col-span-3">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações da Conta</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        defaultValue={session.user?.name || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={session.user?.email || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Segurança</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                      <p className="text-gray-700">
                        Funcionalidade em desenvolvimento. Em breve você poderá alterar sua senha e configurar autenticação de dois fatores.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notificações</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                      <p className="text-gray-700">
                        Funcionalidade em desenvolvimento. Em breve você poderá configurar suas preferências de notificações.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Pagamento</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Plano Atual: Free</h3>
                          <p className="text-sm text-gray-600 mt-1">0 reais/mês</p>
                        </div>
                        <Link
                          href="/pricing"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Fazer Upgrade
                        </Link>
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                      <p className="text-gray-700">
                        Gestão completa de pagamentos em desenvolvimento.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
