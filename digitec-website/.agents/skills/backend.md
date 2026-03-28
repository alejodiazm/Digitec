---
name: digitec-backend
description: Patrones, convenciones y documentación de la capa backend del proyecto Digitec (Next.js API Routes, validación, seguridad, email). Leer antes de crear o modificar cualquier API Route o Server Action.
---

# 🔧 Backend — Next.js API Routes

## Endpoints Existentes

### POST `/api/contact`
Endpoint del formulario de contacto. El más crítico del proyecto.

**Pipeline de seguridad (en orden):**
1. **Rate Limiting** — 5 envíos por IP por hora (in-memory Map)
2. **Zod Validation** — Schema `contactSchema` valida name, email, message, token
3. **Honeypot Check** — Campo oculto `_honey`; si viene relleno = bot → respuesta silenciosa
4. **Turnstile CAPTCHA** — Verificación con Cloudflare via `verifyTurnstileToken()`
5. **MX Record Validation** — Verifica que el dominio del email puede recibir correos
6. **Email a DIGITEC** — Resend: `noreply@digitec.global` → `digitecglobalsas@gmail.com`
7. **Email de confirmación al cliente** — Resend: `DIGITEC GLOBAL SAS <noreply@digitec.global>` → email del usuario

**Emails clave:**
```ts
const COMPANY_EMAIL = "digitecglobalsas@gmail.com";  // Destinatario interno
const FROM_EMAIL = "noreply@digitec.global";          // Remitente (dominio Resend)
```

### GET/POST `/api/csp-report`
Recibe violaciones de Content Security Policy del navegador. Solo logging, no responde con datos.

---

## Librerías de Seguridad (`src/lib/security/`)

### `captcha.ts` — `verifyTurnstileToken(token: string): Promise<boolean>`
Verifica el token de Cloudflare Turnstile.
```ts
import { verifyTurnstileToken } from "@/lib/security/captcha";
const isValid = await verifyTurnstileToken(token);
```

### `email-validation.ts` — `validateEmailMx(email: string): Promise<boolean>`
Verifica que el dominio del email tenga registros MX válidos.
```ts
import { validateEmailMx } from "@/lib/security/email-validation";
const hasMx = await validateEmailMx("user@example.com");
```

---

## Variables de Entorno — `src/lib/env.ts`

Todas las variables de entorno deben pasar por `@t3-oss/env-nextjs` con validación Zod:

```ts
// Variables SERVER (solo disponibles en API Routes y Server Components)
CLOUDFLARE_TURNSTILE_SECRET_KEY  // Verificación CAPTCHA
RESEND_API_KEY                    // Envío de emails
NODE_ENV                          // "development" | "test" | "production"

// Variables CLIENT (accesibles en browser con NEXT_PUBLIC_)
NEXT_PUBLIC_APP_URL               // URL base del sitio
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY  // Site key del CAPTCHA
```

**⚠️ Regla**: Nunca acceder a `process.env.XXX` directamente. Siempre importar `env` desde `@/lib/env`:
```ts
// ✅ Correcto
import { env } from "@/lib/env";
const apiKey = env.RESEND_API_KEY;

// ❌ Incorrecto — no pasa validación de tipos
const apiKey = process.env.RESEND_API_KEY;
```

---

## Patrón para Crear un Nuevo API Route

```ts
// src/app/api/[nombre]/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";

// 1. Definir schema de validación
const schema = z.object({
  field1: z.string().min(1),
  field2: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    // 2. Parsear y validar body
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Lógica de negocio
    const data = result.data;
    // ...

    // 4. Respuesta exitosa
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("[API Route Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

---

## Rate Limiting

El proyecto tiene dos estrategias:

### 1. In-memory (actual en `/api/contact`)
```ts
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
```
✅ Funciona | ❌ No persiste entre reinicios del servidor (no ideal para producción)

### 2. Upstash Redis (instalado, configurado, listo para usar)
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

const { success } = await ratelimit.limit(ip);
if (!success) return new Response("Rate limited", { status: 429 });
```
📌 **Migrar el rate limit in-memory a Upstash** es una mejora pendiente.

---

## Resend Email — Patrones

```ts
import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

await resend.emails.send({
  from: "DIGITEC GLOBAL SAS <noreply@digitec.global>",
  to: "destinatario@ejemplo.com",
  replyTo: "reply-to@ejemplo.com",   // opcional
  subject: "Asunto del email",
  html: "<p>Contenido HTML</p>",
});
```

**Importante**: El dominio `digitec.global` debe estar verificado en Resend. Si no está verificado, los emails solo llegan desde `resend.dev`.

---

## Middleware (`src/proxy.ts`)
El proyecto tiene un archivo `proxy.ts` que actúa como middleware personalizado. Revisar antes de agregar nueva lógica de middleware en `middleware.ts`.

---

## Convenciones de Respuesta HTTP
| Situación | Status Code |
|---|---|
| Éxito | `200` |
| Creación exitosa | `201` |
| Input inválido | `400` |
| No autenticado | `401` |
| Sin permisos | `403` |
| No encontrado | `404` |
| Rate limited | `429` |
| Error interno | `500` |

Siempre incluir `{ error: "Mensaje descriptivo" }` en respuestas de error.
