---
name: digitec-marketing
description: Guía de Marketing Digital para DIGITEC — Analytics, SEO estratégico, conversión, redes sociales y growth. Leer antes de cualquier decisión de contenido, copy o estrategia digital.
---

# 📣 Marketing Digital — DIGITEC Global SAS

## Objetivo de la Landing Page

La landing page de `digitec.global` tiene UN solo objetivo:
> **Convertir visitantes en leads calificados** que contacen a DIGITEC por formulario o WhatsApp.

Todo elemento visual, copy y CTA debe servir a este objetivo.

---

## Métricas Clave (KPIs)

| KPI | Qué mide | Target |
|---|---|---|
| **Tasa de conversión** | Visitantes → contacto | ≥ 3-5% |
| **Bounce Rate** | Visitantes que se van sin interactuar | ≤ 60% |
| **Time on Page** | Cuánto tiempo permanecen | ≥ 2 min |
| **Scroll depth** | Hasta dónde leen | ≥ 70% llegan a Servicios |
| **CTA Click Rate** | Clicks en "Explorar Servicios" y WhatsApp | — |

---

## Analytics — Google Analytics 4 (Pendiente de implementar)

### Instalación en Next.js
```bash
npm install @next/third-parties
```

```tsx
// En layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### Eventos a trackear (setup recomendado)
```ts
// Cuando el usuario envía el formulario
gtag("event", "generate_lead", {
  event_category: "contact_form",
  event_label: "formulario_web",
});

// Cuando hace click en WhatsApp
gtag("event", "click", {
  event_category: "contact_whatsapp",
  event_label: "boton_whatsapp_footer",
});

// Cuando hace scroll a sección de precios
gtag("event", "view_item_list", {
  event_category: "pricing",
  items: [{ item_name: "plan_starter" }],
});
```

---

## SEO Estratégico

### Keywords Primarias (Colombia / Latam)
| Keyword | Volumen est. | Intención |
|---|---|---|
| desarrollo web colombia | Alta | Comercial |
| agencia de software bogota | Media | Comercial |
| desarrollo app movil colombia | Media | Comercial |
| diseño web wordpress colombia | Alta | Comercial |
| desarrollo next.js colombia | Baja | Comercial |
| branding empresa tecnologia | Media | Comercial |
| consultoría it bogota | Baja | Comercial |

### Keywords de Cola Larga (Long Tail)
- "cuánto cuesta desarrollar una app en colombia"
- "agencia digital bogota precios"
- "empresa desarrollo software para pymes bogota"
- "diseñador web freelance vs agencia colombia"

### Meta Description Óptima (actualizar si se cambia)
```
< 160 caracteres, incluir keyword + CTA + diferenciador

Actual: "Digitec Global SAS: Desarrollo web en WordPress, Shopify y Código a medida. Branding y Consultoría TI. Tecnología que impulsa tu visión al siguiente nivel."

Mejorada: "Agencia de desarrollo web y software en Bogotá. WordPress, Shopify, Next.js y apps a medida. +3 años de experiencia. ¡Cotiza gratis!"
```

---

## Copywriting — Framework AIDA para el Hero

**A**tención → "Transformamos ideas en Ecosistemas Digitales"
**I**nterés → "Agencia de desarrollo de software de alto rendimiento"
**D**eseo → Servicios concretos (web, mobile, cloud) + beneficios específicos
**A**cción → "Explorar Servicios" + "Agendar Reunión"

### Principios del copy de DIGITEC
1. **Beneficio sobre característica** — "escala tu negocio" no "usamos Next.js"
2. **Concreto sobre genérico** — "+3 proyectos livianos por año" no "somos eficientes"
3. **Tú, no nosotros** — centrar en el cliente, no en la empresa
4. **Urgencia sin presión** — "disponible para nuevos proyectos" (badge ya implementado)

---

## Redes Sociales

| Red | Handle | Frecuencia | Tipo de contenido |
|---|---|---|---|
| LinkedIn | /company/digitec-global-sas | 2-3x/semana | Cases, tips técnicos, equipo |
| Instagram | @digitec.global | 3-4x/semana | Diseño, proceso, resultados |

### Tipos de contenido que funcionan para agencias de software
1. **Before/After** → Web vieja vs. nueva de cliente
2. **Behind the scenes** → Proceso de diseño/desarrollo
3. **Tip técnico** → "5 errores comunes al elegir una agencia web"
4. **Case study** → "Cómo ayudamos a [cliente] a aumentar conversiones un 40%"
5. **Social proof** → Testimonios en formato visual

---

## Conversión — Optimizaciones Propuestas

### 1. Agregar número de proyectos / años (prueba social)
```tsx
// En Hero o About — estadísticas reales o estimadas
<div className="flex gap-8">
  <div>
    <span className="text-3xl font-bold text-primary">15+</span>
    <span className="text-slate-500 text-sm block">Proyectos entregados</span>
  </div>
  <div>
    <span className="text-3xl font-bold text-primary">3+</span>
    <span className="text-slate-500 text-sm block">Años de experiencia</span>
  </div>
</div>
```

### 2. Chat de WhatsApp flotante
```tsx
// Botón flotante de WhatsApp — alta conversión en Latam
<a
  href="https://wa.me/573028010431?text=Hola%20Digitec"
  className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contactar por WhatsApp"
>
  <WhatsAppIcon />
</a>
```

### 3. Exit intent popup (futuro)
Mostrar una oferta cuando el usuario intenta irse: "¿No listo? Descarga nuestra guía gratuita."

---

## Email Marketing (Futuro)

Cuando se tenga base de datos de leads:
- **Bienvenida** → Automático post-contacto (ya existe via Resend)
- **Seguimiento** → 48h después si no hay respuesta
- **Newsletter** → 1x/mes con cases y tips

Herramienta recomendada: **Resend + Supabase** (stack ya compatible con el proyecto).
