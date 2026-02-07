"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: ROUTES.HOME },
        { name: "Nosotros", href: ROUTES.ABOUT },
        { name: "Servicios", href: ROUTES.SERVICES },
        { name: "Contacto", href: ROUTES.CONTACT },
    ];

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-white/70 backdrop-blur-md border-black/5" : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Logo variant="default" />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={cn(
                                    "text-sm font-medium transition-colors text-main hover:text-primary"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button
                            variant="primary"
                            size="sm"
                            className="border-0 shadow-sm transition-all bg-primary text-white hover:bg-primary-dark"
                            onClick={() => document.querySelector(ROUTES.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Cotizar
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 transition-colors text-main"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </Container>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white/90 backdrop-blur-xl border-b border-black/5 overflow-hidden shadow-2xl"
                    >
                        <Container className="py-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-xl font-bold tracking-wider text-main py-2 hover:text-primary transition-colors border-b border-black/[0.03] last:border-0 font-montserrat"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full border-0 shadow-xl bg-primary text-white hover:bg-primary-dark"
                                onClick={() => {
                                    document.querySelector(ROUTES.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Cotizar Ahora
                            </Button>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
