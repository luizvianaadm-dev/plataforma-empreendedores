import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import type { Organization } from '../../../lib/types/organization';

// Mock data - deve ser o mesmo array do index.ts (compartilhado via Supabase)
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

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'GET') {
    // Buscar organization específica
    try {
      // TODO: Buscar do Supabase
      const organization = mockOrganizations.find(
        (org) => org.id === id && org.user_id === session.user?.id
      );

      if (!organization) {
        return res.status(404).json({ error: 'Organization não encontrada' });
      }

      return res.status(200).json(organization);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar organization' });
    }
  }

  if (req.method === 'PUT') {
    // Atualizar organization
    try {
      const { name, plan } = req.body;

      // TODO: Buscar do Supabase
      const organizationIndex = mockOrganizations.findIndex(
        (org) => org.id === id && org.user_id === session.user?.id
      );

      if (organizationIndex === -1) {
        return res.status(404).json({ error: 'Organization não encontrada' });
      }

      // Atualizar campos
      if (name && typeof name === 'string') {
        mockOrganizations[organizationIndex].name = name;
        // Atualizar slug se nome mudou
        mockOrganizations[organizationIndex].slug = name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      if (plan && ['free', 'pro', 'enterprise'].includes(plan)) {
        mockOrganizations[organizationIndex].plan = plan as 'free' | 'pro' | 'enterprise';
      }

      mockOrganizations[organizationIndex].updated_at = new Date().toISOString();

      // TODO: Salvar no Supabase

      return res.status(200).json(mockOrganizations[organizationIndex]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar organization' });
    }
  }

  if (req.method === 'DELETE') {
    // Deletar organization
    try {
      // TODO: Buscar do Supabase
      const organizationIndex = mockOrganizations.findIndex(
        (org) => org.id === id && org.user_id === session.user?.id
      );

      if (organizationIndex === -1) {
        return res.status(404).json({ error: 'Organization não encontrada' });
      }

      // TODO: Deletar do Supabase (e limpar members, invites relacionados)
      mockOrganizations.splice(organizationIndex, 1);

      return res.status(200).json({ message: 'Organization deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar organization' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
