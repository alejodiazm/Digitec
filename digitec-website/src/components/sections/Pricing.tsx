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
            description: "Tu primer hogar en la web. Creamos una base fresca y ligera para que tu idea rompa el cascarón. Ingeniería impecable para tu primer gran salto.",
            price: "$750.000",
            renewal: "$180.000 / año",
            icon: Rocket,
            highlight: false,
            sections: [
                {
                    title: "Ingeniería Web",
                    features: [
                        "Landing Page Profesional",
                        "Diseño Ultra-Responsivo",
                        "Botón de WhatsApp Directo",
                        "Formulario de Contacto",
                        "Optimización de Carga",
                        "Seguridad Anti-Spam"
                    ]
                },
                {
                    title: "Infraestructura",
                    features: [
                        "Hosting Propio (SSD NVMe)",
                        "Dominio .com/.co (1 año)",
                        "Certificado SSL (HTTPS)",
                        "2 Cuentas Corporativas",
                        "Propiedad Absoluta",
                        "Entrega: 4 a 6 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Plan Crecimiento Business",
            description: "Para marcas listas para expandirse. Un entorno robusto con tienda virtual, correos corporativos y autonomía total para gestionar tu evolución.",
            price: "$1.450.000",
            renewal: "$250.000 / año",
            icon: Building2,
            highlight: false,
            sections: [
                {
                    title: "Ecosistema Digital",
                    features: [
                        "Tienda Virtual / Catálogo",
                        "Panel Administrativo",
                        "Pasarela de Pagos Global",
                        "Sitio Multi-página Completo",
                        "Blog & Noticias para SEO",
                        "Integración de Analytics"
                    ]
                },
                {
                    title: "Respaldo e Impulso",
                    features: [
                        "Hosting de Alto Rendimiento",
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
            description: "Ingeniería de vanguardia con Next.js 15. Velocidad absoluta y seguridad blindada para quienes lideran el cambio en su industria.",
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
                        "Seguridad WAF Avanzada",
                        "SEO Técnico Avanzado",
                        "Correos Ilimitados",
                        "Hosting NVMe Corporativo",
                        "Entrega: 20 a 25 días hábiles"
                    ]
                }
            ]
        }
    ],
    branding: [
        {
            name: "Esencia Básica",
            description: "Definimos el rostro de tu proyecto. El nacimiento visual con un logo y colores que cuentan quién eres de manera sencilla pero profesional.",
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
            description: "Un sistema visual coherente. Tu marca se profesionaliza con manual de estilo, papelería y presencia en redes para un crecimiento sólido.",
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
                    title: "Kit de Metamorfosis",
                    features: [
                        "6 Plantillas Canva Editables",
                        "Firma Correo & Tarjeta QR",
                        "Presencia en Redes Sociales",
                        "Hoja Membretada (Word)",
                        "Entrega: 10 a 12 días hábiles"
                    ]
                }
            ]
        },
        {
            name: "Transformación Integral",
            description: "Renovación profunda. Estrategia de marca, tono de voz y consultoría para conectar emocionalmente con tu público y liderar el mercado.",
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
                        "Pitch Deck Comercial",
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
        title: "Desarrollo & Infraestructura (Vuelo Digital)",
        description: "En esta etapa, preparamos el terreno y diseñamos las alas para que tu negocio tenga un hogar digital donde pueda crecer sin límites."
    },
    branding: {
        title: "ADN & Esencia de Marca (Nacimiento)",
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
        <section id="planes" className={cn("py-16 md:py-24 relative overflow-hidden bg-[#F8FAFC]", className)}>
            {/* Background Texture: Refined Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{
                backgroundImage: `radial-gradient(#1E293B 0.5px, transparent 0.5px)`,
                backgroundSize: "24px 24px"
            }} />

            {/* Soft Ambient Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20">
                            SOLUCIONES INTEGRALES
                        </span>

                        {/* Dynamic Title & Description based on Category */}
                        <div className="min-h-[140px] md:min-h-[120px] mb-6 md:mb-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight px-4">
                                        {categoryInfo[category].title}
                                    </h2>
                                    <p className="text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-medium px-4">
                                        {categoryInfo[category].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Category Switcher - Pixel-Perfect Responsive Switch */}
                        <div className="relative inline-flex p-1 bg-white/20 rounded-[1.25rem] border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group/switcher max-w-full overflow-hidden">
                            {/* Symmetric Track - Tinted Slots for brand identification */}
                            <div className="absolute inset-1 flex gap-1 pointer-events-none z-0">
                                <div className="flex-1 rounded-xl bg-primary/5 border border-primary/10" />
                                <div className="flex-1 rounded-xl bg-accent-lavender/5 border border-accent-lavender/10" />
                            </div>

                            <button
                                onClick={() => setCategory("web")}
                                className={`relative flex-1 min-w-[140px] sm:min-w-[200px] px-4 sm:px-8 py-3.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-black transition-all duration-500 uppercase tracking-widest z-10 font-sans flex items-center justify-center gap-2 sm:gap-3 ${category === "web" ? "text-white" : "text-primary/70 hover:text-primary"
                                    }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${category === 'web' ? 'bg-white shadow-[0_0_8px_white] scale-125' : 'bg-primary/30'}`} />
                                <span className="relative z-10 whitespace-nowrap">Desarrollo Web</span>
                                {category === "web" && (
                                    <motion.div
                                        layoutId="category-bg"
                                        className="absolute inset-0 bg-primary rounded-xl shadow-[0_5px_20px_rgba(59,130,246,0.6)] z-[-1]"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                            </button>

                            <button
                                onClick={() => setCategory("branding")}
                                className={`relative flex-1 min-w-[140px] sm:min-w-[200px] px-4 sm:px-8 py-3.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-black transition-all duration-500 uppercase tracking-widest z-10 font-sans flex items-center justify-center gap-2 sm:gap-3 ${category === "branding" ? "text-white" : "text-accent-lavender/70 hover:text-accent-lavender"
                                    }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${category === 'branding' ? 'bg-white shadow-[0_0_8px_white] scale-125' : 'bg-accent-lavender/30'}`} />
                                <span className="relative z-10 whitespace-nowrap text-nowrap">Branding & Diseño</span>
                                {category === "branding" && (
                                    <motion.div
                                        layoutId="category-bg"
                                        className="absolute inset-0 bg-accent-lavender rounded-xl shadow-[0_5px_20px_rgba(139,92,246,0.6)] z-[-1]"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence mode="wait">
                        {plans[category].map((plan, index) => (
                            <ScrollReveal key={`${category}-${index}`} delay={index * 0.1} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`relative h-full p-6 sm:p-10 rounded-[2rem] border transition-all duration-500 flex flex-col group ${plan.highlight
                                        ? category === "web"
                                            ? "bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] border-transparent shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)]"
                                            : "bg-gradient-to-br from-[#581C87] to-[#8B5CF6] border-transparent shadow-[0_50px_100px_-20px_rgba(88,28,135,0.5)]"
                                        : cn(
                                            "backdrop-blur-xl border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)]",
                                            category === "web" ? "bg-primary/[0.2] hover:bg-primary/[0.3]" : "bg-accent-lavender/[0.2] hover:bg-accent-lavender/[0.3]"
                                        )
                                        }`}
                                    whileHover={{ y: -12 }}
                                >
                                    {/* Elite Silk Gradient Border - Corporate Theme */}
                                    {plan.highlight && (
                                        <div className="absolute -inset-[1px] rounded-[2rem] -z-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                                    )}

                                    {/* Subtle Isotipo Background for Elite/Highlight */}
                                    {plan.highlight && (
                                        <div className="absolute -bottom-10 -left-10 w-64 h-64 opacity-[0.03] grayscale pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                            <NextImage
                                                src="/images/Isotipo Digitec.png"
                                                alt=""
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}

                                    {plan.highlight && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2 bg-[#F59E0B] whitespace-nowrap">
                                            <Zap size={12} fill="currentColor" strokeWidth={3} /> Recomendado
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className={`mb-6 pb-6 border-b ${plan.highlight ? "border-black/5" : "border-white/10"}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl ${plan.highlight
                                                ? "bg-white/20 text-white"
                                                : "bg-white/10 text-white"
                                                }`}>
                                                <plan.icon size={28} />
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-3xl font-black mb-2 text-white tracking-tighter">{plan.name}</h3>
                                        <p className="text-sm md:text-base leading-relaxed mb-4 h-16 md:h-20 line-clamp-3 text-white/80 font-light tracking-tight">
                                            {plan.description}
                                        </p>

                                        <div className="flex flex-col mt-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl md:text-5xl font-black tracking-tighter text-white">{plan.price}</span>
                                                <span className="text-xs md:text-sm font-black text-white/50 tracking-widest">COP</span>
                                            </div>
                                            <div className="text-[10px] md:text-xs mt-1">
                                                <span className="text-white/60 font-bold uppercase tracking-widest">
                                                    {category === "web" ? "Renovación: " : ""}
                                                </span>
                                                <span className="text-white/40 font-medium">{plan.renewal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features Sections */}
                                    <div className="flex-grow space-y-8">
                                        {plan.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${plan.highlight ? "text-white/60" : "text-white/80"}`}>
                                                    {section.title.includes("Infraestructura") || section.title.includes("Kit") ?
                                                        <Server size={14} /> : <Globe size={14} />
                                                    }
                                                    {section.title}
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.features.map((feature, fIdx) => (
                                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-white/90 font-light tracking-tight">
                                                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight
                                                                ? "text-[#F59E0B]"
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
                                    <div className={`mt-8 pt-6 border-t ${plan.highlight ? "border-black/5" : "border-white/10"}`}>
                                        <Button
                                            className={`w-full py-6 text-base ${plan.highlight
                                                ? "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10"
                                                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
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
