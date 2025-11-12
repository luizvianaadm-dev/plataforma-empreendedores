import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data - Organizations API endpoint
const mockOrganizations = [
  {
    id: '1',
    user_id: 'user123',
    name: 'Minha Empresa',
    slug: 'minha-empresa',
    plan: 'free',
    subscription_status: 'active',
    max_automations: 1,
    max_messages_per_month: 100,
    messages_used_this_month: 0,
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
    max_automations: 3,
    max_messages_per_month: 1250,
    messages_used_this_month: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Authentication is not configured in this build
  // For now, return mock data
  
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const organization = mockOrganizations.find(org => org.id === id);
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    
    return res.status(200).json(organization);
  }
  
  if (req.method === 'PUT') {
    return res.status(405).json({ error: 'PUT method not yet implemented' });
  }
  
  if (req.method === 'DELETE') {
    return res.status(405).json({ error: 'DELETE method not yet implemented' });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
