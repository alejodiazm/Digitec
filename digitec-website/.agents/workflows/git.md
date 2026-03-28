---
description: Commit semántico y push al repositorio de GitHub con Conventional Commits
---

# Workflow: /git — Gestión de Versiones

## Convención de Commits (Conventional Commits)
```
type(scope): descripción corta en español

Tipos válidos:
  feat      → Nueva funcionalidad
  fix       → Corrección de bug
  style     → Cambios de estilos (sin lógica)
  refactor  → Refactorización (sin cambio funcional)
  docs      → Documentación
  chore     → Configuración, dependencies, build
  hotfix    → Corrección urgente de producción
  perf      → Optimización de rendimiento
  test      → Tests

Scopes de este proyecto:
  hero, navbar, about, services, pricing, contact, footer
  lamp, evervault, network-canvas
  api, contact-form, auth
  constants, layout, globals
  deploy, build, agents
```

## Ejemplos correctos
```bash
feat(services): agregar nueva tarjeta de servicio IA
fix(navbar): corregir scroll en iOS Safari móvil
style(hero): ajustar padding superior en breakpoint md
refactor(lamp): desacoplar componente de sus children
docs(agents): agregar skill de arquitectura
chore(build): actualizar next.config.ts para Hostinger
hotfix(contact): corregir email de destino del formulario
```

## Pasos del Workflow

1. Verificar estado del repositorio:
```bash
git status
```

2. Ver cambios pendientes:
```bash
git diff --stat
```

3. Stagear todos los cambios:
```bash
git add .
```

4. Crear commit semántico (ajustar type/scope según la tarea):
```bash
git commit -m "type(scope): descripción en español"
```

5. Push a main:
```bash
git push origin main
```

6. Confirmar el commit con:
```bash
git log --oneline -3
```

## Regla
// turbo
Siempre ejecutar `/qa` antes de cualquier commit con código. No hacer commits con builds rotos.
