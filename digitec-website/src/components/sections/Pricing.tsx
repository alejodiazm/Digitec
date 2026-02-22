"use client";

import { useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Check, Zap, Rocket, Building2, Server, Globe, Palette, PenTool, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

type Category = "web" | "branding";

const plans = {
    web: [
        {
            name: "Plan Vuelo Inicial",
            description: "Es el momento de salir al mundo. Creamos una base fresca y ligera, con todo lo necesario para que tus clientes te encuentren.",
            price: "$750.000",
            renewal: "$180.000 / año",
            icon: Rocket,
            highlight: false,
            sections: [
                {
                    title: "Ingeniería Web",
                    features: [
                        "Estructura One-Page Scroll",
                        "Diseño Ultra-Responsivo",
                        "Botón Flotante WhatsApp",
                        "Formulario con Validación",
                        "Optimización WebP",
                        "Seguridad Anti-Spam"
                    ]
                },
                {
                    title: "Infraestructura",
                    features: [
                        "Alojamiento SSD Optimizado",
                        "Dominio .com/.co (1 año)",
                        "Certificado SSL (HTTPS)",
                        "2 Cuentas Corporativas",
                        "Soporte Técnico 30 días",
                        "Entrega: 4 a 6 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Plan Crecimiento Business",
            description: "Para cuando tu marca necesita más espacio y herramientas para madurar. Control total de tu entorno.",
            price: "$1.450.000",
            renewal: "$250.000 / año",
            icon: Building2,
            highlight: false,
            sections: [
                {
                    title: "Ingeniería Web",
                    features: [
                        "Sitio Multi-página (8 secciones)",
                        "Tienda Virtual / Catálogo",
                        "Pasarela de Pagos",
                        "Panel Administrativo",
                        "Blog & Noticias SEO",
                        "Pixel & Analytics 4"
                    ]
                },
                {
                    title: "Infraestructura",
                    features: [
                        "Prioridad de Recursos (Caché)",
                        "Dominio .com/.co",
                        "10 Cuentas Corporativas",
                        "Backups Quincenales",
                        "Certificado SSL Pro",
                        "Entrega: 10 a 12 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Plan Transformación Élite",
            description: "El siguiente nivel de la evolución. Tecnología de vanguardia para quienes buscan liderazgo y velocidad absoluta.",
            price: "$3.200.000",
            renewal: "$350.000 / año",
            icon: Zap,
            highlight: true,
            sections: [
                {
                    title: "Ingeniería de Software",
                    features: [
                        "Desarrollo en Next.js 15",
                        "PageSpeed 95-100 (Extremo)",
                        "Carga Instantánea (SSG)",
                        "Seguridad Blindada",
                        "UI/UX Personalizado",
                        "Arquitectura Escalable"
                    ]
                },
                {
                    title: "Infraestructura Premium",
                    features: [
                        "Despliegue Híbrido Eficiente",
                        "Seguridad WAF",
                        "SEO Técnico Avanzado",
                        "Correos Ilimitados",
                        "Soporte Prioritario 6 Meses",
                        "Entrega: 20 a 25 días hábiles"
                    ]
                }
            ]
        }
    ],
    branding: [
        {
            name: "Esencia Básica",
            description: "Definimos tu rostro ante el mundo. Colores y formas que cuentan quién eres de manera sencilla pero profesional.",
            price: "$420.000",
            renewal: "Pago Único",
            icon: Palette,
            highlight: false,
            sections: [
                {
                    title: "Conceptualización",
                    features: [
                        "Briefing Creativo & Nicho",
                        "2 Propuestas de Logotipo",
                        "3 Rondas de Ajustes",
                        "Paleta Cromática (HEX/RGB)",
                        "Curaduría Tipográfica"
                    ]
                },
                {
                    title: "Entregables Técnicos",
                    features: [
                        "Archivos JPG & PNG Transp.",
                        "Versiones Vectoriales (AI/PDF)",
                        "Adaptación Fotos de Perfil",
                        "Entrega: 4 a 6 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Identidad en Evolución",
            description: "Creamos un lenguaje visual completo. Tu marca deja de ser solo un nombre para convertirse en una imagen coherente.",
            price: "$950.000",
            renewal: "Pago Único",
            icon: PenTool,
            highlight: true,
            sections: [
                {
                    title: "Sistema Visual Pro",
                    features: [
                        "3 Propuestas de Logotipo",
                        "Variaciones (Isotipo/Vertical)",
                        "Manual de Identidad Visual",
                        "Guía de Áreas y Tamaños",
                        "Texturas y Patrones"
                    ]
                },
                {
                    title: "Kit Digital & Papelería",
                    features: [
                        "6 Plantillas Canva Editables",
                        "Firma Correo & Tarjeta QR",
                        "Hoja Membretada (Word)",
                        "Entrega: 10 a 12 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Transformación Integral",
            description: "Entramos al alma de tu negocio. Una renovación total que alinea tu historia con tus metas de alto nivel.",
            price: "$1.900.000",
            renewal: "Pago Único",
            icon: Lightbulb,
            highlight: false,
            sections: [
                {
                    title: "Estrategia de Marca ADN",
                    features: [
                        "Análisis de Competencia",
                        "Propósito, Visión y Valores",
                        "Storytelling & Elevator Pitch",
                        "Definición de Tono y Voz",
                        "Consultoría Estratégica (2h)"
                    ]
                },
                {
                    title: "Pack Lanzamiento Élite",
                    features: [
                        "Iconografía Personalizada",
                        "Kit Redes (15 piezas)",
                        "Pitch Deck Comercial (8 dias)",
                        "Concepto Merchandising",
                        "Entrega: 20 a 25 días hábiles"
                    ]
                }
            ]
        }
    ]
};

const categoryInfo = {
    web: {
        title: "Desarrollo & Infraestructura (Llave en mano)",
        description: "En esta etapa, preparamos el terreno y diseñamos las alas para que tu negocio tenga un hogar digital donde pueda crecer sin límites."
    },
    branding: {
        title: "Identidad & ADN (Branding)",
        description: "Le damos colores, formas y un mensaje claro a tu esencia. Aquí es donde tu marca define su personalidad y se prepara para impactar."
    }
};

import { cn } from "@/lib/utils";

interface PricingProps {
    className?: string;
}

export const Pricing = ({ className }: PricingProps) => {
    const [category, setCategory] = useState<Category>("web");

    return (
        <section id="planes" className={cn("py-24 relative overflow-hidden bg-[#F8FAFC]", className)}>
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }} />

            <Container className="relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20">
                            SOLUCIONES INTEGRALES
                        </span>

                        {/* Dynamic Title & Description based on Category */}
                        <div className="min-h-[160px] md:min-h-[120px] mb-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-3xl md:text-5xl font-bold text-[#1E293B] mb-6">
                                        {categoryInfo[category].title}
                                    </h2>
                                    <p className="text-[#475569] text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                                        {categoryInfo[category].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Category Switcher */}
                        <div className="inline-flex p-1 bg-black/5 rounded-xl border border-black/5 backdrop-blur-sm">
                            <button
                                onClick={() => setCategory("web")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${category === "web"
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-[#475569] hover:text-[#1E293B] hover:bg-black/5"
                                    }`}
                            >
                                Desarrollo Web
                            </button>
                            <button
                                onClick={() => setCategory("branding")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${category === "branding"
                                    ? "bg-accent-lavender text-white shadow-lg"
                                    : "text-[#475569] hover:text-[#1E293B] hover:bg-black/5"
                                    }`}
                            >
                                Branding & Diseño
                            </button>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {plans[category].map((plan, index) => (
                            <ScrollReveal key={`${category}-${index}`} delay={index * 0.1} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`relative h-full p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col group ${plan.highlight
                                        ? category === "web"
                                            ? "bg-white border-accent-coral shadow-2xl shadow-accent-coral/10 ring-1 ring-accent-coral/20"
                                            : "bg-white border-accent-lavender shadow-2xl shadow-accent-lavender/10 ring-1 ring-accent-lavender/20"
                                        : "bg-white/60 border-black/5 hover:border-black/10 shadow-lg shadow-black/[0.02]"
                                        }`}
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Subtle Isotipo Background for Elite/Highlight */}
                                    {plan.highlight && (
                                        <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-[0.03] grayscale pointer-events-none">
                                            <NextImage
                                                src="/images/Isotipo_Digitec.png"
                                                alt=""
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}

                                    {plan.highlight && (
                                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2 ${category === "web" ? "bg-accent-coral" : "bg-accent-lavender"
                                            }`}>
                                            <Zap size={12} fill="currentColor" /> Recomendado
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="mb-6 pb-6 border-b border-black/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl ${plan.highlight
                                                ? category === "web" ? "bg-primary text-white" : "bg-accent-lavender text-white"
                                                : "bg-black/5 text-[#475569]"
                                                }`}>
                                                <plan.icon size={28} />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#1E293B] mb-2">{plan.name}</h3>
                                        <p className="text-[#475569] text-sm leading-relaxed mb-4 h-16 line-clamp-3">
                                            {plan.description}
                                        </p>

                                        <div className="flex flex-col mt-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-[#1E293B] tracking-tight">{plan.price}</span>
                                                <span className="text-[#475569] text-sm font-medium">COP</span>
                                            </div>
                                            <div className="text-xs text-[#475569] mt-1">
                                                {category === "web" ? "Renovación: " : ""}<span className="text-slate-400">{plan.renewal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features Sections */}
                                    <div className="flex-grow space-y-8">
                                        {plan.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    {section.title.includes("Infraestructura") || section.title.includes("Kit") ?
                                                        <Server size={14} /> : <Globe size={14} />
                                                    }
                                                    {section.title}
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.features.map((feature, fIdx) => (
                                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-[#475569]">
                                                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight
                                                                ? category === "web" ? "text-primary" : "text-accent-lavender"
                                                                : "text-accent-mint"
                                                                }`} />
                                                            <span className="leading-tight">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 pt-6 border-t border-black/5">
                                        <Button
                                            className={`w-full py-6 text-base ${plan.highlight
                                                ? category === "web"
                                                    ? "bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20"
                                                    : "bg-accent-lavender hover:bg-accent-lavender/90 shadow-lg shadow-accent-lavender/20"
                                                : "bg-[#F8FAFC] hover:bg-black/5 text-[#1E293B] border border-black/5"
                                                }`}
                                            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Solicitar {category === "branding" ? "Marca" : "Web"}
                                        </Button>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
};
