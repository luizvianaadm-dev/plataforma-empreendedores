// Auth API placeholder
// Note: Next-auth configuration is not available in the current build environment
// This is a temporary stub to allow the application to build and deploy

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(405).json({ error: 'Authentication endpoint not yet configured' });
}
