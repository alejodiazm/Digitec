"use client";

import { Lamp } from "@/components/effects/Lamp";
import { TextGenerateEffect } from "@/components/effects/TextGenerateEffect";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { NetworkCanvas } from "@/components/effects/NetworkCanvas";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
            {/* Interactive Background */}
            <div className="absolute inset-0 z-0">
                <NetworkCanvas />
            </div>

            <Container className="relative z-10 pt-16 md:pt-20">
                <Lamp className="pt-24 md:pt-40">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
                        {/* Badge */}
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md mb-2 md:mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                    Disponible para nuevos proyectos
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Headline */}
                        <ScrollReveal delay={0.2}>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-main leading-[1] px-4">
                                Tecnología que <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-lavender to-accent-mint animate-gradient-x">
                                    Impulsa tu Éxito
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Description */}
                        <ScrollReveal delay={0.4}>
                            <div className="text-base md:text-xl text-sub max-w-3xl mx-auto leading-relaxed font-light px-4 tracking-tight">
                                <TextGenerateEffect
                                    words="Somos el brazo tecnológico que convierte ideas en realidades de alto impacto, acompañando cada etapa de tu vuelo empresarial con ingeniería impecable."
                                    className="text-inherit"
                                />
                            </div>
                        </ScrollReveal>

                        {/* CTA Buttons */}
                        <ScrollReveal delay={0.6}>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                                <Button
                                    size="lg"
                                    onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                    className="bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/20 border-0"
                                >
                                    Explorar Servicios
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="border-black/5 text-main hover:bg-black/5 bg-white/50 backdrop-blur-sm"
                                >
                                    Agendar Reunión
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </Lamp>
            </Container>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-300 to-transparent opacity-50"></div>
            </div>
        </section>
    );
};
