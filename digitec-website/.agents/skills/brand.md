---
name: digitec-brand
description: Identidad visual, tono de voz y guía de marca de DIGITEC Global SAS. Leer antes de cualquier tarea de diseño, contenido o UI.
---

# 🦋 Identidad de Marca — DIGITEC Global SAS

## Información de la Empresa
```
Razón Social:  DIGITEC GLOBAL SAS
Tagline:       "Tecnología que impulsa tu visión al siguiente nivel"
Email:         digitecglobalsas@gmail.com
WhatsApp:      +57 3028010431
País:          Colombia (Bogotá)
LinkedIn:      https://linkedin.com/company/digitec-global-sas
Instagram:     https://instagram.com/digitec.global
```

## Metáfora Central: La Mariposa 🦋
El concepto de marca de DIGITEC gira en torno a la **metamorfosis**. Los negocios son organismos vivos que pueden transformarse. DIGITEC acompaña ese proceso:
- **Dar Vida (Huevo/Creación)** → Nuevos negocios y lanzamientos
- **Impulsar el Vuelo (Pluma/Evolución)** → Optimización y crecimiento
- **Renovar el Impacto (Cohete/Transformación)** → Rebranding y cambio radical

Esta metáfora debe mantenerse en textos, visuales y comunicación.

## Paleta de Colores

### Colores Primarios
| Nombre | Hex | Uso |
|---|---|---|
| Azul Primario | `#2563EB` | CTAs, enlaces, highlights |
| Azul Oscuro | `#1D4ED8` | Hover states |
| Azul Claro | `#3B82F6` | Variante clara |

### Colores de Acento
| Nombre | Hex | CSS Var | Uso |
|---|---|---|---|
| Mint / Cian | `#22D3EE` | `--color-accent-mint` | Badges, indicadores activos |
| Lavanda | `#A78BFA` | `--color-accent-lavender` | Gradientes, elementos decorativos |

### Fondos
| Nombre | Hex | Sección |
|---|---|---|
| Dark Deep | `#0B1121` | Fondo raíz, body |
| Dark Secondary | `#0F172A` | About, Pricing secciones dark |
| Light Primary | `#F8FAFC` | Hero, Contact |
| Light Secondary | `#F1F5F9` | Services, About (versión light) |

### Textos
| Contexto | Color | Clase Tailwind |
|---|---|---|
| Fondo claro — primario | `#1E293B` | `text-[#1E293B]` |
| Fondo claro — secundario | `#475569` | `text-[#475569]` |
| Fondo oscuro — primario | `white` | `text-white` |
| Fondo oscuro — secundario | `slate-300` | `text-slate-300` |

## Tipografía
- **Fuente Principal**: Montserrat (Google Fonts) — variable `--font-montserrat`
- **Pesos usados**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Tamaños Heading**:
  - H1 Hero: `text-4xl md:text-6xl lg:text-7xl` (Hero principal)
  - H2 sección: `text-3xl md:text-5xl`
  - H3 card: `text-2xl`
- **Cuerpo Base**: `text-lg leading-relaxed`

## Tono de Voz
| Atributo | Descripción |
|---|---|
| **Profesional** | Usamos terminología técnica precisa pero accesible |
| **Cercano** | Hablamos de tú, generamos confianza |
| **Innovador** | Usamos metáforas de transformación y futuro |
| **Concreto** | Prometemos resultados específicos, no generalidades |

### Ejemplos de Voz de Marca ✅
- "Transformamos tu idea en un ecosistema digital que crece contigo"
- "No entregamos código. Entregamos el motor que impulsa tu negocio"
- "Somos el aliado que diseña tus alas"

### Evitar ❌
- Frases genéricas: "Somos los mejores", "Soluciones integrales"
- Tecnicismos sin contexto para el cliente final
- Anglicismos innecesarios cuando existe el equivalente en español

## Assets de Marca Disponibles (en `/public/images/`)
```
/images/Logo_DIGITEC.png       ← Logo completo horizontal
/images/Isotipo_Digitec.png    ← Isotipo solo (ícono)
/images/Mariposa.png           ← Mariposa decorativa (watermark)
/images/Logo_Iso.png           ← Logo variante iso
```

## Secciones de la Landing Page (Orden y Propósito)
1. **Hero** → Impacto inmediato + CTA principal
2. **About** (#nosotros) → Misión y diferenciadores
3. **Services** (#servicios) → Qué hace DIGITEC (proceso de metamorfosis)
4. **Pricing** (#planes) → Planes y precios
5. **Testimonials** → Prueba social
6. **Contact** (#contacto) → Formulario de contacto
7. **Footer** → Links, redes, copyright
