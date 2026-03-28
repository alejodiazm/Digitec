---
name: digitec-testing
description: Estrategia de testing para el proyecto Digitec. Tipos de pruebas, herramientas recomendadas, patrones y qué priorizar. Leer antes de escribir cualquier test.
---

# 🧪 Testing — Estrategia y Patrones

## Estado Actual

El proyecto **NO tiene tests implementados**. Esta es una deuda técnica que hay que abordar progresivamente. Esta guía define la estrategia a seguir.

## Pirámide de Testing para este Proyecto

```
        /E2E\           ← Playwright (2-5 flows críticos)
       /------\
      /Integr./         ← React Testing Library (API Routes + Forms)
     /----------\
    /Unit Tests  \      ← Vitest (utils, hooks, schemas)
   /--------------\
```

**Regla 70/20/10**: 70% unit, 20% integración, 10% E2E.

---

## Stack de Testing Recomendado

| Tipo | Herramienta | Por qué |
|---|---|---|
| Unit | **Vitest** | Nativo Vite/Next.js, extremadamente rápido, compatible ESM |
| Componentes | **React Testing Library** | Testing desde la perspectiva del usuario |
| E2E | **Playwright** | Cross-browser, soporte Next.js oficial |
| Mocks | **MSW (Mock Service Worker)** | Mockea fetch/API sin cambiar código |

```bash
# Instalación cuando se active testing
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event msw playwright
```

---

## Qué Testear — Prioridad para DIGITEC

### 🔴 Prioridad ALTA (testear primero)

**1. Schemas Zod de validación (unit tests)**
```ts
// tests/schemas/contact.test.ts
import { describe, it, expect } from "vitest";
import { contactSchema } from "@/app/api/contact/schema";

describe("contactSchema", () => {
  it("valida campos correctos", () => {
    const result = contactSchema.safeParse({
      name: "Juan García",
      email: "juan@ejemplo.com",
      message: "Mensaje de prueba con más de 10 caracteres",
      token: "turnstile-token",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza email inválido", () => {
    const result = contactSchema.safeParse({
      name: "Juan",
      email: "no-es-email",
      message: "Mensaje válido",
      token: "token",
    });
    expect(result.success).toBe(false);
  });
});
```

**2. Funciones utilitarias en `lib/utils.ts` (unit tests)**
```ts
// tests/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn helper", () => {
  it("combina clases correctamente", () => {
    expect(cn("base", "extra")).toBe("base extra");
    expect(cn("base", undefined)).toBe("base");
    expect(cn("p-4", "p-8")).toBe("p-8"); // Tailwind merge
  });
});
```

**3. Formulario de contacto — flujo completo (integración)**
```tsx
// tests/components/Contact.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "@/components/sections/Contact";

describe("Contact form", () => {
  it("muestra error de validación con nombre vacío", async () => {
    render(<Contact />);
    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText(/nombre es requerido/i)).toBeInTheDocument();
  });
});
```

### 🟡 Prioridad MEDIA

**4. Rate Limiting — función `isRateLimited` (unit)**
**5. Componente Navbar — mobile menu toggle (componente)**
**6. Funciones de seguridad — captcha y email validation (unit con mocks)**

### 🟢 Prioridad BAJA (E2E)

**7. Flujo completo del formulario de contacto**
**8. Navegación entre secciones**
**9. Responsive layout en mobile**

---

## Tests E2E con Playwright — Flows Críticos

```ts
// tests/e2e/contact-form.spec.ts
import { test, expect } from "@playwright/test";

test("usuario puede enviar formulario de contacto", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.locator("#contacto").scrollIntoViewIfNeeded();

  await page.fill('[name="name"]', "Test User");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="message"]', "Este es un mensaje de prueba para el formulario");

  // El CAPTCHA de Turnstile necesita modo test
  await page.click('button[type="submit"]');

  await expect(page.locator("text=Gracias por contactarnos")).toBeVisible({
    timeout: 10000,
  });
});
```

---

## Configuración de Vitest

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom";
```

---

## Scripts de npm a Agregar

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## Convenciones de Testing

1. **Ubicación**: Tests junto a los archivos que testean o en `/tests/` por tipo
2. **Naming**: `ComponentName.test.tsx` o `functionName.test.ts`
3. **Describe/It**: Describe el comportamiento en español
4. **AAA Pattern**: Arrange → Act → Assert
5. **No testear implementación** — testear comportamiento observable
6. **Coverage mínimo**: 80% en funciones críticas (API, validaciones, utils)
