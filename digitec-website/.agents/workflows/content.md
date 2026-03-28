---
description: Actualización rápida y segura de textos, precios y contenido de la landing page
---

# Workflow: /content — Actualización de Contenido

## Contexto obligatorio
Leer `.agents/skills/brand.md` para respetar el tono de voz de DIGITEC.

## Regla Principal
**Todo el contenido editable está en `src/constants/index.ts`.**
NUNCA editar textos directamente en los componentes `.tsx`.

## Mapa de Contenidos

| Qué quieres editar | Dónde está |
|---|---|
| Tagline / eslogan | `COMPANY_INFO.tagline` |
| Email de contacto | `COMPANY_INFO.email` |
| WhatsApp | `COMPANY_INFO.whatsapp` |
| Redes sociales | `COMPANY_INFO.social` |
| Título del Hero | `HERO_CONTENT.title` |
| Descripción del Hero | `HERO_CONTENT.description` |
| Texto botón primario | `HERO_CONTENT.ctaPrimary` |
| Texto botón secundario | `HERO_CONTENT.ctaSecondary` |
| Sobre Nosotros | `ABOUT_CONTENT` |
| Servicios (tarjetas) | `SERVICES[]` |
| Formulario de contacto | `CONTACT_FORM` |
| SEO metadata | `METADATA` |
| Precios | `src/components/sections/Pricing.tsx` → array interno |

## Pasos del Workflow

1. Identificar qué texto se quiere cambiar
2. Localizarlo en `src/constants/index.ts` con `view_file`
3. Verificar el tono de voz con `brand.md`:
   - ¿Es profesional pero cercano?
   - ¿Usa la metáfora de transformación cuando aplica?
   - ¿Es concreto y evita frases genéricas?
4. Editar con `replace_file_content` o `multi_replace_file_content`
5. Verificar que el build sigue pasando:
```bash
npm run build
```
6. Ejecutar `/git` con commit tipo `content(scope): descripción`

## Ejemplo de commit para contenido
```bash
git commit -m "content(hero): actualizar descripción principal del Hero"
git commit -m "content(services): agregar nuevo servicio de automatización IA"
git commit -m "content(pricing): actualizar precio plan Starter a $800 USD"
```
