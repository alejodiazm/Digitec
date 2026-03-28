---
name: digitec-security
description: Guía de seguridad completa del proyecto Digitec — OWASP Top 10, patrones implementados, checklist y reglas. Leer antes de cualquier cambio en APIs, formularios o manejo de datos de usuario.
---

# 🔒 Seguridad — OWASP & Best Practices

## Capas de Seguridad Implementadas

El proyecto tiene una arquitectura de seguridad en capas (Defense in Depth):

```
Internet
   ↓
[1] Cloudflare Turnstile CAPTCHA  → Anti-bot
   ↓
[2] IP Rate Limiting              → Anti-spam / DDoS
   ↓
[3] Honeypot Field                → Anti-bot silencioso
   ↓
[4] Zod Schema Validation         → Input validation
   ↓
[5] MX Record Validation          → Email quality
   ↓
[6] isomorphic-dompurify          → XSS sanitization
   ↓
[7] CSP Headers                   → Content Security Policy
   ↓
[8] Environment Validation (t3)   → Secrets management
   ↓
API Handler
```

---

## OWASP Top 10 — Estado del Proyecto

### ✅ A01 — Broken Access Control
- Sin autenticación aún (no hay endpoints protegidos por usuario)
- Rate limiting por IP en `/api/contact`
- **Pendiente**: Cuando se agregue auth, usar middleware de Next.js para proteger rutas

### ✅ A02 — Cryptographic Failures
- HTTPS forzado via `.htaccess`
- Secrets en variables de entorno, nunca en código
- Validación con `@t3-oss/env-nextjs` previene secrets mal configurados

### ✅ A03 — Injection
- **SQL Injection**: No aplica (sin DB relacional actualmente)
- **XSS**: `isomorphic-dompurify` sanitiza inputs antes de renderizar
- **Email Injection**: Zod valida formato de email + `validateEmailMx()`

### ⚠️ A04 — Insecure Design
- Formulario: pipeline completo de validación ✅
- **Pendiente**: Agregar logs de auditoría de accesos sospechosos a Sentry

### ✅ A05 — Security Misconfiguration
- Variables de entorno validadas con Zod en `env.ts`
- CSP configurado para reportar violaciones a `/api/csp-report`
- `skipValidation` solo en CI/CD con `SKIP_ENV_VALIDATION=true`

### ✅ A07 — Identification and Authentication Failures
- Honeypot field en formulario
- Turnstile CAPTCHA (más UX-friendly que reCAPTCHA)
- Rate limiting: 5 requests/hora por IP

### ⚠️ A08 — Software and Data Integrity Failures
- **Pendiente**: Agregar Subresource Integrity (SRI) para scripts de CDN externos si se agregan

### ✅ A09 — Security Logging and Monitoring Failures
- Sentry instalado (`@sentry/nextjs`) para captura de errores
- **Pendiente**: Configurar Sentry alerts para errores críticos de API

---

## Patrones de Seguridad — Cómo Usarlos

### Zod Schema Validation (siempre en APIs)
```ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(2000),
  // Nunca confiar en el cliente — validar todo
});

const result = schema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: "Invalid input" }, { status: 400 });
}
```

### DOMPurify — Sanitizar antes de renderizar HTML dinámico
```ts
import DOMPurify from "isomorphic-dompurify";

// Solo cuando se renderice HTML dinámico (dangerouslySetInnerHTML)
const cleanHtml = DOMPurify.sanitize(userContent, {
  ALLOWED_TAGS: ["b", "i", "em", "strong", "p"],
  ALLOWED_ATTR: [],
});
```

### Honeypot — Anti-bot invisible
```tsx
// En el formulario — campo oculto con CSS, no con type="hidden"
<input
  name="_honey"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: "absolute", left: "-9999px" }}
  {...register("_honey")}
/>
```

### Rate Limiting — Patrón con Upstash (migración pendiente)
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
const { success, remaining } = await ratelimit.limit(ip);

if (!success) {
  return NextResponse.json(
    { error: "Too many requests" },
    { 
      status: 429,
      headers: { "Retry-After": "3600" }
    }
  );
}
```

---

## Variables de Entorno — Reglas de Seguridad

1. **NUNCA** commitear `.env.local` (está en `.gitignore` ✅)
2. **NUNCA** acceder a `process.env` directamente — usar `env` de `@/lib/env`
3. **NUNCA** exponer secrets con prefijo `NEXT_PUBLIC_`
4. **SIEMPRE** agregar nuevas variables a `src/lib/env.ts` con validación Zod
5. En Hostinger: configurar variables en CPanel, nunca en archivos

---

## Checklist de Seguridad — Antes de Hacer Deploy

```
□ No hay console.log() con datos sensibles (emails, IPs, tokens)
□ Todos los inputs de usuario pasan por Zod antes de procesarse
□ Nuevos API routes tienen rate limiting
□ No se agregaron dependencias con vulnerabilidades conocidas (npm audit)
□ Variables de entorno nuevas están en env.ts con validación
□ No hay API keys hardcodeadas en el código
```

---

## Headers de Seguridad

```ts
// En next.config.ts — headers recomendados
{
  key: "X-Frame-Options",
  value: "DENY",
},
{
  key: "X-Content-Type-Options",
  value: "nosniff",
},
{
  key: "Referrer-Policy",
  value: "strict-origin-when-cross-origin",
},
{
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=()",
},
```

## Audit de Seguridad Rápido
```bash
# Verificar vulnerabilidades en dependencias
npm audit

# Ver solo críticas
npm audit --audit-level=critical

# Fix automático (con precaución)
npm audit fix
```
