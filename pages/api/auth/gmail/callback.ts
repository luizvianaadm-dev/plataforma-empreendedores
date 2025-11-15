import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/gmail/callback';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code as string);
    
    // Store tokens in Supabase
    const userId = state as string; // Pass user ID in state param
    const { data, error } = await supabase
      .from('oauth_tokens')
      .upsert({
        user_id: userId,
        provider: 'gmail',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
        created_at: new Date(),
      }, { onConflict: 'user_id,provider' });

    if (error) throw error;

    // Redirect to success page
    return res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_success=true`);
  } catch (error) {
    console.error('Gmail callback error:', error);
    return res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?oauth_error=true`);
  }
}
