"use client";

import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

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
        <section className="py-24 bg-[#0B1121] border-b border-white/5">
            <Container>
                {/* Trusted By Logos */}
                <div className="mb-20">
                    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        Empresas que confían en nosotros
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for logos - In real app, use Image component */}
                        {clients.map((client, idx) => (
                            <div key={idx} className="text-xl font-bold text-slate-400 hover:text-white transition-colors cursor-default">
                                {client.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="bg-[#151F32] p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors h-full flex flex-col">
                                <div className="mb-6 text-primary text-4xl font-serif">&quot;</div>
                                <p className="text-slate-300 text-lg leading-relaxed flex-grow mb-6 italic">
                                    {item.quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                        {item.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{item.author}</div>
                                        <div className="text-slate-500 text-sm">{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};
