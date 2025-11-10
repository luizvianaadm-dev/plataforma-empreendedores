// Biblioteca de Redes Sociais
// SPRINT 3 - Presença Digital

export interface RedeSocial {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  link: string;
  descricao: string;
  dicas: string[];
   melhor_para: string;
   frequencia_ideal: string;
}

export const redesSociaisDisponiveis: RedeSocial[] = [
  {
    id: 'instagram',
    nome: 'Instagram',
    icone: '📷',
    cor: '#E1306C',
    link: 'https://instagram.com/',
    descricao: 'Ideal para conteúdo visual: fotos, vídeos curtos e stories',
    dicas: [
      'Poste de 3 a 5 vezes por semana',
      'Use stories diários para engajamento',
      'Crie Reels para alcance orgânico',
      'Use 5-10 hashtags relevantes',
      'Responda todos os comentários',

        melhor_para: 'Conteúdo visual e Stories',
        frequencia_ideal: '3-5 posts/semana'
  },
  {
    id: 'facebook',
    nome: 'Facebook',
    icone: '👍',
    cor: '#1877F2',
    link: 'https://facebook.com/',
    descricao: 'Maior rede social do Brasil, ideal para alcance amplo',
    dicas: [
      'Crie uma Página comercial',
      'Publique conteúdo variado (fotos, vídeos, links)',
      'Use Facebook Ads para anúncios',
      'Interaja em grupos do seu nicho',
      'Agende posts para horários de pico',

        melhor_para: 'Alcance Amplo e Anúncios',
        frequencia_ideal: '2-3 posts/dia'
  },
  {
    id: 'whatsapp',
    nome: 'WhatsApp Business',
    icone: '📱',
    cor: '#25D366',
    link: 'https://www.whatsapp.com/business',
    descricao: 'Atendimento direto e personalizado com clientes',
    dicas: [
      'Use WhatsApp Business (não o comum)',
      'Configure respostas automáticas',
      'Crie catálogo de produtos',
      'Use etiquetas para organizar conversas',
      'Defina horários de atendimento',
    ]
        melhor_para: 'Atendimento e Relacionamento',
              frequencia_ideal: 'Conforme demanda'
  },
  {
    id: 'tiktok',
    nome: 'TikTok',
    icone: '🎵',
    cor: '#000000',
    link: 'https://tiktok.com/',
    descricao: 'Vídeos curtos e virais, público jovem',
    dicas: [
      'Vídeos de 15-60 segundos',
      'Use músicas e efeitos populares',
      'Poste diário para crescimento',
      'Participe de desafios e trends',
      'Seja autêntico e criativo',
    ]
        melhor_para: 'Vídeos Virais e Criatividade',
              frequencia_ideal: '1 post/dia'
  },
  {
    id: 'linkedin',
    nome: 'LinkedIn',
    icone: '👔',
    cor: '#0A66C2',
    link: 'https://linkedin.com/',
    descricao: 'Rede profissional, ideal para B2B e networking',
    dicas: [
      'Mantenha perfil profissional atualizado',
      'Compartilhe conteúdo relevante do setor',
      'Publique artigos e insights',
      'Conecte-se com profissionais da área',
      'Participe de grupos e discussões',
    ]
        melhor_para: 'Networking e Pensamento Liderado',
              frequencia_ideal: '2-3 posts/semana'
  }
];

export const getRedeSocialPorId = (id: string) => {
  return redesSociaisDisponiveis.find(r => r.id === id);
};

export const getDicasRedeSocial = (id: string): string[] => {
  const rede = getRedeSocialPorId(id);
  return rede?.dicas || [];
};
