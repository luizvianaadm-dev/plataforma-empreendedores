import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Configurar OAuth2 do Google/Gmail
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/gmail/callback`;
    const scope = encodeURIComponent('https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    return res.status(200).json({
      success: true,
      authUrl,
      message: 'Gmail OAuth iniciado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao conectar Gmail:', error);
    return res.status(500).json({ error: 'Erro ao conectar Gmail' });
  }
}
