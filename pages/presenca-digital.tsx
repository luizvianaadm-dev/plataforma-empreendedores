import Link from 'next/link';

export default function PresencaDigital() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-purple-600 hover:text-purple-800 mb-4 inline-flex items-center gap-2">
            ← Voltar para Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Presença Digital</h1>
          <p className="text-gray-600 mt-2">Construa e gerencie sua presença online de forma profissional</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefícios da Presença Digital */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que ter presença digital?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-semibold text-lg mb-2">Alcance Global</h3>
              <p className="text-gray-600">Atinja clientes em qualquer lugar, 24/7</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-semibold text-lg mb-2">Custos Menores</h3>
              <p className="text-gray-600">Marketing digital é mais barato que mídias tradicionais</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-2">Resultados Mensuráveis</h3>
              <p className="text-gray-600">Acompanhe cada visita, clique e conversão</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">❤️</div>
              <h3 className="font-semibold text-lg mb-2">Relacionamento</h3>
              <p className="text-gray-600">Interaja diretamente com seus clientes</p>
            </div>
          </div>
        </section>

        {/* Ferramentas de Presença Digital */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ferramentas Essenciais</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Criar Site */}
            <Link href="/criar-site">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Criar Site</h3>
                <p className="text-blue-50 mb-4">Crie seu próprio site profissional com templates prontos</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Templates profissionais</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Personalização completa</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Responsivo para mobile</span>
                  </li>
                </ul>
                <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-center">
                  Começar Agora →
                </div>
              </div>
            </Link>

            {/* Card Redes Sociais */}
            <Link href="/redes-sociais">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Redes Sociais</h3>
                <p className="text-pink-50 mb-4">Configure e otimize suas redes sociais</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Guias de configuração</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Dicas de conteúdo</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Estratégias de engajamento</span>
                  </li>
                </ul>
                <div className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold text-center">
                  Ver Guias →
                </div>
              </div>
            </Link>

            {/* Card Google Meu Negócio */}
            <Link href="/google-meu-negocio">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">📍</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Google Meu Negócio</h3>
                <p className="text-green-50 mb-4">Apareça no Google Maps e Buscas</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Cadastro passo a passo</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Otimização de perfil</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Gestão de avaliações</span>
                  </li>
                </ul>
                <div className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold text-center">
                  Configurar →
                </div>
              </div>
            </Link>

            {/* Card Email Marketing */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-xl shadow-xl opacity-60">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">📧</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Email Marketing</h3>
              <p className="text-orange-50 mb-4">Comunique-se diretamente com seus clientes</p>
              <div className="bg-white/30 text-white px-6 py-3 rounded-lg font-semibold text-center">
                Em Breve (SPRINT 4)
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 Plataforma Empreendedores - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
