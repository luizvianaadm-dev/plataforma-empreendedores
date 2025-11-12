import Link from 'next/link';

export default function Planeje() {
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
        {/* Secção de Beneficios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que planejar?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🎡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clareza Estratégica</h3>
              <p className="text-gray-600">Defina objetivos claros e metas mensuráveis para seu negócio</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🏃</div>
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

        {/* AI Assistant */}
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

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ferramentas de Planejamento</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plano de Negócios</h3>
              <p className="text-gray-600 mb-4">Estruture um plano executivo, análise SWOT e projções financeiras</p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition">Criar Plano →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pesquisa de Mercado</h3>
              <p className="text-gray-600 mb-4">Entenda seu mercado-alvo, concorrênc ia e oportunidades</p>
              <button className="text-purple-600 font-semibold hover:text-purple-800 transition">Pesquisar Mercado →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Validação de Ideias</h3>
              <p className="text-gray-600 mb-4">Teste sua ideia com especialistas e obtenha feedback valioso</p>
              <button className="text-green-600 font-semibold hover:text-green-800 transition">Validar Ideia →</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
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
