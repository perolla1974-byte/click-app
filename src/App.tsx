import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  Clock, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  Gem, 
  Award, 
  CheckCircle2, 
  Lock, 
  ChevronDown, 
  Sparkle 
} from 'lucide-react';

import maisonHeroImg from './assets/images/maison_sanctuary_hero_1791410661208.jpg';
import sereneRadiantWomanImg from './assets/images/serene_radiant_woman_1791410713235.jpg';
import zenLotusBasinImg from './assets/images/zen_stone_water_lotus_1791410692052.jpg';
import luxuryCrystalFlaconImg from './assets/images/luxury_crystal_flacon_1791410678219.jpg';
import helenaPortraitImg from './assets/images/helena_concierge_portrait_1791410421809.jpg';

// Brasão Monograma Nobre Estilizado (Maison Lumière - ML)
const BrandMedallion = () => (
  <div className="relative inline-flex items-center justify-center p-3">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C5A880]/30 via-[#F3E7D3]/60 to-[#D4AF37]/30 blur-md animate-pulse" />
    <svg width="68" height="68" viewBox="0 0 100 100" className="relative drop-shadow-[0_4px_12px_rgba(180,140,70,0.35)]">
      {/* Círculo externo chanfrado */}
      <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="1.5" fill="#FAF6EE" fillOpacity="0.85" />
      <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.8" />
      
      {/* Arabescos florais de topo e base */}
      <path d="M50,12 C46,18 42,18 38,20 C43,21 47,21 50,23 C53,21 57,21 62,20 C58,18 54,18 50,12 Z" fill="url(#goldGrad)" />
      <path d="M50,88 C46,82 42,82 38,80 C43,79 47,79 50,77 C53,79 57,79 62,80 C58,82 54,82 50,88 Z" fill="url(#goldGrad)" />
      
      {/* Monograma estilizado M & L */}
      <text x="50" y="58" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="32" fontWeight="600" textAnchor="middle" fill="#805F2B">
        ML
      </text>

      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBF86" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8F6A2C" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Arabesco de canto esculpido em filigrana
const ImperialFiligreeCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={`w-20 h-20 pointer-events-none opacity-60 ${className}`} fill="none" stroke="currentColor">
    <path d="M10,110 Q10,10 110,10" strokeWidth="1.5" stroke="url(#goldCorner)" />
    <path d="M16,110 Q16,16 110,16" strokeWidth="0.8" strokeDasharray="2 3" stroke="url(#goldCorner)" />
    <path d="M35,85 C22,60 60,22 85,35 C110,48 70,85 58,60 C52,48 40,72 35,85 Z" fill="url(#goldCorner)" fillOpacity="0.12" stroke="url(#goldCorner)" strokeWidth="1" />
    <circle cx="110" cy="10" r="3.5" fill="#C5A059" />
    <circle cx="10" cy="110" r="3.5" fill="#C5A059" />
    <defs>
      <linearGradient id="goldCorner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2C997" />
        <stop offset="50%" stopColor="#B89047" />
        <stop offset="100%" stopColor="#7E5C20" />
      </linearGradient>
    </defs>
  </svg>
);

