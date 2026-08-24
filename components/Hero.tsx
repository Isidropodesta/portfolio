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

// px del avatar que solapan dentro del chat (cubiertos por z-10)
const AVATAR_OVERLAP = 72;
// altura en layout del wrapper — el img con height:auto puede ser más alto,
// el exceso queda en overflow:visible (arriba: libre; abajo: cubierto por chat)
const CONTAINER_H = 250;

export default function Hero() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Bienvenido a mi portfolio. ¿Qué te interesaría saber?' },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);

  const avatarImgRef = useRef<HTMLImageElement>(null);
  const floatTween   = useRef<gsap.core.Tween | null>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  // Float: GSAP anima translateY del img directamente.
  // El wrapper (overflow:visible, height fija) nunca cambia de tamaño → sin gaps.
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
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/8 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet/7 blur-[110px]" />

      <div className="relative z-10 w-full max-w-[620px] flex flex-col items-center">

        {/* ── AVATAR WRAPPER ──────────────────────────────────────────────────
         *  height: CONTAINER_H en layout (fija, no cambia con el float).
         *  overflow: visible → img puede sobresalir arriba (float) y abajo (chat).
         *  Centering con left/right:0 + margin:auto para que GSAP y: no compita
         *  con ningún translateX de CSS.
         */}
        <div
          style={{
            height: CONTAINER_H,
            overflow: 'visible',
            width: '100%',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={avatarImgRef}
            src={AVATAR_URL}
            alt="Isidro Podestá"
            style={{
              maxWidth: 280,
              width: 'auto',
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
         *  z-10 cubre AVATAR_OVERLAP px de la img que sobresalen debajo del wrapper.
         *  padding-top del área de mensajes = AVATAR_OVERLAP para que el texto
         *  arranque justo debajo de los pies del avatar.
         */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-full overflow-hidden"
          style={{
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
            className="px-6 pb-5 flex flex-col gap-3 max-h-64 overflow-y-auto"
            style={{ paddingTop: AVATAR_OVERLAP + 8 }}
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
                  {/* Mensaje inicial: texto centrado sin burbuja */}
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
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(59,158,255,0.25)',
                }}
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
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-4 py-2.5 rounded-xl text-accent font-bold transition-all duration-200"
              style={{
                background: 'rgba(59,158,255,0.1)',
                border: '1px solid rgba(59,158,255,0.25)',
              }}
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
