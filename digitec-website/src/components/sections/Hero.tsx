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
        <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
            {/* Interactive Background */}
            <div className="absolute inset-0 z-0">
                <NetworkCanvas />
            </div>

            <Container className="relative z-10 pt-20 md:pt-32">
                <Lamp className="pt-8 md:pt-16">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                        {/* Badge */}
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                                    Disponible para nuevos proyectos
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Headline */}
                        <ScrollReveal delay={0.2}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E293B] leading-[1.1]">
                                Transformamos ideas en <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-lavender to-accent-mint animate-gradient-x">
                                    Ecosistemas Digitales
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Description */}
                        <ScrollReveal delay={0.4}>
                            <div className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-medium">
                                <TextGenerateEffect
                                    words="Agencia de desarrollo de software de alto rendimiento. Creamos experiencias web, móviles y cloud que definen el futuro de tu industria."
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
                                    className="border-black/5 text-[#1E293B] hover:bg-black/5 bg-white/50 backdrop-blur-sm"
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
