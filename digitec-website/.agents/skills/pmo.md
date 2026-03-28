---
name: digitec-pmo
description: Guía de Gestión de Proyectos (PMO) para DIGITEC — cómo priorizar, planificar, trackear tareas, documentar decisiones y gestionar releases. Leer antes de iniciar cualquier ciclo de trabajo.
---

# 📋 PMO — Project Management Office

## Metodología: Shape Up (adaptado)

DIGITEC usa una metodología ágil simplificada inspirada en Shape Up de Basecamp:
- **Ciclos de 6 semanas** para features nuevas
- **Cooldown de 2 semanas** para bugs, deuda técnica y mejoras
- **Sin sprints infinitos** — cada ciclo tiene inicio y fin definidos

---

## Tipos de Trabajo

| Tipo | Origen | Urgencia | Proceso |
|---|---|---|---|
| **Feature** | Roadmap / cliente | Normal | Planear → Aprobar → Ejecutar |
| **Bug fix** | Reporte | Alta | Diagnosticar → Fix → Test → Deploy |
| **Hotfix** | Producción rota | Crítica | Fix inmediato → Deploy → Documentar |
| **Deuda técnica** | Auditoría interna | Baja-media | Agendar en cooldown |
| **Mejora UI/UX** | Auditoría visual | Media | Ciclo normal |
| **Contenido** | Cliente | Variable | `/content` workflow |

---

## Priorización — Framework ICE

Para decidir qué hacer primero:

| Tarea | **I**mpact (1-10) | **C**onfidence (1-10) | **E**ase (1-10) | **Score** ICE |
|---|---|---|---|---|
| Migrar rate limit a Upstash | 7 | 9 | 8 | 504 |
| Agregar tests unitarios | 8 | 9 | 6 | 432 |
| Optimizar Three.js lazy load | 8 | 8 | 7 | 448 |
| Crear página de portafolio | 9 | 7 | 5 | 315 |

Score = Impact × Confidence × Ease. Mayor score = mayor prioridad.

---

## Ciclo de Vida de una Tarea

```
1. IDENTIFICAR  → Bug reportado / feature solicitada / auditoría detecta
2. DOCUMENTAR   → Describir en detalle: contexto, causa, solución propuesta
3. PRIORIZAR    → Calcular ICE score u asignar urgencia
4. PLANEAR      → Implementation plan (usar implementation_plan.md artifacts)
5. APROBAR      → Confirmación del usuario/cliente
6. EJECUTAR     → Usar workflows: /dev, /hotfix, /content según el tipo
7. VERIFICAR    → /qa pipeline + prueba manual
8. DOCUMENTAR   → Actualizar walkthrough.md + commit semántico
9. DEPLOY       → /deploy pipeline
```

---

## Gestión de Releases

### Versionado Semántico (SemVer)
```
MAJOR.MINOR.PATCH

0.1.0  → Lanzamiento inicial (MVP)
0.2.0  → Nueva sección o feature significativa
0.2.1  → Bug fix de la feature anterior
1.0.0  → Producto listo para producción completa
```

### Changelog — Llevar registro en `CHANGELOG.md`
```markdown
# Changelog

## [0.2.0] - 2026-03-28
### Added
- Sistema completo de agents y skills (Software Factory)
- Skill de frontend, backend, testing, seguridad

### Fixed
- Hero section: desacople del Lamp component (clipping bug)
- Email de contacto: corrección de destinatario

## [0.1.0] - 2026-02-22
### Added
- Landing page inicial con todas las secciones
- Formulario de contacto con Resend + Turnstile
```

---

## Comunicación con el Cliente

### Qué reportar en cada entrega
1. **Qué se hizo** — En lenguaje no técnico
2. **Qué impacto tiene** — Para el negocio/usuario
3. **Qué sigue** — Próximos pasos o pendientes
4. **Cómo verlo** — URL o instrucciones

### Ejemplo de reporte de entrega
```
✅ Cambios realizados esta semana:

1. Corregimos que el título de la sección Hero se veía cortado por el efecto de luz
2. Agregamos el sistema de slash commands para acelerar el desarrollo
3. Actualizamos el email del formulario al correo correcto

🔗 Ver en producción: digimall.business
📱 Probar: Formulario de contacto → enviar mensaje de prueba

🔄 Próximos pasos:
- Optimizar el rendimiento de las animaciones 3D
- Agregar la sección de portafolio de proyectos
```

---

## Backlog de Mejoras Identificadas

| ID | Tarea | Tipo | ICE Score | Status |
|---|---|---|---|---|
| BK-001 | Migrar rate limiting a Upstash Redis | Deuda técnica | 504 | 🔵 Pendiente |
| BK-002 | Lazy loading de Three.js/ParticleNetwork3D | Performance | 448 | 🔵 Pendiente |
| BK-003 | Agregar tests unitarios (Vitest) | Testing | 432 | 🔵 Pendiente |
| BK-004 | Sección de portafolio de proyectos | Feature | 315 | 🔵 Pendiente |
| BK-005 | Blog/CMS básico con Supabase | Feature | 280 | 🔵 Pendiente |
| BK-006 | Dashboard admin para contenido | Feature | 250 | 🔵 Pendiente |
| BK-007 | Integración Google Analytics 4 | Marketing | 400 | 🔵 Pendiente |
| BK-008 | `error.tsx` global + `not-found.tsx` | UX | 420 | 🔵 Pendiente |
| BK-009 | Footer como Server Component | Performance | 200 | 🔵 Pendiente |
| BK-010 | Accesibilidad: aria-labels en toda la UI | Accessibility | 380 | 🔵 Pendiente |

---

## Documentación de Decisiones Técnicas (ADR)

Cuando se toma una decisión técnica importante, documentarla:

```markdown
## ADR-001: Usar in-memory para rate limiting en vez de Upstash
**Fecha**: 2026-02-22
**Estado**: Supersedido por BK-001

**Contexto**: Necesitábamos rate limiting rápido para el formulario
**Decisión**: Usar Map en memoria para prototipar rápido
**Consecuencias**: No persiste entre reinicios, no funciona con múltiples instancias
**Alternativa a implementar**: Upstash Redis (ya instalado)
```
