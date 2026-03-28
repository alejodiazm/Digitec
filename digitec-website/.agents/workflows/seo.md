---
description: Auditoría y optimización SEO completa del sitio DIGITEC
---

# Workflow: /seo — Auditoría SEO

## Contexto obligatorio
Leer `.agents/skills/brand.md` y `src/constants/index.ts` para verificar textos actuales.

## Fase 1: Meta Tags y Estructura
1. Revisar `src/app/layout.tsx`:
   - `<title>` descriptivo y único (< 60 caracteres)
   - `<meta description>` entre 150-160 caracteres con keyword principal
   - `<meta keywords>` relevantes para el mercado colombiano
   - `og:title`, `og:description`, `og:image`, `og:url`
   - `twitter:card`, `twitter:title`, `twitter:description`
   - `canonical` URL
   - `robots: "index, follow"`
   - `lang="es"` en `<html>`

2. Verificar `src/constants/index.ts` → `METADATA`:
   - ¿Las keywords apuntan al mercado objetivo? (Bogotá, Colombia, Latam)
   - ¿Incluyen los servicios principales? (desarrollo web, branding, WordPress, Next.js)

## Fase 2: Jerarquía de Headings
3. En `src/app/page.tsx` y secciones:
   - Exactamente **1 `<h1>`** por página (en Hero)
   - `<h2>` para títulos de sección (About, Services, Pricing, Contact)
   - `<h3>` para títulos de card o subsección
   - ¿La jerarquía es H1 > H2 > H3 sin saltos?

## Fase 3: Imágenes y Assets
4. En todos los componentes verificar:
   - Todas las `<img>` y `<NextImage>` tienen atributo `alt` descriptivo
   - Las imágenes decorativas tienen `alt=""`
   - Imágenes optimizadas (formato WebP preferido)
   - `<NextImage>` con `width` y `height` o `fill` para evitar CLS

## Fase 4: Performance y Core Web Vitals
5. Verificar en code:
   - Fuentes con `display: "swap"` ✅ (Montserrat ya configurado)
   - `<NextImage>` con `priority` en imágenes above-the-fold (Hero)
   - No hay componentes `"use client"` innecesarios
   - No hay renders condicionados que causen CLS

## Fase 5: URLs y Anclas de Navegación
6. Verificar que todos los IDs de sección coincidan con `ROUTES` en `constants/index.ts`:
   ```
   #inicio → section[id="inicio"] ✓
   #nosotros → section[id="nosotros"] ✓
   #servicios → section[id="servicios"] ✓
   #planes → section[id="planes"] ✓
   #contacto → section[id="contacto"] ✓
   ```

## Reporte Final
```markdown
## Reporte SEO — DIGITEC Website — [fecha]

### Score estimado (basado en auditoría manual)
- Meta tags: [N/10]
- Headings structure: [N/10]
- Imágenes/Alt: [N/10]
- Performance: [N/10]

### Issues encontrados
- [tipo]: [descripción] — [archivo:línea] — [fix propuesto]

### Keywords recomendadas para agregar
- [keyword]: [razón y volumen estimado]
```
