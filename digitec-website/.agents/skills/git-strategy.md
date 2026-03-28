---
name: digitec-git-strategy
description: Estrategia de branching, PRs y code review para el proyecto Digitec. Leer antes de crear branches, abrir PRs o hacer merges.
---

# 🌿 Git Strategy — DIGITEC Website

## Modelo de Branching: GitHub Flow (simplificado)

Dado que DIGITEC tiene un equipo pequeño y deploy manual a Hostinger, se usa **GitHub Flow**:

```
main ←────────────────────────── Producción (siempre deployable)
  ↑
  └── feat/nombre    ← Feature branch temporales
  └── fix/nombre     ← Bug fix branches
  └── hotfix/nombre  ← Fix urgente desde main
```

**Regla fundamental**: `main` siempre debe estar en estado deployable. Nunca hacer push directo de código sin verificar.

---

## Tipos de Branch y Cuándo Usar Cada Uno

### Feature branch (`feat/`)
Para features que toman más de 1 hora o que involucran múltiples archivos.
```bash
git checkout -b feat/portfolio-section
# Trabajar...
git push origin feat/portfolio-section
# Abrir PR → merge a main
```

### Fix branch (`fix/`)
Para bugs de no urgencia que requieren investigación.
```bash
git checkout -b fix/navbar-scroll-ios
```

### Hotfix branch (`hotfix/`)
Para errores críticos de producción. Sale directo desde `main` y vuelve directo a `main`.
```bash
git checkout main
git pull origin main
git checkout -b hotfix/contact-form-broken
# Fix mínimo y quirúrgico
# Ejecutar /qa
git push origin hotfix/contact-form-broken
# PR urgente → revisión rápida → merge
```

### Direct push a `main` — Cuándo es aceptable
Solo para cambios de bajo riesgo que no requieren revisión:
- Actualización de contenido en `constants/index.ts`
- Cambios de documentación (README, CHANGELOG)
- Archivos de config sin impacto en UI (`.gitignore`, etc.)
- Fixes de una línea con causa evidente

---

## Flujo Completo de una Feature

```bash
# 1. Actualizar main local
git checkout main
git pull origin main

# 2. Crear branch
git checkout -b feat/nombre-descriptivo

# 3. Desarrollar con commits atómicos
git add src/components/sections/Portfolio.tsx
git commit -m "feat(portfolio): crear esqueleto de sección"

git add src/constants/index.ts
git commit -m "feat(portfolio): agregar datos de proyectos en constants"

git add src/app/page.tsx
git commit -m "feat(portfolio): integrar sección en página principal"

# 4. Verificar calidad
npm run lint && npx tsc --noEmit && npm run build

# 5. Push y PR
git push origin feat/nombre-descriptivo
# → Abrir Pull Request en GitHub
# → El CI corre automáticamente (lint + TypeScript + build)
# → Merge cuando CI pasa
```

---

## Commits Atómicos — Principio

Un commit debe representar **un cambio lógico completo y mínimo**. No mezclar:
```bash
# ❌ Mal — demasiado en un commit
git commit -m "feat: agregar portfolio, corregir nav, actualizar footer"

# ✅ Bien — commits focalizados
git commit -m "feat(portfolio): agregar grid de proyectos"
git commit -m "fix(navbar): corregir scroll en iOS Safari"
git commit -m "style(footer): ajustar espaciado en mobile"
```

---

## Code Review — Checklist del Reviewer

```
□ ¿El CI pasa? (lint + TypeScript + build)
□ ¿El cambio hace exactamente lo que dice el PR?
□ ¿Hay casos edge no manejados?
□ ¿Textos nuevos están en constants, no hardcodeados?
□ ¿La solución es la más simple posible?
□ ¿Hay deuda técnica nueva? ¿Está documentada?
□ ¿Los componentes son responsivos?
□ ¿Hay regresiones visuales potenciales?
```

---

## Tags y Releases

Crear un tag en cada release de producción:
```bash
# Después de merge a main y deploy exitoso
git tag -a v0.3.0 -m "Software Factory — 18 skills + 11 workflows"
git push origin v0.3.0
```

---

## Comandos Git Frecuentes del Proyecto

```bash
# Ver estado limpio
git status

# Ver últimos 5 commits
git log --oneline -5

# Deshacer último commit (manteniendo cambios en working tree)
git reset --soft HEAD~1

# Stash rápido de cambios sin commitear
git stash
git stash pop

# Actualizar branch con últimos cambios de main
git fetch origin
git rebase origin/main

# Diferencia con main
git diff main...HEAD --stat
```

---

## Política de Protección de `main`

Configurar en GitHub (Settings → Branches → Branch protection rules):
- ✅ Require status checks to pass (CI que ya existe)
- ✅ Require branches to be up to date before merging
- ❌ Sin `Require pull request reviews` por ahora (equipo de 1-2 personas)
