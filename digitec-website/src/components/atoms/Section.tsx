"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
    noPadding?: boolean;
}

export const Section = ({ id, className, children, noPadding = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={cn(
                "relative w-full overflow-hidden",
                !noPadding && "py-20 md:py-24",
                className
            )}
        >
            {children}
        </section>
    );
};
