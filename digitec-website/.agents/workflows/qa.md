---
description: Quality Assurance completo — lint, type-check y build de producción
---

# Workflow: /qa — Quality Assurance Pipeline

## Objetivo
Verificar que el proyecto compile sin errores antes de cualquier deploy o commit.

## Paso 1: ESLint
// turbo
1. Ejecutar en `/Users/macuser/Desktop/DIGITEC/Digitec/digitec-website`:
```bash
npm run lint
```
- Si hay errores, reportar archivo, línea y descripción
- Corregir errores antes de continuar

## Paso 2: TypeScript Check
// turbo
2. Ejecutar:
```bash
npx tsc --noEmit
```
- Si hay errores de tipos, listarlos todos y corregirlos
- Prestar especial atención a props faltantes e imports incorrectos

## Paso 3: Build de Producción
// turbo
3. Ejecutar:
```bash
npm run build
```
- El build debe completar con `Exit code: 0`
- Si falla, analizar el error completo y auto-corregir

## Reporte Final
Al terminar, reportar:
```
✅ ESLint: PASS / ❌ FAIL (N errores)
✅ TypeScript: PASS / ❌ FAIL (N errores)  
✅ Build: PASS / ❌ FAIL
```

## Regla
El workflow `/deploy` NUNCA debe ejecutarse sin que `/qa` haya pasado primero.
