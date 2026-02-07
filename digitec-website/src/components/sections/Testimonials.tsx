"use client";

import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { motion } from "framer-motion";

// Placeholder logos for social proof (using text for now if images aren't available, or simple SVGs)
const clients = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateX", logo: "IX" },
    { name: "FutureLabs", logo: "FL" },
    { name: "GlobalSystems", logo: "GS" },
    { name: "NextGen", logo: "NG" },
];

const testimonials = [
    {
        quote: "Digitec transformó completamente nuestra infraestructura legacy. La migración fue impecable y el rendimiento mejoró un 300%.",
        author: "Carlos Rodriguez",
        role: "CTO, FinTech Solutions",
    },
    {
        quote: "La calidad de su código y la atención al detalle en UX es algo que no habíamos visto en otras agencias.",
        author: "Ana Martínez",
        role: "Product Owner, E-commerce Latam",
    },
    {
        quote: "Entendieron nuestro modelo de negocio desde el día uno. Son verdaderos socios estratégicos.",
        author: "David Cohen",
        role: "CEO, Startup Ventures",
    },
];

export const Testimonials = () => {
    return (
        <section className="py-16 md:py-24 bg-[#F1F5F9] relative overflow-hidden border-b border-black/5">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: "radial-gradient(#3B82F6 1px, transparent 1px)",
                backgroundSize: "30px 30px"
            }} />

            <Container className="relative z-10">
                {/* Trusted By Logos - Infinite Marquee */}
                <div className="mb-16 md:mb-24">
                    <ScrollReveal>
                        <p className="text-center text-[10px] md:text-xs font-bold text-mute uppercase tracking-[0.2em] mb-8 md:mb-12">
                            Empresas que confían en nosotros
                        </p>
                    </ScrollReveal>

                    <div className="relative flex overflow-hidden py-6 md:py-10">
                        <motion.div
                            className="flex gap-12 md:gap-20 items-center whitespace-nowrap"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                duration: 25,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {[...clients, ...clients].map((client, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 text-xl md:text-2xl font-bold text-main/40 hover:text-primary transition-colors cursor-default grayscale hover:grayscale-0"
                                >
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white border border-black/5 flex items-center justify-center text-xs md:text-sm shadow-sm">
                                        {client.logo}
                                    </div>
                                    <span className="tracking-tighter font-black">{client.name}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Gradient Fades for Marquee */}
                        <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#F1F5F9] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#F1F5F9] to-transparent z-10" />
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                className="bg-white bg-primary/[0.05] p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-500 h-full flex flex-col shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_60px_120px_-25px_rgba(0,0,0,0.25)] group hover:-translate-y-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="mb-4 md:mb-6 text-primary/20 group-hover:text-primary transition-colors duration-500">
                                    <svg width="32" height="32" viewBox="0 0 40 40" fill="currentColor" className="md:w-10 md:h-10">
                                        <path d="M10 25h5v5h-5v-5zm0-10h5v5h-5v-5zM25 25h5v5h-5v-5zm0-10h5v5h-5v-5zM5 10c0-2.761 2.239-5 5-5h20c2.761 0 5 2.239 5 5v20c0 2.761-2.239 5-5 5H10c-2.761 0-5-2.239-5-5V10zm5 0v20h20V10H10z" fillOpacity="0.1" />
                                        <path d="M12 18h4v-4h-4v4zm0 8h4v-4h-4v4zm12-8h4v-4h-4v4zm0 8h4v-4h-4v4z" />
                                    </svg>
                                </div>

                                <p className="text-sub text-base md:text-lg leading-relaxed flex-grow mb-6 md:mb-8 font-semibold italic tracking-tight">
                                    &quot;{item.quote}&quot;
                                </p>

                                <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-black/5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent-lavender/10 flex items-center justify-center text-xs md:text-sm font-black text-primary shadow-inner">
                                        {item.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-main text-sm md:text-base font-black tracking-tight">{item.author}</div>
                                        <div className="text-mute text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{item.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};
