'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const PROJECT_STATIC = [
  {
    number: '01',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Neon', 'Express'],
    url: 'https://ruedas-ochre.vercel.app',
    accent: '#3b9eff',
    mockupGradient: 'linear-gradient(135deg, #0a1628 0%, #0f2040 40%, #0a1a35 100%)',
    mockupLines: [
      { top: 32, width: '60%', opacity: 0.25, height: 12 },
      { top: 58, width: '40%', opacity: 0.15, height: 10 },
      { top: 88, width: '80%', opacity: 0.1, height: 8 },
      { top: 108, width: '55%', opacity: 0.1, height: 8 },
    ],
    mockupDots: ['#3b9eff', '#1e6fbf', '#0a4080'],
  },
  {
    number: '02',
    stack: ['React', 'Next.js', 'Tailwind', 'Vercel'],
    url: 'https://crecerfelices.vercel.app',
    accent: '#22c55e',
    mockupGradient: 'linear-gradient(135deg, #0a1a0f 0%, #0f2a18 40%, #0a1a10 100%)',
    mockupLines: [
      { top: 32, width: '55%', opacity: 0.25, height: 12 },
      { top: 58, width: '38%', opacity: 0.15, height: 10 },
      { top: 88, width: '75%', opacity: 0.1, height: 8 },
      { top: 108, width: '50%', opacity: 0.1, height: 8 },
    ],
    mockupDots: ['#22c55e', '#16a34a', '#0a5c28'],
  },
];

function BrowserMockup({
  url,
  title,
  gradient,
}: {
  url: string;
  title: string;
  gradient: string;
}) {
  const domain = url.replace('https://', '');
  return (
    <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none' }}>
      {/* Chrome bar */}
      <div
        style={{
          background: '#10111e',
          padding: '9px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {domain}
        </div>
      </div>

      {/* Preview area */}
      <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative', background: gradient }}>
        <iframe
          src={url}
          style={{
            width: '200%',
            height: '400px',
            border: 'none',
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
          loading="lazy"
          title={title}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(15,13,26,0.8) 100%)',
        }} />
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

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
            {t.projects.title1}
            <span className="gradient-text">{t.projects.title2}</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-slate-400 text-sm mb-14"
        >
          {t.projects.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_STATIC.map((p, i) => {
            const item = t.projects.items[i];
            return (
              <motion.article
                key={p.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${p.accent}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${p.accent}14`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <BrowserMockup url={p.url} title={item.title} gradient={p.mockupGradient} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        background: `${p.accent}14`,
                        border: `1px solid ${p.accent}35`,
                        color: `${p.accent}cc`,
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-3xl font-black select-none" style={{ color: 'rgba(255,255,255,0.04)' }}>
                      {p.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#64748b',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-75"
                    style={{ color: p.accent }}
                  >
                    {t.projects.viewProject}
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
