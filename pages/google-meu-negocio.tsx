import Link from 'next/link'

export default function GoogleMeuNegocio() {
  const passos = [
    {
      numero: 1,
      titulo: 'Acesse o Google Meu Negócio',
      descricao: 'Vá para google.com/business e faça login com sua conta Google.',
      dica: 'Use uma conta profissional vinculada ao e-mail do seu negócio.'
    },
    {
      numero: 2,
      titulo: 'Adicione seu Negócio',
      descricao: 'Clique em "Adicionar seu negócio" e preencha o nome exato como aparece na fachada.',
      dica: 'Use o nome real do negócio, não adicione palavras-chave extras.'
    },
    {
      numero: 3,
      titulo: 'Escolha a Categoria',
      descricao: 'Selecione a categoria que melhor descreve seu negócio (restaurante, loja, serviços, etc.).',
      dica: 'Escolha a categoria mais específica possível para aparecer nas buscas certas.'
    },
    {
      numero: 4,
      titulo: 'Adicione a Localização',
      descricao: 'Insira o endereço completo do seu estabelecimento físico.',
      dica: 'Se você atende clientes em casa, pode ocultar o endereço e mostrar apenas a região.'
    },
    {
      numero: 5,
      titulo: 'Verifique seu Negócio',
      descricao: 'O Google enviará um código por correio ou telefone para verificar que você é o proprietário.',
      dica: 'A verificação por correio leva de 5-14 dias. Por telefone é instantâneo (quando disponível).'
    },
    {
      numero: 6,
      titulo: 'Complete seu Perfil',
      descricao: 'Adicione fotos, horário de funcionamento, telefone, site e descrição do negócio.',
      dica: 'Perfis completos têm 7x mais chances de aparecer nas buscas do Google!'
    }
  ]

  const beneficios = [
    {
      icone: '📍',
      titulo: 'Aparecer no Google Maps',
      descricao: 'Clientes encontram você facilmente quando procuram negócios próximos.'
    },
    {
      icone: '👀',
      titulo: 'Aumentar Visibilidade',
      descricao: 'Seu negócio aparece nas pesquisas locais do Google com informações importantes.'
    },
    {
      icone: '⭐',
      titulo: 'Receber Avaliações',
      descricao: 'Clientes podem deixar reviews que aumentam sua credibilidade.'
    },
    {
      icone: '📊',
      titulo: 'Ver Estatísticas',
      descricao: 'Saiba quantas pessoas viram seu perfil, pediram rotas e ligaram.'
    },
    {
      icone: '📸',
      titulo: 'Compartilhar Fotos',
      descricao: 'Mostre seu espaço, produtos e equipe para atrair mais clientes.'
    },
    {
      icone: '💬',
      titulo: 'Responder Perguntas',
      descricao: 'Clientes fazem perguntas direto no perfil e você responde publicamente.'
    }
  ]

  const dicas = [
    'Adicione pelo menos 10 fotos de qualidade do seu negócio',
    'Responda TODAS as avaliações, positivas e negativas',
    'Mantenha horário de funcionamento sempre atualizado',
    'Use palavras-chave relevantes na descrição do negócio',
    'Publique atualizações semanais (promoções, novidades)',
    'Incentive clientes satisfeitos a deixarem avaliações',
    'Adicione produtos e serviços com preços e descrições',
    'Ative as mensagens para receber contatos diretos'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/presenca-digital" className="text-green-600 hover:text-green-700 flex items-center gap-2">
            ← Voltar para Presença Digital
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📍 Google Meu Negócio</h1>
          <p className="text-xl text-gray-600">Guia completo para cadastrar seu negócio no Google</p>
        </div>

        {/* Introdução */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que cadastrar no Google Meu Negócio?</h2>
          <p className="text-gray-700 text-lg mb-4">
            O Google Meu Negócio (é GRATUITO e é a ferramenta mais poderosa para negócios locais serem encontrados online.
            Quando alguém pesquisa "restaurante perto de mim" ou "mecânico em São Paulo", seu negócio pode aparecer!
          </p>
          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <p className="text-green-900 font-semibold">
              ✅ 70% dos consumidores visitam uma loja após encontrá-la no Google Maps!
            </p>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Benefícios do Google Meu Negócio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{beneficio.icone}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Passo a Passo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Passo a Passo para Cadastrar</h2>
          <div className="space-y-6">
            {passos.map((passo) => (
              <div key={passo.numero} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {passo.numero}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{passo.titulo}</h3>
                    <p className="text-gray-700 mb-3">{passo.descricao}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                      <p className="text-blue-900 text-sm">
                        <strong>💡 Dica:</strong> {passo.dica}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas de Otimização */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dicas para Otimizar seu Perfil</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ul className="space-y-4">
              {dicas.map((dica, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-lg">{dica}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-xl mb-6">
            Cadastre seu negócio agora e comece a receber mais clientes!
          </p>
          <a
            href="https://www.google.com/business/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Acessar Google Meu Negócio 🚀
          </a>
        </div>
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
