# Portfolio Isidro Podestá — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portfolio personal completo en Next.js 14 + TypeScript + Tailwind CSS con 8 secciones animadas, chat AI con keyword matching, bento grid, globo 3D de habilidades y formulario de contacto.

**Architecture:** Single-page Next.js App Router app. Un componente por sección. Framer Motion para animaciones `whileInView`. Globo 3D implementado con canvas + CSS 3D transforms (sin Three.js). EmailJS para el formulario de contacto.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, @emailjs/browser

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.js`
- Create: `.env.local.example`
- Create: `.gitignore`

- [ ] **Step 1: Crear package.json**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.2.10",
    "@emailjs/browser": "^4.3.3"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.12.12",
    "tailwindcss": "^3.4.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.3"
  }
}
```

- [ ] **Step 2: Crear next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 3: Crear tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0d1a',
        accent: '#3b9eff',
        violet: '#7b5ea7',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3b9eff, #7b5ea7)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Crear tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Crear postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Crear .env.local.example**

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

- [ ] **Step 7: Crear .gitignore**

```
node_modules/
.next/
.env.local
.superpowers/
out/
```

- [ ] **Step 8: Instalar dependencias**

```bash
npm install
```

---

### Task 2: globals.css + layout.tsx

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Crear app/globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0f0d1a;
  --accent: #3b9eff;
  --violet: #7b5ea7;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0f0d1a;
  color: #e2e8f0;
  font-family: 'Space Grotesk', sans-serif;
  overflow-x: hidden;
}

