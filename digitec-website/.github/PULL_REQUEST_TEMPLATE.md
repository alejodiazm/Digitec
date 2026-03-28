## 📋 Descripción
<!-- ¿Qué cambio introduce este PR? Explicar en 2-3 líneas. -->



## 🔗 Issue relacionado
<!-- Ejemplo: Closes #12 | Fix #8 | Related to #5 -->
Closes #

## 🧪 Tipo de cambio
- [ ] `feat` — Nueva funcionalidad
- [ ] `fix` — Corrección de bug
- [ ] `style` — Cambio de estilos (sin lógica)
- [ ] `refactor` — Refactorización
- [ ] `docs` — Documentación
- [ ] `chore` — Configuración / build / dependencias
- [ ] `hotfix` — Corrección urgente de producción
- [ ] `content` — Actualización de textos o constantes

## ✅ Checklist obligatorio

### Calidad de código
- [ ] `npm run lint` pasa sin errores
- [ ] `npx tsc --noEmit` pasa sin errores
- [ ] `npm run build` completa con Exit code: 0

### Convenciones del proyecto
- [ ] Textos nuevos están en `src/constants/index.ts` (no hardcodeados)
- [ ] Imports usan alias `@/` (no paths relativos)
- [ ] TypeScript: sin uso de `any`
- [ ] Nuevas variables de entorno agregadas a `src/lib/env.ts`

### UI / UX
- [ ] Verificado en mobile (375px)
- [ ] Verificado en tablet (768px)
- [ ] Verificado en desktop (1280px+)
- [ ] Contraste WCAG AA verificado para texto nuevo
- [ ] Los elementos interactivos nuevos son accesibles con teclado

### Si modifica API Routes
- [ ] Input validado con Zod schema
- [ ] Rate limiting considerado
- [ ] Error handling con try/catch
- [ ] Sin secrets expuestos en respuesta

## 📸 Screenshots
<!-- Si hay cambios visuales, agregar antes/después -->

**Antes:**

**Después:**

## 📝 Notas adicionales
<!-- Decisiones técnicas, deuda técnica creada, posibles riesgos -->
