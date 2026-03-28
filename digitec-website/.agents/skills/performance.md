---
name: digitec-performance
description: Guía de rendimiento y Core Web Vitals para el proyecto Digitec. Targets de Lighthouse, patrones de optimización Next.js y métricas clave. Leer antes de cualquier decisión sobre carga de assets, imágenes o animaciones.
---

# ⚡ Performance — Core Web Vitals & Optimización

## Targets de Lighthouse (Producción)

| Métrica | Target | Estado estimado |
|---|---|---|
| Performance | ≥ 90 | ~75-85 (estimado, por animaciones 3D) |
| Accessibility | ≥ 95 | ~85 (pendiente auditoría) |
| Best Practices | ≥ 95 | ~90 |
| SEO | ≥ 95 | ~90 |

## Core Web Vitals — Objetivos

| CWV | Métrica | Good | Needs Work | Poor |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Carga del elemento más grande | < 2.5s | 2.5-4s | > 4s |
| **FID/INP** (Interaction to Next Paint) | Respuesta a interacción | < 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual | < 0.1 | 0.1-0.25 | > 0.25 |

---

## Optimizaciones Ya Implementadas ✅

- **Montserrat** con `display: "swap"` → Evita FOIT
- **`<NextImage>`** en lugar de `<img>` → Optimización automática, WebP, lazy loading
- **TailwindCSS v4** → Tree-shaking agresivo, CSS mínimo
- **Turbopack** → Build optimizado en desarrollo
- **App Router de Next.js** → Server Components para contenido estático

---

## Optimizaciones Pendientes ⚠️

### 1. Priority loading en imágenes above-the-fold
```tsx
// Hero — logo y primera imagen visible deben tener priority
<NextImage
  src="/images/Logo_DIGITEC.png"
  alt="DIGITEC Logo"
  width={200}
  height={60}
  priority  // ← Agregar esto en el Hero
/>
```

### 2. Three.js / @react-three — Carga pesada
El paquete `three` + `@react-three/fiber` + `@react-three/drei` suma ~800KB gzipped. Aplicar:
```tsx
// Lazy loading del componente 3D
import dynamic from "next/dynamic";

const ParticleNetwork3D = dynamic(
  () => import("@/components/effects/ParticleNetwork3D"),
  { 
    ssr: false,  // Three.js NO funciona en SSR
    loading: () => <div className="w-full h-full bg-slate-900" />,
  }
);
```

### 3. GSAP — Solo cargar si se usa
```tsx
// Lazy import de GSAP cuando sea necesario
const { gsap } = await import("gsap");
```

### 4. Framer Motion — Bundle weight
Framer Motion v12 ya tiene tree-shaking. Asegurarse de no importar todo el bundle:
```tsx
// ✅ Import específico
import { motion, AnimatePresence } from "framer-motion";

// ❌ No importar toda la librería si no se necesita
import * as framer from "framer-motion";
```

### 5. Footer puede ser Server Component
```tsx
// Footer.tsx — eliminar "use client" si no usa hooks/eventos
// Esto reduce el JS bundle enviado al navegador
```

---

## Análisis del Bundle

```bash
# Ver análisis del bundle de producción
ANALYZE=true npm run build

# Requiere instalar:
npm install -D @next/bundle-analyzer
```

```ts
// next.config.ts — agregar analyzer
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

---

## Optimización de Imágenes

### Formatos recomendados
| Tipo de imagen | Formato |
|---|---|
| Fotos y gradientes complejos | WebP (automático con NextImage) |
| Logos e íconos con transparencia | PNG → SVG si es posible |
| Animaciones | CSS o Lottie (no GIFs) |

### Tamaños recomendados para assets del proyecto
```
Logo_DIGITEC.png   → max 400px wide exportar en 2x (800px) 
Mariposa.png       → exportar en múltiples sizes
Imágenes de hero   → 1920px wide, WebP, < 200KB
```

### `sizes` prop en NextImage para responsive
```tsx
<NextImage
  src="/images/hero-bg.webp"
  alt="Hero background"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
  className="object-cover"
/>
```

---

## Scroll Performance

### Lenis (ya instalado) — Configuración óptima
```ts
// En SmoothScroll.tsx
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,     // Ajustar para velocidad de scroll
  touchMultiplier: 2,     // Ajustar para mobile
});
```

### ScrollReveal — Intersection Observer (eficiente)
El componente `ScrollReveal` usa Framer Motion `whileInView` que internamente usa IntersectionObserver. Es eficiente. **No** usar `useEffect` + `scroll` event listener para animaciones.

---

## Métricas de Rendimiento — Cómo Medir

```bash
# Lighthouse CLI local
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Web Vitals en código (para monitoreo en producción)
# En layout.tsx
export function reportWebVitals(metric) {
  console.log(metric); // O enviar a analytics
}
```