const LuxuryDivider = () => (
  <div className="flex items-center justify-center gap-4 my-12 opacity-85">
    <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
    <div className="flex items-center gap-1.5 text-[#B89047]">
      <span className="text-[10px]">✦</span>
      <Gem className="w-4 h-4 text-[#C5A059] drop-shadow-[0_2px_4px_rgba(180,140,60,0.3)]" />
      <span className="text-[10px]">✦</span>
    </div>
    <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
  </div>
);

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const EXPERIENCES = [
  {
    id: '1',
    title: 'Ritual Lumière de Ouro 24k & Caviar',
    category: 'Haute Rajeunissement',
    duration: '90 minutos de imersão privativa',
    price: 'R$ 580',
    desc: 'Fusão biológica de micro-folhas de ouro 24 quilates com extrato puro de caviar negro do Mar Cáspio. Estimula a regeneração celular profunda, devolvendo o viço acetinado da juventude.',
    image: sereneRadiantWomanImg,
    seal: 'Assinatura Imperial'
  },
  {
    id: '2',
    title: 'Banho Termal & Imersão Botânica de Lavanda',
    category: 'Santuário de Descompressão',
    duration: '120 minutos a dois ou individual',
    price: 'R$ 720',
    desc: 'Ofurô esculpido em cedro japonês com água termal aquecida a 38°C, infusão de flores frescas de lavanda francesa e massagem com pedras quentes vulcânicas de basalto polido.',
    image: zenLotusBasinImg,
    seal: 'Exclusividade Privée'
  },
  {
    id: '3',
    title: 'Infusão Botânica em Vidro de Cristal & Mármore',
    category: 'Sérum Puro & Plantas Raras',
    duration: '75 minutos',
    price: 'R$ 460',
    desc: 'Elixir de óleos essenciais destilados em vidro farmacêutico nobre com folhas verdes frescas, drenagem linfática manual e hidratação profunda sem qualquer componente sintético.',
    image: luxuryCrystalFlaconImg,
    seal: 'Vidro Nobre & Botânica'
  }
];

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Seja muito bem-vinda(o) à Maison Lumière. ✨ Eu sou Helena, sua Concierge de Alta Estética. É um privilégio acolher o seu momento de pausa. Em que posso inspirar sua escolha hoje?',
      time: 'Agora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const text = customMessage || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          business: {
            name: 'Maison Lumière - Haute Esthétique & Spa Privatif',
            type: 'Maison de Alta Estética, Bem-Estar e Day Spa Privativo de Alto Luxo',
            tone: 'extremamente poético, sofisticado, calmo, gentil, acolhedor e exclusivo, com polidez de concierge do Hotel Ritz de Paris',
            services: 'Ritual Lumière de Ouro 24k R$ 580 | Banho Termal & Ofurô de Lavanda R$ 720 | Escultura Facial Glow de Diamante R$ 460 | Day Spa Casais & Noivas sob consulta privativa',
            hours: 'Segunda a Sábado das 09h às 20h com atendimento exclusivo com horário marcado',
            address: 'Alameda dos Aromas, 740 - Jardim Europa, São Paulo',
            whatsapp: '11977778888'
          }
        })
      });

      const data = await response.json();
      const reply = data.reply || 'Será uma honra imensa receber você em nossa suíte privativa. Você também pode conversar diretamente com nossa equipe no WhatsApp para escolher o horário perfeito.';

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Será um privilégio acolher o seu momento em nossa Maison. Para checar as suítes disponíveis com total privacidade, toque no botão dourado do WhatsApp logo abaixo.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#241F1A] font-sans antialiased selection:bg-[#DFC69A] selection:text-[#38260F] relative overflow-x-hidden">
      
      {/* Auroras de Luz Suave & Dourada Difusa */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[750px] bg-gradient-to-b from-[#F2E5CE]/55 via-[#EBD9BE]/30 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="fixed top-[700px] -right-36 w-[650px] h-[650px] bg-gradient-to-bl from-[#EADBC3]/45 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* ========================================================
          1. TOPO: FAIXA ESMERALDA IMPERIAL COM FIOS DOURADOS
          ======================================================== */}
      <div className="bg-[#12231A] text-[#EFE3CF] py-2.5 px-4 text-center border-b border-[#2C4837] shadow-sm relative z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-[11px] font-light tracking-[0.2em] uppercase">
          <span className="hidden sm:inline-block text-[#B3935B]">✧ Santuário Privatif</span>
          <span className="mx-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5C78E] animate-ping" />
            <span className="font-serif italic text-xs tracking-normal text-white">Suítes com horário reservado individual • Atendimento e Concierge 24 Horas</span>
          </span>
          <span className="hidden sm:inline-block text-[#B3935B]">São Paulo ✧</span>
        </div>
      </div>

      {/* ========================================================
          2. HEADER DE JOALHERIA: MEDALHÃO CENTRAL & CONTRASTES
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FBF9F4]/90 backdrop-blur-2xl border-b border-[#E8DDCD]/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Assinatura de Prestígio */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] flex items-center justify-center shadow-[0_4px_12px_rgba(180,140,70,0.2)]">
              <span className="font-serif italic text-lg font-bold text-[#8C6B30]">ML</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-2xl sm:text-3xl font-semibold text-[#1F1914] leading-none tracking-tight">
                Maison Lumière
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#A88858] font-semibold mt-1">
                Haute Esthétique & Spa
              </span>
            </div>
          </div>

          {/* Botão de WhatsApp em Esmeralda Profundo & Aro Dourado */}
          <a
            href="https://wa.me/5511977778888?text=Ol%C3%A1%2C+gostaria+de+agendar+um+atendimento+exclusivo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-gradient-to-r from-[#173023] to-[#12231A] hover:from-[#1E3D2D] hover:to-[#172D21] text-[#FFFBF5] text-xs font-light px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(18,35,26,0.3)] border border-[#C5A059]/40 active:scale-95 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#E5C78E] shadow-[0_0_8px_#E5C78E] animate-pulse" />
            <span className="font-serif italic text-sm">Concierge WhatsApp</span>
          </a>

        </div>
      </header>

      {/* ========================================================
          3. HERO SECTION ESCULPIDO: MEDALHÃO, ARCO E RELEVO 3D
          ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 max-w-5xl mx-auto">
        
        {/* Monograma de Prestígio e Poesia */}
        <div className="text-center space-y-4">
          
          <BrandMedallion />

          <div className="inline-flex items-center gap-2 text-xs font-serif italic text-[#8F6F3A] px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5EEDB] via-[#FFFDF8] to-[#F5EEDB] border border-[#DFC9A5] shadow-[0_2px_8px_rgba(195,160,95,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>O luxo silencioso da sua transformação</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1C1611] max-w-3xl mx-auto leading-[1.08] drop-shadow-sm">
            Onde o tempo se curva à <span className="italic font-light bg-gradient-to-r from-[#946F34] via-[#BA924F] to-[#7A5924] bg-clip-text text-transparent">sua serenidade.</span>
          </h1>

          <p className="text-sm sm:text-base font-light text-[#63574A] max-w-xl mx-auto leading-relaxed">
            Um santuário privativo inspirado nas altas clínicas estéticas da Place Vendôme. Aqui, seu atendimento é protegido pelo sigilo, guiado pelo carinho e envolvido pela mais pura ciência botânica.
          </p>

        </div>

        {/* Arco Arquitetônico em Alto Relevo com Borda em Ouro Líquido */}
        <div className="mt-12 sm:mt-16 relative max-w-3xl mx-auto">
          
          {/* Filigranas nos quatro cantos */}
          <ImperialFiligreeCorner className="absolute -top-7 -left-7" />
          <ImperialFiligreeCorner className="absolute -top-7 -right-7 -scale-x-100" />
          <ImperialFiligreeCorner className="absolute -bottom-7 -left-7 -scale-y-100" />
          <ImperialFiligreeCorner className="absolute -bottom-7 -right-7 -scale-x-100 -scale-y-100" />

          {/* O Arco Majestoso */}
          <div className="p-3 sm:p-4 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EFE3CD] rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[40px] shadow-[0_30px_70px_rgba(150,115,60,0.22),_inset_0_2px_4px_rgba(255,255,255,0.95)] border-2 border-[#E2CCA4]">
            
            <div className="relative h-80 sm:h-[420px] w-full rounded-t-[145px] sm:rounded-t-[185px] rounded-b-[30px] overflow-hidden shadow-2xl">
              <img 
                src={maisonHeroImg} 
                alt="Ambiente Maison Lumière"
                className="w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
              />
              
              {/* Efeito de luz dourada chanfrada sobre a foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12231A]/85 via-[#12231A]/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-light text-[#E5C78E] block drop-shadow">
                  Jardim Europa • São Paulo
                </span>
                <span className="font-serif italic text-xl sm:text-2xl font-light text-white mt-1 block drop-shadow-md">
                  "O corpo relaxa quando a alma reconhece o verdadeiro cuidado."
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Selos de Nobreza com Chanfro Tridimensional */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          
          <div className="bg-gradient-to-b from-white to-[#FBF7EE] border border-[#E5D7BF] rounded-2xl p-4 shadow-[0_10px_25px_rgba(180,140,80,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F5ECE0] border border-[#DFC9A5] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#8C6B30]" />
            </div>
            <h3 className="font-serif italic text-base font-semibold text-[#241F1A]">Suítes 100% Individuais</h3>
            <p className="text-[11px] text-[#6E6153] font-light">Nunca salas compartilhadas. Um ambiente dedicado exclusivamente a você.</p>
          </div>

          <div className="bg-gradient-to-b from-white to-[#FBF7EE] border border-[#E5D7BF] rounded-2xl p-4 shadow-[0_10px_25px_rgba(180,140,80,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F5ECE0] border border-[#DFC9A5] mx-auto flex items-center justify-center">
              <Gem className="w-4 h-4 text-[#8C6B30]" />
            </div>
            <h3 className="font-serif italic text-base font-semibold text-[#241F1A]">Ativos Suíços & Ouro 24k</h3>
            <p className="text-[11px] text-[#6E6153] font-light">Biotecnologia pura com certificado de origem sustentável e vegano.</p>
          </div>

          <div className="bg-gradient-to-b from-white to-[#FBF7EE] border border-[#E5D7BF] rounded-2xl p-4 shadow-[0_10px_25px_rgba(180,140,80,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F5ECE0] border border-[#DFC9A5] mx-auto flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#8C6B30]" />
            </div>
            <h3 className="font-serif italic text-base font-semibold text-[#241F1A]">Concierge Digital 24/7</h3>
            <p className="text-[11px] text-[#6E6153] font-light">Consultoria instantânea a qualquer hora do dia ou da noite.</p>
          </div>

        </div>

      </section>

      <LuxuryDivider />

      {/* ========================================================
          4. CARTA DE TERAPIAS & RITUAIS IMPERIAIS
          ======================================================== */}
      <section className="py-8 px-4 max-w-5xl mx-auto">
        
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#A88858] font-bold">
            Carta de Rituais Exclusivos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1F1914]">
            A Alquimia da Beleza & do Tempo
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6153] font-light max-w-md mx-auto">
            Criados para despertar sentidos adormecidos, desanuviar a mente e devolver a luz pura ao seu rosto.
          </p>
        </div>

        {/* Grade de Experiências com Vidro Lapidado e Selo em Relevo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp) => (
            <div 
              key={exp.id}
              className="group bg-gradient-to-b from-white via-[#FCFAF5] to-[#F8F2E6] border border-[#E5D7BF] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(170,130,70,0.12),_inset_0_1px_3px_rgba(255,255,255,0.95)] hover:shadow-[0_25px_50px_rgba(160,120,50,0.22)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full overflow-hidden relative">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
                  />
                  
                  {/* Selo Dourado em Alto Relevo */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FFFDF9] to-[#F7EDE0] border border-[#D9C49E] text-[#805F2B] text-[10px] font-serif italic px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(150,110,50,0.2)]">
                    ✦ {exp.seal}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#A88858] font-semibold">
                      {exp.category}
                    </span>
                    <span className="font-serif italic text-lg font-bold text-[#805F2B] bg-[#F5EEDB] px-2.5 py-0.5 rounded-md border border-[#DFC9A5]">
                      {exp.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#241F1A] leading-snug group-hover:text-[#805F2B] transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-[#63574A] font-light leading-relaxed">
                    {exp.desc}
                  </p>

                  <div className="pt-2 text-[11px] text-[#8F6F3A] font-serif italic flex items-center gap-1.5 border-t border-[#EDE1D1]">
                    <Clock className="w-3.5 h-3.5 text-[#B89047]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => {
                    handleSend(`Gostaria de saber todos os detalhes do ritual: ${exp.title}`);
                    const chatEl = document.getElementById('concierge-sanctuary');
                    chatEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-gradient-to-r from-[#F6EEDD] to-[#EFE3CD] hover:from-[#EFE3CD] hover:to-[#E5D3B8] text-[#5C421B] border border-[#DFC9A5] rounded-xl py-3 text-xs font-serif italic flex items-center justify-center gap-2 transition-all shadow-[0_2px_8px_rgba(180,140,70,0.1)] active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
                  <span>Consultar com Helena Concierge</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      <LuxuryDivider />

      {/* ========================================================
          5. O SANTUÁRIO DA HELENA: CHAT VIP COM MOLDURA DOURADA
          ======================================================== */}
      <section id="concierge-sanctuary" className="py-10 px-4 max-w-4xl mx-auto">
        
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#A88858] font-bold">
            Atendimento Silencioso & Personalizado
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1F1914]">
            Helena • Sua Concierge Privée
          </h2>
          <p className="text-xs sm:text-sm text-[#63574A] font-light max-w-md mx-auto">
            Discorra sobre suas necessidades de relaxamento, dúvidas sobre ativos ou agende seu ritual privativo com total confidencialidade.
          </p>
        </div>

        {/* Casulo da Concierge com Borda Dupla Chanfrada e Vidro Óptico */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9]/95 via-white/95 to-[#FAF5EB]/95 backdrop-blur-2xl border-2 border-[#DEC9A5] rounded-[36px] shadow-[0_30px_70px_rgba(150,110,50,0.18),_inset_0_2px_4px_rgba(255,255,255,0.95)] overflow-hidden">
          
          <ImperialFiligreeCorner className="absolute top-2 left-2" />
          <ImperialFiligreeCorner className="absolute top-2 right-2 -scale-x-100" />

          {/* Header do Casulo da Concierge */}
          <div className="p-5 sm:p-6 border-b border-[#EFE3CF] bg-gradient-to-r from-[#FAF5EB] via-[#FFFDF9] to-[#FAF5EB] flex items-center justify-between">
            <div className="flex items-center gap-4">
              
              {/* Camafeu Oval com Halo Dourado */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-[0_4px_12px_rgba(180,140,60,0.35)] p-0.5 bg-gradient-to-tr from-[#C5A059] to-[#F5ECE0]">
                  <img 
                    src={helenaPortraitImg} 
                    alt="Helena Concierge"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>

              <div>
                <h3 className="font-serif italic text-lg sm:text-xl font-normal text-[#241F1A]">
                  Helena • Concierge Privée
                </h3>
                <p className="text-[11px] text-[#805F2B] font-light flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                  Maison Lumière • Pronta para acolher seus desejos
                </p>
              </div>
            </div>

            {/* Ação WhatsApp Direta */}
            <a
              href="https://wa.me/5511977778888?text=Ol%C3%A1%2C+desejo+falar+com+a+concierge+da+Maison+Lumi%C3%A8re"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#12231A] hover:bg-[#1C3628] text-white text-xs font-light px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md active:scale-95 transition-all border border-[#C5A059]/40"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#E5C78E]" />
              <span className="hidden sm:inline font-serif italic text-sm">Transferir para WhatsApp</span>
            </a>
          </div>

          {/* Botões de Consulta Nobres em Pílula Dourada */}
          <div className="p-3.5 bg-[#F9F4EB]/80 border-b border-[#EFE3CF] flex flex-wrap gap-2 text-xs">
            <span className="text-[11px] text-[#805F2B] font-serif italic self-center mr-1">Toques recomendados:</span>
            <button 
              onClick={() => handleSend('Quais são os rituais com ofurô para casal ou presente?')}
              className="bg-white hover:bg-[#F3E7D3] text-[#5C421B] px-3.5 py-1.5 rounded-full border border-[#DFC9A5] text-xs font-light transition active:scale-95 shadow-sm"
            >
              🛁 Banho de ofurô e relaxamento
            </button>
            <button 
              onClick={() => handleSend('Como funciona o protocolo de Ouro 24k e quais os benefícios?')}
              className="bg-white hover:bg-[#F3E7D3] text-[#5C421B] px-3.5 py-1.5 rounded-full border border-[#DFC9A5] text-xs font-light transition active:scale-95 shadow-sm"
            >
              ✨ Ritual de Ouro 24k
            </button>
            <button 
              onClick={() => handleSend('Como posso presentear alguém com um Gift Card VIP?')}
              className="bg-white hover:bg-[#F3E7D3] text-[#5C421B] px-3.5 py-1.5 rounded-full border border-[#DFC9A5] text-xs font-light transition active:scale-95 shadow-sm"
            >
              🎁 Gift Card de presente
            </button>
          </div>

          {/* Área das Mensagens com Textura Perolada */}
          <div className="p-5 sm:p-7 h-80 sm:h-96 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FCFAF6] to-[#F7F2E7]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[76%] rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#946F34] to-[#7A5924] text-white rounded-br-none font-light'
                      : 'bg-white border border-[#E8DDCD] text-[#241F1A] rounded-bl-none font-light shadow-[0_6px_20px_rgba(180,140,70,0.08)]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#A88858] mt-1 px-1 font-serif italic">
                  {msg.time}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 bg-white/95 border border-[#DEC9A5] px-4 py-2.5 rounded-2xl w-fit text-xs text-[#805F2B] shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89047] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89047] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89047] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs font-serif italic ml-1.5">Helena está formulando sua resposta com gentileza...</span>
              </div>
            )}
            <div ref={chatScrollRef} />
          </div>

          {/* Campo de Entrada de Mensagem com Bordas Ouro Suave */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-[#FAF5EB] border-t border-[#EFE3CF] flex items-center gap-2.5"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pergunte delicadamente à Helena..."
              disabled={isLoading}
              className="flex-1 bg-white border border-[#DEC9A5] rounded-full px-5 py-3 text-xs sm:text-sm text-[#241F1A] placeholder-[#9E8B75] focus:outline-none focus:border-[#B89047] focus:ring-2 focus:ring-[#B89047]/20 font-light shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-gradient-to-r from-[#173023] to-[#12231A] hover:from-[#1E3D2D] hover:to-[#172D21] text-white p-3 sm:px-6 sm:py-3 rounded-full text-xs font-light tracking-wide flex items-center gap-2 active:scale-95 disabled:opacity-40 transition-all shadow-lg border border-[#C5A059]/40"
            >
              <Send className="w-3.5 h-3.5 text-[#E5C78E]" />
              <span className="hidden sm:inline font-serif italic text-sm">Enviar</span>
            </button>
          </form>

        </div>

      </section>

      <LuxuryDivider />

      {/* ========================================================
          6. LOCALIZAÇÃO NOBRE & SIGILO DO ATENDIMENTO
          ======================================================== */}
      <section className="py-8 px-4 max-w-4xl mx-auto mb-20">
        <div className="bg-gradient-to-b from-white via-[#FCFAF5] to-[#F8F2E6] border-2 border-[#E5D7BF] rounded-[32px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(160,120,60,0.12)] text-center space-y-5">
          
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#A88858] font-bold block">
            Endereço Privativo
          </span>

          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1F1914] leading-tight">
            Alameda dos Aromas, 740
          </h2>

          <p className="text-xs sm:text-sm text-[#63574A] font-light max-w-lg mx-auto leading-relaxed">
            Jardim Europa, São Paulo • Valet privativo com manobrista discreto na porta. Entrada protegida para total sigilo e serenidade do seu momento.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/5511977778888?text=Ol%C3%A1%2C+quero+reservar+meu+hor%C3%A1rio+privativo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#173023] to-[#12231A] text-white text-xs font-light px-7 py-3.5 rounded-full shadow-[0_12px_30px_rgba(18,35,26,0.35)] border border-[#C5A059]/50 transition-all active:scale-95 flex items-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4 text-[#E5C78E]" />
              <span className="font-serif italic text-sm">Solicitar Agendamento Privativo</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          7. RODAPÉ DE PRESTÍGIO
          ======================================================== */}
      <footer className="border-t border-[#E8DDCD] py-10 text-center text-xs text-[#8C7B68] font-light space-y-2 bg-[#FAF5EB]">
        <BrandMedallion />
        <p className="font-serif italic text-base text-[#4A3820]">Maison Lumière • Haute Esthétique & Bien-Être</p>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#9E8B75]">São Paulo • Paris • Dedicação ao Cuidado Humano</p>
      </footer>

      {/* ========================================================
          8. BOTÃO JOIA DE WHATSAPP: ESMERALDA PROFUNDO COM ORO REAL
          ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511977778888?text=Ol%C3%A1%2C+gostaria+de+conversar+com+a+concierge+da+Maison+Lumi%C3%A8re"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3.5 bg-gradient-to-r from-[#173023] to-[#0E1D15] hover:from-[#1E3D2D] hover:to-[#14291E] text-white p-2.5 sm:px-4 sm:py-3.5 rounded-full shadow-[0_20px_45px_rgba(14,29,21,0.45)] border-2 border-[#C5A059] active:scale-95 transition-all duration-300"
        >
          {/* Camafeu com pulso dourado */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E5C78E] shadow-sm">
              <img 
                src={helenaPortraitImg} 
                alt="Concierge" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#12231A]" />
          </div>

          <div className="text-left pr-1.5 hidden sm:block">
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#E5C78E] font-medium leading-none">
              Concierge Online
            </span>
            <span className="block font-serif italic text-sm text-white leading-tight mt-1">
              Atendimento WhatsApp
            </span>
          </div>
        </a>
      </div>

    </div>
  );
}
