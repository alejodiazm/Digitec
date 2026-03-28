---
name: digitec-design-system
description: Sistema de diseño completo de DIGITEC — tokens de color, tipografía escalada, espaciado, sombras, bordes y patrones visuales. Leer antes de crear cualquier componente visual nuevo.
---

# 🎨 Design System — DIGITEC Global SAS

## Design Tokens

### Colores — Paleta Completa

```css
/* En globals.css via @theme de TailwindCSS v4 */

/* Primarios */
--color-primary:       #2563EB  /* Azul principal */
--color-primary-dark:  #1D4ED8  /* Hover / Pressed */
--color-primary-light: #3B82F6  /* Variante clara */

/* Acentos */
--color-accent-mint:     #22D3EE  /* Cian — indicadores, badges activos */
--color-accent-lavender: #A78BFA  /* Lavanda — gradientes, decorativos */

/* Fondos Dark */
--bg-dark:           #0B1121  /* Body / Fondo raíz */
--bg-dark-secondary: #0F172A  /* Secciones oscuras (About, Pricing dark) */
--bg-dark-card:      #1E293B  /* Tarjetas sobre fondo oscuro */

/* Fondos Light */
--bg-light:           #F8FAFC  /* Hero, Contact */
--bg-light-secondary: #F1F5F9  /* Services, About light */
--bg-light-card:      #FFFFFF  /* Tarjetas sobre fondo claro */

/* Textos sobre Light */
--text-light-primary:   #1E293B  /* Titulares */
--text-light-secondary: #475569  /* Párrafos */
--text-light-muted:     #94A3B8  /* Texto de apoyo */

/* Textos sobre Dark */
--text-dark-primary:   #FFFFFF
--text-dark-secondary: #CBD5E1  /* slate-300 */
--text-dark-muted:     #64748B  /* slate-500 — MÍNIMO para contraste */
```

### Gradientes del Sistema

```css
/* Gradiente primario — Hero título */
background: linear-gradient(to right, #2563EB, #A78BFA, #22D3EE);
/* Tailwind: bg-gradient-to-r from-primary via-accent-lavender to-accent-mint */

/* Gradiente oscuro — secciones dark */
background: linear-gradient(135deg, #0B1121 0%, #0F172A 100%);

/* Gradiente glow — botones y highlights */
box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
/* Tailwind: shadow-xl shadow-primary/20 */
```

---

## Tipografía Escalada

**Fuente: Montserrat** (variable CSS: `--font-montserrat`)

### Escala de tamaños

| Nombre | Mobile | Desktop | Uso |
|---|---|---|---|
| Display XL | `text-4xl` (36px) | `text-7xl` (72px) | H1 Hero |
| Display L | `text-3xl` (30px) | `text-5xl` (48px) | H2 Sección |
| Display M | `text-2xl` (24px) | `text-3xl` (30px) | H3 Card |
| Body L | `text-lg` (18px) | `text-xl` (20px) | Descripción principal |
| Body M | `text-base` (16px) | — | Cuerpo estándar |
| Body S | `text-sm` (14px) | — | Metadata, labels |
| Caption | `text-xs` (12px) | — | Badges, tags, copyright |

### Pesos de uso

| Peso | Clase | Uso |
|---|---|---|
| 400 | `font-normal` | Párrafos largos |
| 500 | `font-medium` | Cuerpo destacado, links |
| 600 | `font-semibold` | Labels, UI elements |
| 700 | `font-bold` | Títulos de sección, titulares |
| 800 | `font-extrabold` | Display Hero |

### Tracking (letter-spacing)

```
Titulares grandes:    tracking-tight (-0.025em)
Cuerpo:              tracking-normal (0)
Labels/Badges:       tracking-wider (0.05em) o tracking-widest (0.1em)
```

---

## Sistema de Espaciado (Base 8px Grid)

| Token | Valor | Clase TW | Uso típico |
|---|---|---|---|
| xs | 4px | `p-1`, `gap-1` | Iconos inline |
| sm | 8px | `p-2`, `gap-2` | Padding interno de badges |
| md | 16px | `p-4`, `gap-4` | Padding de cards pequeñas |
| lg | 24px | `p-6`, `gap-6` | Gap de grids |
| xl | 32px | `p-8`, `gap-8` | Padding de cards grandes |
| 2xl | 48px | `p-12` | Padding secciones internas |
| 3xl | 96px | `py-24` | Padding de secciones (estándar) |
| 4xl | 128px | `py-32` | Padding de secciones principales |

---

## Sombras

```css
/* Sombra sutil — tarjetas sobre fondo claro */
shadow: 0 1px 3px rgba(0,0,0,0.05);
/* Tailwind: shadow-sm */

/* Sombra media — cards elevadas */
shadow: 0 4px 24px rgba(0,0,0,0.05);
/* Tailwind: shadow-xl shadow-black/5 */

/* Sombra de color — botones primarios */
shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
/* Tailwind: shadow-xl shadow-primary/20 */

/* Glow de acento */
shadow: 0 0 40px rgba(34, 211, 238, 0.15);
/* Tailwind: shadow-[0_0_40px_rgba(34,211,238,0.15)] */
```

---

## Bordes y Radios

| Contexto | Radio | Clase TW |
|---|---|---|
| Badges, tags, pills | 9999px | `rounded-full` |
| Botones | 8px | `rounded-lg` |
| Cards estándar | 12px | `rounded-xl` |
| Cards grandes / secciones | 16-24px | `rounded-2xl`, `rounded-3xl` |

**Bordes de uso:**
```css
/* Borde sutil sobre fondo claro */
border: 1px solid rgba(0,0,0,0.05);
/* Tailwind: border border-black/5 */

/* Borde de acento primario */
border: 1px solid rgba(37,99,235,0.1);
/* Tailwind: border border-primary/10 */
```

---

## Patrón de Glassmorphism

Usado en Navbar scrolled, modales, toasts:
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(0,0,0,0.05);
```
```tsx
// Clase Tailwind equivalente:
className="bg-white/70 backdrop-blur-md border border-black/5"
```

---

## Patrones de Fondo Decorativo

### Grain overlay (ya en globals.css)
```css
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("data:image/...");  /* Textura de grano */
  opacity: 0.02;
  pointer-events: none;
  z-index: 1;
}
```

### Blob de color difuso
```tsx
/* Blob decorativo reutilizable */
<div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-mint/5 rounded-full blur-3xl pointer-events-none" />
```

### Grid de fondo (micropatrón)
```tsx
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
```

---

## Jerarquía Visual de las Secciones

```
Sección oscura (Dark) →  bg-[#0F172A]
Sección clara (Light)  →  bg-[#F1F5F9] o bg-[#F8FAFC]
```

El patrón de alternancia en la landing:
```
Hero     → Light (#F8FAFC) con partículas dark
About    → Dark  (#0F172A)
Services → Light (#F1F5F9)
Pricing  → Dark  (#0F172A) / intercambiable
Testimonials → Light (#F8FAFC)
Contact  → Light (#F8FAFC)
Footer   → Dark  (#0B1121)
```
