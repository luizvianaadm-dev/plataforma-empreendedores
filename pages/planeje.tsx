import Link from 'next/link';
import { useState } from 'react';

interface IntegrationStep {
  title: string;
  description: string;
  icon: string;
  status: 'pending' | 'connected';
}

export default function Planeje() {
  const [emailConnected, setEmailConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  const handleGmailConnect = () => {
    // Abre fluxo de autenticação OAuth do Gmail
    window.open('/api/auth/gmail', '_blank');
    setTimeout(() => setEmailConnected(true), 2000);
  };

  const handleWhatsAppConnect = () => {
    // Abre fluxo de conexão WhatsApp Business
    window.open('/api/auth/whatsapp', '_blank');
    setTimeout(() => setWhatsappConnected(true), 2000);
  };

  const integrations: IntegrationStep[] = [
    {
      title: 'Gmail',
      description: 'Sincronize seus emails e use templates para prospecção',
      icon: '📧',
      status: emailConnected ? 'connected' : 'pending'
    },
    {
      title: 'WhatsApp Business',
      description: 'Envie mensagens e gerencie conversas com clientes',
      icon: '💬',
      status: whatsappConnected ? 'connected' : 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-2">
            ← Voltar para Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Planeje</h1>
          <p className="text-gray-600 mt-2">Valide sua ideia, entenda seu mercado e construa um plano de negócios sólido</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Integrations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Integrações Disponíveis</h2>
          <p className="text-gray-600 mb-8">Conecte suas ferramentas favoritas para potencializar seu planejamento</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gmail Integration */}
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl mb-3">📧</div>
                  <h3 className="text-xl font-semibold text-gray-900">Gmail</h3>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  emailConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {emailConnected ? '✓ Conectado' : '○ Não conectado'}
                </span>
              </div>
              <p className="text-gray-600 mb-6">Sincronize seus emails, organize campanhas de prospecção e automatize templates</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Envio de campanhas em massa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Templates personalizáveis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Rastreamento de abertura e cliques</span>
                </div>
              </div>
              <button
                onClick={handleGmailConnect}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  emailConnected
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={emailConnected}
              >
                {emailConnected ? '✓ Gmail Conectado' : 'Conectar Gmail'}
              </button>
            </div>

            {/* WhatsApp Integration */}
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-xl font-semibold text-gray-900">WhatsApp Business</h3>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  whatsappConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {whatsappConnected ? '✓ Conectado' : '○ Não conectado'}
                </span>
              </div>
              <p className="text-gray-600 mb-6">Gerencie conversas de clientes, envie mensagens automáticas e crie chatbots</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Mensagens em massa personalizadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Automação de respostas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>✓</span>
                  <span>Gerenciamento de conversas</span>
                </div>
              </div>
              <button
                onClick={handleWhatsAppConnect}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  whatsappConnected
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={whatsappConnected}
              >
                {whatsappConnected ? '✓ WhatsApp Conectado' : 'Conectar WhatsApp'}
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que planejar?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clareza Estratégica</h3>
              <p className="text-gray-600">Defina objetivos claros e metas mensuráveis para seu negócio</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Executar com Confiança</h3>
              <p className="text-gray-600">Com um plano estruturado, tome decisões mais rápidas e assertivas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Meça o Progresso</h3>
              <p className="text-gray-600">Acompanhe KPIs e ajuste sua estratégia conforme necessário</p>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">IA Integrada para Planejar</h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">Planejamento com Perplexity AI</h3>
            <p className="text-blue-50 mb-6">Nossa plataforma integra Perplexity AI para ajudar você a validar ideias, analisar mercados e refinar seu plano de negócios em tempo real.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <span>Análise de mercado com dados atualizados</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <span>Validação de ideias de negócios</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <span>Sugestões personalizadas para seu setor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <span>Planos financeiros e de ação</span>
              </div>
            </div>
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Começar Planejamento →
            </button>
          </div>
        </section>

        {/* Tools Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ferramentas de Planejamento</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plano de Negócios</h3>
              <p className="text-gray-600 mb-4">Estruture um plano executivo, análise SWOT e projeções financeiras</p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition">Criar Plano →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pesquisa de Mercado</h3>
              <p className="text-gray-600 mb-4">Entenda seu mercado-alvo, concorrência e oportunidades</p>
              <button className="text-purple-600 font-semibold hover:text-purple-800 transition">Pesquisar Mercado →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Validação de Ideias</h3>
              <p className="text-gray-600 mb-4">Teste sua ideia com especialistas e obtenha feedback valioso</p>
              <button className="text-green-600 font-semibold hover:text-green-800 transition">Validar Ideia →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Roadmap de Ação</h3>
              <p className="text-gray-600 mb-4">Defina marcos, milestones e cronograma de execução</p>
              <button className="text-orange-600 font-semibold hover:text-orange-800 transition">Criar Roadmap →</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
