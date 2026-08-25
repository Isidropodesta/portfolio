'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, type Lang } from '@/context/LanguageContext';

function LangSelector() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const other: Lang = lang === 'es' ? 'en' : 'es';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'transparent',
          border: '1px solid rgba(59,158,255,0.25)',
          color: '#3b9eff',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 13,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: "'Space Grotesk', sans-serif",
          transition: 'border-color 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,158,255,0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(59,158,255,0.25)'; }}
      >
        {t.nav.langLabel}
        <span
          style={{
            display: 'inline-block',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            fontSize: 10,
            lineHeight: 1,
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#10111e',
            border: '1px solid rgba(59,158,255,0.2)',
            borderRadius: 8,
            overflow: 'hidden',
            minWidth: '100%',
            zIndex: 200,
          }}
        >
          <button
            onClick={() => { setLang(other); setOpen(false); }}
            style={{
              display: 'block',
              width: '100%',
              padding: '9px 16px',
              fontSize: 13,
              color: '#3b9eff',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Space Grotesk', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,158,255,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {t.nav.langOther}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0d1a]/85 backdrop-blur-md border-b border-white/5 shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        isolation: 'isolate',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#inicio"
          className="font-mono font-bold text-xl tracking-wider text-accent hover:opacity-80 transition-opacity"
        >
          IP.DEV
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-300 hover:text-accent transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a
            href="https://wa.me/5492615112980"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent/60 transition-colors duration-200"
          >
            {t.nav.cta}
          </a>
          <LangSelector />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-[#0f0d1a]/95 backdrop-blur-md border-b border-white/5 px-4 py-5">
          <ul className="flex flex-col gap-4 mb-4">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-slate-300 hover:text-accent transition-colors text-sm"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <a
              href="https://wa.me/5492615112980"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm font-medium"
            >
              {t.nav.cta}
            </a>
            <LangSelector />
          </div>
        </div>
      )}
    </nav>
  );
}
