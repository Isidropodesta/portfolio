'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const TECHS = [
  'React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript',
  'JavaScript', 'Python', 'Docker', 'Git', 'Linux', 'Tailwind',
  'HTML / CSS', 'REST APIs',
];

const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: '#c8d8ec', fontWeight: 600 }}>{children}</strong>
);

export default function About() {
  const { t } = useLanguage();

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

            {/* ── Text column ──────────────────────────────────────────────── */}
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
                <span
                  className="inline-block"
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}
                />
                <span style={{ color: '#22c55e', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em' }}>
                  {t.about.badge}
                </span>
              </div>

              {/* Name */}
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
                {t.about.roles}
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
                {t.about.bio.map((segments, i) => (
                  <p key={i}>
                    {segments.map((seg, j) =>
                      seg.b ? <B key={j}>{seg.t}</B> : seg.t
                    )}
                  </p>
                ))}
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {TECHS.map((tech) => (
                  <span
                    key={tech}
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
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Photo ────────────────────────────────────────────────────── */}
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
