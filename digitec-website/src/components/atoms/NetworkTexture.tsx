"use client";

import { useId } from "react";

export const NetworkTexture = () => {
    const patternId = useId();

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
            <svg
                className="absolute inset-0 w-full h-full text-primary/5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={patternId}
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
    );
};
