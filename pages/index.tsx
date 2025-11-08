import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [empresas, setEmpresas] = useState<any[][])

  async function carregarEmpresas() {
    const { data } = await supabase.from('empresas').select('*')
    setEmpresas(data || [])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-indigo-600">🚀 Plataforma Empreendedores</h1>
          <p className="text-gray-600 mt-1">Transforme sua ideia em negócio de sucesso</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Seu Caminho para o Sucesso Empresarial
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Planejamento, Formalização, Presença Digital, Gestão e Crescimento - tudo em um só lugar
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Planejamento</h3>
            <p className="text-gray-600">
              Canvas, análise de mercado, público-alvo e proposta de valor estruturada
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Formalização</h3>
            <p className="text-gray-600">
              CNPJ, MEI, contrato social e todas as documentações necessárias
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Presença Digital</h3>
            <p className="text-gray-600">
              Site, redes sociais, marketing digital e estratégias de crescimento
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Empresas Cadastradas</h3>
          <button
            onClick={carregarEmpresas}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-6"
          >
            Carregar Empresas
          </button>

          <div className="space-y-4">
            {empresas.map((empresa) => (
              <div key={empresa.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-lg text-gray-800">{empresa.nome}</h4>
                <p className="text-gray-600">{empresa.descricao}</p>
                <span className="text-sm text-gray-500">Criada em: {new Date(empresa.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
            ))}
          </div>

          {empresas.length === 0 && (
            <p className="text-gray-500 text-center py-8">Nenhuma empresa cadastrada ainda. Clique em Carregar Empresas!</p>
          )}
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Plataforma Empreendedores - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
