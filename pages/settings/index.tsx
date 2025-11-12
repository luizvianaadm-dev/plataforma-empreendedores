'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User, Mail, Lock, Bell, CreditCard, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Stub: Authentication temporarily disabled
const useSession = () => ({ data: { user: null }, status: 'unauthenticated' });const signOut = () => {};

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
    { id: 'account', label: 'Conta', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'billing', label: 'Cobrança', icon: CreditCard },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Configurações</h1>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-lg text-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{tab.label}</p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações da Conta</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={session?.user?.email || ''}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    defaultValue={session?.user?.name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Segurança</h2>
              <p className="text-gray-600">Gerenciar suas preferências de segurança aqui.</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notificações</h2>
              <p className="text-gray-600">Gerenciar suas preferências de notificações aqui.</p>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Cobrança</h2>
              <p className="text-gray-600">Gerenciar sua cobrança e informações de pagamento aqui.</p>
            </div>
          )}

          {activeTab === 'help' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ajuda</h2>
              <p className="text-gray-600">Entre em contato conosco para obter ajuda.</p>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut()}
          className="mt-8 w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
