"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "glass" | "gradient";
    className?: string;
}

export const Card = ({
    children,
    variant = "default",
    className,
    ...props
}: CardProps) => {
    const variants = {
        default: "bg-white border border-neutral-100 shadow-sm",
        glass: "glass-panel shadow-lg",
        gradient: "bg-gradient-to-br from-white to-neutral-50 border border-primary/10 shadow-md",
    };

    return (
        <motion.div
            className={cn(
                "rounded-2xl p-6 relative overflow-hidden",
                variants[variant],
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Decorative gradient blob for some cards */}
            {variant === 'gradient' && (
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
            )}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
