import Link from 'next/link';
import { useState } from 'react';

interface TabInfo {
  id: string;
  label: string;
  icon: string;
}

const tabs: TabInfo[] = [
  { id: 'estoque', label: 'Estoque', icon: '📦' },
  { id: 'financeiro', label: 'Financeiro', icon: '💰' },
  { id: 'rh', label: 'RH', icon: '👥' },
  { id: 'operacoes', label: 'Operacoes', icon: '⚙️' },
];

export default function GestaoOperacional() {
  const [activeTab, setActiveTab] = useState('estoque');

  const renderContent = () => {
    switch (activeTab) {
      case 'estoque':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestao de Estoque</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Produtos em Estoque</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">1.250</p>
                <p className="text-gray-500 text-xs mt-2">Itens totais</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <p className="text-gray-600 text-sm">Produtos com Baixa</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">45</p>
                <p className="text-gray-500 text-xs mt-2">Atencao necessaria</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Valor Total</p>
                <p className="text-3xl font-bold text-green-600 mt-2">R$ 89.500</p>
                <p className="text-gray-500 text-xs mt-2">Em estoque</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ultimas Movimentacoes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Entrada - Produto XYZ</p>
                    <p className="text-sm text-gray-600">+500 unidades</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Entrada</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Saida - Venda Cliente ABC</p>
                    <p className="text-sm text-gray-600">-150 unidades</p>
                  </div>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm">Saida</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'financeiro':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestao Financeira</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Contas a Receber</p>
                <p className="text-3xl font-bold text-green-600 mt-2">R$ 45.320</p>
                <p className="text-gray-500 text-xs mt-2">Proximos 30 dias</p>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                <p className="text-gray-600 text-sm">Contas a Pagar</p>
                <p className="text-3xl font-bold text-red-600 mt-2">R$ 28.750</p>
                <p className="text-gray-500 text-xs mt-2">Proximos 30 dias</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Saldo Liquido</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">R$ 16.570</p>
                <p className="text-gray-500 text-xs mt-2">Situacao atual</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fluxo de Caixa (Proximos 30 dias)</h3>
              <div className="space-y-3">
                {['Dia 5', 'Dia 10', 'Dia 15', 'Dia 20'].map((dia) => (
                  <div key={dia} className="flex justify-between items-center py-2 border-b">
                    <p className="text-gray-700">{dia}</p>
                    <p className="font-bold text-green-600">+R$ 5.000</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'rh':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestao de RH</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm">Colaboradores Ativos</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
                <p className="text-gray-500 text-xs mt-2">Equipe total</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Folha de Pagamento</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">R$ 48.000</p>
                <p className="text-gray-500 text-xs mt-2">Mes atual</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6 border-l-4 border-pink-500">
                <p className="text-gray-600 text-sm">Custo Medio por Func.</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">R$ 4.000</p>
                <p className="text-gray-500 text-xs mt-2">Media mensal</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Equipe</h3>
              <div className="space-y-3">
                {['Joao Silva - Gerente', 'Maria Santos - Vendedora', 'Pedro Costa - Operacional', 'Ana Oliveira - Admin'].map((name) => (
                  <div key={name} className="flex justify-between items-center py-2 border-b">
                    <p className="text-gray-700">{name}</p>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Ativo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'operacoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operacoes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500">
                <p className="text-gray-600 text-sm">Tarefas Pendentes</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">8</p>
                <p className="text-gray-500 text-xs mt-2">Aguardando conclusao</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-6 border-l-4 border-teal-500">
                <p className="text-gray-600 text-sm">Tarefas Concluidas (Mes)</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">24</p>
                <p className="text-gray-500 text-xs mt-2">Cumprimento: 75%</p>
              </div>
              <div className="bg-cyan-50 rounded-lg p-6 border-l-4 border-cyan-500">
                <p className="text-gray-600 text-sm">Processos Ativos</p>
                <p className="text-3xl font-bold text-cyan-600 mt-2">5</p>
                <p className="text-gray-500 text-xs mt-2">Em desenvolvimento</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tarefas Prioritarias</h3>
              <div className="space-y-3">
                {['Revisar contrato com Cliente X', 'Implementar novo processo de vendas', 'Preparar relatorio mensal', 'Reuniao com fornecedores'].map((task, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <p className="text-gray-700">{task}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">Importante</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                Voltar ao Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Gestao Operacional</h1>
              <p className="text-gray-600 text-sm mt-1">Etapa 4 - Gerenciamento completo das operacoes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
}
