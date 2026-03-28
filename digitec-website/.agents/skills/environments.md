---
name: digitec-environments
description: Gestión de entornos (desarrollo, staging, producción) del proyecto Digitec. Variables de entorno, diferencias por entorno y cómo configurarlos. Leer antes de cualquier tarea que involucre configuración de entornos.
---

# 🌍 Environments — Dev / Prod

## Entornos del Proyecto

| Entorno | URL | Dónde corre | Branch |
|---|---|---|---|
| **Development** | `http://localhost:3000` | Máquina local (Turbopack) | cualquier |
| **Production** | `https://digimall.business` | Hostinger CPanel | `main` |
| **Staging** | ❌ No configurado aún | — | — |

**Mejora pendiente**: Configurar un entorno de staging (recomendado: Vercel preview deployments o un segundo CPanel en Hostinger).

---

## Variables de Entorno por Entorno

### Archivo `.env.local` (Desarrollo local — NUNCA commitear)
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Cloudflare Turnstile
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxxx
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4xxxxxxxxxxxxx

# Upstash Redis (para rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Sentry
SENTRY_DSN=https://xxxxx@sentry.io/xxx
```

### Producción — Hostinger CPanel
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://digimall.business

# Mismas variables que .env.local PERO con valores de producción
# Configurar en: CPanel → Node.js App → Environment Variables
```

---

## Cómo Agregar una Variable de Entorno Nueva

### Paso 1: Agregar a `src/lib/env.ts`
```ts
export const env = createEnv({
  server: {
    // Variables existentes...
    NUEVA_VARIABLE: z.string().min(1),  // ← agregar aquí con validación
  },
  client: {
    NEXT_PUBLIC_NUEVA_VAR: z.string().url(),  // Si es pública
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_NUEVA_VAR: process.env.NEXT_PUBLIC_NUEVA_VAR,  // ← requerido para client vars
  },
});
```

### Paso 2: Agregar a `.env.local`
```bash
NUEVA_VARIABLE=valor_de_desarrollo
```

### Paso 3: Agregar a Hostinger CPanel (Producción)
En CPanel → Setup Node.js App → Environment Variables → Agregar.

### Paso 4: Reiniciar el servidor de desarrollo
```bash
# Ctrl+C para detener, luego:
npm run dev
```

---

## Diferencias de Comportamiento por Entorno

| Comportamiento | Development | Production |
|---|---|---|
| Sentry | Opcional (puede estar desactivado) | Siempre activo |
| Rate limiting | 5 req/hora por IP | 5 req/hora por IP |
| Validación de env | Activa (puede fallar si falta var) | Activa (crítico) |
| Hot Reload | ✅ Turbopack | ❌ No aplica |
| Source maps | ✅ Completos | ⚠️ Solo en Sentry |
| Email enviado | Sí (usar cuenta de prueba) | Sí (cuenta de producción) |
| CAPTCHA Turnstile | Funciona con site key de dev | Funciona con site key de prod |

---

## Cloudflare Turnstile — Dev vs Prod

Cloudflare provee site keys especiales para testing:
```
# Testing — pasa siempre (para desarrollo)
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Testing — falla siempre (para probar el error)
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=2x00000000000000000000AB
CLOUDFLARE_TURNSTILE_SECRET_KEY=2x0000000000000000000000000000000AA
```

---

## `SKIP_ENV_VALIDATION` — Para CI/CD

Si se configura GitHub Actions o cualquier CI/CD pipeline:
```bash
# En el pipeline — permite hacer build sin todas las variables
SKIP_ENV_VALIDATION=true npm run build
```

**Nunca** usar esto en producción real.

---

## Checklist de Variables por Entorno

```
Development (.env.local):
□ NODE_ENV=development
□ NEXT_PUBLIC_APP_URL=http://localhost:3000
□ RESEND_API_KEY (puede ser key de prueba)
□ CLOUDFLARE_TURNSTILE_SECRET_KEY (puede ser key de test)
□ NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY (key de test)

Production (Hostinger CPanel):
□ NODE_ENV=production
□ NEXT_PUBLIC_APP_URL=https://digimall.business (o digitec.global)
□ RESEND_API_KEY (key de producción)
□ CLOUDFLARE_TURNSTILE_SECRET_KEY (key de producción)
□ NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY (key de producción)
□ SENTRY_DSN (DSN del proyecto en sentry.io)
```
