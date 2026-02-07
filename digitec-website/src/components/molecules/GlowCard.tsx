"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlowCard = ({ children, className }: GlowCardProps) => {
    return (
        <motion.div
            className={cn(
                "relative rounded-xl border border-black/5 bg-white/80 p-6 backdrop-blur-sm transition-colors hover:border-black/10 hover:bg-white/95 group overflow-hidden shadow-sm",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
