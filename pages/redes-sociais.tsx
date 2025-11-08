import { useState } from 'react'
import Link from 'next/link'
import { redesSociaisDisponiveis, getDicasRedeSocial } from '../lib/redesSociais'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RedesSociais() {
  const [redeSelecionada, setRedeSelecionada] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [formData, setFormData] = useState({
    plataforma: '',
    nome_perfil: '',
    url_perfil: '',
    objetivo: 'branding',
    publico_alvo: '',
    frequencia_postagem: 'diaria'
  })
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const handleRedeSelecionada = (redeId: string) => {
    setRedeSelecionada(redeId)
    setFormData({ ...formData, plataforma: redeId })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setMensagem('')

    try {
      const { data, error } = await supabase
        .from('redes_sociais')
        .insert([{
          plataforma: formData.plataforma,
          nome_perfil: formData.nome_perfil,
          url_perfil: formData.url_perfil,
          objetivo: formData.objetivo,
          publico_alvo: formData.publico_alvo,
          frequencia_postagem: formData.frequencia_postagem,
          status: 'ativo'
        }])

      if (error) throw error

      setMensagem('✅ Perfil cadastrado com sucesso! Vamos ajudá-lo na estratégia.')
      setTimeout(() => {
        window.location.href = '/presenca-digital'
      }, 2000)
    } catch (error) {
      setMensagem('❌ Erro ao cadastrar perfil. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/presenca-digital" className="text-pink-600 hover:text-pink-700 flex items-center gap-2">
            ← Voltar para Presença Digital
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📱 Redes Sociais</h1>
          <p className="text-xl text-gray-600">Escolha as plataformas certas para o seu negócio</p>
        </div>

        {/* Lista de Redes Sociais */}
        {!mostrarFormulario && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {redesSociaisDisponiveis.map((rede) => (
                <div
                  key={rede.id}
                  onClick={() => handleRedeSelecionada(rede.id)}
                  className={`bg-white rounded-xl p-6 cursor-pointer transition-all ${
                    redeSelecionada === rede.id
                      ? 'ring-4 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                  style={{
                    borderColor: redeSelecionada === rede.id ? rede.cor : 'transparent',
                    borderWidth: redeSelecionada === rede.id ? '4px' : '0'
                  }}
                >
                  <div className="text-5xl mb-4">{rede.icone}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{rede.nome}</h3>
                  <p className="text-gray-600 mb-4">{rede.descricao}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p><strong>Melhor para:</strong> {rede.melhor_para}</p>
                    <p><strong>Freq. Ideal:</strong> {rede.frequencia_ideal}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão para Avançar */}
            {redeSelecionada && (
              <div className="text-center">
                <button
                  onClick={() => setMostrarFormulario(true)}
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700"
                >
                  Ver Dicas e Cadastrar Perfil →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dicas e Formulário */}
        {mostrarFormulario && redeSelecionada && (
          <div className="max-w-4xl mx-auto">
            {/* Dicas da Rede Social Selecionada */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {redesSociaisDisponiveis.find(r => r.id === redeSelecionada)?.icone} Dicas para {redesSociaisDisponiveis.find(r => r.id === redeSelecionada)?.nome}
              </h2>
              <ul className="space-y-3">
                {getDicasRedeSocial(redeSelecionada).map((dica, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold text-lg">•</span>
                    <span className="text-gray-700">{dica}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulário de Cadastro */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cadastrar Perfil</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Perfil/Página *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome_perfil}
                    onChange={(e) => setFormData({ ...formData, nome_perfil: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="@meunegocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Perfil
                  </label>
                  <input
                    type="url"
                    value={formData.url_perfil}
                    onChange={(e) => setFormData({ ...formData, url_perfil: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="https://instagram.com/meunegocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivo Principal *
                  </label>
                  <select
                    required
                    value={formData.objetivo}
                    onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="branding">Fortalecer a Marca</option>
                    <option value="vendas">Aumentar Vendas</option>
                    <option value="engajamento">Engajar Público</option>
                    <option value="relacionamento">Relacionamento com Clientes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Público-Alvo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.publico_alvo}
                    onChange={(e) => setFormData({ ...formData, publico_alvo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Ex: Mulheres 25-35 anos interessadas em moda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequência de Postagem *
                  </label>
                  <select
                    required
                    value={formData.frequencia_postagem}
                    onChange={(e) => setFormData({ ...formData, frequencia_postagem: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="diaria">Diária (1-2 posts/dia)</option>
                    <option value="alternada">Dias Alternados</option>
                    <option value="semanal">Semanal (2-3 posts/semana)</option>
                    <option value="esporadica">Esporádica</option>
                  </select>
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
                    onClick={() => {
                      setMostrarFormulario(false)
                      setRedeSelecionada('')
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400"
                  >
                    {enviando ? 'Cadastrando...' : 'Cadastrar Perfil 🚀'}
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
