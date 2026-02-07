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
                    <Logo variant={isScrolled ? "default" : "white"} />

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
                                    "text-sm font-medium transition-colors",
                                    isScrolled ? "text-[#1E293B] hover:text-primary" : "text-white/80 hover:text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button
                            variant="primary"
                            size="sm"
                            className={cn(
                                "border-0 shadow-sm transition-all",
                                isScrolled
                                    ? "bg-primary text-white hover:bg-primary-dark"
                                    : "bg-white/10 hover:bg-white/20 text-white"
                            )}
                            onClick={() => document.querySelector(ROUTES.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Cotizar
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={cn(
                            "md:hidden p-2 transition-colors",
                            isScrolled ? "text-[#1E293B]" : "text-white"
                        )}
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-black/10 overflow-hidden"
                    >
                        <Container className="py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-[#1E293B] font-medium py-2 hover:text-primary block"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
