import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get stored OAuth token from Supabase
    const { data: tokenData, error: tokenError } = await supabase
      .from('oauth_tokens')
      .select('access_token, refresh_token')
      .eq('user_id', userId)
      .eq('provider', 'gmail')
      .single();

    if (tokenError || !tokenData) {
      return res.status(401).json({ error: 'No Gmail token found' });
    }

    // Initialize Gmail API with stored token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch email list
    const result = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'is:unread', // Get unread emails
    });

    // Fetch full message details
    const messages = await Promise.all(
      (result.data.messages || []).map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id!,
          format: 'full',
        });
        return message.data;
      })
    );

    return res.status(200).json({ messages });
  } catch (error) {
    console.error('Email list error:', error);
    return res.status(500).json({ error: 'Failed to fetch emails' });
  }
}
