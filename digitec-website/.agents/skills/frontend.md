---
name: digitec-frontend
description: Patrones, convenciones y mejores prácticas de desarrollo Frontend para el proyecto Digitec (React 19 + Next.js 16 App Router). Leer antes de crear o modificar cualquier componente de UI.
---

# ⚛️ Frontend — React 19 + Next.js 16 App Router

## Modelo Mental: Server vs. Client

El error más común en Next.js App Router es mezclar Server y Client Components innecesariamente.

| Tipo | Cuándo usar | Cuándo NO usar |
|---|---|---|
| **Server Component** (default) | Fetch de datos, contenido estático, layouts, SEO | Hooks (`useState`, `useEffect`), eventos (`onClick`), animaciones |
| **Client Component** (`"use client"`) | Interactividad, animaciones (Framer Motion), formularios, estados | Nunca para contenido puramente estático |

### Regla de mínimo `"use client"`
```
Layout.tsx          → Server ✅
page.tsx            → Server ✅ (assembly de secciones)
Hero.tsx            → Client ✅ (usa animaciones + scroll)
About.tsx           → Client (solo por ScrollReveal)
Services.tsx        → Client
Pricing.tsx         → Client (tabs con estado)
Contact.tsx         → Client (formulario)
Navbar.tsx          → Client (estado de scroll + mobile menu)
Footer.tsx          → Podría ser Server ← OPORTUNIDAD DE OPTIMIZACIÓN
```

## Patrones de Componentes

### Atomic Design — Jerarquía estricta
```
atoms/ → molecules/ → sections/
   ↑           ↑           ↑
Sin estado   Estado mínimo  Estado complejo
Sin efectos  Sin fetch      Puede llamar API
```

Un átomo NUNCA debe importar una molécula o sección. Flujo unidireccional.

### Props con Interface (no Type)
```tsx
// ✅ Correcto
interface HeroProps {
  title?: string;
  className?: string;
}

// ❌ Evitar
type HeroProps = {
  title?: string;
}
```

### Clases Condicionales con `cn()`
```tsx
import { cn } from "@/lib/utils";

// ✅ Correcto
<div className={cn(
  "base-class otro-base",
  isActive && "active-class",
  className  // siempre permitir override externo
)} />

// ❌ Incorrecto — no concatenar strings manualmente
<div className={`base-class ${isActive ? 'active' : ''} ${className}`} />
```

### Forward de `className` — Regla de API pública
Todos los componentes que puedan ser usados en múltiples contextos DEBEN aceptar y propagar `className`:
```tsx
export const MyComponent = ({ className }: { className?: string }) => (
  <div className={cn("defaults", className)} />
);
```

## Hooks Disponibles

### `useAnimations` (`src/hooks/useAnimations.ts`)
Hook personalizado para coordinar animaciones. Usar antes de crear lógica de animación nueva.

### Hooks de React 19 — Nuevos patrones
```tsx
// use() hook para promesas — disponible en React 19
import { use } from "react";

// useOptimistic — para UI optimista en formularios
import { useOptimistic } from "react";
```

## Gestión de Estado

**Regla**: Este proyecto NO tiene gestor de estado global (no Redux, no Zustand). Todo el estado es local via `useState` o `useReducer`.

Si se necesita estado compartido entre secciones:
1. Elevar estado al componente padre (lifting state up)
2. Si es estado de UI global (ej: modal), usar Context API mínima
3. Para datos remotos, considerar la cache de Next.js fetch

## Framer Motion — Patrones del proyecto

### `ScrollReveal` — Usar siempre para entradas de sección
```tsx
// ✅ Envolver cada bloque visible con ScrollReveal
<ScrollReveal delay={0.2}>
  <h2>Título</h2>
</ScrollReveal>

// Los delays deben ser incrementales: 0, 0.1, 0.2, 0.3...
// No usar delays mayores a 0.6 (se siente lento)
```

### Animaciones avec `motion.div`
```tsx
import { motion } from "framer-motion";

// Patrón de entrada estándar del proyecto
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

### Z-index del sistema (CRÍTICO para Hero)
```
z-0   → NetworkCanvas (fondo partículas)
z-10  → Lamp (efecto luz, absolute, pointer-events-none)
z-20  → Contenido activo (textos, botones)
z-30  → Modales, overlays temporales
z-50  → Navbar (fixed, siempre arriba)
```

## TailwindCSS v4 — Diferencias importantes

En TailwindCSS v4 ya NO se usa `tailwind.config.js` — la configuración va en `globals.css` usando `@theme`:
```css
@theme {
  --color-primary: #2563EB;
  --color-accent-mint: #22D3EE;
}
```

Para extender temas, usar `@layer` no `extend` en config.

## Patrones de Responsive Design

```tsx
// Mobile First — siempre escribir la versión mobile primero
<div className="
  grid grid-cols-1      /* mobile: 1 columna */
  md:grid-cols-2        /* tablet: 2 columnas */
  lg:grid-cols-3        /* desktop: 3 columnas */
  gap-6 md:gap-8 lg:gap-10
">
```

### Breakpoints del proyecto
| Prefijo | Min-width | Dispositivo |
|---|---|---|
| (ninguno) | < 768px | Mobile |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Desktop wide |

## Importaciones — Orden estricto
```tsx
// 1. Next.js internals
import Link from "next/link";
import NextImage from "next/image";

// 2. React y librerías externas
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 3. Componentes internos (alias @/)
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";

// 4. Hooks internos
import { useAnimations } from "@/hooks/useAnimations";

// 5. Utilidades y constantes
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/constants";
```

## Anti-patrones Frontend a Evitar

| Anti-patrón | Correcto |
|---|---|
| `<img>` nativo | `<NextImage>` de `next/image` |
| `<a href="">` para rutas | Scroll programático `document.querySelector().scrollIntoView()` |
| Textos hardcodeados en JSX | Usar `constants/index.ts` |
| `className` con template literals complejos | `cn()` de `@/lib/utils` |
| `any` en TypeScript | Tipado explícito siempre |
| Múltiples `useEffect` con side effects | Un efecto bien estructurado |
| Poner `"use client"` en layout.tsx | Solo en componentes que lo necesitan |
