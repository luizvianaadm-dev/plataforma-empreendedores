import type { NextApiRequest, NextApiResponse } from 'next';
import type { Organization } from '../../../lib/types/organization';

// Mock data - substituir por chamadas ao Supabase
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Minha Empresa',
    slug: 'minha-empresa',
    plan: 'free',    subscription_status: 'active',
    current_automations: 0,
    current_messages: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    name: 'Projeto Beta',
    slug: 'projeto-beta',
    plan: 'pro',
    subscription_status: 'active',
    current_automations: 3,
    current_messages: 1250,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Note: Authentication is temporarily disabled
  // Replace this with proper session validation when next-auth is available

  if (req.method === 'GET') {
    // Listar organizações do usuário
    try {
      return res.status(200).json(mockOrganizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Criar nova organização
    try {
      const { name, slug, plan } = req.body;
      const newOrg: Organization = {
        id: String(mockOrganizations.length + 1),
        user_id: 'user123',
        name,
        slug,
        plan,
        subscription_status: 'active',
        current_automations: 0,
        current_messages: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockOrganizations.push(newOrg);
      return res.status(201).json(newOrg);
    } catch (error) {
      console.error('Error creating organization:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
