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
    gradient: 'from-blue-950/90 via-blue-900/60 to-[#0f0d1a]/80',
    gridColor: '#3b9eff',
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
    gradient: 'from-purple-950/90 via-violet-900/60 to-[#0f0d1a]/80',
    gridColor: '#7b5ea7',
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
          className="text-center text-slate-400 text-sm mb-14"
        >
          Una selección de los sistemas que construí.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-300"
              style={{
                boxShadow: '0 0 0 0 transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${p.accentColor}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
              }}
            >
              {/* Visual header */}
              <div className={`relative h-52 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                {/* Grid overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(${p.gridColor}20 1px, transparent 1px),
                      linear-gradient(90deg, ${p.gridColor}20 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Radial fade */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0d1a]/60" />

                {/* Number & type badge */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <span className="font-mono text-4xl font-black opacity-20 text-white select-none">
                    {p.number}
                  </span>
                  <span
                    className="text-[11px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${p.accentColor}40`,
                      background: `${p.accentColor}12`,
                      color: `${p.accentColor}cc`,
                    }}
                  >
                    {p.type}
                  </span>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 right-5 text-6xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300 select-none">
                  {p.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{p.description}</p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Repo link */}
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: p.accentColor }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Ver repositorio →
                  </a>
                ) : (
                  <span className="text-xs text-slate-600 italic">Proyecto privado</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
