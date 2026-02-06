# DIGITEC GLOBAL SAS - Website

> **Tecnología que impulsa tu visión al siguiente nivel**

Sitio web corporativo de DIGITEC GLOBAL SAS, empresa especializada en desarrollo de software a medida, branding e identidad visual, consultoría TI y soluciones cloud.

## 🚀 Características

- ⚡ **Next.js 14+** con App Router
- 🎨 **Tailwind CSS** con tema personalizado
- 🔒 **Seguridad de nivel empresarial** (OWASP, CSP, rate limiting)
- ♿ **WCAG 2.1 AA/AAA** compliance
- 🎭 **Animaciones premium** con Framer Motion, GSAP y Three.js
- 📱 **Responsive design** mobile-first
- 🌐 **i18n ready** (Español/Inglés)
- 🔍 **SEO optimizado**

## 🛠️ Stack Tecnológico

### Core
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS

### Animaciones
- Framer Motion
- GSAP (GreenSock)
- Three.js / React Three Fiber
- Lottie

### Seguridad
- Cloudflare Turnstile (CAPTCHA)
- DOMPurify (sanitización)
- Zod (validación)
- Upstash Redis (rate limiting)

### Servicios
- Resend (email transaccional)
- Vercel Analytics / Umami (analytics)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Desarrollo
npm run dev

# Build de producción
npm run build
npm run start
```

## 🔐 Variables de Entorno

Ver `.env.example` para la lista completa de variables requeridas.

## 📋 Estructura del Proyecto

```
├── src/
│   ├── app/              # App Router (Next.js 14)
│   ├── components/       # Componentes React
│   │   ├── atoms/        # Componentes básicos
│   │   ├── molecules/    # Componentes compuestos
│   │   ├── sections/     # Secciones de página
│   │   └── effects/      # Efectos y animaciones
│   ├── constants/        # Configuración centralizada
│   ├── lib/              # Utilidades y helpers
│   │   └── security/     # Módulos de seguridad
│   └── types/            # TypeScript types
├── public/               # Assets estáticos
└── Images/               # Imágenes del proyecto
```

## 🎨 Identidad Visual

- **Colores**: 
  - Azul Principal: `#1D4F8C`
  - Azul Innovación: `#3A8DFF`
  - Azul Transición: `#1A6ABF`
- **Tipografía**: Raleway (títulos), Open Sans (cuerpo)
- **Concepto**: Metamorfosis de la mariposa (transformación digital)

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Security audit
npm audit
```

## 🚀 Deployment

El proyecto está optimizado para deployment en:
- Vercel (recomendado)
- Hostinger
- Cualquier plataforma con soporte Node.js

## 📄 Licencia

© 2024 DIGITEC GLOBAL SAS. Todos los derechos reservados.

## 📞 Contacto

- **Email**: contacto@digitecglobalsas.com
- **WhatsApp**: [Enlace directo]
- **LinkedIn**: [URL]
- **Instagram**: [URL]

---

**Desarrollado con ❤️ siguiendo los más altos estándares de calidad, seguridad y accesibilidad.**
