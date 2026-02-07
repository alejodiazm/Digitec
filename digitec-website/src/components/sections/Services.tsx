"use client";

import { Container } from "@/components/atoms/Container";
import { GlowCard } from "@/components/molecules/GlowCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EvervaultCard } from "@/components/effects/EvervaultCard";
import { Egg, Feather, Rocket, ArrowRight, Zap } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Stages of Metamorphosis from User Request
const strategies = [
    {
        icon: Egg, // Symbol of Birth/Creation
        title: "Creación (Nacimiento)",
        description: "Tomamos tu visión desde su estado más puro y construimos su primer hogar en la web. Una base fuerte y ligera, diseñada para que tu idea rompa el cascarón con éxito.",
        highlight: "Ideal para Nuevos Negocios",
        color: "accent-mint",
        image: "/images/Isotipo Digitec.png"
    },
    {
        icon: Feather, // Symbol of Flight/Lightness
        title: "Evolución (Desarrollo)",
        description: "Construimos entornos robustos que permiten a tu marca expandirse sin límites. Optimizamos cada proceso para acompañar el ritmo de tu vuelo empresarial.",
        highlight: "Para Marcas en Crecimiento",
        color: "primary",
        image: "/images/Mariposa.png"
    },
    {
        icon: Rocket, // Symbol of Transformation/Power
        title: "Transformación (Vanguardia)",
        description: "Mudamos tu piel tecnológica a la ingeniería más avanzada. Seguridad blindada y velocidad absoluta para quienes lideran el cambio en su industria.",
        highlight: "Evolución Empresarial Élite",
        color: "accent-lavender",
        image: "/images/Logo_Iso.png"
    },
];

export const Services = () => {
    return (
        <section id="servicios" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
            {/* Refined Ambient Light & Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-mint/10 rounded-full blur-[120px] pointer-events-none opacity-40" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-lavender/10 rounded-full blur-[140px] pointer-events-none opacity-40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

            <Container>
                <div className="mb-14 md:mb-20 text-center max-w-3xl mx-auto">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/5 text-primary text-sm font-bold mb-4 border border-primary/10">
                            NUESTRO PROCESO
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-main mb-6 px-4 tracking-tighter">
                            ¿Qué hace DIGITEC en el mercado?
                        </h2>
                        <p className="text-sub text-base md:text-xl leading-relaxed font-light px-4 tracking-tight">
                            Nuestro trabajo es guiar a las marcas a través de su propio proceso de renovación.
                            No solo entregamos productos; facilitamos una transición exitosa hacia el mundo digital.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 mb-20 md:mb-24">
                    {strategies.map((stage, index) => (
                        <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                            <motion.div
                                whileHover={{ y: -12 }}
                                className={cn(
                                    "h-full relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 transition-all duration-700 flex flex-col group",
                                    "bg-white backdrop-blur-xl border border-black/[0.04] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.22)]",
                                    stage.color === 'accent-mint' ? "bg-accent-mint/[0.1] hover:bg-accent-mint/[0.2]" :
                                        stage.color === 'primary' ? "bg-primary/[0.1] hover:bg-primary/[0.2]" :
                                            "bg-accent-lavender/[0.1] hover:bg-accent-lavender/[0.2]"
                                )}
                            >
                                {/* Gradient Ambient Aura */}
                                <div className={cn(
                                    "absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none",
                                    stage.color === 'accent-mint' ? "bg-accent-mint" :
                                        stage.color === 'primary' ? "bg-primary" :
                                            "bg-accent-lavender"
                                )} />

                                <div className="relative z-10">
                                    {/* Stage Header: Icon + Label Row */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="relative shrink-0">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center relative z-10",
                                                "bg-white shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-black/[0.03] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500",
                                                stage.color === 'accent-mint' ? "text-accent-mint" :
                                                    stage.color === 'primary' ? "text-primary" :
                                                        "text-accent-lavender"
                                            )}>
                                                <stage.icon size={24} strokeWidth={2} />
                                            </div>
                                            <div className={cn(
                                                "absolute -inset-2 blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none",
                                                stage.color === 'accent-mint' ? "bg-accent-mint" :
                                                    stage.color === 'primary' ? "bg-primary" :
                                                        "bg-accent-lavender"
                                            )} />
                                        </div>

                                        <span className={cn(
                                            "text-[10px] font-medium uppercase tracking-[0.4em] py-1.5 px-4 rounded-full border",
                                            stage.color === 'accent-mint' ? "text-accent-mint border-accent-mint/30 bg-accent-mint/5" :
                                                stage.color === 'primary' ? "text-primary border-primary/30 bg-primary/5" :
                                                    "text-accent-lavender border-accent-lavender/30 bg-accent-lavender/5"
                                        )}>
                                            Etapa {index + 1}
                                        </span>
                                    </div>

                                    {/* Title below header row */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-main tracking-tighter font-sans leading-tight mb-8">
                                        {stage.title}
                                    </h3>

                                    <p className="text-sub text-base md:text-lg leading-relaxed mb-10 font-light font-sans max-w-[90%] tracking-tight">
                                        {stage.description}
                                    </p>
                                </div>

                                <div className="mt-auto relative z-10 pt-8 border-t border-black/[0.04]">
                                    <div className="flex items-center justify-between gap-4 group/btn">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex-1">
                                            {stage.highlight}
                                        </span>
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                            "bg-black/[0.03] group-hover/btn:scale-110",
                                            stage.color === 'accent-mint' ? "group-hover/btn:bg-accent-mint/10 group-hover/btn:text-accent-mint" :
                                                stage.color === 'primary' ? "group-hover/btn:bg-primary/10 group-hover/btn:text-primary" :
                                                    "group-hover/btn:bg-accent-lavender/10 group-hover/btn:text-accent-lavender"
                                        )}>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Differential Section - airy & refined */}
                <ScrollReveal>
                    <div className="bg-white bg-primary/[0.03] backdrop-blur-xl border border-black/[0.04] rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-[0_50px_120px_-25px_rgba(0,0,0,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 md:gap-24">
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-main mb-6 md:mb-8 tracking-tight font-sans">
                                    Nuestro Diferencial: &quot;Acompañamiento en cada etapa&quot;
                                </h3>
                                <p className="text-sub text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-light font-sans">
                                    En DIGITEC, el respaldo técnico es nuestra promesa. Utilizamos infraestructura SSD NVMe para máxima velocidad y desarrollo limpio optimizado para SEO. Lo más importante: el cliente es dueño absoluto de su transformación; aquí no hay letras pequeñas, solo tecnología que impulsa.
                                </p>
                                <p className="text-primary text-sm md:text-base font-medium mb-10 italic font-sans max-w-xl">
                                    &quot;Somos el brazo tecnológico que prepara el terreno, diseña las alas y se asegura de que tu marca siempre tenga el impulso necesario para liderar su industria.&quot;
                                </p>
                                <div className="flex items-center gap-6 text-sm font-bold text-main">
                                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 text-white">
                                        <Zap size={24} strokeWidth={1.5} />
                                    </div>
                                    <span className="tracking-tight uppercase tracking-[0.1em] text-xs md:text-sm">Infraestructura de Élite & Propiedad Absoluta.</span>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 aspect-square max-w-[300px] rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-white flex items-center justify-center border border-white/60 relative overflow-hidden group shadow-inner">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                                <div className="text-center relative z-10 p-8">
                                    <span className="block text-5xl md:text-6xl font-black text-primary mb-2 tracking-tighter">100%</span>
                                    <span className="text-[10px] md:text-xs text-sub font-black uppercase tracking-[0.3em] opacity-60">Compromiso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
};
