---
description: Ciclo completo de desarrollo de una nueva feature o mejora en el sitio de DIGITEC
---

# Workflow: /dev — Desarrollo de Features

## Contexto obligatorio
Antes de empezar, leer los siguientes skills:
- `.agents/skills/architecture.md`
- `.agents/skills/brand.md`
- `.agents/skills/components.md`

## Fase 1: Entendimiento
1. Identificar exactamente qué se quiere construir o modificar
2. Revisar si ya existe un componente que cubra el caso (consultar `components.md`)
3. Identificar qué archivos se van a modificar antes de tocarlos
4. Verificar el patrón correcto (Atomic Design, z-index layers, etc.)

## Fase 2: Implementación
5. Leer el archivo completo antes de modificarlo (`view_file`)
6. Aplicar cambios con `multi_replace_file_content` o `replace_file_content`
7. Mantener las convenciones:
   - Imports con alias `@/`
   - Textos → siempre en `src/constants/index.ts`
   - Clases Tailwind para fondo claro: `text-[#1E293B]` y `text-[#475569]`
   - Clases Tailwind para fondo oscuro: `text-white` y `text-slate-300`
   - Responsive: siempre incluir `sm:`, `md:`, `lg:`

## Fase 3: Verificación
// turbo
8. Ejecutar: `npm run build` en `/Users/macuser/Desktop/DIGITEC/Digitec/digitec-website`
9. Si hay errores de TypeScript o build, corregirlos antes de continuar

## Fase 4: Commit
10. Seguir `/git` para commit semántico

## Reglas Críticas
- NUNCA poner `children` dentro de `<Lamp>` (es componente visual puro)
- NUNCA hardcodear textos en componentes — usar `constants/index.ts`
- SIEMPRE verificar responsive (mobile-first)
- SIEMPRE leer el archivo antes de editarlo
