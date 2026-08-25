'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'es' | 'en';
export type ChipKey = 'quien' | 'sistemas' | 'costo' | 'proceso' | 'plazos' | 'contratar';
export type Seg = { t: string; b?: boolean };

// ── Type definitions ──────────────────────────────────────────────────────────

interface TranslationNav {
  links: { label: string; href: string }[];
  cta: string;
  langLabel: string;
  langOther: string;
}

interface TranslationHero {
  welcome: string;
  chips: { label: string; key: ChipKey }[];
  responses: Record<ChipKey, { text: string; hasWhatsApp?: boolean }>;
  fallback: string;
  placeholder: string;
  whatsappBtn: string;
}

interface TranslationAbout {
  badge: string;
  roles: string;
  bio: Seg[][];
}

interface TranslationServices {
  title1: string;
  title2: string;
  subtitle: string;
  cards: { title: string; desc: string }[];
}

interface TranslationProjects {
  title1: string;
  title2: string;
  subtitle: string;
  viewProject: string;
  items: { type: string; title: string; description: string }[];
}

interface TranslationSkills {
  title1: string;
  title2: string;
  subtitle: string;
}

interface TranslationContact {
  title: string;
  subtitle: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  errorPrefix: string;
  errorLink: string;
  whatsappBtn: string;
}

export interface Translation {
  nav: TranslationNav;
  hero: TranslationHero;
  about: TranslationAbout;
  services: TranslationServices;
  projects: TranslationProjects;
  skills: TranslationSkills;
  contact: TranslationContact;
}

// ── Translations ──────────────────────────────────────────────────────────────

