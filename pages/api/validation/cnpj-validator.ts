import { NextApiRequest, NextApiResponse } from 'next';

function validateCNPJAlgorithm(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  let digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

interface CompanyData {
  nome: string;
  cnpj: string;
  descricao_situacao_cadastral: string;
  endereco_completo: string;
  atividade_principal: Array<{ descricao: string }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { cnpj } = req.body;

  if (!cnpj || typeof cnpj !== 'string') {
    return res.status(400).json({ 
      valid: false,
      error: 'CNPJ inválido ou não fornecido' 
    });
  }

  // Validate format locally first
  if (!validateCNPJAlgorithm(cnpj)) {
    return res.status(400).json({ 
      valid: false,
      error: 'CNPJ inválido (falha na validação de checksum)' 
    });
  }

  try {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Try to fetch from Receita Federal API
    const response = await fetch(
      `https://moucache.jusbrasil.com.br/api/empresas/${cleanCNPJ}`,
      { 
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Plataforma-Empreendedores/1.0'
        }
      }
    );

    if (!response.ok && response.status !== 404) {
      // Return valid but with limited info if API is down
      return res.status(200).json({
        valid: true,
        cnpj: cleanCNPJ,
        formatted: `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5, 8)}/${cleanCNPJ.slice(8, 12)}-${cleanCNPJ.slice(12)}`,
        message: 'CNPJ válido (verificação local)',
        api_available: false
      });
    }

    if (response.status === 404) {
      return res.status(200).json({
        valid: false,
        message: 'CNPJ não encontrado na Receita Federal'
      });
    }

    const data: CompanyData = await response.json();

    return res.status(200).json({
      valid: true,
      cnpj: cleanCNPJ,
      formatted: `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5, 8)}/${cleanCNPJ.slice(8, 12)}-${cleanCNPJ.slice(12)}`,
      company: {
        name: data.nome,
        status: data.descricao_situacao_cadastral,
        address: data.endereco_completo,
        main_activity: data.atividade_principal?.[0]?.descricao || ''
      },
      api_available: true,
      message: 'CNPJ válido'
    });
  } catch (error) {
    // Fallback: accept as valid if format is correct
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return res.status(200).json({ 
      valid: true,
      cnpj: cleanCNPJ,
      formatted: `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5, 8)}/${cleanCNPJ.slice(8, 12)}-${cleanCNPJ.slice(12)}`,
      message: 'CNPJ válido (verificação local)',
      api_available: false
    });
  }
}
