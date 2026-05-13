'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
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
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
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

        {/* CTA button */}
        <a
          href="https://wa.me/549261512980"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent/60 transition-colors duration-200"
        >
          Reservar llamada
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-accent transition-colors"
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
        <div className="md:hidden bg-[#0f0d1a]/95 backdrop-blur-md border-b border-white/5 px-4 py-5">
          <ul className="flex flex-col gap-4 mb-4">
            {LINKS.map((l) => (
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
          <a
            href="https://wa.me/549261512980"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm font-medium"
          >
            Reservar llamada
          </a>
        </div>
      )}
    </nav>
  );
}
