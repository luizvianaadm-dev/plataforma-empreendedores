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
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seu Caminho para o Sucesso Empresarial
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Planejamento, Formalização, Presença Digital, Gestão e Crescimento - tudo em um só lugar
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">💡 Planeje</h3>
              <p className="text-gray-700">
                Valide sua ideia, entenda seu mercado e construa um plano de negócios sólido
              </p>
            </div>

            <Link href="/formalizacao">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                <h3 className="text-2xl font-bold text-indigo-600 mb-3">📄 Formalize</h3>
                <p className="text-gray-700">
                  MEI, CNPJ, certificados digitais - organize toda a documentação legal do seu negócio
                </p>
              </div>
            </Link>

            <Link href="/presenca-digital">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                <h3 className="text-2xl font-bold text-indigo-600 mb-3">🌐 Presença Digital</h3>
                <p className="text-gray-700">
                  Crie sua presença online: site, redes sociais, Google Meu Negócio e muito mais
                </p>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Empresas Cadastradas</h3>
            <button
              onClick={carregarEmpresas}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-6"
            >
              Carregar Empresas
            </button>
            <div className="grid gap-4">
              {empresas.map((empresa) => (
                <div key={empresa.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <h4 className="font-bold text-lg text-gray-800">{empresa.nome}</h4>
                  <p className="text-gray-600">{empresa.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="text-center bg-indigo-600 text-white rounded-lg shadow-xl p-12">
            <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-xl mb-6">Junte-se a milhares de empreendedores que já transformaram suas ideias em realidade</p>
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              Começar Agora
            </button>
          </section>
        </div>
      </section>
    </>
  )
}
