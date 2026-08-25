'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage, type ChipKey } from '@/context/LanguageContext';

const AVATAR_URL = 'https://i.imgur.com/W1FcJ2c.png';
const PAGE_BG    = '#0f0d1a';

type Message = { role: 'user' | 'bot'; text: string; hasWhatsApp?: boolean };

const KEYWORD_MAP: Array<{ keywords: string[]; key: ChipKey }> = [
  { keywords: ['quién','quien','sos','isidro','vos','presentate','who','about'],                   key: 'quien'    },
  { keywords: ['sistemas','construís','construis','web','aplicacion','desarrollas','build','make'], key: 'sistemas' },
  { keywords: ['cuesta','precio','costo','presupuesto','cobras','tarifa','cuánto','cost','price'],  key: 'costo'    },
  { keywords: ['proceso','cómo','como','empezamos','arranque','videollamada','process','start'],    key: 'proceso'  },
  { keywords: ['plazo','entrega','tiempo','cuándo','cuando','demora','deadline','timeline'],        key: 'plazos'   },
  { keywords: ['contratar','trabajo','servicio','freelance','empleo','contrato','hire','contact'],  key: 'contratar'},
];

function detectKey(input: string): ChipKey | null {
  const lower = input.toLowerCase();
  return KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)))?.key ?? null;
}

const CHAT_OVERLAP     = 120;
const CHAT_PADDING_TOP = 20;

const MSG_FONT = "'DM Sans', 'Space Grotesk', sans-serif";

export default function Hero() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);

  const avatarImgRef         = useRef<HTMLImageElement>(null);
  const floatTween           = useRef<gsap.core.Tween | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevLang             = useRef(t.hero.welcome);

  // Reset messages when language changes
  useEffect(() => {
    if (prevLang.current !== t.hero.welcome) {
      prevLang.current = t.hero.welcome;
      setMessages([{ role: 'bot', text: t.hero.welcome }]);
      setInput('');
      setTyping(false);
    }
  }, [t.hero.welcome]);

  // Initial message
  useEffect(() => {
    setMessages([{ role: 'bot', text: t.hero.welcome }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFloat = useCallback(() => {
    floatTween.current?.kill();
    if (!avatarImgRef.current) return;
    floatTween.current = gsap.to(avatarImgRef.current, {
      y: -8,
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

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [messages, typing]);

  const triggerBounce = useCallback(() => {
    if (!avatarImgRef.current) return;
    gsap.to(avatarImgRef.current, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 });
  }, []);

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
        ? t.hero.responses[key]
        : { text: t.hero.fallback };
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
      style={{ isolation: 'isolate' }}
    >
      <div className="relative w-full max-w-[520px] flex flex-col items-center">

        {/* ── AVATAR ───────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: 300,
            width: '100%',
            overflow: 'visible',
            flexShrink: 0,
            transform: 'translateZ(0)',
            willChange: 'transform',
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

        {/* ── CHAT BOX ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full overflow-hidden"
          style={{
            zIndex: 10,
            marginTop: -CHAT_OVERLAP,
            background: PAGE_BG,
            border: '1px solid rgba(59,158,255,0.15)',
            borderRadius: 24,
            boxShadow: '0 24px 80px rgba(59,158,255,0.12)',
            fontFamily: MSG_FONT,
          }}
        >
          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="px-5 pb-4 flex flex-col gap-2.5 overflow-y-auto"
            style={{ paddingTop: CHAT_PADDING_TOP, maxHeight: 280 }}
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
                  {i === 0 && msg.role === 'bot' ? (
                    <p
                      className="w-full text-center leading-relaxed"
                      style={{ color: '#c8d8ec', fontSize: 14, fontFamily: MSG_FONT }}
                    >
                      {msg.text}
                    </p>
                  ) : (
                    <div
                      className="max-w-[88%] leading-relaxed"
                      style={{
                        borderRadius: 18,
                        padding: '11px 14px',
                        fontSize: 13,
                        fontFamily: MSG_FONT,
                        background: msg.role === 'user' ? '#3b9eff' : 'rgba(255,255,255,0.06)',
                        color: msg.role === 'user' ? '#fff' : '#e2e8f0',
                      }}
                    >
                      {msg.text}
                      {msg.hasWhatsApp && (
                        <a
                          href="https://wa.me/5492615112980"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                          style={{ padding: '9px 14px', borderRadius: 12, fontSize: 13, background: '#25d366' }}
                        >
                          {t.hero.whatsappBtn}
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
                  <div
                    className="flex gap-1.5 items-center"
                    style={{ padding: '11px 14px', borderRadius: 18, background: 'rgba(255,255,255,0.06)' }}
                  >
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
          </div>

          {/* Chips */}
          <div
            className="px-4 py-3"
            style={{
              borderTop: '1px solid rgba(59,158,255,0.07)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}
          >
            {t.hero.chips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => sendMessage(chip.label, chip.key)}
                style={{
                  borderRadius: 999,
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: MSG_FONT,
                  background: 'transparent',
                  border: '1px solid rgba(59,158,255,0.25)',
                  color: '#3b9eff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,158,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59,158,255,0.55)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(59,158,255,0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(59,158,255,0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 flex gap-2"
            style={{ borderTop: '1px solid rgba(59,158,255,0.07)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }}
              placeholder={t.hero.placeholder}
              className="flex-1 text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all duration-200"
              style={{
                borderRadius: 14,
                padding: '11px 14px',
                fontSize: 13,
                fontFamily: MSG_FONT,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="transition-all duration-200 hover:opacity-88 hover:scale-[1.03]"
              style={{
                borderRadius: 12,
                padding: '11px 16px',
                background: '#3b9eff',
                color: '#03080f',
                fontWeight: 700,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
