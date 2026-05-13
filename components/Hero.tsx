'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { removeBackground } from '@/lib/removeBackground';

// ─── Types ────────────────────────────────────────────────────────────────────
type PoseKey = 'idle' | 'quien' | 'sistemas' | 'tech' | 'contratar';
type Message  = { role: 'user' | 'bot'; text: string; hasWhatsApp?: boolean };

// ─── Avatar images (PNG, transparent background) ──────────────────────────────
const IMAGES: Record<PoseKey, string> = {
  idle:      'https://i.imgur.com/umag5qQ.png',
  quien:     'https://i.imgur.com/GlQg1hn.png',
  sistemas:  'https://i.imgur.com/kkrlJ0v.png',
  tech:      'https://i.imgur.com/01bDvYN.png',
  contratar: 'https://i.imgur.com/KNhHcvJ.png',
};

// ─── Chat content ─────────────────────────────────────────────────────────────
const CHIPS: Array<{ label: string; poseKey: Exclude<PoseKey, 'idle'> }> = [
  { label: '¿Quién es Isidro?',                poseKey: 'quien'    },
  { label: '¿Qué sistemas construís?',          poseKey: 'sistemas' },
  { label: '¿Con qué tecnologías trabajás?',    poseKey: 'tech'     },
  { label: '¿Cómo contratarme?',               poseKey: 'contratar'},
];

