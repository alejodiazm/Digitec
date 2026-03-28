---
name: digitec-components
description: Inventario completo de todos los componentes del proyecto Digitec, sus props, reglas de uso y anti-patrones. Leer antes de crear o modificar cualquier componente.
---

# 🧩 Inventario de Componentes — DIGITEC Website

## ÁTOMOS (`src/components/atoms/`)

### `Button.tsx`
Botón principal del sistema. Soporta variantes y tamaños.
```tsx
<Button
  variant="primary" | "outline" | "ghost"
  size="sm" | "md" | "lg"
  rightIcon={<ArrowRight />}   // Ícono derecho opcional
  onClick={() => {}}
  className=""                  // Clases adicionales
>
  Texto del botón
</Button>
```
**Reglas**: Siempre usar este componente en lugar de `<button>` nativo. Los botones de CTA primarios usan `variant="primary"` con `bg-primary text-white`.

### `Container.tsx`
Wrapper de ancho máximo centrado. Úsalo para limitar el ancho del contenido.
```tsx
<Container className="py-24">
  {/* Contenido limitado a max-w-7xl */}
</Container>
```

### `Logo.tsx`
Logo de DIGITEC con variantes de color.
```tsx
<Logo variant="default" | "white" | "dark" />
```

### `Card.tsx`
Tarjeta base simple con bordes y fondo.

### `ScrollProgress.tsx`
Barra de progreso de scroll en la parte superior. Se coloca en `page.tsx`.

### `AnimatedCounter.tsx`
Contador numérico animado. Acepta valor final y duración.

### `Section.tsx`
Wrapper semántico de sección con ID y className.

---

## MOLÉCULAS (`src/components/molecules/`)

### `GlowCard.tsx`
Tarjeta con efecto glow en hover. Usada en Services para las etapas de metamorfosis.
```tsx
<GlowCard className="h-full relative overflow-hidden group">
  {/* Contenido */}
</GlowCard>
```

---

## EFECTOS (`src/components/effects/`)

### `Lamp.tsx` ⚠️ SIN CHILDREN
Efecto decorativo de luz cónica en la parte superior del Hero. **NO acepta `children`**. Es puramente visual y se usa como capa absoluta (`z-10`).
```tsx
// ✅ CORRECTO
<div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
  <Lamp />
</div>

// ❌ INCORRECTO — causa clipping en el texto
<Lamp>
  <h1>Título</h1>
</Lamp>
```

### `NetworkCanvas.tsx`
Canvas interactivo con partículas y redes. Fondo animado del Hero. Se usa como capa `z-0 absolute inset-0`.
```tsx
<div className="absolute inset-0 z-0">
  <NetworkCanvas />
</div>
```

### `EvervaultCard.tsx`
Tarjeta con gradiente brillante en hover. Usada en las etapas de Service.
```tsx
<EvervaultCard
  text="Dar"         // Texto flotante en el gradiente
  className="rounded-2xl border border-black/5"
/>
```
**Nota**: Los caracteres aleatorios han sido eliminados. Solo conserva el gradiente en hover.

### `ScrollReveal.tsx`
Wrapper de animación de entrada al hacer scroll.
```tsx
<ScrollReveal delay={0.2}>
  {/* Elemento que aparece con fade+slide al entrar al viewport */}
</ScrollReveal>
```

### `TextGenerateEffect.tsx`
Efecto de generación de texto palabra por palabra.
```tsx
<TextGenerateEffect
  words="Tu texto aquí..."
  className="text-inherit"
/>
```

### `SmoothScroll.tsx`
Wrapper global de Lenis para scroll suave. Se usa en `layout.tsx`.

### `TypewriterText.tsx`
Texto con efecto de escritura a máquina.

### `LiquidGradient.tsx`
Gradiente animado fluido de fondo.

### `MagneticCard.tsx`
Tarjeta con efecto magnético al acercar el cursor.

### `MorphingLogo.tsx`
Logo con efecto de morphing animado.

### `CustomCursor.tsx`
Cursor personalizado (usar con precaución en móvil).

### `TracingBeam.tsx`
⚠️ **ELIMINADO del layout principal** — Causaba bordes negros laterales. NO reinstalar como wrapper de `page.tsx`.

---

## SECCIONES (`src/components/sections/`)

### `Navbar.tsx`
Navegación principal fija. Scroll suave con `document.querySelector(href).scrollIntoView()`.
- Desktop: links + botón "Cotizar"
- Mobile: overlay `fixed inset-0 bg-white/95 backdrop-blur-md` con `AnimatePresence`
- Links: `ROUTES.HOME`, `ROUTES.ABOUT`, `ROUTES.SERVICES`, `ROUTES.CONTACT`

### `Hero.tsx` — Estructura de capas (z-index)
```
z-0:  NetworkCanvas (partículas)
z-10: Lamp (efecto de luz, absolute, pointer-events-none)
z-20: Container con texto (Badge, H1, descripción, CTAs)
```
La sección tiene `id="inicio"` para navegación por ancla.

### `About.tsx`
Sección `id="nosotros"`. Fondo oscuro (`bg-[#0F172A]`). Grid de 2 columnas en desktop. Prop `className` para override.

### `Services.tsx`
Sección `id="servicios"`. Fondo `#F1F5F9`. Grid de 3 tarjetas `GlowCard` con `EvervaultCard` interno. Sección diferencial al final.

### `Pricing.tsx`
Sección `id="planes"`. Tabs de categorías (Desarrollo Web, Branding, etc.) con planes en cards. Fondo intercambiable por prop.

### `Testimonials.tsx`
Logos de clientes y tarjetas de testimonio.

### `Contact.tsx`
Sección `id="contacto"`. Formulario con React Hook Form + Zod + Turnstile CAPTCHA. POST a `/api/contact`. Email enviado via Resend a `digitecglobalsas@gmail.com`.

### `Footer.tsx`
Links de navegación, redes sociales, copyright.

---

## Reglas Globales de Componentes
1. **Fondo claro** → textos `text-[#1E293B]` y `text-[#475569]`
2. **Fondo oscuro** → textos `text-white` y `text-slate-300`
3. **IDs de sección** → siempre en minúsculas: `inicio`, `nosotros`, `servicios`, `planes`, `contacto`
4. **Padding de sección** → `py-24` (estándar) o `py-32` (secciones principales)
5. **Responsive mínimo** → siempre incluir clases `sm:`, `md:`, `lg:` en layouts de grid
