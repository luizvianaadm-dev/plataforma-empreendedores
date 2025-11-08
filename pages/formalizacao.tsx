import Link from 'next/link';

export default function Formalizacao() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-2">
            ← Voltar para Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Formalização de Negócio</h1>
          <p className="text-gray-600 mt-2">Escolha a melhor opção para formalizar sua empresa</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefícios da Formalização */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que formalizar?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="font-semibold text-lg mb-2">Credibilidade</h3>
              <p className="text-gray-600">CNPJ próprio aumenta a confiança de clientes e fornecedores</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">🏦</div>
              <h3 className="font-semibold text-lg mb-2">Acesso a Crédito</h3>
              <p className="text-gray-600">Linhas de financiamento e empréstimos exclusivos para empresas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="font-semibold text-lg mb-2">Emissão de Notas</h3>
              <p className="text-gray-600">Possibilidade de emitir notas fiscais para seus clientes</p>
            </div>
          </div>
        </section>

        {/* Opções de Formalização */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Escolha sua modalidade</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card MEI */}
            <Link href="/mei">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">MEI - Microempreendedor Individual</h3>
                <p className="text-blue-50 mb-4">Ideal para quem trabalha sozinho ou com no máximo 1 funcionário</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Faturamento até R$ 81.000/ano</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Tributação fixa mensal baixa</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Processo 100% gratuito e online</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Abertura em até 24 horas</span>
                  </li>
                </ul>
                <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-center">
                  Abrir MEI →
                </div>
              </div>
            </Link>

            {/* Card CNPJ Completo */}
            <Link href="/cnpj">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🏢</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">CNPJ Completo</h3>
                <p className="text-purple-50 mb-4">Para empresas maiores com faturamento acima de R$ 81.000/ano</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Sem limite de faturamento</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Contratação ilimitada de funcionários</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Diversos regimes tributários</span>
                  </li>
                  <li className="text-white flex items-start gap-2">
                    <span>✓</span>
                    <span>Maior credibilidade no mercado</span>
                  </li>
                </ul>
                <div className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold text-center">
                  Consultar CNPJ →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Comparativo */}
        <section className="mt-12 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparativo Rápido</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4">Característica</th>
                  <th className="text-center py-3 px-4 bg-blue-50">MEI</th>
                  <th className="text-center py-3 px-4 bg-purple-50">CNPJ Completo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Faturamento Anual</td>
                  <td className="text-center py-3 px-4 bg-blue-50">Até R$ 81.000</td>
                  <td className="text-center py-3 px-4 bg-purple-50">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Funcionários</td>
                  <td className="text-center py-3 px-4 bg-blue-50">Máx. 1</td>
                  <td className="text-center py-3 px-4 bg-purple-50">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Custo de Abertura</td>
                  <td className="text-center py-3 px-4 bg-blue-50">Gratuito</td>
                  <td className="text-center py-3 px-4 bg-purple-50">R$ 500 - R$ 2.000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Impostos Mensais</td>
                  <td className="text-center py-3 px-4 bg-blue-50">~R$ 60-70</td>
                  <td className="text-center py-3 px-4 bg-purple-50">Variável</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Prazo de Abertura</td>
                  <td className="text-center py-3 px-4 bg-blue-50">24-48 horas</td>
                  <td className="text-center py-3 px-4 bg-purple-50">15-30 dias</td>
                </tr>
              </tbody>
            </table>
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
