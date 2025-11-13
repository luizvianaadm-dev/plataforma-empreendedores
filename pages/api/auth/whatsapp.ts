import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Configurar conexão WhatsApp Business API
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    
    if (!accessToken || !businessAccountId || !phoneNumberId) {
      return res.status(400).json({ 
        error: 'Variáveis de ambiente WhatsApp não configuradas'
      });
    }

    // Validar conexão com WhatsApp API
    const whatsappApiUrl = `https://graph.instagram.com/v18.0/${phoneNumberId}`;
    const validateResponse = await fetch(whatsappApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!validateResponse.ok) {
      throw new Error('Falha ao validar conexão WhatsApp');
    }

    const phoneData = await validateResponse.json();

    return res.status(200).json({
      success: true,
      message: 'WhatsApp Business conectado com sucesso',
      phoneNumber: phoneData.display_phone_number,
      status: 'connected',
      features: [
        'Envio de mensagens',
        'Recebimento de mensagens',
        'Webhooks',
        'Gerenciamento de grupos'
      ]
    });
  } catch (error) {
    console.error('Erro ao conectar WhatsApp:', error);
    return res.status(500).json({ 
      error: 'Erro ao conectar WhatsApp Business',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
