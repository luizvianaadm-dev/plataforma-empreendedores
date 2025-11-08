mei.tsximport { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { atividadesMEI, categorias } from '../lib/cnaeData'
import { validarCPF, formatarCPF } from '../lib/validacoes'

export default function MEI() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    email: '',
    telefone: '',
    atividade: '',
    nomeEmpresarial: ''
  })
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validarCPF(formData.cpf)) {
      setMensagem('❌ CPF inválido')
      return
    }

    const { error } = await supabase.from('formularios_mei').insert([{
      nome_completo: formData.nomeCompleto,
      cpf: formData.cpf,
      email: formData.email,
      telefone: formData.telefone,
      atividade_principal: formData.atividade,
      cnae: formData.atividade,
      nome_empresarial: formData.nomeEmpresarial,
      data_nascimento: '1990-01-01',
      endereco: 'A preencher',
      cidade: 'A preencher',
      estado: 'A preencher',
      cep: '00000-000'
    }])

    if (error) {
      setMensagem('❌ Erro ao enviar')
    } else {
      setMensagem('✅ Formulário enviado com sucesso!')
      setFormData({ nomeCompleto: '', cpf: '', email: '', telefone: '', atividade: '', nomeEmpresarial: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/formalizacao" className="text-indigo-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💼 Formulário MEI
          </h1>
          <p className="text-gray-600 mb-8">
            Preencha seus dados para iniciar o processo de abertura do MEI
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nome Completo *</label>
              <input
                type="text"
                required
                value={formData.nomeCompleto}
                onChange={(e) => setFormData({...formData, nomeCompleto: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">CPF *</label>
              <input
                type="text"
                required
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Telefone *</label>
              <input
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Atividade Principal *</label>
              <select
                required
                value={formData.atividade}
                onChange={(e) => setFormData({...formData, atividade: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione uma atividade</option>
                {atividadesMEI.map((ativ) => (
                  <option key={ativ.codigo} value={ativ.descricao}>
                    {ativ.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nome Empresarial *</label>
              <input
                type="text"
                required
                value={formData.nomeEmpresarial}
                onChange={(e) => setFormData({...formData, nomeEmpresarial: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              Enviar Formulário
            </button>
          </form>

          {mensagem && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center font-semibold">
              {mensagem}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
