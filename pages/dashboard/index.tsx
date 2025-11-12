'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Plus, Settings, CreditCard, LogOut, Zap } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Plataforma de Empreendedores</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.user?.name || session.user?.email}</p>
                <p className="text-xs text-gray-500">Plano: Free</p>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo, {session.user?.name?.split(' ')[0] || 'Empreendedor'}!</h2>
          <p className="text-blue-100">Comece a automatizar seu negócio com IA agora mesmo</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Automações Ativas</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <Zap className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mensagens Enviadas</p>
                <p className="text-3xl font-bold text-gray-900">0 / 100</p>
              </div>
              <div className="text-blue-600">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Plano Atual</p>
                <p className="text-2xl font-bold text-gray-900">Free</p>
              </div>
              <CreditCard className="h-12 w-12 text-blue-600" />
            </div>
            <Link 
              href="/pricing" 
              className="mt-3 block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Fazer upgrade →
            </Link>
          </div>
        </div>

        {/* Automations Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Minhas Automações</h3>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <Plus className="h-5 w-5" />
                <span>Criar Nova Automação</span>
              </button>
            </div>
          </div>
          <div className="p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="bg-gray-100 rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-12 w-12 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma automação criada</h4>
              <p className="text-gray-600 mb-6">
                Crie sua primeira automação para começar a economizar tempo e aumentar suas vendas.
              </p>
              <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <Plus className="h-5 w-5" />
                <span>Criar Primeira Automação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/settings" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Configurações</h4>
                <p className="text-sm text-gray-600">Gerencie sua conta e preferências</p>
              </div>
            </div>
          </Link>
          <Link href="/pricing" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-lg p-3">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Planos e Pagamento</h4>
                <p className="text-sm text-gray-600">Faça upgrade para desbloquear mais recursos</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
