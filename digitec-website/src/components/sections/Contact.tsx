"use client";

import { Container } from "@/components/atoms/Container";
import { ContactForm } from "@/components/molecules/ContactForm";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Mail, MapPin } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contacto" className="py-24 bg-[#F8FAFC] relative border-t border-black/5">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#1E293B] mb-6">
                                Inicia tu Proyecto
                            </h2>
                            <p className="text-[#475569] text-lg font-medium">
                                Cuéntanos sobre tus desafíos. Nosotros ponemos la tecnología.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-1 space-y-8">
                            <ScrollReveal delay={0.1}>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-[#1E293B] font-semibold mb-2 flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-primary" /> Email
                                        </h3>
                                        <p className="text-[#475569] font-medium">contacto@digitec.global</p>
                                    </div>
                                    <div>
                                        <h3 className="text-[#1E293B] font-semibold mb-2 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-primary" /> Ubicación
                                        </h3>
                                        <p className="text-[#475569] font-medium">Bogotá, Colombia</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="md:col-span-2">
                            <ScrollReveal delay={0.2}>
                                <ContactForm />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
