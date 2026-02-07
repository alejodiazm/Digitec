"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    label?: string;
}

export const AnimatedCounter = ({
    value,
    duration = 2,
    prefix = "",
    suffix = "",
    className,
    label
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const displayValue = useTransform(springValue, (current) =>
        Math.round(current).toString()
    );

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return (
        <div className={cn("flex flex-col items-center", className)}>
            <div className="flex items-baseline font-bold text-4xl md:text-5xl text-primary">
                {prefix && <span className="mr-1">{prefix}</span>}
                <motion.span ref={ref}>{displayValue}</motion.span>
                {suffix && <span className="ml-1">{suffix}</span>}
            </div>
            {label && (
                <span className="text-sm md:text-base text-neutral-600 mt-2 font-medium uppercase tracking-wider">
                    {label}
                </span>
            )}
        </div>
    );
};
