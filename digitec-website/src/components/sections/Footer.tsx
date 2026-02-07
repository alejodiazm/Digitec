"use client";

import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { COMPANY_INFO, ROUTES } from "@/constants";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-100 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-neutral-500 max-w-sm mt-4 leading-relaxed">
                            {COMPANY_INFO.tagline}. Transformamos negocios a través de soluciones tecnológicas robustas y diseño estratégico.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <Link href={COMPANY_INFO.social.linkedin} target="_blank" className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:text-primary hover:border-primary transition-colors">
                                <Linkedin size={20} />
                            </Link>
                            <Link href={COMPANY_INFO.social.instagram} target="_blank" className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:text-primary hover:border-primary transition-colors">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-neutral-900 mb-6 font-heading">Enlaces</h3>
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
                                        className="text-neutral-600 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-neutral-900 mb-6 font-heading">Contacto</h3>
                        <ul className="space-y-4">
                            <li>
                                <span className="block text-sm text-neutral-400 mb-1">Email</span>
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-neutral-600 hover:text-primary transition-colors">
                                    {COMPANY_INFO.email}
                                </a>
                            </li>
                            <li>
                                <span className="block text-sm text-neutral-400 mb-1">WhatsApp</span>
                                <a href={COMPANY_INFO.whatsapp.link} target="_blank" className="text-neutral-600 hover:text-primary transition-colors">
                                    {COMPANY_INFO.whatsapp.number}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                    <p>© {COMPANY_INFO.year} {COMPANY_INFO.name}. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary">Política de Privacidad</Link>
                        <Link href="#" className="hover:text-primary">Términos y Condiciones</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
