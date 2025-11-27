import type { NextApiRequest, NextApiResponse } from "next";

type PerplexityMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "PERPLEXITY_API_KEY not configured" });
  }

  const { prompt } = req.body as { prompt?: string };

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const messages: PerplexityMessage[] = [
    {
      role: "system",
      content:
        "Você é um assistente de negócios especializado da Plataforma Empreendedores. Responda de forma objetiva, prática e voltada para pequenos negócios brasileiros. Quando solicitado, forneca análises de mercado, validação de ideias e sugestões de estratégia.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "Erro na API Perplexity",
        details: errorText,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Perplexity API error:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao chamar a API Perplexity" });
  }
}
