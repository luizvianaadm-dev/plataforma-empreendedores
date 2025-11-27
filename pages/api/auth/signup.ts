import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, password, nome } = req.body;

  // Validação básica
  if (!email || !password || !nome) {
    return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
  }

  try {
    // Inicializa o cliente Supabase com tratamento de erro
    let supabase;
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (!supabaseUrl || !serviceRoleKey) {
        return res.status(500).json({
          error: 'Erro de configuração do servidor',
          details: `URL: ${supabaseUrl ? 'ok' : 'missing'}, Key: ${serviceRoleKey ? 'ok' : 'missing'}`
        });
      }

      supabase = createClient(supabaseUrl, serviceRoleKey);
    } catch (initError: any) {
      console.error('Erro ao inicializar Supabase:', initError);
      return res.status(500).json({
        error: 'Invalid API key or configuration error',
        details: initError.message
      });
    }

    // Verifica se usuário já existe
    const { data: existingUsers, error: checkError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email);

    if (checkError) {
      return res.status(400).json({ error: checkError.message });
    }

    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(password, 10);

    // Cria novo usuário
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .insert([
        {
          email,
          senha_hash: senhaHash,
          nome,
          tipo_usuario: 'empreendedor',
          ativo: true,
        },
      ])
      .select()
      .single();

    if (userError) {
      return res.status(400).json({ error: userError.message });
    }

    // Cria cliente associado
    const { data: cliente, error: clientError } = await supabase
      .from('clientes')
      .insert([
        {
          usuario_id: usuario.id,
          nome_empresa: nome,
          workspace_id: `ws_${usuario.id}`,
          etapa_atual: 0,
        },
      ])
      .select()
      .single();

    if (clientError) {
      return res.status(400).json({ error: clientError.message });
    }

    // Gera JWT
    const token = jwt.sign(
      { usuario_id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Conta criada com sucesso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    });
  } catch (error: any) {
    console.error('Erro no signup:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
