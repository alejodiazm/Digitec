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
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B1121]">
            {/* Interactive Background */}
            <div className="absolute inset-0 z-0">
                <NetworkCanvas />
            </div>

            <Container className="relative z-10 pt-20">
                <Lamp className="pt-40">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                        {/* Badge */}
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
                                    Disponible para nuevos proyectos
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Headline */}
                        <ScrollReveal delay={0.2}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                                Transformamos ideas en <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-indigo-brand to-cyan-brand animate-gradient-x">
                                    Ecosistemas Digitales
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Description */}
                        <ScrollReveal delay={0.4}>
                            <TextGenerateEffect
                                words="Agencia de desarrollo de software de alto rendimiento. Creamos experiencias web, móviles y cloud que definen el futuro de tu industria."
                                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal"
                            />
                        </ScrollReveal>

                        {/* CTA Buttons */}
                        <ScrollReveal delay={0.6}>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                                <Button
                                    size="lg"
                                    onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                    className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25 border-0"
                                >
                                    Explorar Servicios
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="border-white/10 text-white hover:bg-white/5"
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
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-50"></div>
            </div>
        </section>
    );
};
