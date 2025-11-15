import Link from 'next/link';
import { useState } from 'react';

interface Iniciativa {
  id: string;
  titulo: string;
  descricao: string;
  status: 'planejamento' | 'execucao' | 'concluida';
  progresso: number;
  dataInicio: string;
}

export default function CrescimentoExpansao() {
  const [iniciativas, setIniciativas] = useState<Iniciativa[]>([
    {
      id: '1',
      titulo: 'Expansao para nova filial',
      descricao: 'Abertura de unidade em novo bairro',
      status: 'execucao',
      progresso: 65,
      dataInicio: '2024-10-01',
    },
    {
      id: '2',
      titulo: 'Desenvolvimento de novo produto',
      descricao: 'Crema premium para mercado premium',
      status: 'planejamento',
      progresso: 30,
      dataInicio: '2024-11-15',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planejamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'execucao':
        return 'bg-blue-100 text-blue-800';
      case 'concluida':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progresso: number) => {
    if (progresso >= 75) return 'bg-green-500';
    if (progresso >= 50) return 'bg-blue-500';
    if (progresso >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Crescimento & Expansao</h1>
          <p className="text-gray-600 text-sm mt-1">Etapa 5 - Planejamento estrategico de crescimento</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <p className="text-gray-600 text-sm">Crescimento Minimo</p>
            <p className="text-3xl font-bold text-green-600 mt-2">18%</p>
            <p className="text-gray-500 text-xs mt-2">Comparado ao ano anterior</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <p className="text-gray-600 text-sm">Novos Mercados</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
            <p className="text-gray-500 text-xs mt-2">Oportunidades identificadas</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
            <p className="text-gray-600 text-sm">Iniciativas Ativas</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{iniciativas.length}</p>
            <p className="text-gray-500 text-xs mt-2">Em andamento</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
            <p className="text-gray-600 text-sm">Investimento Previsto</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">R$ 150k</p>
            <p className="text-gray-500 text-xs mt-2">2024-2025</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Iniciativas de Crescimento</h2>

          {iniciativas.map((iniciativa) => (
            <div key={iniciativa.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{iniciativa.titulo}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(iniciativa.status)
                    }`}>
                      {iniciativa.status.charAt(0).toUpperCase() + iniciativa.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{iniciativa.descricao}</p>
                  <p className="text-gray-500 text-xs mt-2">Inicio: {new Date(iniciativa.dataInicio).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">Progresso</p>
                  <p className="text-sm font-bold text-gray-900">{iniciativa.progresso}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(iniciativa.progresso)}`}
                    style={{ width: `${iniciativa.progresso}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Editar
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-900 text-sm rounded hover:bg-gray-300">
                  Detalhes
                </button>
              </div>
            </div>
          ))}

          <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
            <p className="text-gray-600 font-medium text-center">+ Adicionar Nova Iniciativa</p>
          </button>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Metas de Crescimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Curto Prazo (6 meses)</h3>
              <ul className="space-y-3">
                {[
                  'Aumentar receita em 15%',
                  'Abrir 1 nova filial',
                  'Expandir catalogo de produtos',
                  'Atingir 5.000 clientes ativos',
                ].map((meta, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <input type="checkbox" className="w-4 h-4" defaultChecked={idx < 2} />
                    <span>{meta}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Medio Prazo (12 meses)</h3>
              <ul className="space-y-3">
                {[
                  'Dobrar a receita',
                  'Expandir para 3 novos segmentos',
                  'Implementar sistema ERP',
                  'Atingir 15.000 clientes ativos',
                ].map((meta, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Analise de Riscos</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {[
                { risk: 'Concorrencia acirrada', impacto: 'Alto', mitigation: 'Diferenciar marca e atender segmento premium' },
                { risk: 'Falta de capital', impacto: 'Medio', mitigation: 'Procurar financiamento e PJ' },
                { risk: 'Mao de obra', impacto: 'Medio', mitigation: 'Planejar recrutamento com antecedencia' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.risk}</p>
                    <p className="text-sm text-gray-600 mt-1">Mitigacao: {item.mitigation}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    item.impacto === 'Alto' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.impacto}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
