'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const AVATAR_URL = 'https://i.imgur.com/W1FcJ2c.png';

type Message = { role: 'user' | 'bot'; text: string; hasWhatsApp?: boolean };

const CHIPS = [
  { label: '¿Quién es Isidro?',             key: 'quien'     },
  { label: '¿Qué sistemas construís?',       key: 'sistemas'  },
  { label: '¿Con qué tecnologías trabajás?', key: 'tech'      },
  { label: '¿Cómo contratarme?',            key: 'contratar' },
] as const;

type ChipKey = typeof CHIPS[number]['key'];

const RESPONSES: Record<ChipKey, { text: string; hasWhatsApp?: boolean }> = {
  quien: {
    text: 'Soy estudiante de último año de Ingeniería en Sistemas en la UTN Mendoza. Tengo una mentalidad orientada a resolver problemas reales — no me interesa el código por el código, sino lo que ese código puede hacer por una empresa o persona.',
  },
  sistemas: {
    text: 'Construyo sistemas web completos desde cero: páginas web, sistemas de gestión, tiendas online y APIs. Me encargo de todo — desde la base de datos hasta lo que ve el usuario final.',
  },
  tech: {
    text: 'Mi stack principal es React, Next.js, Node.js y PostgreSQL. También manejo TypeScript, Python, Docker, Tailwind y Git. Elijo la herramienta según lo que el proyecto necesita, no al revés.',
  },
  contratar: {
    text: 'La forma más directa es por WhatsApp — solemos arrancar con una charla de 15 minutos para entender qué necesitás. Sin compromisos, sin formularios, solo una conversación.',
    hasWhatsApp: true,
  },
};

const KEYWORD_MAP: Array<{ keywords: string[]; key: ChipKey }> = [
  { keywords: ['quién','quien','sos','isidro','vos','presentate'],                     key: 'quien'     },
  { keywords: ['sistemas','construís','construis','web','aplicacion','desarrollas'],   key: 'sistemas'  },
  { keywords: ['tecnolog','stack','react','node','herramienta','lenguaje','framework'], key: 'tech'     },
  { keywords: ['contratar','trabajo','proyecto','servicio','freelance','precio'],       key: 'contratar' },
];

function detectKey(input: string): ChipKey | null {
  const lower = input.toLowerCase();
  return KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))?.key ?? null;
}

// El chat sube CHAT_OVERLAP px sobre el avatar (tapa los pies).
// CHAT_PADDING_TOP empuja el contenido por debajo del área del avatar.
const CHAT_OVERLAP    = 80;
const CHAT_PADDING_TOP = 120;

export default function Hero() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Bienvenido a mi portfolio. ¿Qué te interesaría saber?' },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);

  const avatarImgRef = useRef<HTMLImageElement>(null);
  const floatTween   = useRef<gsap.core.Tween | null>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  // Float: translateY sobre el img — no afecta el layout (sin gaps).
  const startFloat = useCallback(() => {
    floatTween.current?.kill();
    if (!avatarImgRef.current) return;
    floatTween.current = gsap.to(avatarImgRef.current, {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useEffect(() => {
    startFloat();
    return () => { floatTween.current?.kill(); };
  }, [startFloat]);

  const triggerBounce = useCallback(() => {
    if (!avatarImgRef.current) return;
    gsap.to(avatarImgRef.current, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string, chipKey?: ChipKey) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    triggerBounce();
    const key = chipKey ?? detectKey(trimmed);
    setTimeout(() => {
      const response = key
        ? RESPONSES[key]
        : { text: 'Podés preguntarme sobre quién es Isidro, qué sistemas construye, sus tecnologías o cómo contratarlo.' };
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: response.text, hasWhatsApp: response.hasWhatsApp },
      ]);
    }, 800);
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 dot-grid overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[620px] flex flex-col items-center">

        {/* ── AVATAR ──────────────────────────────────────────────────────────
         *  position: relative contiene el img (position: absolute, bottom: 0).
         *  height: 300px → espacio vertical en layout.
         *  overflow: visible → la cabeza puede sobresalir arriba durante el float
         *  sin crear gaps en el layout (transform no afecta el flujo).
         *  Centrado con left/right: 0 + margin: auto (sin translateX en CSS
         *  para que GSAP y: no compita con transforms).
         */}
        <div
          style={{
            position: 'relative',
            height: 300,
            width: '100%',
            overflow: 'visible',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={avatarImgRef}
            src={AVATAR_URL}
            alt="Isidro Podestá"
            style={{
              width: 260,
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
            }}
            draggable={false}
          />
        </div>

        {/* ── CHAT BOX ────────────────────────────────────────────────────────
         *  marginTop: -CHAT_OVERLAP → el chat sube y tapa los pies del avatar.
         *  z-index: 10 → queda por encima del img.
         *  paddingTop: CHAT_PADDING_TOP → el contenido arranca debajo del avatar.
         */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full overflow-hidden"
          style={{
            zIndex: 10,
            marginTop: -CHAT_OVERLAP,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(59,158,255,0.15)',
            borderRadius: 24,
            boxShadow: '0 8px 40px rgba(59,158,255,0.07)',
          }}
        >
          {/* Área de mensajes */}
          <div
            className="px-6 pb-5 flex flex-col gap-3 max-h-72 overflow-y-auto"
            style={{ paddingTop: CHAT_PADDING_TOP }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Primer mensaje del bot: texto centrado sin burbuja */}
                  {i === 0 && msg.role === 'bot' ? (
                    <p
                      className="w-full text-center leading-relaxed"
                      style={{ color: '#c8d8ec', fontSize: 16 }}
                    >
                      {msg.text}
                    </p>
                  ) : (
                    <div
                      className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent text-white rounded-br-sm'
                          : 'bg-white/[0.07] text-slate-200 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                      {msg.hasWhatsApp && (
                        <a
                          href="https://wa.me/549261512980"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#22c55e] text-white text-sm font-semibold transition-all hover:scale-[1.02]"
                        >
                          Escribime por WhatsApp
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.07] px-4 py-3.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.12, ease: 'easeInOut' }}
                        className="w-1.5 h-1.5 rounded-full bg-accent/70 inline-block"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Chips */}
          <div className="px-5 py-3.5 border-t border-white/[0.06] flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <button
                key={chip.key}
                onClick={() => sendMessage(chip.label, chip.key)}
                className="text-xs px-3.5 py-1.5 rounded-full text-accent transition-all duration-200 hover:shadow-[0_0_10px_rgba(59,158,255,0.2)]"
                style={{ background: 'transparent', border: '1px solid rgba(59,158,255,0.25)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(59,158,255,0.25)';
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-white/[0.06] flex gap-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }}
              placeholder="Escribí tu pregunta..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all duration-200"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-4 py-2.5 rounded-xl text-accent font-bold transition-all duration-200"
              style={{ background: 'rgba(59,158,255,0.1)', border: '1px solid rgba(59,158,255,0.25)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,158,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(59,158,255,0.1)'; }}
            >
              →
            </button>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-500 text-sm select-none mt-5"
        >
          Scroll para explorar ↓
        </motion.p>
      </div>
    </section>
  );
}
