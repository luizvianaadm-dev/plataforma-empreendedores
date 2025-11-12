import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import type { Organization } from '../../../lib/types/organization';

// Mock data - substituir por chamadas ao Supabase
const mockOrganizations: Organization[] = [
  {
    id: '1',
    user_id: 'user123',
    name: 'Minha Empresa',
    slug: 'minha-empresa',
    plan: 'free',
    subscription_status: 'active',
    current_automations: 0,
    current_messages: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user123',
    name: 'Projeto Beta',
    slug: 'projeto-beta',
    plan: 'pro',
    subscription_status: 'active',
    current_automations: 3,
    current_messages: 1250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  if (req.method === 'GET') {
    // Listar organizations do usuário
    try {
      // TODO: Buscar do Supabase filtrado por user_id
      const userOrganizations = mockOrganizations.filter(
        (org) => org.user_id === session.user?.id
      );

      return res.status(200).json(userOrganizations);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar organizations' });
    }
  }

  if (req.method === 'POST') {
    // Criar nova organization
    try {
      const { name } = req.body;

      if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Nome da organization é obrigatório' });
      }

      // Gerar slug a partir do nome
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const newOrganization: Organization = {
        id: String(Date.now()),
        user_id: session.user?.id || '',
        name,
        slug,
        plan: 'free',
        subscription_status: 'active',
        current_automations: 0,
        current_messages: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // TODO: Salvar no Supabase
      mockOrganizations.push(newOrganization);

      return res.status(201).json(newOrganization);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar organization' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
