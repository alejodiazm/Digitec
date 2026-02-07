"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MorphingLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Simplified paths (conceptual) - In a real scenario, these would be precise vector paths
    const pathD = "M50 20 L50 80 Q100 80 100 50 Q100 20 50 20 Z";

    // Butterfly wings simplified
    const leftWing = "M50 50 C20 20 0 40 20 60 C0 80 20 100 50 80 Z";
    const rightWing = "M50 50 C80 20 100 40 80 60 C100 80 80 100 50 80 Z";

    return (
        <div
            className="relative w-32 h-32 md:w-48 md:h-48 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(58,141,255,0.5)]">
                {/* The 'D' Shape (DigiTec) */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: isHovered ? 0.3 : 1,
                        scale: isHovered ? 0.9 : 1,
                        x: isHovered ? -10 : 0
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Butterfly Left Wing (Hidden initially) */}
                <motion.path
                    d={leftWing}
                    fill="url(#gradient)"
                    initial={{ scale: 0, opacity: 0, originX: 1, originY: 0.5 }}
                    animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 0.8 : 0,
                        rotate: isHovered ? [0, -10, 0] : 0
                    }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                />

                {/* Butterfly Right Wing (Hidden initially) */}
                <motion.path
                    d={rightWing}
                    fill="url(#gradient)"
                    initial={{ scale: 0, opacity: 0, originX: 0, originY: 0.5 }}
                    animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 0.8 : 0,
                        rotate: isHovered ? [0, 10, 0] : 0
                    }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1D4F8C" />
                        <stop offset="50%" stopColor="#3A8DFF" />
                        <stop offset="100%" stopColor="#1A6ABF" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glow background */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse-slow" />
        </div>
    );
};
