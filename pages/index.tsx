import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

interface Empresa {
  id: string
  nome: string
  descricao: string
}

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])

  async function carregarEmpresas() {
    const { data } = await supabase.from('empresas').select('*')
    setEmpresas(data || [])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-4">Seu Caminho para o Sucesso Empresarial</h2>
          <p className="text-xl text-blue-100 mb-8">
             <div className="flex gap-4 justify-center mt-8">
                <Link href="/login">
                   <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                      Entrar
                      </button>
                   </Link>
                <Link href="/signup">
                   <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer border-2 border-white">
                      Criar Conta
                      </button>
                   </Link>
                </div>
            Tudo que você precisa em um único lugar: Planejamento, Formalização, Presença Digital, Gestão e Crescimento
          </p>
        </div>
      </section>

      {/* Cards Section - TODAS AS 5 ETAPAS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">Como funciona</h3>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Card 1 - Planeje */}
            <Link href="/planeje">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-blue-500 cursor-pointer">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                  <div className="text-5xl mb-4">💡</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Planeje</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Valide sua ideia, entenda seu mercado e construa um plano de negócios sólido com ferramentas profissionais
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2 - Formalize */}
            <Link href="/formalizacao">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-green-500 cursor-pointer">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8">
                  <div className="text-5xl mb-4">📄</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Formalize</h4>
                  <p className="text-gray-700 leading-relaxed">
                    MEI, CNPJ, certificados digitais - organize toda a documentação legal do seu negócio
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3 - Presenca Digital */}
            <Link href="/presenca-digital">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-purple-500 cursor-pointer">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8">
                  <div className="text-5xl mb-4">🌐</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Presença Digital</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Crie sua presença online: site, redes sociais, Google Meu Negócio e muito mais
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 4 - Gestao Operacional (NEW) */}
            <Link href="/gestao-operacional">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-yellow-500 cursor-pointer">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8">
                  <div className="text-5xl mb-4">⚙️</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Gestão Operacional</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Controle estoque, finanças, RH e operações com dashboards e KPIs em tempo real
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 5 - Crescimento & Expansao (NEW) */}
            <Link href="/crescimento-expansao">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-red-500 cursor-pointer">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-8">
                  <div className="text-5xl mb-4">🚀</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Crescimento & Expansão</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Planeje sua expansão com KPIs, iniciativas, metas e análise de riscos estratégicos
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Empresas Cadastradas Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl p-12 border-l-4 border-indigo-600">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">Empresas Cadastradas</h3>
            <p className="text-gray-600 mb-8 text-lg">Conheça empreendedores que já transformaram suas ideias em realidade</p>

            <Link href="/inicio-jornada">
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mb-8 flex items-center gap-2 cursor-pointer">
                <span>📊</span> Iniciar Nova Jornada
              </button>
            </Link>

            {empresas.length > 0 && (
              <div className="grid gap-4">
                {empresas.map((empresa) => (
                  <div
                    key={empresa.id}
                    className="border-l-4 border-indigo-400 bg-indigo-50 rounded-lg p-6 hover:bg-indigo-100 transition-colors duration-200"
                  >
                    <h4 className="font-bold text-lg text-indigo-900">{empresa.nome}</h4>
                    <p className="text-indigo-700 mt-2">{empresa.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-4xl font-bold mb-4">Pronto para Transformar Sua Ideia?</h3>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Junte-se a milhares de empreendedores que já transformaram suas ideias em negócios de sucesso
          </p>
          <Link href="/inicio-jornada">
            <button className="bg-white text-indigo-600 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              Começar Agora
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
