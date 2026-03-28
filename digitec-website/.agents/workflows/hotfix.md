---
description: Corrección urgente de bugs en producción con mínimo riesgo
---

# Workflow: /hotfix — Corrección Urgente

## Cuándo usar este workflow
- Bug crítico en producción (Hostinger) que afecta al usuario final
- Formulario de contacto no envía emails
- Página en blanco o error 500
- CAPTCHA roto
- Texto o precio incorrecto visible en producción

## Principio: Cambio Mínimo
Un hotfix debe ser **la corrección más pequeña posible** que resuelva el problema. No aprovechar para refactorizar ni agregar features.

## Fase 1: Diagnóstico

1. Describir el síntoma exacto (qué ve el usuario, en qué dispositivo)
2. Identificar la causa raíz:
   - ¿Es un error de TypeScript/Runtime? → Revisar logs de Sentry o consola
   - ¿Es visual? → Identificar el componente y clase CSS
   - ¿Es de datos? → Revisar `constants/index.ts`
   - ¿Es de API? → Revisar `src/app/api/contact/route.ts`
   - ¿Son variables de entorno? → Verificar CPanel Hostinger
3. Localizar el archivo exacto (`grep_search` si es necesario)

## Fase 2: Fix

4. Leer el archivo completo antes de editar (`view_file`)
5. Aplicar el cambio mínimo y quirúrgico
6. Explicar brevemente qué causó el bug y cómo se corrigió

## Fase 3: QA Rápido

// turbo
7. Ejecutar:
```bash
npm run build
```
Si falla, corregir antes de continuar. Un hotfix roto es peor que el bug original.

## Fase 4: Deploy

8. Ejecutar workflow `/deploy` completo con mensaje:
```bash
git commit -m "hotfix(scope): descripción del bug corregido"
```

## Fase 5: Verificación Post-Deploy

9. Indicar al usuario qué verificar en producción:
   - URL específica a abrir
   - Acción a realizar (ej: "enviar el formulario de contacto")
   - Resultado esperado

## Registro del Hotfix
Después de resolver, documentar en el commit:
```
hotfix(contact): corregir email de destino del formulario [CRÍTICO]

Bug: Los emails del formulario llegaban a contacto@digitec.global (no existe)
Causa: Constante COMPANY_EMAIL en route.ts apuntaba a email incorrecto
Fix: Cambiado a digitecglobalsas@gmail.com en api/contact/route.ts
Verificar: Enviar formulario en producción y confirmar recepción
```
