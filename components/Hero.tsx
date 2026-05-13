'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// ─── Constantes ───────────────────────────────────────────────────────────────
const IDLE_IMAGE = 'https://i.imgur.com/umag5qQ.png';

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
    text: 'Soy estudiante de último año de Ingeniería en Sistemas en la UTN Mendoza. Tengo una mentalidad orientada a resolver problemas reales — no me interesa el código por el código, sino lo que ese código puede hacer por una empresa o persona. Me apasiona entender cómo funciona un negocio, encontrar dónde la tecnología puede hacer la diferencia y construir la solución adecuada. Combino formación técnica sólida con visión práctica: quiero que lo que construyo genere impacto real, no solo que funcione.',
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
  { keywords: ['quién','quien','sos','isidro','vos','presentate'],                    key: 'quien'     },
  { keywords: ['sistemas','construís','construis','web','aplicacion','desarrollas'],  key: 'sistemas'  },
  { keywords: ['tecnolog','stack','react','node','herramienta','lenguaje','framework'], key: 'tech'    },
  { keywords: ['contratar','trabajo','proyecto','servicio','freelance','precio'],      key: 'contratar' },
];

function detectKey(input: string): ChipKey | null {
  const lower = input.toLowerCase();
  return KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))?.key ?? null;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export default function Hero() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy una IA entrenada con información sobre Isidro. ¿Qué querés saber?' },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);

  const avatarRef  = useRef<HTMLDivElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  // ── Flotación idle ────────────────────────────────────────────────────────
  const startFloat = useCallback(() => {
    floatTween.current?.kill();
    if (!avatarRef.current) return;
    floatTween.current = gsap.to(avatarRef.current, {
      y: -10,
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

  // ── Bounce al clickear chip ────────────────────────────────────────────────
  const triggerBounce = useCallback(() => {
    const el = avatarRef.current;
    if (!el) return;
    floatTween.current?.kill();
    gsap.to(el, {
      y: -18,
      duration: 0.14,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(el, {
          y: 0,
          duration: 0.5,
          ease: 'bounce.out',
          onComplete: startFloat,
        });
      },
    });
  }, [startFloat]);

  // ── Auto-scroll chat ───────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // ── Enviar mensaje ─────────────────────────────────────────────────────────
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
      setMessages((prev) => [...prev, { role: 'bot', text: response.text, hasWhatsApp: response.hasWhatsApp }]);
    }, 800);
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-10 dot-grid overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/8 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet/7 blur-[110px]" />

      <div className="relative z-10 w-full max-w-[680px] flex flex-col items-center">

        {/* ── AVATAR ─────────────────────────────────────────────────────────
         *  Usa mix-blend-mode: multiply para fusionar el fondo blanco/gris
         *  con el fondo oscuro de la página. Se posiciona con mb negativo
         *  para que "sobresalga" por encima del chat box.
         */}
        <div
          ref={avatarRef}
          className="relative z-20 flex justify-center"
          style={{ marginBottom: -72 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IDLE_IMAGE}
            alt="Isidro Podestá"
            style={{
              width: 230,
              height: 340,
              objectFit: 'cover',
              objectPosition: 'top center',
              mixBlendMode: 'multiply',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </div>

        {/* ── CHAT BOX ───────────────────────────────────────────────────────
         *  z-10 (debajo del avatar). El spacer de 72px al inicio empuja
         *  el contenido visible por debajo de los pies del avatar.
         */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,158,255,0.07)]"
        >
          {/* Espacio para los pies del avatar */}
          <div style={{ height: 72 }} />

          {/* Header */}
          <div className="flex flex-col px-5 py-3 border-t border-b border-white/[0.07] bg-white/[0.02]">
            <span className="text-sm font-semibold text-slate-100 leading-tight">Preguntame sobre mí</span>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5">Respondido por Isidro · IA</span>
          </div>

          {/* Mensajes */}
          <div className="px-4 py-4 flex flex-col gap-3 max-h-60 overflow-y-auto">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
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
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
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
          <div className="px-4 py-3 border-t border-white/[0.07] flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <button
                key={chip.key}
                onClick={() => sendMessage(chip.label, chip.key)}
                className="text-xs px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent hover:bg-accent/[0.16] hover:border-accent/40 transition-all duration-200"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/[0.07] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }}
              placeholder="Escribí tu pregunta..."
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent/40 focus:bg-white/[0.07] transition-all duration-200"
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-4 py-2.5 rounded-xl bg-accent/[0.12] border border-accent/25 text-accent hover:bg-accent/[0.22] transition-all duration-200 font-bold"
            >
              →
            </button>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-500 text-sm select-none mt-6"
        >
          Scroll para explorar ↓
        </motion.p>

      </div>
    </section>
  );
}
