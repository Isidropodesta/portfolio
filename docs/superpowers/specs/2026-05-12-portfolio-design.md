# Portfolio Personal — Isidro Podestá — Design Spec
**Fecha:** 2026-05-12

## Resumen
Portfolio personal completo en Next.js 14 (App Router) + TypeScript + Tailwind CSS. Una sola página con scroll, 7 secciones, animaciones con Framer Motion, chat AI con respuestas por keyword matching, bento grid, globo 3D de habilidades, y formulario de contacto con EmailJS.

---

## Stack y dependencias

| Paquete | Uso |
|---|---|
| next 14 | Framework |
| react 18 | UI |
| framer-motion | Animaciones |
| @emailjs/browser | Formulario de contacto |
| typescript | Tipado |
| tailwindcss | Estilos |

**Globo 3D:** Implementación custom con CSS 3D transforms (algoritmo Fibonacci sphere). Sin dependencia de Three.js.

---

## Paleta y tipografía

- **Fondo:** `#0f0d1a`
- **Azul acento:** `#3b9eff`
- **Violeta:** `#7b5ea7`
- **Tipografía:** Space Grotesk (sans) + Space Mono (mono) — Google Fonts

---

## Secciones

### 1. Nav
Sticky, `backdrop-blur-md` al scroll. Logo "IP.DEV" (Space Mono, azul). Links internos + botón WhatsApp derecha.

### 2. Hero
Dot grid + glow azul/violeta. Foto circular con borde azul. Badge pulsante. Título con gradiente. Frase grande. Subtítulo. Línea de datos.

### 3. Chat AI (opción B — keyword matching)
Card semitransparente. 4 chips clicables con respuestas predefinidas. Input de texto que detecta palabras clave y responde. Fallback genérico si no hay match. Botón WhatsApp animado en respuesta de "contratar". Scroll indicator abajo.

### 4. Sobre mí — Bento Grid
Grid irregular de 9 cards. Hover con border azul + elevación. Cards con animación de entrada (Framer Motion `whileInView`).

### 5. Proyectos
2 proyectos en layout vertical (2 por fila). Fondo vibrante + grid overlay. Número, tipo, título, descripción, stack pills, link GitHub. Hover: sube + border glows.

### 6. Habilidades — Globo 3D
CSS 3D tag cloud. 14 tecnologías con colores de marca. Auto-rota; responde al mouse. Items del frente: grandes y opacos. Items de atrás: pequeños y transparentes.

### 7. Contacto
Título + CTA WhatsApp. Links sociales. Formulario (Nombre, Email, Asunto, Mensaje) con EmailJS — credenciales en `.env.local`.

### 8. Footer
Logo, links sociales, copyright.

---

## Decisiones técnicas

- **Chat AI:** keyword matching con `Array.find()` sobre lista de patrones. Fallback genérico.
- **Globo:** Fibonacci sphere distribution. `requestAnimationFrame` loop. Proyección 3D → 2D con perspectiva. Scale/opacity por z-depth.
- **Contacto:** EmailJS con `@emailjs/browser`. Variables en `.env.local`.
- **Animaciones:** Framer Motion `whileInView` con `initial={{ opacity: 0, y: 40 }}` en todas las secciones.
- **Imágenes:** URLs directas de Imgur (foto de perfil).
- **Deployment:** Vercel-ready.

---

## Estructura de archivos

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ChatAI.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── .env.local.example
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```
