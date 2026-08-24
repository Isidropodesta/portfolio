'use client';

import { motion } from 'framer-motion';

const TECHS = [
  'React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript',
  'JavaScript', 'Python', 'Docker', 'Git', 'Linux', 'Tailwind',
  'HTML / CSS', 'REST APIs',
];

const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: '#c8d8ec', fontWeight: 600 }}>{children}</strong>
);

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-4">
      <div className="mx-auto" style={{ maxWidth: 820 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex flex-col-reverse md:flex-row md:items-start gap-10">

            {/* ── Columna texto ──────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 mb-8"
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 999,
                  padding: '6px 14px',
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="inline-block"
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}
                />
                <span style={{ color: '#22c55e', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em' }}>
                  Disponible para proyectos
                </span>
              </div>

              {/* Nombre */}
              <h2
                className="mb-3"
                style={{
                  fontSize: 'clamp(40px, 7vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                }}
              >
                <span style={{ color: '#ffffff' }}>Isidro </span>
                <span className="gradient-text">Podestá</span>
              </h2>

              {/* Roles */}
              <p
                className="mb-10"
                style={{
                  fontSize: 13,
                  letterSpacing: '0.15em',
                  color: '#3b9eff',
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                ESTUDIANTE DE INGENIERÍA EN SISTEMAS&nbsp;&nbsp;|&nbsp;&nbsp;FULL STACK DEVELOPER
              </p>

              {/* Bio */}
              <div
                className="flex flex-col gap-5 mb-10"
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: '#7a9ab8',
                  fontFamily: "'DM Sans', 'Space Grotesk', sans-serif",
                }}
              >
                <p>
                  Estoy en el último año de <B>Ingeniería en Sistemas en la UTN Mendoza</B>, con proyección
                  de recibirme a <B>fines de 2027 a los 23 años</B>. Un camino que elegí con convicción y
                  que me formó no solo técnicamente, sino también en la forma de pensar y resolver problemas.
                </p>
                <p>
                  No veo la tecnología como un fin en sí mismo, sino como una herramienta para{' '}
                  <B>resolver problemas reales, mejorar procesos y generar valor</B> — para negocios locales,
                  startups, ONGs y organizaciones de todo tipo que quieran crecer o digitalizarse.
                </p>
                <p>
                  Construyo <B>sistemas web completos desde cero</B>: páginas, sistemas de gestión, tiendas
                  online y APIs. Me encargo de todo, desde la <B>arquitectura de la base de datos</B> hasta
                  lo que ve el usuario final. Primero entiendo el problema, después elijo la tecnología
                  adecuada para resolverlo — no al revés.
                </p>
                <p>
                  <B>Inglés</B> desarrollado a lo largo de toda la primaria y secundaria con{' '}
                  <B>nivel avanzado</B>, complementado con formación en institutos privados especializados.
                  Hoy puedo leer <B>documentación técnica</B>, escribir y mantener conversaciones con
                  fluidez — lo que me permite trabajar con tecnologías, recursos y equipos internacionales
                  sin barreras.
                </p>
                <p>
                  Creo firmemente que en este campo quien deja de aprender, se queda atrás. Si un proyecto
                  requiere una tecnología o solución que hoy no domino, no lo veo como un límite — lo veo
                  como parte del trabajo. Siempre estoy dispuesto a capacitarme y encontrar la mejor
                  solución para cada desafío.
                </p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {TECHS.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(59,158,255,0.08)',
                      border: '1px solid rgba(59,158,255,0.2)',
                      color: '#3b9eff',
                      borderRadius: 8,
                      padding: '5px 14px',
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Foto ──────────────────────────────────────────────────────── */}
            <div className="flex-shrink-0 flex md:block justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.imgur.com/F7fUvUm.jpg"
                alt="Isidro Podestá"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '2px solid #3b9eff',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
