"use client";

import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import NextImage from "next/image";

import { cn } from "@/lib/utils";

interface AboutProps {
    className?: string;
}

export const About = ({ className }: AboutProps) => {
    return (
        <section id="nosotros" className={cn("py-32 bg-[#F1F5F9] relative overflow-hidden", className)}>
            {/* Subtle Butterfly Watermark */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.01] pointer-events-none grayscale select-none">
                <NextImage
                    src="/images/Mariposa.png"
                    alt="Metamorphosis Watermark"
                    fill
                    className="object-contain"
                />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <ScrollReveal>
                            <h2 className="text-sm font-semibold text-primary-light mb-6 tracking-widest uppercase">
                                Nuestra Esencia
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                                Lo que somos y hacemos
                            </h3>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                <span className="text-white font-bold">¿Qué es DIGITEC?</span> Somos un estudio de metamorfosis digital. Vemos los negocios no como estructuras estáticas, sino como organismos vivos que tienen el potencial de cambiar, mejorar y alcanzar nuevas alturas.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                Nos especializamos en tomar esa idea que hoy tienes en mente y darle las alas necesarias para que se convierta en una realidad sólida, ágil y visualmente impactante.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="relative h-[400px] flex items-center justify-center">
                        {/* Abstract Visual - Glowing lines representing code/structure */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px]" />

                        {/* Integrated Butterfly Icon */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
                            <NextImage
                                src="/images/Mariposa.png"
                                alt="Butterfly Accent"
                                fill
                                className="object-contain rotate-12"
                            />
                        </div>

                        <div className="relative z-10 p-8 border border-black/5 bg-white/80 backdrop-blur-md rounded-2xl w-full max-w-sm ml-auto rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl shadow-black/5">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                                <div className="w-3 h-3 rounded-full bg-green-400/50" />
                            </div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="h-2 w-3/4 bg-slate-200 rounded" />
                                <div className="h-2 w-1/2 bg-slate-200 rounded" />
                                <div className="h-2 w-full bg-slate-200 rounded" />
                                <div className="h-2 w-2/3 bg-slate-200 rounded" />
                            </div>
                            <div className="mt-6 flex justify-between items-end">
                                <div className="h-8 w-8 relative overflow-hidden rounded bg-slate-100 p-1">
                                    <NextImage
                                        src="/images/Isotipo_Digitec.png"
                                        alt="Digitec Perfil"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <span className="text-xs text-slate-400 font-medium tracking-wider">Metamorphosis v.2.4.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
