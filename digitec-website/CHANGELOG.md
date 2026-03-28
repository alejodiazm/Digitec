# Changelog — DIGITEC Website

Todos los cambios notables de este proyecto son documentados aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).
Versiones bajo [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### Planned
- Migrar rate limiting a Upstash Redis
- Lazy loading de Three.js / ParticleNetwork3D
- Agregar tests unitarios con Vitest
- Sección de portafolio de proyectos
- Integración Google Analytics 4
- `error.tsx` global + `not-found.tsx`

---

## [0.3.0] - 2026-03-28

### Added
- **Software Factory**: Sistema completo de Agents & Skills (18 skills + 11 workflows)
  - Skills: architecture, brand, components, deployment, frontend, backend, database, security, testing, performance, design-system, accessibility, error-handling, pmo, environments, marketing, git-strategy, client-delivery
  - Workflows: /dev, /qa, /git, /deploy, /hotfix, /seo, /content, /ui-audit, /perf, /a11y, /changelog
- `README.md` profesional con documentación completa del proyecto
- `CONTRIBUTING.md` con guía de desarrollo
- `CHANGELOG.md` (este archivo)
- GitHub Actions CI pipeline (lint + type-check en cada push)
- Templates de GitHub: PR template, bug report, feature request

### Fixed
- Hero section: desacople arquitectónico del componente `Lamp` — elimina clipping del título

---

## [0.2.0] - 2026-02-23

### Added
- Estructura de Agents con workflows: /dev, /qa, /git, /deploy, /hotfix, /seo, /content, /ui-audit
- Cuatro skills base: architecture, brand, components, deployment

### Fixed
- Mobile menu: corregido overlay y navegación en dispositivos móviles
- Email de contacto: destinatario corregido a `digitecglobalsas@gmail.com`
- Hero anchor ID: agregado `id="inicio"` para navegación por ancla
- Evervault cards: eliminados caracteres aleatorios, conservado gradiente luminoso
- Contraste de textos en secciones oscuras (About, Pricing, Services)
- Full page width: removido wrapper que causaba bordes negros laterales

---

## [0.1.0] - 2026-02-22

### Added
- Landing page inicial completa con secciones:
  - Hero con NetworkCanvas, efecto Lamp y animaciones Framer Motion
  - About / Nosotros con diferenciadores
  - Services con tarjetas GlowCard + EvervaultCard
  - Pricing con tabs y planes detallados
  - Testimonials
  - Contact con formulario React Hook Form + Zod
  - Footer con links y redes sociales
- API Route `/api/contact` con pipeline de seguridad:
  - Rate limiting in-memory
  - CAPTCHA Cloudflare Turnstile
  - Validación Zod
  - Honeypot anti-spam
  - Validación MX de email
  - Emails via Resend (notificación + confirmación)
- API Route `/api/csp-report` para Content Security Policy
- Configuración de Sentry para monitoring
- Variables de entorno tipadas con @t3-oss/env-nextjs
- Navbar responsive con menú mobile overlay
- Scroll suave con Lenis
- ScrollReveal con Framer Motion
- Metadata SEO completa (OpenGraph, Twitter Cards)
- Deploy en Hostinger con server.js personalizado
