---
description: Mantener CHANGELOG.md y crear releases con SemVer después de cada ciclo de trabajo
---

# Workflow: /changelog — Gestión de Releases

## Cuándo ejecutar este workflow
- Al finalizar un ciclo de trabajo significativo (nueva sección, feature, conjunto de fixes)
- Antes de hacer un deploy a producción de un cambio importante
- Al cerrar un sprint o ciclo de desarrollo

## Fase 1: Determinar la versión

Aplicar Semantic Versioning (MAJOR.MINOR.PATCH):

```
PATCH (0.0.X): Bug fixes, correcciones de texto, ajustes de estilo
MINOR (0.X.0): Nueva sección, nueva feature, nueva integración
MAJOR (X.0.0): Rediseño completo, cambio de stack, nueva arquitectura
```

Preguntar: "¿Qué tipo de cambio fue predominante en este ciclo?"

## Fase 2: Recopilar cambios del Git log

// turbo
1. Ver los commits desde el último tag:
```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

Si no hay tags aún:
```bash
git log --oneline -20
```

## Fase 3: Actualizar CHANGELOG.md

2. Abrir `CHANGELOG.md` y agregar la nueva entrada al inicio del archivo, bajo `## [Unreleased]`:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- [Feature/skill/archivo nuevo]

### Changed
- [Comportamiento modificado]

### Fixed
- [Bug corregido]

### Removed
- [Algo eliminado]
```

Mover los items correspondientes de `## [Unreleased]` a la nueva versión.

## Fase 4: Crear el Git Tag

// turbo
3. Crear y pushear el tag de versión:
```bash
VERSION=0.X.Y  # Reemplazar con la versión determinada

git add CHANGELOG.md
git commit -m "chore(release): v$VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin main
git push origin "v$VERSION"
```

## Fase 5: Verificar en GitHub

4. Abrir GitHub → Releases → "Draft a new release"
   - Tag: `v$VERSION` (ya existe del paso anterior)
   - Title: `v$VERSION — [descripción breve del ciclo]`
   - Description: copiar el contenido del CHANGELOG de esa versión
   - Click "Publish release"

## Ejemplo de ciclo completo

```bash
# Después de implementar la sección de portafolio:
# → Es una feature nueva → MINOR bump
# → Era 0.3.0 → ahora es 0.4.0

git log v0.3.0..HEAD --oneline
# feat(portfolio): agregar sección de proyectos
# style(portfolio): ajustar grid en mobile
# content(portfolio): agregar 3 proyectos de ejemplo

# Actualizar CHANGELOG.md con estos cambios
# Commit + tag
git commit -m "chore(release): v0.4.0"
git tag -a v0.4.0 -m "Release v0.4.0 — Sección de portafolio"
git push origin main && git push origin v0.4.0
```
