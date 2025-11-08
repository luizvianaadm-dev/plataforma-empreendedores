import { useState } from 'react'
import Link from 'next/link'
import { templatesSite, getCoresPorCategoria } from '../lib/templatesSite'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CriarSite() {
  const [etapa, setEtapa] = useState(1)
  const [templateSelecionado, setTemplateSelecionado] = useState('')
  const [formData, setFormData] = useState({
    nome_site: '',
    descricao: '',
    categoria: 'ecommerce',
    cor_primaria: '#3b82f6',
    cor_secundaria: '#8b5cf6',
    dominio_desejado: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setMensagem('')

    try {
      const { data, error } = await supabase
        .from('sites')
        .insert([{
          nome_site: formData.nome_site,
          descricao: formData.descricao,
          template_id: templateSelecionado,
          categoria: formData.categoria,
          cor_primaria: formData.cor_primaria,
          cor_secundaria: formData.cor_secundaria,
          dominio_desejado: formData.dominio_desejado,
          status: 'rascunho'
        }])

      if (error) throw error

      setMensagem('✅ Site criado com sucesso! Entraremos em contato em breve.')
      setTimeout(() => {
        window.location.href = '/presenca-digital'
      }, 2000)
    } catch (error) {
      setMensagem('❌ Erro ao criar site. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/presenca-digital" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            ← Voltar para Presença Digital
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌐 Criar Seu Site</h1>
          <p className="text-xl text-gray-600">Escolha um template e personalize seu site profissional</p>
        </div>

        {/* Indicador de Etapas */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapa >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapa >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Etapa 1: Escolher Template */}
        {etapa === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escolha um Template</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {templatesSite.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setTemplateSelecionado(template.id)
                    setFormData({ ...formData, categoria: template.categoria })
                  }}
                  className={`bg-white rounded-xl p-6 cursor-pointer transition-all ${
                    templateSelecionado === template.id
                      ? 'ring-4 ring-blue-500 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-4">{template.icone}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.nome}</h3>
                  <p className="text-gray-600 mb-4">{template.descricao}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.recursos.map((recurso, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {recurso}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {template.preview_cores.map((cor, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: cor }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setEtapa(2)}
                disabled={!templateSelecionado}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Etapa 2: Personalizar */}
        {etapa === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Personalize Seu Site</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Site *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome_site}
                    onChange={(e) => setFormData({ ...formData, nome_site: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Minha Loja Incrível"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Negócio *
                  </label>
                  <textarea
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descreva seu negócio e o que você oferece..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Primária
                    </label>
                    <input
                      type="color"
                      value={formData.cor_primaria}
                      onChange={(e) => setFormData({ ...formData, cor_primaria: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Secundária
                    </label>
                    <input
                      type="color"
                      value={formData.cor_secundaria}
                      onChange={(e) => setFormData({ ...formData, cor_secundaria: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domínio Desejado (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.dominio_desejado}
                    onChange={(e) => setFormData({ ...formData, dominio_desejado: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="meusite.com.br"
                  />
                </div>

                {mensagem && (
                  <div className={`p-4 rounded-lg ${
                    mensagem.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {mensagem}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setEtapa(1)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {enviando ? 'Criando...' : 'Criar Site 🚀'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 Plataforma Empreendedores - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
