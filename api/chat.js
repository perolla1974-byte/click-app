import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message, history, business } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const businessName = business?.name || 'Maison Lumière';
    const businessType = business?.type || 'Alta Estética & Spa Privativo';
    const businessServices = business?.services || 'Rituais de bem-estar, imersão e estética de luxo';
    const businessHours = business?.hours || 'Segunda a sábado das 09h às 20h';
    const businessAddress = business?.address || 'Alameda dos Aromas, 740 - Jardim Europa';
    const whatsappPhone = business?.whatsapp || '11977778888';
    const businessTone = business?.tone || 'calmo, sereno, respeitoso, poético e exclusivo';

    const systemInstruction = `Você é Helena, Concierge Privée da "${businessName}" (${businessType}).
Seu tom é: ${businessTone}.

INFORMAÇÕES DA EMPRESA:
- Nome: ${businessName}
- Segmento: ${businessType}
- Serviços: ${businessServices}
- Horário: ${businessHours}
- Endereço: ${businessAddress}
- WhatsApp: ${whatsappPhone}

DIRETRIZES DE ATENDIMENTO:
1. Responda em Português do Brasil com acolhimento e sofisticação.
2. Seja conciso (1 a 3 parágrafos curtos) para não cansar no celular.
3. Convide para o WhatsApp caso a pessoa deseje agendar ou tirar dúvidas adicionais.`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contents = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        contents.push({ role: 'user', parts: [{ text: message }] });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI response timed out')), 5000)
        );

        const response = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          }),
          timeoutPromise,
        ]);

        const reply = response.text || 'Olá! Como posso ajudar você hoje?';
        return res.status(200).json({ reply });
      } catch (apiErr) {
        console.warn('Gemini API fallback:', apiErr?.message);
      }
    }

    // Contextual fallback
    const lower = message.toLowerCase();
    let reply = `Olá! Sou Helena, Concierge da ${businessName}. É uma honra acolher você. Como posso guiar sua experiência hoje?`;

    if (lower.includes('preço') || lower.includes('valor') || lower.includes('quanto custa') || lower.includes('ritual') || lower.includes('ouro')) {
      reply = `Na ${businessName}, nossos rituais são preparados com total exclusividade: Ritual de Ouro 24k (R$ 580), Banho Termal de Lavanda (R$ 720) e Infusão Botânica Facial (R$ 460). Você pode agendar ou consultar disponibilidade pelo botão de WhatsApp!`;
    } else if (lower.includes('horário') || lower.includes('aberto') || lower.includes('funciona') || lower.includes('atende')) {
      reply = `Nosso atendimento em suíte privativa funciona de ${businessHours}, com horário marcado individual para seu total conforto e privacidade.`;
    } else if (lower.includes('endereço') || lower.includes('onde') || lower.includes('fica') || lower.includes('local')) {
      reply = `Ficamos na 📍 ${businessAddress}, com valet e entrada reservada.`;
    } else {
      reply = `Será um privilégio receber você em nossa Maison. Fique à vontade para perguntar ou clicar no botão de WhatsApp para falar diretamente conosco!`;
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({
      error: 'Não foi possível gerar a resposta no momento.',
      details: error?.message || 'Erro interno',
    });
  }
}
