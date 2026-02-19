"use client";

/**
 * SectionTitle molecule
 * Consistent heading pattern for all page sections
 * Includes subtitle, alignment options, and scroll reveal animation
 */

import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    label?: string;
    align?: "left" | "center";
    className?: string;
}

export default function SectionTitle({
    title,
    subtitle,
    label,
    align = "center",
    className,
}: SectionTitleProps) {
    return (
        <motion.div
            {...scrollReveal}
            className={cn(
                "space-y-3 mb-12",
                align === "center" && "text-center",
                className
            )}
        >
            {label && (
                <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider font-body">
                    {label}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted font-body max-w-2xl mx-auto text-base md:text-lg">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

export type { SectionTitleProps };
