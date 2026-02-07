"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TypewriterText = ({ text, className, delay = 0 }: TypewriterTextProps) => {
    // Split text into words to make it accessible and controllable
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * 0.04 },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h1
            className={cn("flex flex-wrap overflow-hidden", className)}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="mr-[0.2em] relative"
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
};
