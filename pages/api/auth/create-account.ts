import { NextApiRequest, NextApiResponse } from 'next';
import { validateCPF, validateEmail, validatePhoneNumber, validateName, validatePassword } from '../../../lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name, cpf, phone, lgpdAccepted } = req.body;

    // Validate required fields
    if (!email || !password || !name || !cpf || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate LGPD acceptance - MANDATORY
    if (!lgpdAccepted) {
      return res.status(400).json({
        error: 'LGPD acceptance is mandatory',
        message: 'Você deve aceitar a Política de Privacidade para criar sua conta'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate CPF format (basic - should be enhanced with actual CPF validation)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).json({ error: 'Invalid CPF format' });
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password too weak',
        message: 'Senha deve ter pelo menos 8 caracteres'
      });
    }

    // TODO: Integrate with Supabase to:
    // 1. Create user in auth.users
    // 2. Insert record in users_lgpd_consent table
    // 3. Store additional user data
    // 4. Send confirmation email

    return res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso! Confira seu email para confirmar.',
      data: {
        email,
        name,
        cpf: cpf.slice(-4), // Return only last 4 digits for security
        lgpdAcceptedAt: new Date().toISOString(),
        status: 'pending_email_confirmation'
      }
    });

  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Erro ao criar conta. Tente novamente mais tarde.'
    });
  }
}
