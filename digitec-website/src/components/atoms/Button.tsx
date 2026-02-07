"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    as?: React.ElementType;
    href?: string;
}

export const Button = ({
    children,
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    as,
    ...props
}: ButtonProps) => {
    const Component = as || motion.button;

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 border border-transparent",
        secondary: "bg-[#F1F5F9] text-[#1E293B] hover:bg-slate-200 shadow-sm border border-black/5",
        outline: "border border-black/10 text-[#475569] hover:bg-black/5 hover:text-[#1E293B] backdrop-blur-sm",
        ghost: "text-[#475569] hover:text-[#1E293B] hover:bg-black/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-3.5 text-lg font-medium",
    };

    return (
        <Component
            className={cn(
                "relative overflow-hidden rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
                variants[variant],
                sizes[size],
                className
            )}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {!isLoading && leftIcon}
            {children}
            {!isLoading && rightIcon}

            {/* Subtle Shine Effect for Primary */}
            {variant === "primary" && (
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
            )}
        </Component>
    );
};
