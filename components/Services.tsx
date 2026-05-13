'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Desarrollo Web',
    desc: 'Sitios y aplicaciones web completas con diseño moderno. Desde una landing page hasta plataformas SaaS con panel de administración.',
    tags: ['Next.js', 'React', 'Tailwind'],
  },
  {
    num: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Sistemas de Gestión',
    desc: 'ERP y sistemas internos para digitalizar tu empresa. Administración de inventario, clientes, ventas y procesos operativos.',
    tags: ['Node.js', 'PostgreSQL', 'Express'],
  },
  {
    num: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: 'E-commerce',
    desc: 'Tiendas online completas con catálogo, carrito de compras, medios de pago y panel de administración integrado.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    num: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'APIs & Integraciones',
    desc: 'APIs REST robustas e integraciones con servicios externos. Conecto tus sistemas entre sí y con plataformas de terceros.',
    tags: ['Node.js', 'REST', 'Docker'],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[11px] text-accent font-mono uppercase tracking-[0.18em] mb-3">Servicios</p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Qué{' '}
            <span className="gradient-text">construyo</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm max-w-lg leading-relaxed">
            De la idea al producto. Me encargo de todo el stack — desde el diseño de la base de datos hasta la interfaz que ve el usuario.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-accent/25 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Número decorativo de fondo */}
              <span className="absolute top-4 right-5 font-mono text-5xl font-black text-white/[0.03] select-none group-hover:text-accent/[0.05] transition-colors duration-300">
                {s.num}
              </span>

              {/* Icono */}
              <div className="mb-4 w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors duration-300">
                {s.icon}
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
