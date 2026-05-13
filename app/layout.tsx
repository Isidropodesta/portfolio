import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Isidro Podestá — Desarrollador Full Stack',
  description:
    'Portfolio de Isidro Podestá. Desarrollador Full Stack, estudiante de Ingeniería en Sistemas en UTN Mendoza. Construyo aplicaciones web, sistemas de gestión y tiendas online desde cero.',
  keywords: ['desarrollador web', 'full stack', 'mendoza', 'next.js', 'react', 'portfolio', 'argentina'],
  authors: [{ name: 'Isidro Podestá', url: 'https://github.com/Isidropodesta' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-bg text-slate-200 font-sans antialiased">{children}</body>
    </html>
  );
}
