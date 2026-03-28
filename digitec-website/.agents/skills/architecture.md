---
name: digitec-architecture
description: Contexto técnico completo del proyecto Digitec Website. Leer antes de cualquier tarea de desarrollo.
---

# 🏗️ Arquitectura Técnica — DIGITEC Website

## Stack Principal
| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI | React | 19.x |
| Estilos | TailwindCSS v4 | ^4.1 |
| Animaciones | Framer Motion | ^12 |
| Animaciones avanzadas | GSAP | ^3.14 |
| Scroll suave | Lenis | ^1.3 |
| Formularios | React Hook Form + Zod | v7 + v4 |
| Email | Resend | ^4 |
| CAPTCHA | Cloudflare Turnstile | react-turnstile |
| Rate limiting | Upstash Redis + Ratelimit | v2 |
| Monitoring | Sentry | ^10 |
| Tipado | TypeScript | ^5 |
| Linting | ESLint (config-next) | ^9 |

## Estructura de Carpetas
```
src/
├── app/                    ← Next.js App Router
│   ├── api/
│   │   ├── contact/        ← POST endpoint de formulario
│   │   └── csp-report/     ← Content Security Policy reporting
│   ├── globals.css
│   ├── layout.tsx          ← Root layout con Navbar y SmoothScroll
│   └── page.tsx            ← Página principal (una sola página)
├── components/
│   ├── atoms/              ← Elementos base reutilizables
│   ├── molecules/          ← Combinaciones de átomos
│   ├── sections/           ← Secciones completas de la página
│   └── effects/            ← Efectos visuales y animaciones
├── constants/
│   └── index.ts            ← ÚNICA fuente de verdad de textos, rutas y config
├── hooks/                  ← Custom hooks de React
└── lib/
    ├── env.ts              ← Validación de variables de entorno con t3-oss/env
    ├── utils.ts            ← cn() y utilidades generales
    └── security/           ← Utilidades de seguridad y sanitización
```

## Patrón de Diseño: Atomic Design
- **Atoms** (`/atoms`): Button, Container, Logo, Card, ScrollProgress, Section
- **Molecules** (`/molecules`): GlowCard (combinación de átomo con comportamiento)
- **Sections** (`/sections`): Hero, About, Services, Pricing, Testimonials, Contact, Navbar, Footer
- **Effects** (`/effects`): Lamp, NetworkCanvas, EvervaultCard, ScrollReveal, etc.

## ⚠️ Anti-patrones Conocidos
1. **Lamp.tsx es decorativo puro** — NO envolver contenido dentro de `<Lamp>`. El componente NO acepta `children`. El texto del Hero vive en capas separadas (`z-20`) encima del Lamp (`z-10`).
2. **TracingBeam eliminado** — Causaba bordes laterales negros al usarse en `page.tsx`. No reinstalar como wrapper.
3. **Textos en `constants/index.ts`** — NUNCA hardcodear textos en componentes directamente. Usar siempre las constantes.

## Variables de Entorno Requeridas (`.env.local`)
```bash
RESEND_API_KEY=             # API key de Resend para envío de emails
TURNSTILE_SECRET_KEY=       # Secret de Cloudflare Turnstile (CAPTCHA)
NEXT_PUBLIC_TURNSTILE_SITE_KEY= # Site key pública del CAPTCHA
UPSTASH_REDIS_REST_URL=     # URL de Redis para rate limiting
UPSTASH_REDIS_REST_TOKEN=   # Token de Redis
SENTRY_DSN=                 # DSN de Sentry para monitoring
```

## Convenciones de Código
- **Imports**: paths absolutos con alias `@/` (ej: `@/components/atoms/Button`)
- **Componentes**: PascalCase, un componente por archivo
- **CSS**: TailwindCSS utility-first. `cn()` de `@/lib/utils` para clases condicionales
- **Tipado**: Siempre tipar props con `interface`, nunca `any`
- **Server vs Client**: Mínimo `"use client"` — solo cuando se usan hooks o eventos

## Colores del Sistema (CSS Variables en `globals.css`)
```css
--color-primary: #2563EB      /* Azul principal */
--color-accent-mint: #22D3EE  /* Cian/mint */
--color-accent-lavender: #A78BFA /* Lavanda */
--bg-dark: #0B1121            /* Fondo página principal */
--bg-dark-secondary: #0F172A  /* Fondo secciones oscuras */
--bg-light: #F8FAFC           /* Hero y secciones claras */
--bg-light-secondary: #F1F5F9 /* About, Services */
```

## Flujo de Build
```bash
npm run dev    # Turbopack dev server (puerto 3000)
npm run build  # Producción (Turbopack) — SIEMPRE verificar antes de commit
npm run lint   # ESLint con config de Next.js
```
