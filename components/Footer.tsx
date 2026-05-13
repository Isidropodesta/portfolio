const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Isidropodesta' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isidro-podesta-186b89332/' },
  { label: 'WhatsApp', href: 'https://wa.me/549261512980' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-4 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="#inicio"
          className="font-mono font-bold text-xl tracking-wider text-accent hover:opacity-75 transition-opacity"
        >
          IP.DEV
        </a>

        <div className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-accent transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-600 text-center sm:text-right">
          © 2025 — Diseñado y construido por Isidro Podestá
        </p>
      </div>
    </footer>
  );
}
