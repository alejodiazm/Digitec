---
name: digitec-database
description: Estrategia de base de datos para el proyecto Digitec. Estado actual (sin DB) y guía para implementar cuando se requiera. Leer antes de proponer soluciones que involucren persistencia de datos.
---

# 🗄️ Base de Datos — Estrategia y Guía

## Estado Actual: Sin Base de Datos Relacional

El proyecto Digitec actualmente es un **sitio estático de marketing** (landing page). No tiene:
- Base de datos relacional (PostgreSQL, MySQL, etc.)
- ORM (Prisma, Drizzle, etc.)
- Autenticación de usuarios
- Panel de administración

**Lo que SÍ existe para datos:**
- `src/constants/index.ts` → Única fuente de verdad de contenidos
- Upstash Redis → Solo para rate limiting (no como DB principal)
- Resend → Almacenamiento de emails enviados en su dashboard

---

## Cuándo Agregar una Base de Datos

Agregar una DB cuando se necesite alguno de estos casos:
1. **Blog / CMS** → Artículos, autores, tags con CRUD
2. **Panel de Admin** → Gestionar servicios, precios, testimonios sin tocar código
3. **CRM básico** → Guardar leads del formulario de contacto con seguimiento
4. **E-commerce** → Pedidos, clientes, pagos
5. **Dashboard de cliente** → Proyectos, facturas, reportes

---

## Stack Recomendado (cuando se necesite)

### Opción A: Supabase (Recomendado para DIGITEC)
✅ PostgreSQL managed + Auth + Storage + Realtime
✅ Dashboard visual para el cliente
✅ SDK de JavaScript con TypeScript
✅ Row Level Security (RLS) para seguridad

```bash
npm install @supabase/supabase-js
```

```ts
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### Opción B: Prisma + PostgreSQL (Para proyectos de código a medida)
✅ Type-safe ORM
✅ Migrations versionadas
✅ Compatible con cualquier PostgreSQL (Neon, Railway, Supabase)

```bash
npm install prisma @prisma/client
npx prisma init
```

### Opción C: Upstash Redis (Para caché y datos simples)
✅ Ya instalado en el proyecto
✅ Ideal para: sesiones, rate limiting, contadores, caché de API
❌ No es una DB relacional

---

## Patrón de Integración con Next.js App Router

### Server Components con fetch directo (recomendado)
```ts
// En un Server Component
async function getContactLeads() {
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  return data;
}
```

### API Routes para mutaciones
```ts
// POST /api/leads
export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from("leads")
    .insert({ name, email, message, created_at: new Date() });
    
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

---

## Mejora Pendiente: Guardar Leads del Formulario

Actualmente el formulario de contacto solo envía un email. Una mejora de alto valor sería también guardar cada lead en una tabla de Supabase para tener un historial CRM básico.

**Schema propuesto:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT,           -- Hash de IP (no guardar IP real por GDPR)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new'  -- 'new' | 'contacted' | 'closed'
);
```

---

## Upstash Redis — Uso Actual y Extensiones

### Uso actual (rate limiting)
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
```

### Usos recomendados adicionales
```ts
// Caché de datos de la página (TTL de 1 hora)
await redis.set("home:stats", JSON.stringify(stats), { ex: 3600 });

// Contador de visitas
await redis.incr("page:views:home");

// Lista de los últimos N leads (para dashboard rápido)
await redis.lpush("recent:leads", JSON.stringify(lead));
await redis.ltrim("recent:leads", 0, 99); // Mantener solo 100
```

---

## Convenciones de Naming (para cuando se implemente)

| Entidad | Tabla | Campo clave |
|---|---|---|
| Consultores/Leads | `leads` | `id`, `email`, `created_at` |
| Servicios | `services` | `id`, `slug`, `title` |
| Testimonios | `testimonials` | `id`, `is_active` |
| Proyectos de portafolio | `projects` | `id`, `slug`, `featured` |
| Blog posts | `posts` | `id`, `slug`, `published_at` |