export const TRANSLATIONS: Record<Lang, Translation> = {
  es: {
    nav: {
      links: [
        { label: 'Inicio',      href: '#inicio'      },
        { label: 'Sobre mí',    href: '#sobre-mi'    },
        { label: 'Servicios',   href: '#servicios'   },
        { label: 'Proyectos',   href: '#proyectos'   },
        { label: 'Habilidades', href: '#habilidades' },
        { label: 'Contacto',    href: '#contacto'    },
      ],
      cta: 'Reservar llamada',
      langLabel: 'Español',
      langOther: 'English',
    },
    hero: {
      welcome: 'Bienvenido a mi portfolio. ¿Qué te interesaría saber?',
      chips: [
        { label: '¿Quién es Isidro?',        key: 'quien'     },
        { label: '¿Qué sistemas construís?', key: 'sistemas'  },
        { label: '¿Cuánto cuesta?',          key: 'costo'     },
        { label: '¿Cómo es el proceso?',     key: 'proceso'   },
        { label: '¿Manejás plazos?',         key: 'plazos'    },
        { label: '¿Cómo contratarme?',       key: 'contratar' },
      ],
      responses: {
        quien:     { text: 'Soy estudiante de último año de Ingeniería en Sistemas en la UTN Mendoza. Tengo una mentalidad orientada a resolver problemas reales — no me interesa el código por el código, sino lo que ese código puede hacer por una empresa o persona.' },
        sistemas:  { text: 'Construyo sistemas web completos desde cero: páginas web, sistemas de gestión, tiendas online y APIs. Me encargo de todo — desde la base de datos hasta lo que ve el usuario final.' },
        costo:     { text: 'Depende del proyecto — no hay un precio fijo porque cada sistema es diferente. Lo que sí puedo decirte es que la consulta inicial es completamente gratuita. Charlamos, entiendo qué necesitás y ahí te doy un presupuesto claro y sin sorpresas.', hasWhatsApp: true },
        proceso:   { text: 'Arrancamos con una videollamada o reunión personal donde me contás todo lo que querés lograr — funcionalidades, plazos, ideas. A partir de ahí defino los alcances del proyecto y empezamos.', hasWhatsApp: true },
        plazos:    { text: 'Los plazos dependen de la complejidad del proyecto. Desde el arranque definimos juntos una fecha estimada de entrega y trabajo para cumplirla.', hasWhatsApp: true },
        contratar: { text: 'La forma más directa es por WhatsApp — solemos arrancar con una charla de 15 minutos para entender qué necesitás. Sin compromisos, sin formularios, solo una conversación.', hasWhatsApp: true },
      },
      fallback: 'Podés preguntarme sobre quién es Isidro, qué sistemas construye, sus tecnologías o cómo contratarlo.',
      placeholder: 'Escribí tu pregunta...',
      whatsappBtn: 'Escribime por WhatsApp',
    },
    about: {
      badge: 'Disponible para proyectos',
      roles: 'ESTUDIANTE DE INGENIERÍA EN SISTEMAS  |  FULL STACK DEVELOPER',
      bio: [
        [
          { t: 'Estoy en el último año de ' },
          { t: 'Ingeniería en Sistemas en la UTN Mendoza', b: true },
          { t: ', con proyección de recibirme a ' },
          { t: 'fines de 2027 a los 23 años', b: true },
          { t: '. Un camino que elegí con convicción y que me formó no solo técnicamente, sino también en la forma de pensar y resolver problemas.' },
        ],
        [
          { t: 'No veo la tecnología como un fin en sí mismo, sino como una herramienta para ' },
          { t: 'resolver problemas reales, mejorar procesos y generar valor', b: true },
          { t: ' — para negocios locales, startups, ONGs y organizaciones de todo tipo que quieran crecer o digitalizarse.' },
        ],
        [
          { t: 'Construyo ' },
          { t: 'sistemas web completos desde cero', b: true },
          { t: ': páginas, sistemas de gestión, tiendas online y APIs. Me encargo de todo, desde la ' },
          { t: 'arquitectura de la base de datos', b: true },
          { t: ' hasta lo que ve el usuario final. Primero entiendo el problema, después elijo la tecnología adecuada para resolverlo — no al revés.' },
        ],
        [
          { t: 'Inglés', b: true },
          { t: ' desarrollado a lo largo de toda la primaria y secundaria con ' },
          { t: 'nivel avanzado', b: true },
          { t: ', complementado con formación en institutos privados especializados. Hoy puedo leer ' },
          { t: 'documentación técnica', b: true },
          { t: ', escribir y mantener conversaciones con fluidez — lo que me permite trabajar con tecnologías, recursos y equipos internacionales sin barreras.' },
        ],
        [
          { t: 'Creo firmemente que en este campo quien deja de aprender, se queda atrás. Si un proyecto requiere una tecnología o solución que hoy no domino, no lo veo como un límite — lo veo como parte del trabajo. Siempre estoy dispuesto a capacitarme y encontrar la mejor solución para cada desafío.' },
        ],
      ],
    },
    services: {
      title1: 'Construyo tu ',
      title2: 'Sistema Digital',
      subtitle: 'Soluciones tecnológicas a medida para llevar tu idea a un producto real, funcional y escalable.',
      cards: [
        { title: 'Desarrollo Web',       desc: 'Construyo páginas, landing pages y sitios a medida, pensados para convertir visitantes en clientes.' },
        { title: 'Sistemas de Gestión',  desc: 'Paneles de administración, dashboards y sistemas internos que ordenan y automatizan tu negocio.' },
        { title: 'Tiendas Online',       desc: 'E-commerce completo con catálogo, carrito y gestión de pedidos lista para vender.' },
        { title: 'APIs y Backend',       desc: 'Servicios, integraciones y bases de datos robustas que sostienen cualquier aplicación.' },
        { title: 'Diseño UI/UX',         desc: 'Interfaces modernas, intuitivas y atractivas centradas en la experiencia del usuario.' },
        { title: 'Multiplataforma',      desc: 'Todo lo que construyo funciona perfecto en celular, tablet y computadora.' },
        { title: 'Consultoría',          desc: 'Analizo tu negocio, detecto oportunidades y diseño un plan tecnológico a tu medida.' },
        { title: 'Mantenimiento',        desc: 'Actualizaciones, mejoras y soporte continuo para que tu sistema funcione sin interrupciones.' },
      ],
    },
    projects: {
      title1: 'Proyectos ',
      title2: 'Destacados',
      subtitle: 'Sistemas reales construidos de punta a punta.',
      viewProject: 'Ver proyecto',
      items: [
        {
          type: 'Aplicación Web',
          title: 'Plataforma de Concesionaria "Ruedas"',
          description: 'Sistema de gestión para concesionaria de autos que desarrollé de forma independiente. Incluye catálogo dinámico con filtros, panel de administración y gestión de clientes. Un proyecto que me permitió aplicar arquitectura full stack completa de punta a punta.',
        },
        {
          type: 'Sitio Web · Impacto Social',
          title: 'Crecer Felices',
          description: 'Sitio web oficial para Crecer Felices, organización sin fines de lucro con la que colaboro hace más de tres años. Un proyecto que me formó en responsabilidad, trabajo con organizaciones reales y desarrollo orientado a impacto social.',
        },
      ],
    },
    skills: {
      title1: 'Mis ',
      title2: 'Habilidades',
      subtitle: 'Arrastrá el globo para explorarlo',
    },
    contact: {
      title: '¿Tenés un proyecto?',
      subtitle: 'Construyámoslo juntos.',
      description: 'Estoy buscando mis primeros clientes para desarrollar sistemas web completos. Si necesitás una aplicación, sistema de gestión, tienda online o cualquier solución digital, hablemos sin compromiso.',
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Email',
      subjectPlaceholder: 'Asunto',
      messagePlaceholder: 'Mensaje',
      send: 'Enviar mensaje →',
      sending: 'Enviando...',
      success: '¡Mensaje enviado! Te respondo pronto 🙌',
      errorPrefix: 'Error al enviar. Escribime directo por',
      errorLink: 'WhatsApp',
      whatsappBtn: '📲 Escribime por WhatsApp',
    },
  },

  en: {
    nav: {
      links: [
        { label: 'Home',     href: '#inicio'      },
        { label: 'About',    href: '#sobre-mi'    },
        { label: 'Services', href: '#servicios'   },
        { label: 'Projects', href: '#proyectos'   },
        { label: 'Skills',   href: '#habilidades' },
        { label: 'Contact',  href: '#contacto'    },
      ],
      cta: 'Book a call',
      langLabel: 'English',
      langOther: 'Español',
    },
    hero: {
      welcome: 'Welcome to my portfolio. What would you like to know?',
      chips: [
        { label: 'Who is Isidro?',           key: 'quien'     },
        { label: 'What do you build?',        key: 'sistemas'  },
        { label: 'How much does it cost?',    key: 'costo'     },
        { label: "What's the process?",       key: 'proceso'   },
        { label: 'Do you handle deadlines?',  key: 'plazos'    },
        { label: 'How to hire you?',          key: 'contratar' },
      ],
      responses: {
        quien:     { text: "I'm a final-year Systems Engineering student at UTN Mendoza. I have a mindset focused on solving real problems — I'm not interested in code for code's sake, but in what that code can do for a business or person." },
        sistemas:  { text: 'I build complete web systems from scratch: websites, management systems, online stores and APIs. I handle everything — from the database all the way to what the end user sees.' },
        costo:     { text: "It depends on the project — there's no fixed price because every system is different. What I can tell you is that the initial consultation is completely free. We chat, I understand what you need, and I give you a clear quote with no surprises.", hasWhatsApp: true },
        proceso:   { text: 'We start with a video call or meeting where you tell me everything you want to achieve — features, timelines, ideas. From there I define the project scope and we get started.', hasWhatsApp: true },
        plazos:    { text: "Timelines depend on the complexity of the project. From the start we define together an estimated delivery date and I work to meet it.", hasWhatsApp: true },
        contratar: { text: "The most direct way is via WhatsApp — we usually start with a 15-minute chat to understand what you need. No commitments, no forms, just a conversation.", hasWhatsApp: true },
      },
      fallback: "You can ask me about who Isidro is, what systems he builds, his technologies, or how to hire him.",
      placeholder: 'Type your question...',
      whatsappBtn: 'Message me on WhatsApp',
    },
    about: {
      badge: 'Available for projects',
      roles: 'SYSTEMS ENGINEERING STUDENT  |  FULL STACK DEVELOPER',
      bio: [
        [
          { t: "I'm in my final year of " },
          { t: 'Systems Engineering at UTN Mendoza', b: true },
          { t: ', on track to graduate by ' },
          { t: 'late 2027 at age 23', b: true },
          { t: '. A path I chose with conviction that shaped me not just technically, but also in how I think and solve problems.' },
        ],
        [
          { t: "I don't see technology as an end in itself, but as a tool to " },
          { t: 'solve real problems, improve processes and create value', b: true },
          { t: ' — for local businesses, startups, NGOs and all kinds of organizations looking to grow or go digital.' },
        ],
        [
          { t: 'I build ' },
          { t: 'complete web systems from scratch', b: true },
          { t: ': websites, management systems, online stores and APIs. I handle everything, from the ' },
          { t: 'database architecture', b: true },
          { t: ' all the way to what the end user sees. I understand the problem first, then choose the right technology to solve it — not the other way around.' },
        ],
        [
          { t: 'English', b: true },
          { t: ' developed throughout primary and secondary school, reaching an ' },
          { t: 'advanced level', b: true },
          { t: ', complemented by training in specialized private institutes. Today I can read ' },
          { t: 'technical documentation', b: true },
          { t: ', write and hold conversations fluently — allowing me to work with international technologies, resources and teams without barriers.' },
        ],
        [
          { t: "I firmly believe that in this field, those who stop learning fall behind. If a project requires a technology or solution I haven't mastered yet, I don't see it as a limitation — I see it as part of the job. I'm always ready to learn and find the best solution for every challenge." },
        ],
      ],
    },
    services: {
      title1: 'I Build Your ',
      title2: 'Digital System',
      subtitle: 'Tailored technology solutions to take your idea to a real, functional and scalable product.',
      cards: [
        { title: 'Web Development',    desc: 'I build custom pages, landing pages and sites designed to convert visitors into clients.' },
        { title: 'Management Systems', desc: 'Admin panels, dashboards and internal systems that organize and automate your business.' },
        { title: 'Online Stores',      desc: 'Full e-commerce with catalog, cart and order management ready to sell.' },
        { title: 'APIs & Backend',     desc: 'Robust services, integrations and databases that power any application.' },
        { title: 'UI/UX Design',       desc: 'Modern, intuitive and attractive interfaces centered on user experience.' },
        { title: 'Cross-platform',     desc: 'Everything I build works perfectly on mobile, tablet and desktop.' },
        { title: 'Consulting',         desc: 'I analyze your business, identify opportunities and design a technology plan tailored to you.' },
        { title: 'Maintenance',        desc: 'Updates, improvements and ongoing support so your system runs without interruptions.' },
      ],
    },
    projects: {
      title1: 'Featured ',
      title2: 'Projects',
      subtitle: 'Real systems built end to end.',
      viewProject: 'View project',
      items: [
        {
          type: 'Web Application',
          title: '"Ruedas" Car Dealership Platform',
          description: 'Management system for a car dealership I developed independently. Includes a dynamic catalog with filters, an admin panel and customer management. A project that let me apply complete full-stack architecture end to end.',
        },
        {
          type: 'Website · Social Impact',
          title: 'Crecer Felices',
          description: 'Official website for Crecer Felices, a non-profit organization I have collaborated with for over three years. A project that built my skills in responsibility, working with real organizations and impact-driven development.',
        },
      ],
    },
    skills: {
      title1: 'My ',
      title2: 'Skills',
      subtitle: 'Drag the globe to explore it',
    },
    contact: {
      title: 'Got a project?',
      subtitle: "Let's build it together.",
      description: "I'm looking for my first clients to develop complete web systems. If you need an application, management system, online store or any digital solution, let's talk with no commitment.",
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Message',
      send: 'Send message →',
      sending: 'Sending...',
      success: "Message sent! I'll get back to you soon 🙌",
      errorPrefix: 'Failed to send. Message me directly on',
      errorLink: 'WhatsApp',
      whatsappBtn: '📲 Message me on WhatsApp',
    },
  },
};

// ── Context ───────────────────────────────────────────────────────────────────

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null;
    if (stored === 'es' || stored === 'en') setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('portfolio-lang', l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
