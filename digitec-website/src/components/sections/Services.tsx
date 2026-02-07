"use client";

import { Container } from "@/components/atoms/Container";
import { GlowCard } from "@/components/molecules/GlowCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EvervaultCard } from "@/components/effects/EvervaultCard";
import { Egg, Feather, Rocket, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

// Stages of Metamorphosis from User Request
const strategies = [
    {
        icon: Egg, // Symbol of Birth/Creation
        title: "Dar Vida (Creación)",
        description: "Tomamos tu visión desde su estado más pura y construimos su primer hogar en la web. Una base fuerte y acogedora, lista para recibir a tus visitantes.",
        highlight: "Ideal para Nuevos Negocios",
        color: "indigo-brand",
        image: "/images/Isotipo Digitec.png"
    },
    {
        icon: Feather, // Symbol of Flight/Lightness
        title: "Impulsar el Vuelo (Evolución)",
        description: "Optimizamos tu plataforma para que sea rápida, ligera y fácil de usar. Tu negocio gana altura, se adapta a tus clientes y se mueve con libertad.",
        highlight: "Para Marcas en Crecimiento",
        color: "primary",
        image: "/images/Mariposa.png"
    },
    {
        icon: Rocket, // Symbol of Transformation/Power
        title: "Renovar el Impacto (Transformación)",
        description: "Ayudamos a mudar de piel. Rediseñamos identidad y tecnología para reconectar con el mundo de forma moderna, elegante e imposible de ignorar.",
        highlight: "Evolución Empresarial Completa",
        color: "cyan-brand",
        image: "/images/Logo_Iso.png"
    },
];

export const Services = () => {
    return (
        <section id="servicios" className="py-24 bg-[#111827] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl pointer-events-none" />

            <Container>
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20">
                            NUESTRO PROCESO
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            ¿Qué hace DIGITEC en el mercado?
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Nuestro trabajo es guiar a las marcas a través de su propio proceso de renovación.
                            No solo entregamos productos; facilitamos una transición exitosa hacia el mundo digital.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {strategies.map((stage, index) => (
                        <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                            <GlowCard className="h-full relative overflow-hidden group">
                                {/* Subtle Brand Texture Watermark */}
                                <div className="absolute -bottom-6 -right-6 w-40 h-40 opacity-[0.02] grayscale pointer-events-none select-none group-hover:scale-105 transition-transform duration-700">
                                    <NextImage
                                        src={stage.image}
                                        alt=""
                                        fill
                                        className="object-contain"
                                        style={{ filter: 'brightness(0) invert(1)' }}
                                    />
                                </div>

                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                        style={{ color: `var(--color-${stage.color})` }}
                                    />
                                </div>

                                <div className="mb-8 h-40 w-full">
                                    <EvervaultCard
                                        text={stage.title.split(" ")[0]}
                                        className="rounded-2xl border border-white/5"
                                    />
                                </div>

                                <div className="mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-60"
                                        style={{ color: `var(--color-${stage.color})` }}
                                    >
                                        Etapa {index + 1}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mt-2 mb-3">{stage.title}</h3>
                                </div>

                                <p className="text-slate-400 leading-relaxed mb-6 relative z-10">
                                    {stage.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-1 rounded">
                                        {stage.highlight}
                                    </span>
                                </div>
                            </GlowCard>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Differential Section */}
                <ScrollReveal>
                    <div className="bg-[#0B1121]/50 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Nuestro Diferencial: &quot;Acompañamiento en cada etapa&quot;
                                </h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    A diferencia de quienes solo ven códigos o pixeles, en DIGITEC entendemos el esfuerzo que hay detrás de cada proyecto. Por eso, optimizamos nuestros procesos y recursos (como nuestra propia infraestructura) para que el cambio no sea un peso, sino una transición natural y emocionante.
                                </p>
                                <p className="text-primary text-sm font-medium mb-6 italic">
                                    En resumen: Somos el aliado que prepara el terreno, diseña las alas y se asegura de que tu marca siempre tenga el impulso necesario para seguir evolucionando.
                                </p>
                                <div className="flex items-center gap-4 text-sm font-medium text-white">
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Feather size={20} />
                                    </div>
                                    <span>Somos el aliado que diseña tus alas.</span>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="text-center relative z-10 p-6">
                                    <span className="block text-4xl font-bold text-white mb-1">100%</span>
                                    <span className="text-sm text-slate-400 uppercase tracking-widest">Compromiso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
};
