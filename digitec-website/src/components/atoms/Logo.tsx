"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
    variant?: "default" | "white" | "icon";
    className?: string;
}

export const Logo = ({ variant = "default", className }: LogoProps) => {
    const isIcon = variant === "icon";

    // Reverting to the original image files as requested
    const src = isIcon ? "/images/Mariposa.png" : "/images/Logo_Oficial.png";

    return (
        <Link href="/" className={className} aria-label="Digitec Global SAS">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
            >
                <Image
                    src={src}
                    alt="Digitec Logo"
                    width={isIcon ? 40 : 150}
                    height={isIcon ? 50 : 50}
                    className={cn(
                        "object-contain",
                        variant === "white" && "brightness-0 invert"
                    )}
                    quality={100}
                    priority
                    style={{ imageRendering: 'auto' }}
                />
            </motion.div>
        </Link>
    );
};
