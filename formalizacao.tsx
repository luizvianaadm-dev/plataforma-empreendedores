import Link from 'next/link'

export default function Formalizacao() {
  const opcoes = [
    {
      titulo: 'MEI - Microempreendedor Individual',
      descricao: 'Abertura simplificada para autônomos com faturamento até R$ 81 mil/ano',
      icone: '💼',
      link: '/mei',
      destaque: true
    },
    {
      titulo: 'CNPJ - Pessoa Jurídica',
      descricao: 'Guia completo para abertura de empresa (ME, EPP, LTDA)',
      icone: '🏢',
      link: '/cnpj',
      destaque: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            🚀 Plataforma Empreendedores
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Formalização Empresarial
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha a melhor opção para formalizar seu negócio no Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {opcoes.map((opcao) => (
            <Link
              key={opcao.titulo}
              href={opcao.link}
              className={`block bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                opcao.destaque ? 'border-4 border-indigo-500' : 'border border-gray-200'
              }`}
            >
              <div className="text-6xl mb-4">{opcao.icone}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {opcao.titulo}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {opcao.descricao}
              </p>
              {opcao.destaque && (
                <div className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Mais Popular
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📊 Por que formalizar?
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Emitir notas fiscais e crescer seu negócio legalmente</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Acesso a benefícios previdenciários (aposentadoria, auxílio-doença)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Facilidade para abrir conta bancária empresarial</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Participação em licitações e contratos com grandes empresas</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
