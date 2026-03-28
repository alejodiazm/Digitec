# Guía de Contribución — DIGITEC Website

Gracias por contribuir al sitio de DIGITEC Global SAS. Esta guía asegura consistencia y calidad en cada cambio.

---

## 🚀 Setup del Entorno Local

```bash
# 1. Clonar y entrar al directorio
git clone https://github.com/alejodiazm/Digitec.git
cd Digitec/digitec-website

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las keys de desarrollo

# 4. Iniciar
npm run dev
```

---

## 🌿 Estrategia de Branches

```
main          ← Producción. Siempre deployable. Protegida.
feat/xxx      ← Features nuevas
fix/xxx       ← Bug fixes
hotfix/xxx    ← Correcciones urgentes de producción
docs/xxx      ← Solo documentación
style/xxx     ← Cambios de estilos sin lógica
refactor/xxx  ← Refactorización sin cambio funcional
```

**Regla**: Nunca commitear directamente a `main` para features. Crear un branch y PR.

### Ejemplos de nombre de branch
```
feat/portfolio-section
fix/navbar-mobile-scroll
hotfix/contact-form-rate-limit
docs/update-readme
style/hero-spacing-mobile
```

---

## 📝 Convención de Commits (Conventional Commits)

```
type(scope): descripción en español

Tipos:
  feat      → Nueva funcionalidad
  fix       → Corrección de bug
  style     → CSS/estilos (sin lógica)
  refactor  → Refactorización
  docs      → Documentación
  chore     → Config, dependencias, build
  hotfix    → Fix urgente de producción
  perf      → Optimización de rendimiento
  test      → Tests
  content   → Actualización de textos/contenido

Scopes del proyecto:
  hero, navbar, about, services, pricing, contact, footer
  lamp, evervault, network-canvas, animations
  api, contact-form, security
  constants, layout, globals
  agents, skills, workflows
  deploy, build, ci
```

### Ejemplos
```bash
feat(services): agregar tarjeta de servicio IA y automatización
fix(contact): corregir validación de email con dominios .co
style(hero): aumentar padding superior en breakpoint md
refactor(lamp): extraer lógica de animación a custom hook
docs(readme): actualizar guía de variables de entorno
chore(ci): agregar step de type-check en GitHub Actions
content(pricing): actualizar precios plan Starter y Pro
hotfix(api): corregir timeout en validación MX de email
```

---

## ✅ Proceso de Pull Request

### Antes de abrir el PR

```bash
# 1. Asegurarse de estar actualizado con main
git fetch origin
git rebase origin/main

# 2. Verificar que todo pasa
npm run lint          # Sin errores
npx tsc --noEmit      # Sin errores de tipos
npm run build         # Build exitoso (Exit code: 0)

# 3. Push del branch
git push origin feat/nombre-del-feature
```

### Template del PR
El repositorio tiene un template automático en `.github/PULL_REQUEST_TEMPLATE.md`. Completarlo siempre.

### Criterios de aprobación
- [ ] CI pasa (lint + TypeScript + build)
- [ ] Sin regresiones visuales (probar en mobile y desktop)
- [ ] Textos nuevos en `constants/index.ts`, no hardcodeados
- [ ] Responsividad verificada en los 3 breakpoints (mobile, tablet, desktop)
- [ ] Contraste WCAG AA verificado para textos nuevos
- [ ] Commit messages siguen Conventional Commits

---

## 📁 Dónde Va Cada Cosa

| Qué estás creando | Dónde |
|---|---|
| Elemento base reutilizable (Button, Badge...) | `src/components/atoms/` |
| Combinación de átomos (Card con comportamiento) | `src/components/molecules/` |
| Sección completa de la página | `src/components/sections/` |
| Efecto visual o animación | `src/components/effects/` |
| Texto, copy, URL, email | `src/constants/index.ts` |
| Variable de entorno nueva | `src/lib/env.ts` |
| Lógica reutilizable con hooks | `src/hooks/` |
| Función utilitaria | `src/lib/utils.ts` |
| Seguridad / validación | `src/lib/security/` |
| Endpoint de API | `src/app/api/[nombre]/route.ts` |

---

## 🚫 Anti-patrones — No Hacer

```tsx
// ❌ Texto hardcodeado en componente
<h1>Transformamos ideas en</h1>

// ✅ Correcto
import { HERO_CONTENT } from "@/constants";
<h1>{HERO_CONTENT.title}</h1>

// ❌ Children dentro de Lamp
<Lamp><h1>Título</h1></Lamp>

// ✅ Correcto — capas separadas
<div className="absolute z-10"><Lamp /></div>
<div className="relative z-20"><h1>Título</h1></div>

// ❌ img nativo
<img src="/logo.png" alt="Logo" />

// ✅ NextImage con optimización
<NextImage src="/logo.png" alt="Logo DIGITEC" width={200} height={60} />

// ❌ process.env directo
const key = process.env.RESEND_API_KEY;

// ✅ env tipado
import { env } from "@/lib/env";
const key = env.RESEND_API_KEY;
```

---

## 🔍 Code Review — Qué Revisar

1. **Seguridad**: ¿Inputs validados con Zod? ¿Sin secrets en código?
2. **Accesibilidad**: ¿Alt texts? ¿Labels en formularios? ¿Focus visible?
3. **Responsive**: ¿Tiene clases `sm:`, `md:`, `lg:`?
4. **Performance**: ¿Usa `<NextImage>`? ¿No hay `"use client"` innecesario?
5. **Convenciones**: ¿Textos en constants? ¿Imports con `@/`? ¿TypeScript correcto?
6. **Build**: ¿El CI pasa sin errores?
