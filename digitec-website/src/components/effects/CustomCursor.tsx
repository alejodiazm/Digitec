"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Smooth spring animation for the cursor follower
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setClicked(true);
        const handleMouseUp = () => setClicked(false);

        // Check if hovering over clickable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("clickable")
            ) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Hide cursor on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-4 h-4 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center",
                !isVisible && "opacity-0"
            )}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%", // Center the div on the cursor
                y: "-50%",
            }}
        >
            {/* Inner Dot */}
            <motion.div
                className="w-1 h-1 bg-primary rounded-full"
                animate={{
                    scale: clicked ? 0.5 : hovered ? 0 : 1,
                }}
            />

            {/* Outer Ring Animation */}
            <motion.div
                className="absolute inset-0 rounded-full border border-primary opacity-50"
                animate={{
                    scale: clicked ? 0.8 : hovered ? 2.5 : 1,
                    opacity: hovered ? 0.8 : 0.5,
                    backgroundColor: hovered ? "rgba(29, 79, 140, 0.1)" : "transparent"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </motion.div>
    );
};
