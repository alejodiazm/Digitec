---
description: Auditoría completa de rendimiento — Lighthouse, bundle size, Core Web Vitals y Three.js
---

# Workflow: /perf — Auditoría de Rendimiento

## Contexto obligatorio
Leer `.agents/skills/performance.md` antes de ejecutar.

## Fase 1: Lighthouse Local
1. Asegurarse de tener el servidor de producción local:
```bash
npm run build && npm run start
```

2. Ejecutar Lighthouse CLI:
```bash
npx lighthouse http://localhost:3000 \
  --output json,html \
  --output-path ./perf-report \
  --preset desktop \
  --throttling-method provided
```

3. Registrar los scores:
```
Performance:    [N]/100
Accessibility:  [N]/100
Best Practices: [N]/100
SEO:            [N]/100

LCP: [X.XX]s  (target: < 2.5s)
TBT: [X]ms    (target: < 200ms)
CLS: [X.XX]   (target: < 0.1)
```

## Fase 2: Análisis de Bundle
// turbo
4. En `/Users/macuser/Desktop/DIGITEC/Digitec/digitec-website`:
```bash
ANALYZE=true npm run build
```

Buscar en el output:
- Chunks mayores a 500KB (señal de problema)
- Three.js / @react-three incluido en el bundle principal (debe estar in lazy chunk)
- Framer Motion duplicado

## Fase 3: Diagnóstico y Priorización

Para cada problema encontrado, clasificar:

| #  | Problema | Impacto estimado | Dificultad | Priorizar? |
|----|---|---|---|---|
| 1  | Three.js no lazy-loaded | -10-15 LCP | Media | ✅ Sí |
| 2  | Sin `priority` en imagen Hero | -5-10 LCP | Baja | ✅ Sí |
| 3  | Client Components innecesarios | -5 TBT | Alta | 🟡 Condicional |

## Fase 4: Aplicar Optimizaciones

Para cada optimización, seguir el patrón de skill `performance.md`.

Después de cada grupo de cambios:
```bash
npm run build  # Verificar que no se rompió nada
```

## Reporte Final
```
## Reporte de Performance — DIGITEC — [fecha]

### Scores antes/después
| Métrica | Antes | Después | Mejora |
|---|---|---|---|
| Performance | [N] | [N] | +[N]pts |
| LCP | [X]s | [X]s | -[X]s |

### Optimizaciones aplicadas
1. [Optimización]: [Impacto medido]

### Pendientes (no aplicadas)
- [Optimización]: [Razón por la que se pospone]
```
