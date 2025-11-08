// Dados de atividades CNAE para MEI

export interface AtividadeCNAE {
  codigo: string
  descricao: string
  categoria: string
}

export const atividadesMEI: AtividadeCNAE[] = [
  // COMÉRCIO
  { codigo: '4781-4/00', descricao: 'Comércio varejista de artigos do vestuário e acessórios', categoria: 'Comércio' },
  { codigo: '4784-9/00', descricao: 'Comércio varejista de gás liquefeito de petróleo (GLP)', categoria: 'Comércio' },
  { codigo: '4789-0/99', descricao: 'Comércio varejista de outros produtos', categoria: 'Comércio' },
  
  // SERVIÇOS
  { codigo: '9602-5/01', descricao: 'Cabeleireiros, manicure e pedicure', categoria: 'Serviços' },
  { codigo: '4930-2/02', descricao: 'Transporte rodoviário de carga', categoria: 'Serviços' },
  { codigo: '5620-1/04', descricao: 'Fornecimento de alimentos preparados preponderantemente para consumo domiciliar', categoria: 'Serviços' },
  
  // CONSTRUÇÃO
  { codigo: '4330-4/05', descricao: 'Aplicação de revestimentos e de resinas em interiores e exteriores', categoria: 'Construção' },
  { codigo: '4330-4/03', descricao: 'Impermeabilização em obras de engenharia civil', categoria: 'Construção' },
  
  // TECNOLOGIA
  { codigo: '6201-5/01', descricao: 'Desenvolvimento de programas de computador sob encomenda', categoria: 'Tecnologia' },
  { codigo: '6202-3/00', descricao: 'Desenvolvimento e licenciamento de programas de computador customizáveis', categoria: 'Tecnologia' },
  
  // ALIMENTOS
  { codigo: '5611-2/01', descricao: 'Restaurantes e similares', categoria: 'Alimentos' },
  { codigo: '5611-2/03', descricao: 'Lanchonetes, casas de chá, de sucos e similares', categoria: 'Alimentos' },
  
  // EDUCAÇÃO
  { codigo: '8599-6/04', descricao: 'Treinamento em informática', categoria: 'Educação' },
  { codigo: '8599-6/05', descricao: 'Treinamento em desenvolvimento profissional e gerencial', categoria: 'Educação' },
  
  // SAÚDE
  { codigo: '8690-9/01', descricao: 'Atividades de prática de enfermagem', categoria: 'Saúde' },
  { codigo: '8650-0/02', descricao: 'Atividades de profissionais da nutrição', categoria: 'Saúde' },
]

export const categorias = [
  'Comércio',
  'Serviços',
  'Construção',
  'Tecnologia',
  'Alimentos',
  'Educação',
  'Saúde',
]

export function buscarAtividadePorCategoria(categoria: string): AtividadeCNAE[] {
  return atividadesMEI.filter(ativ => ativ.categoria === categoria)
}

export function buscarAtividadePorTexto(texto: string): AtividadeCNAE[] {
  const textoLower = texto.toLowerCase()
  return atividadesMEI.filter(ativ => 
    ativ.descricao.toLowerCase().includes(textoLower) ||
    ativ.codigo.includes(texto)
  )
}
