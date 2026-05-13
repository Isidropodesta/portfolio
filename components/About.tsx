'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const card =
  'rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(59,158,255,0.07)] hover:-translate-y-0.5';

function FadeUp({ children, i, className }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: i * 0.07 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LABEL = 'text-[10px] text-accent font-mono uppercase tracking-[0.15em] mb-2 block';

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card 1 — Identity (2 cols) */}
          <FadeUp i={0} className={`${card} lg:col-span-2 flex flex-col justify-between min-h-[130px]`}>
            <span className={LABEL}>Identidad</span>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-100 leading-tight">ISIDRO PODESTÁ</p>
              <p className="text-base sm:text-lg text-slate-400 font-mono mt-0.5">/ DESARROLLADOR FULL STACK</p>
            </div>
          </FadeUp>

          {/* Card 2 — Photo */}
          <FadeUp i={1} className={`${card} flex items-center justify-center min-h-[180px]`}>
            <div className="w-28 h-28 rounded-full ring-2 ring-accent/35 ring-offset-2 ring-offset-[#0f0d1a] overflow-hidden">
              <Image
                src="https://i.imgur.com/F7fUvUm.jpg"
                alt="Isidro Podestá"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          </FadeUp>

          {/* Card 3 — Universidad */}
          <FadeUp i={2} className={card}>
            <span className={LABEL}>Formación</span>
            <p className="font-semibold text-slate-100 mb-1">UTN Mendoza</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ingeniería en Sistemas, 5° año cursando. A punto de recibirme con foco en construir sistemas reales
              para clientes reales.
            </p>
          </FadeUp>

          {/* Card 4 — Mentalidad */}
          <FadeUp i={3} className={card}>
            <span className={LABEL}>Mentalidad</span>
            <p className="text-sm text-slate-300 leading-relaxed">
              Construyo más que software. No veo la tecnología como un fin en sí mismo, sino como una herramienta
              para resolver problemas, mejorar procesos y generar valor real.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.05] rounded-lg px-3 py-1.5">
              🏉 Rugby — Torneo del Interior A
            </div>
          </FadeUp>

          {/* Card 5 — Voluntariado */}
          <FadeUp i={4} className={card}>
            <span className={LABEL}>Impacto</span>
            <p className="font-semibold text-slate-100 mb-2">Voluntariado</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Voluntario en{' '}
              <span className="text-slate-300 font-medium">Crecer Felices</span> — acompaño a niños en merenderos y
              centros de apoyo escolar, aportando aprendizaje y contención.
            </p>
          </FadeUp>

          {/* Card 6 — Location */}
          <FadeUp i={5} className={`${card} flex flex-col justify-between`}>
            <span className={LABEL}>Ubicación</span>
            <div className="font-mono mt-1">
              <p className="text-xl font-bold text-slate-100">MENDOZA, AR</p>
              <p className="text-sm text-slate-500 mt-1">32.8908° S, 68.8272° O</p>
              <p className="text-sm text-slate-500">GMT−3</p>
            </div>
          </FadeUp>

          {/* Card 7 — Specialty (2 cols) */}
          <FadeUp i={6} className={`${card} lg:col-span-2`}>
            <div className="flex items-start justify-between mb-3">
              <span className={LABEL}>Especialidad</span>
              <span className="flex items-center gap-1.5 text-[11px] text-green-400 font-medium">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                />
                Disponible para proyectos
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Construyo aplicaciones web, sistemas de gestión y tiendas online desde cero.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Next.js', 'PostgreSQL'].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-accent/[0.08] border border-accent/20 text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Card 8 — Stats */}
          <FadeUp i={7} className={`${card} flex flex-col justify-center items-center gap-4 text-center`}>
            {[
              { val: '5°', label: 'año ingeniería' },
              { val: '3+', label: 'años programando' },
              { val: '∞', label: 'café' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold gradient-text font-mono">{s.val}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </FadeUp>

          {/* Card 9 — Objetivo (2 cols) */}
          <FadeUp i={8} className={`${card} lg:col-span-2`}>
            <span className={LABEL}>Objetivo</span>
            <p className="text-slate-300 leading-relaxed">
              Construir sistemas que generen valor real.{' '}
              <span className="text-slate-400">
                Buscando proyectos web para desarrollar soluciones completas.
              </span>
            </p>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
