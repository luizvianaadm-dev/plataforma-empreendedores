import { NextApiRequest, NextApiResponse } from 'next';

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

function validateCEPFormat(cep: string): boolean {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { cep } = req.body;

  if (!cep || typeof cep !== 'string') {
    return res.status(400).json({ 
      valid: false,
      error: 'CEP inválido ou não fornecido' 
    });
  }

  if (!validateCEPFormat(cep)) {
    return res.status(400).json({ 
      valid: false,
      error: 'CEP deve ter 8 dígitos' 
    });
  }

  try {
    const cleanCEP = cep.replace(/\D/g, '');
    const response = await fetch(
      `https://viacep.com.br/ws/${cleanCEP}/json/`,
      { timeout: 5000 }
    );

    if (!response.ok) {
      return res.status(500).json({ 
        valid: false,
        error: 'Erro ao consultar ViaCEP' 
      });
    }

    const data: ViaCEPResponse = await response.json();

    if (data.erro) {
      return res.status(200).json({
        valid: false,
        message: 'CEP não encontrado'
      });
    }

    return res.status(200).json({
      valid: true,
      cep: cleanCEP,
      formatted: `${cleanCEP.slice(0, 5)}-${cleanCEP.slice(5)}`,
      address: {
        street: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        ddd: data.ddd
      },
      ibge: data.ibge,
      message: 'CEP válido'
    });
  } catch (error) {
    return res.status(500).json({ 
      valid: false,
      error: 'Erro ao validar CEP' 
    });
  }
}
