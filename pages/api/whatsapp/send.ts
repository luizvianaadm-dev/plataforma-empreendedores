whatsapp/send.tsimport { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID!;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, message, type = 'text' } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required fields: to, message' });
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''), // Remove non-numeric chars
      type,
    };

    if (type === 'text') {
      Object.assign(payload, {
        text: { preview_url: true, body: message },
      });
    } else if (type === 'image') {
      Object.assign(payload, {
        image: { link: message },
      });
    }

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ messageId: response.data.messages[0].id });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
