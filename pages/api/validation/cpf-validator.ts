import { NextApiRequest, NextApiResponse } from 'next';

// CPF validation algorithm - Calculate check digits and validate format
function validateCPFAlgorithm(cpf: string): boolean {
  // Remove non-digit characters
  const cleanCPF = cpf.replace(/\D/g, '');

  // Check if CPF has exactly 11 digits
  if (cleanCPF.length !== 11) return false;

  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Calculate first check digit
  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  // Calculate second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { cpf } = req.body;

  if (!cpf || typeof cpf !== 'string') {
    return res.status(400).json({ 
      valid: false,
      error: 'CPF inválido ou não fornecido' 
    });
  }

  try {
    const isValid = validateCPFAlgorithm(cpf);

    return res.status(200).json({
      valid: isValid,
      cpf: cpf.replace(/\D/g, ''),
      formatted: isValid ? cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : null,
      message: isValid ? 'CPF válido' : 'CPF inválido'
    });
  } catch (error) {
    return res.status(500).json({ 
      valid: false,
      error: 'Erro ao validar CPF' 
    });
  }
}
