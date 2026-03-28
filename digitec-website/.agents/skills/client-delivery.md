---
name: digitec-client-delivery
description: Guía de entrega y presentación de proyectos a clientes de DIGITEC. Propuestas, kickoff, handoff y documentación de cierre. Leer antes de cualquier interacción formal con un cliente.
---

# 🤝 Client Delivery — Proceso de Entrega DIGITEC

## Principio de Entrega DIGITEC

> **No entregamos código. Entregamos el motor que impulsa el negocio del cliente.**

Cada entrega debe comunicar valor de negocio, no tecnicismos.

---

## Ciclo de Vida de un Proyecto Cliente

```
1. PROSPECCIÓN   → Lead llega por formulario/WhatsApp
2. DISCOVERY     → Entender el negocio y qué necesitan
3. PROPUESTA     → Cotización + alcance + timeline
4. KICKOFF       → Alinear expectativas y arrancar
5. DESARROLLO    → Iteraciones con demos parciales
6. ENTREGA FINAL → Deploy + handoff + capacitación
7. SOPORTE       → SLA post-entrega
```

---

## 1. Propuesta Comercial — Estructura

Toda propuesta de DIGITEC debe incluir:

```markdown
# Propuesta DIGITEC — [Nombre del Cliente]
Fecha: YYYY-MM-DD

## Entendimiento del negocio
[2-3 párrafos sobre el negocio del cliente y su problema]

## Solución propuesta
[Descripción en lenguaje simple de lo que vamos a construir]

## Alcance incluido
- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Iteraciones: N rondas de revisión]

## Alcance NO incluido (fuera de scope)
- ❌ [Lo que no entra]

## Investment
| Plan | Precio | Plazo |
|---|---|---|
| Básico | $XXX USD | X semanas |
| Profesional | $XXX USD | X semanas |

## Condiciones
- 50% adelanto para iniciar
- 50% al entregar

## Timeline estimado
Semana 1-2: Diseño y estructura
Semana 3-5: Desarrollo
Semana 6: Revisiones y deploy
```

---

## 2. Kickoff — Agenda Tipo

1. **Presentaciones** (5 min)
2. **Validar entendimiento del negocio** (15 min)
   - ¿A quién le va a llegar el sitio? ¿Cuál es el cliente ideal?
   - ¿Cuál es el objetivo número 1 del sitio?
3. **Revisar el alcance acordado** (10 min) — confirmar que no hay malentendidos
4. **Diseño / Referentes** (10 min) — 3 sitios de referencia del cliente
5. **Definir canales de comunicación** (5 min)
   - WhatsApp para updates cotidianos
   - Reuniones de revisión: cada X días
6. **Próximos pasos y fechas clave** (5 min)

### Información a recopilar en Kickoff
```
□ Textos y copy del sitio (¿los tienen o los escribimos?)
□ Imágenes y fotos (¿las tienen?)
□ Logos en formato SVG o PNG de alta resolución
□ Accesos: dominio, hosting, redes sociales
□ Paleta de colores o manual de marca (si existe)
□ Competidores directos para analizar
□ 3 sitios que les gusten como referencia de estilo
```

---

## 3. Demos Parciales — Cómo Presentarlos

### Formato de update semanal (por WhatsApp/Email)
```
✅ Avance de la semana — [Nombre del Proyecto]

Completado:
• [Sección o feature terminada]
• [Corrección realizada]

En progreso:
• [Qué estamos haciendo ahora]

Para revisar:
🔗 [URL de staging o video de Loom]

Pendiente de tu parte:
• [Si necesitamos algo del cliente]

Próxima reunión: [fecha/hora]
```

### Plataformas para compartir demos
- **Loom** → Videos de walkthrough del sitio (muy efectivo)
- **Vercel Preview** → URL autoexpirable para revisar en vivo
- **localhost via ngrok** → Para demos en tiempo real
- **PDF con screenshots** → Para clientes con poca tecnología

---

## 4. Revisiones — Cómo Estructurarlas

**Número de rondas de revisión incluidas en el proyecto**: definir antes de empezar (recomendado: 2 rondas de revisión por sección).

### Cómo recibir feedback
```
# Template para pedir feedback al cliente
Hola [Nombre],

El sitio está listo para tu revisión. Por favor revisa:
1. [Sección 1]: ¿El texto y diseño comunica lo que necesitas?
2. [Sección 2]: ¿Los colores y estilo representan tu marca?
3. ¿Hay algo que quieras cambiar antes de publicar?

Puedes verlo en: [URL]
Por favor envíame tus comentarios antes del [fecha].
```

---

## 5. Entrega Final — Checklist

### Technical handoff
```
□ Sitio publicado en dominio definitivo del cliente
□ HTTPS activo (certificado SSL)
□ Formulario de contacto testeado (enviar mensaje de prueba)
□ Links de redes sociales correctos
□ Todas las imágenes cargan correctamente
□ Sitio verificado en mobile y desktop
□ Google Analytics configurado (si aplica)
□ Dominio y hosting activos (no hay expiración próxima)
```

### Entregables documentales
```
□ Accesos al hosting/CPanel entregados de forma segura
□ Contraseñas del hosting cambiadas y entregadas
□ Guía de uso básica (cómo actualizar contenido)
□ Grabación de capacitación (si aplica)
□ Factura o soporte de pago
```

### Documento de cierre
```markdown
# Acta de Entrega — [Proyecto] — [Fecha]

Cliente: [Nombre / Empresa]
DIGITEC responsable: [Nombre]

## Entregables
- [x] Sitio web publicado en [URL]
- [x] Formulario de contacto activo
- [x] [Otros entregables]

## Accesos entregados
- Hosting: [proveedor] → Entregado por [canal]
- Dominio: [registrador]

## Soporte post-entrega
Período: [X días/meses]
Canal: WhatsApp +57 3028010431

Firma de conformidad: _________________ [Fecha]
```

---

## 6. SLA Post-Entrega Recomendado

| Tipo de solicitud | Tiempo de respuesta |
|---|---|
| Bug crítico (sitio caído) | < 4 horas |
| Bug menor (algo no funciona bien) | < 48 horas |
| Cambio de contenido (texto, imagen) | < 72 horas |
| Nueva feature | Cotizar aparte |

---

## 7. Cómo Comunicar Valor (no código)

| Aspecto técnico | Cómo comunicarlo al cliente |
|---|---|
| Usamos Next.js | "Tiene tecnología de Google — carga en menos de 2 segundos" |
| Implementamos CAPTCHA | "Tu formulario está protegido de spam automático" |
| Building responsive | "Se ve perfecto en celular, tablet y computador" |
| Rate limiting | "Está protegido contra ataques de bots" |
| Zod validation | "Todos los datos del formulario se verifican antes de enviarse" |
| SEO metadata | "Google puede indexarlo correctamente desde el día 1" |