const RESPONSES: Record<Exclude<PoseKey, 'idle'>, { text: string; hasWhatsApp?: boolean }> = {
  quien: {
    text: 'Soy estudiante de último año de Ingeniería en Sistemas en la UTN Mendoza. Tengo una mentalidad orientada a resolver problemas reales — no me interesa el código por el código, sino lo que ese código puede hacer por una empresa o persona. Me apasiona entender cómo funciona un negocio, encontrar dónde la tecnología puede hacer la diferencia y construir la solución adecuada. Combino formación técnica sólida con visión práctica: quiero que lo que construyo genere impacto real, no solo que funcione. Estoy en ese momento donde la carrera y los proyectos propios se fusionan, y el resultado es alguien que ya está construyendo mientras termina de formarse.',
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

const KEYWORD_MAP: Array<{ keywords: string[]; key: Exclude<PoseKey, 'idle'> }> = [
  { keywords: ['quién','quien','sos','isidro','vos','presentate'],               key: 'quien'    },
  { keywords: ['sistemas','construís','construis','web','aplicacion','desarrollas'], key: 'sistemas' },
  { keywords: ['tecnolog','stack','react','node','herramienta','lenguaje','framework'], key: 'tech'  },
  { keywords: ['contratar','trabajo','proyecto','servicio','freelance','precio','tarifa'], key: 'contratar' },
];

function detectKey(input: string): Exclude<PoseKey, 'idle'> | null {
  const lower = input.toLowerCase();
  return KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))?.key ?? null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy una IA entrenada con información sobre Isidro. ¿Qué querés saber?' },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);

  // Avatar state — ref mirrors state to avoid stale closures in GSAP callbacks
  const [poseState, setPoseState] = useState<PoseKey>('idle');
  const poseRef = useRef<PoseKey>('idle');
  const setPose = useCallback((p: PoseKey) => {
    poseRef.current = p;
    setPoseState(p);
  }, []);

  // Processed image URLs (background removed via canvas flood fill)
  const [srcs, setSrcs] = useState<Record<PoseKey, string>>(IMAGES);
  const [avatarReady, setAvatarReady] = useState(false);

  // Refs
  const avatarRef   = useRef<HTMLDivElement>(null);
  const floatTween  = useRef<gsap.core.Tween | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout>>();
  const busy        = useRef(false);
  const bottomRef   = useRef<HTMLDivElement>(null);

  // ── Process images: remove white/gray background via canvas flood fill ──────
  useEffect(() => {
    let cancelled = false;

    // Process idle first so the avatar appears quickly
    const order: PoseKey[] = ['idle', 'quien', 'sistemas', 'tech', 'contratar'];

    async function run() {
      for (const key of order) {
        if (cancelled) break;
        const clean = await removeBackground(IMAGES[key]);
        if (cancelled) break;
        setSrcs((prev) => ({ ...prev, [key]: clean }));
        if (key === 'idle') setAvatarReady(true);
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  // ── Float animation ────────────────────────────────────────────────────────
  const startFloat = useCallback(() => {
    floatTween.current?.kill();
    if (!avatarRef.current) return;
    floatTween.current = gsap.to(avatarRef.current, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useEffect(() => {
    startFloat();
    return () => {
      floatTween.current?.kill();
      clearTimeout(returnTimer.current);
    };
  }, [startFloat]);

  // ── Auto-scroll chat ───────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // ── Pose change — exact GSAP pattern as specified ─────────────────────────
  const changePose = useCallback(
    (newPose: PoseKey) => {
      if (busy.current || newPose === poseRef.current) return;
      busy.current = true;
      clearTimeout(returnTimer.current);

      const el = avatarRef.current;
      if (!el) { busy.current = false; return; }

      floatTween.current?.kill();

      gsap.to(el, {
        y: 20,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          // Swap image while invisible
          setPose(newPose);

          // Wait two frames for React to commit the new src
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              gsap.fromTo(
                el,
                { y: -20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                  onComplete: () => {
                    busy.current = false;
                    startFloat();

                    // Return to idle after 3s
                    if (newPose !== 'idle') {
                      returnTimer.current = setTimeout(() => {
                        changePose('idle');
                      }, 3000);
                    }
                  },
                }
              );
            })
          );
        },
      });
    },
    [startFloat, setPose]
  );

  // ── Chat message sender ────────────────────────────────────────────────────
  function sendMessage(text: string, poseOverride?: Exclude<PoseKey, 'idle'>) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    const key = poseOverride ?? detectKey(trimmed);
    if (key) changePose(key);
    setTimeout(() => {
      const response = key
        ? RESPONSES[key]
        : { text: 'Podés preguntarme sobre quién es Isidro, qué sistemas construye, sus tecnologías o cómo contratarlo.' };
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: response.text, hasWhatsApp: response.hasWhatsApp }]);
    }, 800);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    if (val.length === 1 && poseRef.current === 'idle') changePose('tech');
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

      {/*
       * ─────────────────────────────────────────────────────────────────────
       * Vertical stack: [AVATAR] → [CHAT BOX] → [SCROLL HINT]
       * All children are centered by the parent flex-col + items-center.
       * ─────────────────────────────────────────────────────────────────────
       */}
      <div className="relative z-10 w-full max-w-[680px] flex flex-col items-center gap-5">

        {/* ── AVATAR ─────────────────────────────────────────────────────────
         *  280px tall. Background removed via canvas flood fill.
         *  Hidden (opacity 0) until the idle image is processed so there's
         *  no flash of the original gray background.
         */}
        <div
          ref={avatarRef}
          className="flex items-end justify-center transition-opacity duration-300"
          style={{ height: 280, opacity: avatarReady ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={srcs[poseState]}
            alt="Isidro avatar"
            style={{ height: 280, width: 'auto', display: 'block', userSelect: 'none' }}
            draggable={false}
          />
        </div>

        {/* ── CHAT BOX ───────────────────────────────────────────────────────
         *  Full width of the 680px container.
         */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,158,255,0.07)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07] bg-white/[0.02]">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-accent inline-block"
            />
            <span className="text-sm text-slate-400 font-mono">IP Assistant · Online</span>
          </div>

          {/* Messages */}
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
                        📲 Escribime por WhatsApp
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
                key={chip.poseKey}
                onClick={() => sendMessage(chip.label, chip.poseKey)}
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
              onChange={onInputChange}
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

        {/* ── SCROLL HINT ────────────────────────────────────────────────────── */}
        <motion.p
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-500 text-sm select-none"
        >
          Scroll para explorar ↓
        </motion.p>

      </div>
    </section>
  );
}
