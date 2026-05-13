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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

const INPUT =
  'w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent/45 focus:bg-white/[0.07] transition-all duration-200';

export default function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setState('error');
    }
  }

  return (
    <section id="contacto" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
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
          <p className="text-slate-400 mt-5 max-w-lg mx-auto leading-relaxed text-sm">
            Estoy buscando mis primeros clientes para desarrollar sistemas web completos. Si necesitás una
            aplicación, sistema de gestión, tienda online o cualquier solución digital, hablemos sin compromiso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — socials + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.06] transition-all duration-200 group"
                >
                  <span className="text-accent group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{s.label}</p>
                    <p className="text-sm text-slate-300 mt-0.5">{s.value}</p>
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
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25d366] hover:bg-[#22c55e] text-white font-semibold text-sm transition-colors duration-200 shadow-[0_0_28px_rgba(37,211,102,0.25)]"
            >
              📲 Escribime por WhatsApp
            </motion.a>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className={INPUT} placeholder="Nombre" value={form.name} onChange={set('name')} required />
              <input className={INPUT} placeholder="Email" type="email" value={form.email} onChange={set('email')} required />
            </div>
            <input className={INPUT} placeholder="Asunto" value={form.subject} onChange={set('subject')} required />
            <textarea
              className={`${INPUT} resize-none`}
              placeholder="Mensaje"
              rows={5}
              value={form.message}
              onChange={set('message')}
              required
            />

            <motion.button
              type="submit"
              disabled={state === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,158,255,0.28)]"
            >
              {state === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
            </motion.button>

            {state === 'success' && (
              <p className="text-green-400 text-sm text-center">¡Mensaje enviado! Te respondo pronto 🙌</p>
            )}
            {state === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Error al enviar. Escribime directo por{' '}
                <a href="https://wa.me/549261512980" className="underline underline-offset-2">WhatsApp</a>.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
