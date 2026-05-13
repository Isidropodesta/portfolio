'use client';

const ROW_1 = [
  'Desarrollo Web', '·', 'Next.js', '·', 'React', '·', 'Sistemas de Gestión', '·',
  'Node.js', '·', 'E-commerce', '·', 'TypeScript', '·', 'APIs REST', '·',
];

const ROW_2 = [
  'PostgreSQL', '·', 'Full Stack', '·', 'Docker', '·', 'Automatización', '·',
  'Python', '·', 'Tailwind CSS', '·', 'Bases de Datos', '·', 'Interfaces', '·',
];

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`marquee-track flex gap-8 ${reverse ? 'marquee-track--reverse' : ''}`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === '·'
                ? 'text-accent/30 select-none'
                : 'text-slate-600 text-xs font-mono uppercase tracking-[0.12em] whitespace-nowrap select-none'
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="py-5 flex flex-col gap-3 border-y border-white/[0.05] bg-white/[0.01] overflow-hidden">
      <Track items={ROW_1} />
      <Track items={ROW_2} reverse />
    </div>
  );
}
