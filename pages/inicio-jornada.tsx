import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Etapa {
  numero: number
  titulo: string
  descricao: string
  completa: boolean
}

const ETAPAS: Etapa[] = [
  { numero: 1, titulo: 'Dados Pessoais', descricao: 'CPF, Nome, Email e Telefone', completa: false },
  { numero: 2, titulo: 'Validacao de Ideia', descricao: 'Analise com IA da viabilidade', completa: false },
  { numero: 3, titulo: 'Analise de Mercado', descricao: 'Estudo com IA do mercado', completa: false },
  { numero: 4, titulo: 'SWOT Analysis', descricao: 'Matriz SWOT gerada', completa: false },
  { numero: 5, titulo: 'Escolha de Estrutura', descricao: 'MEI, PJ ou Cooperativa', completa: false },
  { numero: 6, titulo: 'Dados da Empresa', descricao: 'Nome, CNAE, Capital Social', completa: false },
  { numero: 7, titulo: 'Banco Digital', descricao: 'Sugestoes de instituicoes', completa: false },
  { numero: 8, titulo: 'Geracao de Documentos', descricao: 'PDF e Plano de Negocios', completa: false },
  { numero: 9, titulo: 'Certificado Digital', descricao: 'Integracao GOV.BR', completa: false },
  { numero: 10, titulo: 'Conclusao', descricao: 'Jornada completa!', completa: false },
]

export default function InicioJornada() {
  const [etapaAtual, setEtapaAtual] = useState<number>(1)
  const [etapas, setEtapas] = useState<Etapa[]>(ETAPAS)
  const [formData, setFormData] = useState<Record<string, any>>({})
    const [businessIdea, setBusinessIdea] = useState<string>('')135
  
   useEffect(() => {
    if (etapaAtual > 2 && etapaAtual <= 10) {
      const timeout = setTimeout(() => {
        setEtapaAtual(etapaAtual + 1)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [etapaAtual])

  const handleProxima = () => {
    const novasEtapas = [...etapas]
    novasEtapas[etapaAtual - 1].completa = true
    setEtapas(novasEtapas)
    
    if (etapaAtual < 10) {
      setEtapaAtual(etapaAtual + 1)
    }
  }

  const handleAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    }
  }

  const progresso = (etapas.filter(e => e.completa).length / etapas.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Link href="/">
          <button className="text-indigo-600 hover:text-indigo-800 font-semibold mb-8 cursor-pointer">
            ← Voltar ao Dashboard
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Inicie Sua Jornada</h1>
        <p className="text-gray-600 text-lg mb-8">Transforme sua ideia em um negocio de sucesso em 10 passos</p>

        {/* Progresso Global */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Progresso da Jornada</h2>
            <span className="text-3xl font-bold text-indigo-600">{Math.round(progresso)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist de Etapas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {etapas.map((etapa) => (
            <button
              key={etapa.numero}
              onClick={() => setEtapaAtual(etapa.numero)}
              className={`p-4 rounded-lg font-semibold transition-all ${
                etapa.completa
                  ? 'bg-green-500 text-white shadow-lg'
                  : etapaAtual === etapa.numero
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-600'
              } cursor-pointer`}
            >
              <div className="text-lg font-bold">{etapa.numero}</div>
              <div className="text-xs">{etapa.completa ? '✓' : ''}</div>
            </button>
          ))}
        </div>

        {/* Conteudo da Etapa */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Etapa {etapaAtual}: {etapas[etapaAtual - 1].titulo}
            </h2>
            <p className="text-gray-600 text-lg">{etapas[etapaAtual - 1].descricao}</p>
          </div>

          {/* Formulario dinamico por etapa */}
          <div className="space-y-6 mb-8">
            {etapaAtual === 1 && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                  <input type="text" placeholder="Seu Nome" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input type="email" placeholder="seu@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
                </div>
              </>
            )}

            {135
                  && (
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-800 font-semibold mb-4">Descreva sua ideia de negocio:</p>
<textarea placeholder="Qual e sua ideia?" rows={5} value={businessIdea} onChange={(e) => setBusinessIdea(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"></textarea>                <p className="text-sm text-gray-600 mt-3">Sera analisada com IA para viabilidade e melhorias</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" onClick={async () => {
            const idea = businessIdea;                  if (!idea) {
                    alert('Descreva sua ideia primeiro');
                    return;
                  }
                  try {
                    const res = await fetch('/api/perplexity/chat', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        messages: [{
                          role: 'user',
                          content: `Analise a viabilidade desta ideia: "${idea}". Feedback construtivo, riscos e oportunidades.`
                        }]
                      })
                    });
                    const data = await res.json();
                    if (data.success) alert('Análise IA:\n' + data.message);
                    else alert('Erro: ' + (data.error || 'Tente novamente'));
                  } catch (e) { console.error(e); }
                }}>
                  🤖 Analisar com IA
                </button>
              </div>
            )}

            {25
              && etapaAtual <= 10 && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-lg text-center">
                <p className="text-lg text-gray-700 font-semibold mb-4">Etapa {etapaAtual} - {etapas[etapaAtual - 1].titulo}</p>
                <p className="text-gray-600">Processando {etapas[etapaAtual - 1].descricao.toLowerCase()}...</p>
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botoes de Navegacao */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleAnterior}
            disabled={etapaAtual === 1}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Anterior
          </button>

          <button
            onClick={handleProxima}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all flex-1"
          >
            {etapaAtual === 10 ? 'Concluir Jornada! 🌟' : 'Proxima Etapa →'}
          </button>
        </div>


             {/* IA Integrada para Planejar */}
     <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
       <div className="container mx-auto max-w-4xl">
         <div className="bg-white rounded-xl shadow-2xl p-12">
           <h2 className="text-4xl font-bold text-gray-900 mb-4">IA Integrada para Planejar</h2>
           <p className="text-gray-700 text-lg mb-6">
             Nossa plataforma integra Perplexity AI para ajudar vocé a validar ideias, analisar mercados e refinar seu plano de negócios em tempo real.
           </p>
           <ul className="space-y-3 mb-8">
             <li className="flex items-center text-gray-700">
               <span className="mr-3 text-2xl">✓</span> Análise de mercado com dados atualizados
             </li>
             <li className="flex items-center text-gray-700">
               <span className="mr-3 text-2xl">✓</span> Validação de ideias de negócios
             </li>
             <li className="flex items-center text-gray-700">
               <span className="mr-3 text-2xl">✓</span> Sugestões personalizadas para seu setor
             </li>
             <li className="flex items-center text-gray-700">
               <span className="mr-3 text-2xl">✓</span> Planos financeiros e de ação
             </li>
           </ul>
           <Link href="/planeje">
             <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
               Começar Planejamento →
             </button>
           </Link>
         </div>
       </div>
     </section>
        {/* Info Footer */}
        {etapaAtual === 10 && (
          <div className="mt-12 bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Parabens! 🌟</h3>
            <p className="text-gray-700 mb-6">Sua jornada como empreendedor foi iniciada com sucesso!</p>
            <p className="text-gray-600 mb-8">Em breve voce recebera por email:</p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700 mb-8">
              <li>✓ Plano de Negocios completo em PDF</li>
              <li>✓ Analise SWOT detalhada</li>
              <li>✓ Sugestoes de bancos digitais</li>
              <li>✓ Proximos passos para operacionalizar</li>
            </ul>
            <Link href="/">
              <button className="px-12 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 cursor-pointer">
                Ir ao Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
