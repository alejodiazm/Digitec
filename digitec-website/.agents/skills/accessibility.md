---
name: digitec-accessibility
description: Guía de Accesibilidad (WCAG 2.1 AA) para el proyecto Digitec. Checklist, patrones ARIA, navegación por teclado y herramientas de auditoría. Leer antes de cualquier cambio en la UI.
---

# ♿ Accesibilidad — WCAG 2.1 AA

## Estándar Objetivo: WCAG 2.1 Nivel AA

Este nivel es el mínimo estándar internacional para sitios web profesionales. Cumplirlo no es solo legal en muchos países — es la experiencia correcta para el 15% de la población con alguna discapacidad.

---

## Contrastes de Color — Ratios Mínimos

| Texto | Ratio mínimo (AA) | Ratio recomendado (AAA) |
|---|---|---|
| Texto cuerpo (< 18px bold o < 24px) | **4.5:1** | 7:1 |
| Texto grande (≥ 18px bold o ≥ 24px) | **3:1** | 4.5:1 |
| Elementos UI (iconos, inputs) | **3:1** | — |

### Ratios reales del proyecto (calcular en contrast.ratio.fyi)

| Combinación | Ratio | Estado |
|---|---|---|
| `#1E293B` sobre `#F8FAFC` | ~12:1 | ✅ AAA |
| `#475569` sobre `#F8FAFC` | ~6:1 | ✅ AA |
| `white` sobre `#0B1121` | ~18:1 | ✅ AAA |
| `#CBD5E1` (slate-300) sobre `#0B1121` | ~10:1 | ✅ AAA |
| `#94A3B8` (slate-400) sobre `#0F172A` | ~4.8:1 | ✅ AA (uso muy limitado) |
| `#64748B` (slate-500) sobre `#0F172A` | ~3.1:1 | ❌ FALLA — evitar |

**Regla**: Nunca usar `text-slate-500` o más apagado sobre fondos oscuros del proyecto.

---

## Estructura HTML Semántica

### Jerarquía de headings — Obligatoria
```
<h1> Hero principal → "Transformamos ideas en Ecosistemas Digitales"
  <h2> Sección "¿Qué hace DIGITEC?"
    <h3> Card "Dar Vida (Creación)"
    <h3> Card "Impulsar el Vuelo"
    <h3> Card "Renovar el Impacto"
  <h2> Sección "Nosotros"
  <h2> Sección "Planes"
  <h2> Sección "Contacto"
```

**Regla**: Exactamente 1 `<h1>` por página. No saltar niveles (de h2 a h4).

### Landmarks ARIA de HTML5
```html
<header>   ← Navbar
<main>     ← Contenido principal (page.tsx)
<section>  ← Cada sección con id (inicio, nosotros, etc.)
<footer>   ← Footer
<nav>      ← Navegación principal
<form>     ← Formulario de contacto
```

---

## Imágenes y Alt Text

### Reglas
```tsx
// Imágenes informativas — describir el contenido
<NextImage src="/images/Logo_DIGITEC.png" alt="Logo de DIGITEC Global SAS" />

// Imágenes decorativas — alt vacío (el lector de pantalla las ignora)
<NextImage src="/images/Mariposa.png" alt="" aria-hidden="true" />

// Iconos sin texto — describir acción o significado
<button aria-label="Abrir menú de navegación">
  <Menu />
</button>

// Iconos con texto visible — ocultar del lector
<button>
  <ArrowRight aria-hidden="true" />
  Explorar Servicios
</button>
```

---

## Navegación por Teclado

### Focus visible — Obligatorio
Todos los elementos interactivos deben ser visible al navegar con Tab:
```css
/* En globals.css — nunca quitar outline sin reemplazarlo */
:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Componentes con requerimientos especiales

**Navbar Mobile Menu:**
- Cuando el menú se abre, el foco debe moverse dentro del menú
- Cerrar con `Escape`
- Cuando se cierra, devolver foco al botón que lo abrió

**Formulario de contacto:**
- Labels asociados con `htmlFor` / `id`
- Mensajes de error asociados con `aria-describedby`
- Feedback de éxito/error anunciado con `role="alert"`

```tsx
// Patrón correcto de input con error
<input
  id="email"
  {...register("email")}
  aria-describedby={errors.email ? "email-error" : undefined}
  aria-invalid={!!errors.email}
/>
{errors.email && (
  <p id="email-error" role="alert" className="text-red-500 text-sm">
    {errors.email.message}
  </p>
)}
```

**Botones de scroll:**
```tsx
// Botones que scrollean NO son links — deben ser <button>
<button
  onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
  aria-label="Ir a la sección de servicios"
>
  Explorar Servicios
</button>
```

---

## Motion y Animaciones

### Respetar `prefers-reduced-motion`
```css
/* En globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// En Framer Motion — usando el hook
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
const animations = shouldReduceMotion 
  ? {} 
  : { initial: { opacity: 0 }, animate: { opacity: 1 } };
```

---

## Formularios y Validación

```tsx
// El formulario de contacto debe tener:
<form
  onSubmit={handleSubmit(onSubmit)}
  noValidate  // Desactivar validación nativa del browser
  aria-label="Formulario de contacto"
>
  <label htmlFor="name">
    Nombre completo
    <span aria-label="requerido" className="text-red-500"> *</span>
  </label>
  <input
    id="name"
    type="text"
    autoComplete="name"
    {...register("name")}
  />
```

---

## Herramientas de Auditoría de Accesibilidad

```bash
# axe-core para testing automático
npm install -D axe-core @axe-core/react

# En desarrollo, en layout.tsx:
if (process.env.NODE_ENV !== "production") {
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}
```

**Herramientas para auditoría manual:**
1. **Chrome DevTools** → Lighthouse → Accessibility tab
2. **axe DevTools** extension (Chrome/Firefox)
3. **WAVE** extension (web.aim.org)
4. **NerdeFocus** → Ver el flujo del foco en la página
5. **Navegar con teclado** → Tab, Shift+Tab, Enter, Escape, Flecha

---

## Checklist WCAG 2.1 AA — Antes de Deploy

```
□ Todos los textos cuerpo tienen ratio ≥ 4.5:1
□ Textos grandes tienen ratio ≥ 3:1
□ Exactamente 1 <h1> en la página
□ Jerarquía de headings sin saltos (h1→h2→h3)
□ Todas las imágenes tienen alt (descriptivo o vacío si decorativas)
□ Todos los botones icon-only tienen aria-label
□ Focus visible en todos los elementos interactivos
□ Formulario: labels asociados con htmlFor/id
□ Errores de formulario anunciados con role="alert"
□ Menú mobile cierra con Escape y devuelve foco
□ Navegación completa con teclado es posible
□ prefers-reduced-motion respetado en animaciones
```
