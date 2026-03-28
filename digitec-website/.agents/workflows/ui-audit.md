---
description: Auditoría UI/UX visual completa — responsive, contraste, espaciados, animaciones y accesibilidad
---

# Workflow: /ui-audit — Auditoría UI/UX

## Contexto obligatorio
Leer `.agents/skills/brand.md` y `.agents/skills/components.md` antes de ejecutar.

## Fase 1: Captura Visual
1. Abrir el sitio en `http://localhost:3000` con el browser subagent
2. Capturar screenshot de cada sección:
   - Hero (desktop 1280px)
   - About / Nosotros
   - Services / Servicios
   - Pricing / Planes
   - Testimonials
   - Contact / Contacto
   - Footer
3. Capturar en móvil (simular 375px):
   - Hero mobile
   - Navbar mobile (menú abierto)
   - Cualquier sección con layout grid

## Fase 2: Análisis de Contraste (WCAG 2.1 AA)
Para cada sección verificar:
- Texto sobre fondo claro: mínimo ratio 4.5:1 (body), 3:1 (headings grandes)
- Texto sobre fondo oscuro: ídem
- Regla del proyecto:
  - Fondos claros (#F8FAFC, #F1F5F9) → `text-[#1E293B]` (ratio ~12:1 ✅)
  - Fondos oscuros (#0B1121, #0F172A) → `text-white` o `text-slate-300`
  - ❌ Jamás usar `text-slate-500` o más apagado sobre fondo oscuro

## Fase 3: Revisión Responsive
Verificar en cada breakpoint:
- **Mobile (320-767px)**: ¿El texto se corta? ¿Los botones son touch-friendly (min 44px)? ¿El grid colapsa bien?
- **Tablet (768-1023px)**: ¿Los grids de 3 columnas cambian a 1-2?
- **Desktop (1024px+)**: ¿El layout tiene máximo ancho correcto?

## Fase 4: Revisión de Espaciados
- ¿Hay secciones sin padding superior que choquen con el Navbar fijo (h-16 md:h-20)?
- ¿Los paddings de sección son consistentes? (estándar: `py-24`, principal: `py-32`)
- ¿El spacing entre elementos es armónico (8px grid)?

## Fase 5: Revisión de Animaciones
- ¿ScrollReveal funciona en cada sección?
- ¿Los hover states de botones y tarjetas son visibles?
- ¿El Lamp en Hero se ve correctamente (gradiente cónico desde arriba)?
- ¿La NetworkCanvas de fondo es visible pero no invasiva?

## Reporte Final
Generar informe con:
```markdown
## Hallazgos UI/UX — [fecha]

### 🔴 Críticos (rompen usabilidad)
- [hallazgo]: [sección] — [solución propuesta]

### 🟡 Importantes (afectan calidad)
- [hallazgo]: [sección] — [solución propuesta]

### 🟢 Mejoras (nice-to-have)
- [hallazgo]: [sección] — [solución propuesta]
```

Preguntar: "¿Procedo a corregir los items críticos?" antes de hacer cambios.
