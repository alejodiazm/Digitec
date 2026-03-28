---
name: digitec-error-handling
description: Estrategia de manejo de errores del proyecto Digitec — Error Boundaries, Sentry, UX de errores, logging y respuestas de API. Leer antes de cualquier cambio en flujos críticos.
---

# 🚨 Error Handling — Estrategia y Patrones

## Capas de Manejo de Errores

```
1. TypeScript          → Errores en tiempo de compilación
2. Zod Validation      → Errores de datos de entrada
3. try/catch en API    → Errores de runtime en servidor
4. Error Boundaries    → Errores de runtime en UI (React)
5. Toast/Alert en UI   → Feedback al usuario
6. Sentry              → Monitoring y alertas en producción
```

---

## Sentry — Configuración Actual

Sentry está instalado (`@sentry/nextjs` v10). Captura automáticamente errores no manejados.

### Lo que Sentry captura automáticamente:
- Excepciones no capturadas en Server Components
- Errores en API Routes
- Errores en Client Components con Error Boundaries
- Stack traces con source maps

### Niveles de severidad
```ts
import * as Sentry from "@sentry/nextjs";

// Información (no es error, pero es útil saber)
Sentry.addBreadcrumb({ message: "Usuario intentó enviar formulario", level: "info" });

// Warning  (algo inesperado pero no fatal)
Sentry.captureMessage("MX validation timeout", "warning");

// Error (algo falló)
Sentry.captureException(error);

// Con contexto adicional
Sentry.withScope((scope) => {
  scope.setTag("section", "contact-form");
  scope.setExtra("userEmail", email);  // Precaución con PII
  Sentry.captureException(error);
});
```

---

## Error Boundaries en React

### Next.js tiene error handling nativo con `error.tsx`

```
app/
├── error.tsx        ← Error de la aplicación completa
├── not-found.tsx    ← 404
└── loading.tsx      ← Loading state (Suspense)
```

**`src/app/error.tsx`** — Crear si no existe:
```tsx
"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1121] text-white">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-slate-400 mb-8">Estamos trabajando para resolverlo.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
```

---

## Errores en API Routes — Patrón Estándar

```ts
export async function POST(request: Request) {
  try {
    // Happy path
    return NextResponse.json({ success: true });

  } catch (error) {
    // Log para debugging
    console.error("[/api/contact] Error:", error);
    
    // En producción, reportar a Sentry
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
    }
    
    // Respuesta genérica al cliente (no exponer detalles internos)
    return NextResponse.json(
      { error: "Error interno. Por favor intenta más tarde." },
      { status: 500 }
    );
  }
}
```

---

## Errores en el Formulario de Contacto — UX

### Estados del formulario
```ts
type FormState = "idle" | "submitting" | "success" | "error";
```

### Mensajes de error al usuario (en `constants/index.ts`)
```ts
export const CONTACT_FORM = {
  messages: {
    success: "¡Gracias por contactarnos! Te responderemos en menos de 24 horas.",
    error: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.",
    rateLimit: "Has enviado demasiados mensajes. Por favor espera un momento.",
    validation: "Por favor completa todos los campos correctamente.",
    captchaFail: "Verificación de seguridad fallida. Por favor intenta de nuevo.",
  }
};
```

### Regla de UX para errores
1. **Siempre mostrar feedback visual** — nunca silenciar errores al usuario
2. **Ofrecer alternativa** — si el formulario falla, ofrecer WhatsApp
3. **Mensaje genérico al público** — nunca exponer detalles técnicos
4. **Accesibilidad** — usar `role="alert"` para que los lectores de pantalla lo anuncien
5. **Tiempo de visibilidad** — los errores deben permanecer visibles, no desaparecer solos

---

## Errores Conocidos y Sus Soluciones

| Error | Causa | Solución |
|---|---|---|
| `Cannot find module @/...` | Path alias mal configurado | Verificar `tsconfig.json` paths |
| `Hydration mismatch` | Diferencia SSR/Client | Mover lógica dependiente del browser a `useEffect` |
| `NEXT_PUBLIC_* undefined` | Variable no en `.env.local` | Agregar variable y reiniciar dev server |
| Build falla con `env.ts` | Variable de entorno faltante | Agregar `SKIP_ENV_VALIDATION=true` para test |
| `Cannot read properties of null` | Elemento del DOM no encontrado | Agregar check `?.` o verificar `if (element)` |
| Lamp clipping contenido | `children` dentro de `<Lamp>` | Mover contenido fuera del Lamp a z-20 |

---

## Logging — Convenciones

```ts
// Formato de log con contexto
console.error("[NombreDelModulo] Descripción:", error);

// Ejemplos:
console.error("[Contact API] Error enviando email:", error);
console.warn("[Rate Limiter] IP bloqueada:", ip);
console.info("[CAPTCHA] Verificación exitosa para token:", tokenPrefix);
```

**En producción**: Nunca loggear datos sensibles (tokens completos, emails, IPs completas).
