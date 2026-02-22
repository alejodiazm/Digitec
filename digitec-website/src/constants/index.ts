export const COMPANY_INFO = {
  name: "DIGITEC GLOBAL SAS",
  tagline: "Tecnología que impulsa tu visión al siguiente nivel",
  email: "contacto@digitec.global",
  whatsapp: {
    number: "+57 3028010431",
    link: "https://wa.me/573028010431?text=Hola%20Digitec,%20quiero%20impulsar%20mi%20proyecto.",
    message: "Hola Digitec, quiero impulsar mi proyecto."
  },
  social: {
    linkedin: "https://linkedin.com/company/digitec-global-sas", // Placeholder
    instagram: "https://instagram.com/digitec.global", // Placeholder
  },
  year: new Date().getFullYear(),
};

export const ROUTES = {
  HOME: "#inicio",
  ABOUT: "#nosotros",
  SERVICES: "#servicios",
  CONTACT: "#contacto",
};

export const HERO_CONTENT = {
  title: "Tecnología que impulsa tu visión al siguiente nivel",
  description: "En Digitec Global SAS, entendemos que la verdadera innovación no solo resuelve problemas, sino que acelera el crecimiento. Nacimos con una misión clara: brindar tecnología que impulsa la evolución de nuestros clientes a través de soluciones robustas y una identidad visual con propósito.",
  ctaPrimary: "Conocer Servicios",
  ctaSecondary: "Contactar",
};

export const ABOUT_CONTENT = {
  title: "Sobre Nosotros",
  description: "Inspirados en la metamorfosis de nuestra mariposa, acompañamos a las empresas en su proceso de transformación digital. No solo entregamos software o diseño; entregamos el motor estratégico que permite a los negocios modernos escalar, adaptarse y liderar en un mercado global.",
}

export const SERVICES = [
  {
    id: "software-development",
    title: "Desarrollo Web y App",
    description: "Desde potentes sitios en WordPress y Shopify para una gestión ágil, hasta arquitecturas robustas en Código Puro para soluciones escalables.",
    icon: "code",
    modalities: [
      {
        title: "Opción A: Desarrollo Low-Code / CMS",
        technologies: ["WordPress", "Shopify"],
        target: "Emprendimientos y empresas que necesitan velocidad de lanzamiento y autogestión",
        benefits: [
          "Lanzamiento rápido y eficiente",
          "Panel de administración intuitivo para el cliente",
          "Ecosistema robusto de plugins y pasarelas de pago",
          "Optimizado para SEO y fácil mantenimiento"
        ]
      },
      {
        title: "Opción B: Desarrollo Core / Código a Medida",
        technologies: ["Next.js", "React", "Node.js"],
        target: "Empresas que buscan escalabilidad ilimitada, seguridad máxima y funcionalidades únicas",
        benefits: [
          "Rendimiento ultrarrápido (Core Web Vitals al 100%)",
          "Arquitectura escalable según el crecimiento del negocio",
          "Seguridad avanzada (OWASP) y control total del código",
          "Integraciones personalizadas con APIs y sistemas externos"
        ]
      }
    ]
  },
  {
    id: "branding",
    title: "Branding e Identidad Visual",
    description: "Creamos el ADN visual de tu marca. Logos y manuales que comunican la Tecnología que impulsa tu negocio.",
    icon: "palette",
    features: [
      "Diseño de ADN de marca único",
      "Manuales de identidad listos para impresión y digital",
      "Posicionamiento visual frente a la competencia"
    ]
  },
  {
    id: "consulting",
    title: "Consultoría TI",
    description: "Estrategia digital para optimizar procesos, reducir costos y elegir la tecnología adecuada para tu etapa actual.",
    icon: "strategy",
    features: [
      "Auditoría de seguridad y rendimiento",
      "Hoja de ruta para transformación digital",
      "Reducción de deuda técnica"
    ]
  },
  {
    id: "cloud-hosting",
    title: "Cloud & Hosting",
    description: "Infraestructura segura para que tu proyecto esté siempre disponible, rápido y protegido.",
    icon: "cloud",
    features: [
      "Certificados SSL gratuitos",
      "Disponibilidad del 99.9%",
      "Backups automatizados"
    ]
  }
];

export const CONTACT_FORM = {
  fields: {
    name: "Tu nombre completo",
    email: "correo@ejemplo.com",
    message: "Cuéntanos sobre tu proyecto..."
  },
  messages: {
    success: "¡Gracias por contactarnos! Te responderemos en menos de 24 horas.",
    error: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.",
    validation: "Por favor completa todos los campos correctamente."
  }
};

export const METADATA = {
  title: "Digitec Global SAS - Tecnología que impulsa tu visión",
  description: "Digitec Global SAS: Desarrollo web en WordPress, Shopify y Código a medida. Branding y Consultoría TI. Tecnología que impulsa tu visión al siguiente nivel.",
  keywords: [
    "Desarrollo de software a medida",
    "Consultoría TI Bogotá",
    "Branding corporativo tecnológico",
    "Soluciones Cloud para empresas",
    "WordPress desarrollo Colombia",
    "Shopify desarrollo",
    "Next.js desarrollo"
  ]
};
