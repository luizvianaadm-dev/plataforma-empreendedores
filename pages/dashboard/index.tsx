'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Plus, Settings, CreditCard, LogOut, Zap } from 'lucide-react';
import Link from 'next/link';
import OrganizationSwitcher from '../../components/OrganizationSwitcher';
import { useOrganization } from '../../lib/contexts/OrganizationContext';

// Stub: Authentication temporarily disabled
const useSession = () => ({ data: { user: null }, status: 'unauthenticated' }); const signOut = () => {};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { organizations, currentOrganization, switchOrganization } = useOrganization();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Bem-vindo de volta!</p>
          </div>
          <div className="flex items-center gap-4">
<OrganizationSwitcher organizations={[]} currentOrganization={{ id: '1', name: 'Default', slug: 'default', plan: 'free', subscription_status: 'active', subscription_id: '', subscription_current_period_end: new Date(), max_automations: 10, max_messages_per_month: 5000, messages_used_this_month: 0, created_at: new Date(), updated_at: new Date() }} onSwitch={() => {}} />            <Link
              href="/settings"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="h-6 w-6" />
            </Link>
            <button
              onClick={() => signOut()}
              className="p-2 text-gray-600 hover:bg-red-100 rounded-lg"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Automações Ativas</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Mensagens</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Organizações</p>
                <p className="text-3xl font-bold text-gray-900">{organizations?.length || 0}</p>
              </div>
              <LayoutDashboard className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Plano</p>
                <p className="text-3xl font-bold text-gray-900">Free</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/automations/new"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Criar Nova Automação</span>
              </Link>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>Ver Mensagens</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recursos</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <CreditCard className="h-5 w-5 text-orange-600" />
                <span>Plano e Cobrança</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Configurações</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
          <p className="text-gray-600">Nenhuma atividade recente</p>
        </div>
      </main>
    </div>
  );
}
