import Link from 'next/link'

export default function CNPJ() {
  const passos = [
    { titulo: '1. Defina o Tipo de Empresa', descricao: 'ME, EPP, LTDA - escolha conforme faturamento e sócios' },
    { titulo: '2. Reúna os Documentos', descricao: 'RG, CPF, comprovante de endereço, contrato social' },
    { titulo: '3. Registro na Junta Comercial', descricao: 'Registre na Junta Comercial do seu estado' },
    { titulo: '4. Obtenha o CNPJ na Receita Federal', descricao: 'Acesse o site da Receita Federal e faça o cadastro' },
    { titulo: '5. Inscrições Estadual e Municipal', descricao: 'Obtenha as licenças necessárias conforme sua atividade' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/formalizacao" className="text-indigo-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏢 Guia Completo CNPJ
          </h1>
          <p className="text-gray-600 mb-8">
            Passo a passo para abrir sua empresa com CNPJ
          </p>

          <div className="space-y-6">
            {passos.map((passo, i) => (
              <div key={i} className="border-l-4 border-indigo-500 pl-6 py-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {passo.titulo}
                </h3>
                <p className="text-gray-600">{passo.descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">💰 Custos Estimados</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Junta Comercial: R$ 200-500</li>
              <li>Contador (mensal): R$ 300-800</li>
              <li>Alvará de Funcionamento: R$ 100-300</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
