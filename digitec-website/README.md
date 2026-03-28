# DIGITEC Global SAS — Website

> Sitio web oficial de [DIGITEC Global SAS](https://digitec.global) — Agencia de desarrollo de software, branding y consultoría TI en Bogotá, Colombia.

[![CI](https://github.com/alejodiazm/Digitec/actions/workflows/ci.yml/badge.svg)](https://github.com/alejodiazm/Digitec/actions/workflows/ci.yml)

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Estilos | TailwindCSS v4 |
| Animaciones | Framer Motion v12 + GSAP |
| Scroll | Lenis |
| Formularios | React Hook Form + Zod |
| Email | Resend |
| CAPTCHA | Cloudflare Turnstile |
| Rate Limiting | In-memory / Upstash Redis |
| Monitoring | Sentry |
| Tipado | TypeScript 5 |
| Deploy | Hostinger (CPanel + Node.js) |

---

## 🗂️ Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/        # Endpoint formulario de contacto
│   ├── globals.css         # Estilos globales y variables CSS
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page principal
├── components/
│   ├── atoms/              # Elementos base (Button, Container, Logo...)
│   ├── molecules/          # Combinaciones (GlowCard...)
│   ├── sections/           # Secciones de la página (Hero, About, Services...)
│   └── effects/            # Efectos visuales (Lamp, NetworkCanvas...)
├── constants/
│   └── index.ts            # 🔑 Fuente de verdad de textos y configuración
├── hooks/                  # Custom hooks de React
└── lib/
    ├── env.ts              # Validación de variables de entorno
    ├── utils.ts            # Utilidades (cn(), etc.)
    └── security/           # CAPTCHA y validación de email
.agents/
├── skills/                 # Contexto persistente para el AI assistant
└── workflows/              # Slash commands de desarrollo
.github/
├── workflows/ci.yml        # GitHub Actions CI
└── ISSUE_TEMPLATE/         # Templates de bugs y features
```

---

## ⚡ Inicio Rápido

### Requisitos
- Node.js 20+
- npm 10+

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/alejodiazm/Digitec.git
cd Digitec/digitec-website

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variables de Entorno

Crear `.env.local` basado en `.env.example`:

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend (envío de emails) — resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx

# Cloudflare Turnstile (CAPTCHA) — dash.cloudflare.com
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxx
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4xxxxxxxxxxxx

# Upstash Redis (rate limiting) — console.upstash.com
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Sentry (monitoring) — sentry.io
SENTRY_DSN=https://xxx@sentry.io/xxx
```

**Nota para Turnstile en desarrollo:**
```bash
# Key que acepta siempre (para desarrollar sin CAPTCHA real)
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

---

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (Turbopack, puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción local
npm run lint     # ESLint
```

---

## 🏗️ Arquitectura

El sitio usa **Atomic Design**:
- **Atoms** → Elementos base reutilizables (Button, Container, Logo)
- **Molecules** → Combinaciones de átomos (GlowCard)
- **Sections** → Secciones completas de la landing (Hero, Services, Pricing...)
- **Effects** → Efectos visuales y animaciones (Lamp, NetworkCanvas)

### Z-index del sistema (crítico en Hero)
```
z-0   → NetworkCanvas (partículas de fondo)
z-10  → Lamp (efecto de luz, purely decorativo)
z-20  → Contenido (textos, botones)
z-50  → Navbar (siempre encima de todo)
```

---

## 🚢 Deploy en Hostinger

Ver guía completa en [`.agents/skills/deployment.md`](.agents/skills/deployment.md).

**Flujo resumido:**
1. `npm run build` — generar `.next/`
2. Subir via FTP: `.next/`, `public/`, `server.js`, `package.json`
3. SSH: `npm install --production`
4. CPanel → Node.js App → Restart

---

## 🤖 Software Factory — Agents & Skills

Este proyecto tiene un sistema completo de contexto para desarrollo asistido por IA:

**Skills disponibles** (en `.agents/skills/`):
`architecture` · `brand` · `components` · `deployment` · `frontend` · `backend` · `database` · `security` · `testing` · `performance` · `design-system` · `accessibility` · `error-handling` · `pmo` · `environments` · `marketing` · `git-strategy` · `client-delivery`

**Workflows** (slash commands en `.agents/workflows/`):
`/dev` · `/qa` · `/git` · `/deploy` · `/hotfix` · `/seo` · `/content` · `/ui-audit` · `/perf` · `/a11y` · `/changelog`

---

## 📄 Licencia

Propiedad de **DIGITEC Global SAS**. Todos los derechos reservados.

---

*Hecho con ❤️ en Bogotá, Colombia 🇨🇴*
