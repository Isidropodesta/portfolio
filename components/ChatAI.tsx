'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// ── Types ────────────────────────────────────────────────────────────────────
type Message = { role: 'user' | 'bot'; text: string; hasWhatsApp?: boolean };
type PoseKey = 'idle' | 'quien' | 'sistemas' | 'tech' | 'contratar';

// ── Avatar images ─────────────────────────────────────────────────────────────
const IMAGES: Record<PoseKey, string> = {
  idle:      'https://i.imgur.com/umag5qQ.jpg',
  quien:     'https://i.imgur.com/GlQg1hn.jpg',  // saludando
  sistemas:  'https://i.imgur.com/kkrlJ0v.jpg',  // señalando
  tech:      'https://i.imgur.com/01bDvYN.jpg',  // pensando
  contratar: 'https://i.imgur.com/KNhHcvJ.jpg',  // teléfono
};

// ── Chat data ─────────────────────────────────────────────────────────────────
const CHIPS: Array<{ label: string; poseKey: PoseKey }> = [
  { label: '¿Quién es Isidro?',                poseKey: 'quien' },
  { label: '¿Qué sistemas construís?',          poseKey: 'sistemas' },
  { label: '¿Con qué tecnologías trabajás?',    poseKey: 'tech' },
  { label: '¿Cómo contratarme?',               poseKey: 'contratar' },
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
  { keywords: ['quién', 'quien', 'sos', 'isidro', 'vos', 'presentate'], key: 'quien' },
  { keywords: ['sistemas', 'construís', 'construis', 'hacés', 'haces', 'web', 'aplicacion', 'aplicación', 'desarrollas'], key: 'sistemas' },
  { keywords: ['tecnolog', 'stack', 'react', 'node', 'herramienta', 'lenguaje', 'framework', 'programas', 'usas'], key: 'tech' },
  { keywords: ['contratar', 'trabajo', 'proyecto', 'servicio', 'freelance', 'precio', 'costo', 'tarifa', 'empleo', 'disponible'], key: 'contratar' },
];

function detectKey(input: string): Exclude<PoseKey, 'idle'> | null {
  const lower = input.toLowerCase();
  return KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))?.key ?? null;
}

// Two rAF to give React one full commit cycle
function nextPaint() {
  return new Promise<void>((r) => {
    requestAnimationFrame(() => requestAnimationFrame(() => r()));
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy una IA entrenada con información sobre Isidro. ¿Qué querés saber?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [pose, setPose] = useState<PoseKey>('idle');

  const avatarInnerRef = useRef<HTMLDivElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout>>();
  const busy = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Preload all images ───────────────────────────────────────────────────────
  useEffect(() => {
    Object.values(IMAGES).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // ── Float animation ──────────────────────────────────────────────────────────
  const startFloat = useCallback(() => {
    floatTween.current?.kill();
    if (!avatarInnerRef.current) return;
    floatTween.current = gsap.to(avatarInnerRef.current, {
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

  // ── Auto-scroll messages ─────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // ── Pose transition (GSAP) ───────────────────────────────────────────────────
  const changePose = useCallback(
    async (newPose: PoseKey) => {
      if (busy.current || newPose === pose) return;
      busy.current = true;
      clearTimeout(returnTimer.current);

      const el = avatarInnerRef.current;
      if (!el) { busy.current = false; return; }

      // Stop float so it doesn't fight the transition
      floatTween.current?.kill();

      // 1. Exit: slide down + fade out
      await gsap.to(el, { y: 40, opacity: 0, duration: 0.25, ease: 'power2.in' });

      // 2. Swap image while invisible
      setPose(newPose);
      await nextPaint(); // let React commit new src

      // 3. Enter: from below + fade + scale bounce
      gsap.set(el, { y: 50, scale: 0.92, opacity: 0 });
      await gsap.to(el, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.6)' });

      busy.current = false;
      startFloat();

      // 4. Return to idle after 3s
      if (newPose !== 'idle') {
        returnTimer.current = setTimeout(async () => {
          if (busy.current) return;
          busy.current = true;
          floatTween.current?.kill();
          await gsap.to(el, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
          setPose('idle');
          await nextPaint();
          gsap.set(el, { y: 20, opacity: 0, scale: 1 });
          await gsap.to(el, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' });
          busy.current = false;
          startFloat();
        }, 3000);
      }
    },
    [pose, startFloat]
  );

  // ── Send message ──────────────────────────────────────────────────────────────
  function sendMessage(text: string, poseOverride?: Exclude<PoseKey, 'idle'> | undefined) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    const key = poseOverride ?? detectKey(trimmed);
    if (key) changePose(key);

    setTimeout(() => {
      const response =
        key
          ? RESPONSES[key]
          : { text: 'Podés preguntarme sobre quién es Isidro, qué sistemas construye, sus tecnologías o cómo contratarlo.' };
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: response.text, hasWhatsApp: response.hasWhatsApp },
      ]);
    }, 800);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    if (val.length === 1 && pose === 'idle') changePose('tech'); // first keystroke → thinking
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section className="py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/*
           * Mobile:  column (avatar above, chat below)
           * Desktop: row    (chat left, avatar right)
           */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">

            {/* ── Chat card (left on desktop) ─────────────────────────────── */}
            <div className="flex-1 min-w-0 order-last md:order-first bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,158,255,0.07)]">
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
              <div className="px-4 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
                            className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20c95f] text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/[0.07] px-4 py-3.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -5, 0] }}
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
                    onClick={() => sendMessage(chip.label, chip.poseKey as Exclude<PoseKey, 'idle'>)}
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
                  className="px-4 py-2.5 rounded-xl bg-accent/[0.12] border border-accent/25 text-accent hover:bg-accent/[0.22] transition-all duration-200 font-bold text-base"
                >
                  →
                </button>
              </div>
            </div>

            {/* ── Avatar (right on desktop, above on mobile) ──────────────── */}
            <div className="order-first md:order-last flex-shrink-0 flex justify-center md:block">
              {/*
               * Clip container:
               *   Mobile  → w-44 h-52  (small, above chat)
               *   Desktop → w-[260px] h-[62vh]  (large, waist-up)
               *
               * overflow-hidden clips the bottom (feet) on both sizes.
               * The inner div is anchored to the container bottom so the
               * character's head is always visible at the top.
               */}
              <div className="relative overflow-hidden rounded-2xl
                              w-44 h-52
                              md:w-[260px] md:h-[62vh]">
                {/* GSAP animates this div (translateY for float + transitions) */}
                <div
                  ref={avatarInnerRef}
                  className="absolute bottom-0 left-0 right-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[pose]}
                    alt="Isidro avatar"
                    className="w-full h-auto block select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Scroll indicator */}
          <motion.p
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-center mt-10 text-slate-500 text-sm select-none"
          >
            Scroll para explorar ↓
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
