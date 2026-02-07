"use client";

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

// Hook specifically for parallax effects
export const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 1], [-distance, distance]);
};

// Hook to ease scroll progress for smoother animations
export const useScrollAnimation = (stiffness = 100, damping = 30) => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness,
        damping,
        restDelta: 0.001
    });

    return smoothProgress;
};

// Hook for scroll fade-in reveals
export const useScrollReveal = (threshold = 0.2) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`0 ${1 - threshold}`, "1 1"]
    });

    return { ref, scrollYProgress };
};