/* Dot grid background */
.dot-grid {
  background-image: radial-gradient(circle, rgba(59, 158, 255, 0.15) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #3b9eff, #7b5ea7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0f0d1a; }
::-webkit-scrollbar-thumb { background: #3b9eff44; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3b9eff88; }

/* Selection */
::selection { background: #3b9eff33; color: #e2e8f0; }
```

- [ ] **Step 2: Crear app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Isidro Podestá — Desarrollador Full Stack',
  description:
    'Portfolio de Isidro Podestá. Desarrollador Full Stack, estudiante de Ingeniería en Sistemas en UTN Mendoza. Construyo aplicaciones web, sistemas de gestión y tiendas online.',
  keywords: ['desarrollador web', 'full stack', 'mendoza', 'next.js', 'react', 'portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-bg text-slate-200 font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar tipos**

```bash
npx tsc --noEmit
```

---

### Task 3: Nav

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Crear components/Nav.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
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
          ? 'bg-[#0f0d1a]/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#inicio"
          className="font-mono font-bold text-xl text-accent tracking-wider hover:opacity-80 transition-opacity"
        >
          IP.DEV
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-300 hover:text-accent transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://wa.me/549261512980"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-all duration-200"
        >
          📅 Reservar llamada
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f0d1a]/95 backdrop-blur-md border-b border-white/5 px-4 py-4">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-slate-300 hover:text-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/549261512980"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent"
              >
                📅 Reservar llamada
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
```

---

### Task 4: Hero

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Crear components/Hero.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 dot-grid overflow-hidden"
    >
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-accent inline-block"
          />
          Disponible para proyectos
        </motion.div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-full ring-2 ring-accent/60 ring-offset-2 ring-offset-bg overflow-hidden shadow-[0_0_32px_rgba(59,158,255,0.3)]">
            <Image
              src="https://i.imgur.com/F7fUvUm.jpg"
              alt="Isidro Podestá"
              width={112}
              height={112}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold leading-tight"
        >
          Hola, soy{' '}
          <span className="gradient-text">Isidro Podestá</span>
        </motion.h1>

        {/* Big phrase */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-semibold leading-snug text-slate-100 max-w-2xl"
        >
          La tecnología no resuelve problemas,{' '}
          <span className="gradient-text">las personas sí.</span>{' '}
          Yo soy las dos cosas.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-slate-400 font-mono"
        >
          Próximamente ingeniero. Actualmente construyendo.
        </motion.p>

        {/* Data line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 text-sm text-slate-400"
        >
          {['Desarrollador Full Stack', 'Ingeniero en Sistemas', 'Mendoza, Argentina'].map(
            (item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-accent/40">·</span>}
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 5: ChatAI

**Files:**
- Create: `components/ChatAI.tsx`

- [ ] **Step 1: Crear components/ChatAI.tsx**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'bot'; text: string; hasWhatsApp?: boolean };

const CHIPS = [
  { label: '¿Quién es Isidro?', key: 'quien' },
  { label: '¿Qué sistemas construís?', key: 'sistemas' },
  { label: '¿Con qué tecnologías trabajás?', key: 'tech' },
  { label: '¿Cómo contratarme?', key: 'contratar' },
];

const RESPONSES: Record<string, { text: string; hasWhatsApp?: boolean }> = {
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

const KEYWORD_MAP: Array<{ keywords: string[]; key: string }> = [
  { keywords: ['quién', 'quien', 'sos', 'isidro', 'vos'], key: 'quien' },
  { keywords: ['sistemas', 'construís', 'construis', 'hacés', 'haces', 'web', 'aplicacion', 'aplicación'], key: 'sistemas' },
  { keywords: ['tecnolog', 'stack', 'react', 'node', 'herramienta', 'lenguaje', 'framework'], key: 'tech' },
  { keywords: ['contratar', 'contrató', 'contrato', 'precio', 'costo', 'trabajo', 'proyecto', 'servicio', 'empleo', 'freelance'], key: 'contratar' },
];

function getKeyFromInput(input: string): string | null {
  const lower = input.toLowerCase();
  const match = KEYWORD_MAP.find((m) => m.keywords.some((k) => lower.includes(k)));
  return match ? match.key : null;
}

export default function ChatAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy una IA entrenada con información sobre Isidro. ¿Qué querés saber?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const key = getKeyFromInput(text);
      const response = key
        ? RESPONSES[key]
        : { text: 'Podés preguntarme sobre quién es Isidro, qué sistemas construye, sus tecnologías o cómo contratarlo.', hasWhatsApp: false };
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: response.text, hasWhatsApp: response.hasWhatsApp }]);
    }, 800);
  }

  function onChipClick(key: string) {
    const chip = CHIPS.find((c) => c.key === key)!;
    sendMessage(chip.label);
  }

  return (
    <section className="py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Chat card */}
        <div className="bg-white/3 backdrop-blur-sm border border-white/8 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,158,255,0.08)]">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-slate-400 font-mono">IP Assistant · Online</span>
          </div>

          {/* Messages */}
          <div className="px-5 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-white/8 text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.hasWhatsApp && (
                      <a
                        href="https://wa.me/549261512980"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
                      >
                        📲 Escribime por WhatsApp
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 h-1.5 rounded-full bg-accent/60 inline-block"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Chips */}
          <div className="px-5 py-3 border-t border-white/8 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <button
                key={chip.key}
                onClick={() => onChipClick(chip.key)}
                className="text-xs px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all duration-200"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-3 border-t border-white/8 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Escribí tu pregunta..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent/40 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-4 py-2 rounded-xl bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-all duration-200 text-sm"
            >
              →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center mt-8 text-slate-500 text-sm"
        >
          Scroll para explorar ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

### Task 6: About — Bento Grid

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Crear components/About.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const cardBase =
  'rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(59,158,255,0.08)] transition-all duration-300 hover:-translate-y-0.5';

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            Conóceme{' '}
            <span className="gradient-text">mejor</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Card 1 — Name + role (wide) */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} lg:col-span-2 flex flex-col justify-between min-h-[120px]`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Identidad</p>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-100 font-mono leading-tight">
                ISIDRO PODESTÁ
              </p>
              <p className="text-lg text-slate-400 font-mono mt-1">/ DESARROLLADOR FULL STACK</p>
            </div>
          </motion.div>

          {/* Card 2 — Photo */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} flex items-center justify-center min-h-[200px]`}
          >
            <div className="w-32 h-32 rounded-full ring-2 ring-accent/40 ring-offset-2 ring-offset-[#0f0d1a] overflow-hidden">
              <Image
                src="https://i.imgur.com/F7fUvUm.jpg"
                alt="Isidro Podestá"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Card 3 — Universidad */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} group`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Formación</p>
            <p className="font-semibold text-slate-100">UTN Mendoza</p>
            <p className="text-sm text-slate-400 mt-1">Ingeniería en Sistemas, 5° año cursando.</p>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              A punto de recibirme con foco en construir sistemas reales para clientes reales.
            </p>
          </motion.div>

          {/* Card 4 — Mentalidad */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase}`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Mentalidad</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Construyo más que software. No veo la tecnología como un fin en sí mismo, sino como una herramienta
              para resolver problemas, mejorar procesos y generar valor real.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 rounded-lg px-3 py-1.5">
              🏉 Rugby — Torneo del Interior A
            </div>
          </motion.div>

          {/* Card 5 — Voluntariado */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase}`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Impacto</p>
            <p className="font-semibold text-slate-100 mb-1">Voluntariado</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Voluntario en <span className="text-slate-300 font-medium">Crecer Felices</span> — acompaño a niños en
              merenderos y centros de apoyo escolar, aportando aprendizaje y contención.
            </p>
          </motion.div>

          {/* Card 6 — Ubicación */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} flex flex-col justify-between`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Ubicación</p>
            <div className="font-mono">
              <p className="text-lg font-bold text-slate-100">MENDOZA, AR</p>
              <p className="text-sm text-slate-500 mt-1">32.8908° S, 68.8272° O</p>
              <p className="text-sm text-slate-500">GMT−3</p>
            </div>
          </motion.div>

          {/* Card 7 — Especialidad (wide) */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} lg:col-span-2`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-accent font-mono uppercase tracking-widest">Especialidad</p>
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Disponible para proyectos
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Construyo aplicaciones web, sistemas de gestión y tiendas online desde cero.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Next.js', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 8 — Stats */}
          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} flex flex-col justify-center items-center text-center gap-3`}
          >
            {[
              { value: '5°', label: 'año ingeniería' },
              { value: '3+', label: 'años programando' },
              { value: '∞', label: 'café' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold gradient-text font-mono">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Card 9 — Objetivo */}
          <motion.div
            custom={8}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${cardBase} lg:col-span-2`}
          >
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Objetivo</p>
            <p className="text-slate-300 leading-relaxed">
              Construir sistemas que generen valor real.{' '}
              <span className="text-slate-400">
                Buscando proyectos web para desarrollar soluciones completas.
              </span>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Projects

**Files:**
- Create: `components/Projects.tsx`

- [ ] **Step 1: Crear components/Projects.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    number: '01',
    type: 'Aplicación Web',
    title: 'Plataforma de Concesionaria',
    description:
      'Sistema completo de gestión para concesionaria de autos. Catálogo dinámico con filtros avanzados, panel de administración, gestión de clientes y sistema de consultas. API REST con base de datos en la nube.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Neon', 'Express'],
    icon: '🚗',
    bgColor: 'from-blue-900/80 to-blue-800/40',
    accentColor: '#3b9eff',
    repo: 'https://github.com/Isidropodesta/ruedas',
  },
  {
    number: '02',
    type: 'Herramienta / Diseño',
    title: 'Generador de Fixtures Rugby',
    description:
      'Herramienta visual para generar fixtures y posters del Torneo del Interior A. Escudos reales de equipos, datos actualizados y exportación en alta resolución.',
    stack: ['React', 'SVG', 'Canvas API'],
    icon: '🏉',
    bgColor: 'from-violet-900/80 to-purple-800/40',
    accentColor: '#7b5ea7',
    repo: null,
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            Proyectos{' '}
            <span className="gradient-text">Destacados</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-slate-400 mb-14"
        >
          Una selección de los sistemas que construí.
        </motion.p>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-accent/30 hover:shadow-[0_0_30px_rgba(59,158,255,0.1)] transition-all duration-300"
            >
              {/* Visual area */}
              <div className={`relative h-48 bg-gradient-to-br ${project.bgColor} overflow-hidden`}>
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(${project.accentColor}33 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}33 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                  }}
                />
                {/* Number & type */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold opacity-30 text-white">
                    {project.number}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full border text-white/70"
                    style={{ borderColor: `${project.accentColor}44`, background: `${project.accentColor}15` }}
                  >
                    {project.type}
                  </span>
                </div>
                {/* Icon */}
                <div className="absolute bottom-4 right-4 text-5xl opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Ver repositorio
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Skills — Globe 3D

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Crear components/Skills.tsx**

```tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TECHS = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#f7c948' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'HTML', color: '#e34c26' },
  { name: 'CSS', color: '#3b9eff' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git', color: '#f05032' },
  { name: 'Linux', color: '#c8d8ec' },
  { name: 'Express', color: '#c8d8ec' },
];

type Point3D = [number, number, number];
type TechItem = { name: string; color: string; x: number; y: number; z: number; scale: number; opacity: number };

function fibonacciSphere(n: number): Point3D[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return [Math.cos(theta) * r, y, Math.sin(theta) * r] as Point3D;
  });
}

function rotatePoint([x, y, z]: Point3D, ax: number, ay: number): Point3D {
  const cosX = Math.cos(ax), sinX = Math.sin(ax);
  const ny = y * cosX - z * sinX;
  const nz = y * sinX + z * cosX;
  const cosY = Math.cos(ay), sinY = Math.sin(ay);
  const nx = x * cosY + nz * sinY;
  const nz2 = -x * sinY + nz * cosY;
  return [nx, ny, nz2];
}

const BASE_POINTS = fibonacciSphere(TECHS.length);
const RADIUS = 160;
const SIZE = 380;

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef({ ax: 0.3, ay: 0 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const rafRef = useRef<number>(0);
  const [items, setItems] = useState<TechItem[]>([]);

  const drawSphere = useCallback((ctx: CanvasRenderingContext2D, ax: number, ay: number) => {
    ctx.clearRect(0, 0, SIZE, SIZE);
    const cx = SIZE / 2, cy = SIZE / 2;

    ctx.strokeStyle = 'rgba(59,158,255,0.12)';
    ctx.lineWidth = 0.8;

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const latRad = (lat * Math.PI) / 180;
      const latR = RADIUS * Math.cos(latRad);
      const latY = RADIUS * Math.sin(latRad);
      ctx.beginPath();
      for (let lng = 0; lng <= 360; lng += 6) {
        const lngRad = (lng * Math.PI) / 180;
        const [rx, ry] = rotatePoint([latR * Math.cos(lngRad), latY, latR * Math.sin(lngRad)], ax, ay);
        const persp = 1 + (rotatePoint([latR * Math.cos(lngRad), latY, latR * Math.sin(lngRad)], ax, ay)[2]) / (RADIUS * 4);
        const px = cx + rx * persp, py = cy + ry * persp;
        lng === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Longitude lines
    for (let lng = 0; lng < 180; lng += 30) {
      const lngRad = (lng * Math.PI) / 180;
      ctx.beginPath();
      for (let lat = -90; lat <= 90; lat += 6) {
        const latRad = (lat * Math.PI) / 180;
        const latR = RADIUS * Math.cos(latRad);
        const latY = RADIUS * Math.sin(latRad);
        const p: Point3D = [latR * Math.cos(lngRad), latY, latR * Math.sin(lngRad)];
        const [rx, ry, rz] = rotatePoint(p, ax, ay);
        const persp = 1 + rz / (RADIUS * 4);
        lat === -90 ? ctx.moveTo(cx + rx * persp, cy + ry * persp) : ctx.lineTo(cx + rx * persp, cy + ry * persp);
      }
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function tick() {
      if (!dragRef.current.active) rotRef.current.ay += 0.004;
      const { ax, ay } = rotRef.current;
      drawSphere(ctx, ax, ay);

      const newItems: TechItem[] = TECHS.map((tech, i) => {
        const base: Point3D = [BASE_POINTS[i][0] * RADIUS, BASE_POINTS[i][1] * RADIUS, BASE_POINTS[i][2] * RADIUS];
        const [rx, ry, rz] = rotatePoint(base, ax, ay);
        const depth = (rz + RADIUS) / (2 * RADIUS);
        return { name: tech.name, color: tech.color, x: rx, y: ry, z: rz, scale: 0.45 + depth * 0.85, opacity: 0.12 + depth * 0.88 };
      }).sort((a, b) => a.z - b.z);

      setItems(newItems);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawSphere]);

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    rotRef.current.ay += (e.clientX - dragRef.current.lastX) * 0.006;
    rotRef.current.ax += (e.clientY - dragRef.current.lastY) * 0.006;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };
  const onMouseUp = () => { dragRef.current.active = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { active: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active) return;
    rotRef.current.ay += (e.touches[0].clientX - dragRef.current.lastX) * 0.006;
    rotRef.current.ax += (e.touches[0].clientY - dragRef.current.lastY) * 0.006;
    dragRef.current.lastX = e.touches[0].clientX;
    dragRef.current.lastY = e.touches[0].clientY;
  };

  return (
    <section id="habilidades" className="py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            Mis{' '}
            <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm">Arrastrá el globo para explorarlo</p>
        </motion.div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ width: SIZE, height: SIZE, position: 'relative', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,158,255,0.07) 0%, transparent 70%)' }}
          />
          <canvas ref={canvasRef} width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0 }} />
          {items.map((item) => (
            <div
              key={item.name}
              style={{
                position: 'absolute',
                left: SIZE / 2 + item.x,
                top: SIZE / 2 + item.y,
                transform: `translate(-50%, -50%) scale(${item.scale})`,
                opacity: item.opacity,
                color: item.color,
                fontSize: 13,
                fontWeight: 700,
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                textShadow: `0 0 10px ${item.color}55`,
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {item.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 9: Contact

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Crear components/Contact.tsx**

```tsx
'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const SOCIALS = [
  {
    label: 'Email',
    value: 'isidropodesta@gmail.com',
    href: 'mailto:isidropodesta@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'isidro-podesta',
    href: 'https://www.linkedin.com/in/isidro-podesta-186b89332/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Isidropodesta',
    href: 'https://github.com/Isidropodesta',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+54 9 261 512980',
    href: 'https://wa.me/549261512980',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState('sending');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFormState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormState('error');
    }
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all duration-200';

  return (
    <section id="contacto" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100">¿Tenés un proyecto?</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">
            <span className="gradient-text">Construyámoslo juntos.</span>
          </p>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Estoy buscando mis primeros clientes para desarrollar sistemas web completos. Si necesitás una
            aplicación, sistema de gestión, tienda online o cualquier solución digital, hablemos sin compromiso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: socials + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-accent/30 hover:bg-white/6 transition-all duration-200 group"
                >
                  <span className="text-accent group-hover:scale-110 transition-transform duration-200">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">{s.label}</p>
                    <p className="text-sm text-slate-300">{s.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <motion.a
              href="https://wa.me/549261512980"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold transition-colors duration-200 shadow-[0_0_24px_rgba(34,197,94,0.3)]"
            >
              📲 Escribime por WhatsApp
            </motion.a>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className={inputClass}
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <input
              className={inputClass}
              placeholder="Asunto"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <textarea
              className={`${inputClass} resize-none`}
              placeholder="Mensaje"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <motion.button
              type="submit"
              disabled={formState === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,158,255,0.3)]"
            >
              {formState === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
            </motion.button>

            {formState === 'success' && (
              <p className="text-green-400 text-sm text-center">¡Mensaje enviado! Te respondo pronto.</p>
            )}
            {formState === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Error al enviar. Escribime directo por{' '}
                <a href="https://wa.me/549261512980" className="underline">WhatsApp</a>.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Crear components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#inicio" className="font-mono font-bold text-xl text-accent tracking-wider hover:opacity-80 transition-opacity">
          IP.DEV
        </a>

        <div className="flex items-center gap-5">
          {[
            { label: 'GitHub', href: 'https://github.com/Isidropodesta' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isidro-podesta-186b89332/' },
            { label: 'WhatsApp', href: 'https://wa.me/549261512980' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-600 text-center">
          © 2025 — Diseñado y construido por Isidro Podestá
        </p>
      </div>
    </footer>
  );
}
```

---

### Task 11: Page assembly + verificación final

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Crear app/page.tsx**

```tsx
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ChatAI from '@/components/ChatAI';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ChatAI />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verificar tipos**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Build de producción**

```bash
npm run build
```

Expected: build successful.

- [ ] **Step 4: Levantar dev server y verificar**

```bash
npm run dev
```

Abrir http://localhost:3000 y verificar todas las secciones.
