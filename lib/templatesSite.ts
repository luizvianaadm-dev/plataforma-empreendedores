// Biblioteca de Templates de Sites
// SPRINT 3 - Presença Digital

export interface Template {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'ecommerce' | 'servicos' | 'portfolio';
  cores: {
    primaria: string;
    secundaria: string;
    texto: string;
    fundo: string;
  };
  secoes: string[];
  preview: string;
}

export const templatesSite: Template[] = [
  {
    id: 'ecommerce-moderno',
    nome: 'E-commerce Moderno',
    descricao: 'Template profissional para lojas online com catálogo de produtos',
    categoria: 'ecommerce',
    cores: {
      primaria: '#3B82F6',
      secundaria: '#10B981',
      texto: '#1F2937',
      fundo: '#FFFFFF'
    },
    secoes: ['Hero', 'Produtos em Destaque', 'Categorias', 'Sobre', 'Contato'],
    preview: '/templates/ecommerce-moderno.png'
  },
  {
    id: 'servicos-elegante',
    nome: 'Serviços Elegante',
    descricao: 'Ideal para profissionais autônomos e empresas de serviços',
    categoria: 'servicos',
    cores: {
      primaria: '#8B5CF6',
      secundaria: '#EC4899',
      texto: '#374151',
      fundo: '#F9FAFB'
    },
    secoes: ['Hero', 'Serviços', 'Depoimentos', 'Sobre', 'Contato'],
    preview: '/templates/servicos-elegante.png'
  },
  {
    id: 'portfolio-criativo',
    nome: 'Portfolio Criativo',
    descricao: 'Mostre seus trabalhos de forma impactante e profissional',
    categoria: 'portfolio',
    cores: {
      primaria: '#F59E0B',
      secundaria: '#EF4444',
      texto: '#111827',
      fundo: '#FFFFFF'
    },
    secoes: ['Hero', 'Portfolio', 'Habilidades', 'Sobre', 'Contato'],
    preview: '/templates/portfolio-criativo.png'
  }
];

export const getCoresPorCategoria = (categoria: string) => {
  const template = templatesSite.find(t => t.categoria === categoria);
  return template?.cores || templatesSite[0].cores;
};

export const getTemplatePorId = (id: string) => {
  return templatesSite.find(t => t.id === id);
};
