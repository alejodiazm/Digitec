"use client";

import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { COMPANY_INFO, ROUTES } from "@/constants";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-[#F1F5F9] border-t border-black/5 pt-12 md:pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                        <Logo />
                        <p className="text-sub max-w-sm mt-4 leading-relaxed font-light">
                            {COMPANY_INFO.tagline}. Transformamos negocios a través de soluciones tecnológicas robustas y diseño estratégico.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <Link href={COMPANY_INFO.social.linkedin} target="_blank" className="p-2 rounded-full bg-white border border-black/10 text-sub hover:text-primary hover:border-primary transition-colors shadow-sm">
                                <Linkedin size={20} />
                            </Link>
                            <Link href={COMPANY_INFO.social.instagram} target="_blank" className="p-2 rounded-full bg-white border border-black/10 text-sub hover:text-primary hover:border-primary transition-colors shadow-sm">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-main mb-4 md:mb-6 font-heading">Enlaces</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Inicio", href: ROUTES.HOME },
                                { name: "Nosotros", href: ROUTES.ABOUT },
                                { name: "Servicios", href: ROUTES.SERVICES },
                                { name: "Contacto", href: ROUTES.CONTACT },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-sub font-light hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-main mb-4 md:mb-6 font-heading">Contacto</h3>
                        <ul className="space-y-4">
                            <li>
                                <span className="block text-sm text-mute font-bold mb-1 uppercase tracking-wider">Email</span>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-sub font-light hover:text-primary transition-colors">
                                    {COMPANY_INFO.email}
                                </a>
                            </li>
                            <li>
                                <span className="block text-sm text-mute font-bold mb-1 uppercase tracking-wider">WhatsApp</span>
                                <a href={COMPANY_INFO.whatsapp.link} target="_blank" className="text-sub font-light hover:text-primary transition-colors">
                                    {COMPANY_INFO.whatsapp.number}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left text-xs md:text-sm text-mute">
                    <p>© {COMPANY_INFO.year} {COMPANY_INFO.name}. Todos los derechos reservados.</p>
                    <div className="flex gap-4 md:gap-6 font-light">
                        <Link href="#" className="hover:text-primary">Política de Privacidad</Link>
                        <Link href="#" className="hover:text-primary">Términos y Condiciones</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
