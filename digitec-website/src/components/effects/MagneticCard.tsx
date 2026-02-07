"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticCardProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How much the card follows the mouse
}

export const MagneticCard = ({ children, className, strength = 20 }: MagneticCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 };

        // Calculate distance from center normalized (-1 to 1)
        const distanceX = (clientX - center.x) / (width / 2);
        const distanceY = (clientY - center.y) / (height / 2);

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Tilt effect based on mouse position
    const rotateX = useTransform(mouseY, [-strength, strength], [5, -5]);
    const rotateY = useTransform(mouseX, [-strength, strength], [-5, 5]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: mouseX,
                y: mouseY,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative perspective-1000", className)}
        >
            {children}
        </motion.div>
    );
};
