import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini on server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for conversational AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, business } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    const businessName = business?.name || 'Empresa Local';
    const businessType = business?.type || 'Serviços';
    const businessServices = business?.services || 'Atendimento geral, informações e orçamentos';
    const businessHours = business?.hours || 'Segunda a sexta das 08h às 18h, sábados até 12h';
    const businessAddress = business?.address || 'Atendimento presencial e online';
    const whatsappPhone = business?.whatsapp || '';
    const businessTone = business?.tone || 'caloroso, atencioso e acolhedor';

    const systemInstruction = `Você é o coração do atendimento da "${businessName}" (${businessType}).
Você NÃO é um chatbot genérico ou robótico. Você incorpora a alma e a essência desse negócio específico: ${businessTone}.

INFORMAÇÕES DA EMPRESA:
- Nome: ${businessName}
- Segmento: ${businessType}
- Personalidade/Alma do Negócio: ${businessTone}
- Serviços e Preços: ${businessServices}
- Horário de atendimento humano: ${businessHours}
- Localização/Endereço: ${businessAddress}
- WhatsApp oficial: ${whatsappPhone}

DIRETRIZES DE ATENDIMENTO LATINO-AMERICANO / BRASILEIRO:
1. Responda em Português do Brasil de forma autêntica, viva e acolhedora. Evite clichês de IA corporativa ("Olá, como posso ser útil hoje?"). Converse como uma pessoa real e apaixonada pelo que faz.
2. Adote o tom exato da alma da marca: se rústica/artesanal, fale com carinho e afeto de quem ama o ofício manual; se delicada/spa, com suavidade e calma serena; se noturna/vibrante, com entusiasmo e energia.
3. Seja direto e objetivo (1 a 3 parágrafos curtos) para não cansar quem lê no celular.
4. Quando perguntarem sobre preços ou produtos, explique com clareza e charme.
5. Quando oportuno, convide o cliente com simpatia a dar um oi no WhatsApp para reservar, pedir ou conversar com a equipe.`;

    if (ai) {
      try {
        // Format history for Gemini
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

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

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI response timed out')), 4000)
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
        return res.json({ reply });
      } catch (apiErr: any) {
        console.warn('Gemini API call, using smart fallback:', apiErr?.message);
      }
    }

    // Fallback seamlessly to business contextual reply
    const lower = message.toLowerCase();
    let reply = `Olá! Sou o assistente da ${businessName}. Como posso te ajudar hoje com nossos serviços?`;

    if (lower.includes('preço') || lower.includes('valor') || lower.includes('quanto custa') || lower.includes('corte') || lower.includes('serviço')) {
      reply = `Na ${businessName}, nossos serviços e valores são:\n\n${businessServices}\n\nVocê também pode clicar no botão de WhatsApp para agendar ou tirar dúvidas diretamente com nossa equipe!`;
    } else if (lower.includes('horário') || lower.includes('aberto') || lower.includes('funciona') || lower.includes('atende')) {
      reply = `Nosso horário de funcionamento é:\n\n${businessHours}\n\nLembrando que o atendimento de WhatsApp funciona em horário comercial, mas você pode deixar sua mensagem a qualquer momento!`;
    } else if (lower.includes('endereço') || lower.includes('onde') || lower.includes('fica') || lower.includes('local')) {
      reply = `Nosso endereço é:\n\n📍 ${businessAddress}\n\nVenha nos visitar ou chame no WhatsApp caso precise de rotas!`;
    } else if (lower.includes('humano') || lower.includes('pessoa') || lower.includes('atendente') || lower.includes('whatsapp') || lower.includes('falar')) {
      reply = `Com certeza! Você pode falar com nossa equipe humana tocando no botão verde do WhatsApp na tela agora mesmo. Posso te adiantar mais alguma informação enquanto isso?`;
    } else {
      reply = `Com certeza! Na ${businessName}, oferecemos: ${businessServices}. Nosso horário é ${businessHours}. Fique à vontade para perguntar ou clicar no botão do WhatsApp para falar diretamente conosco!`;
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({
      error: 'Não foi possível gerar a resposta no momento.',
      details: error?.message || 'Erro interno',
    });
  }
});

// Setup Vite in development or serve static in production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
