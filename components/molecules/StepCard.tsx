"use client";

/**
 * StepCard molecule
 * Numbered step card used in "How To Rent" section
 * Features: step number, icon, title, and description
 */

import { motion } from "framer-motion";
import { cardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}

export default function StepCard({
    stepNumber,
    title,
    description,
    icon,
    className,
}: StepCardProps) {
    return (
        <motion.div
            variants={cardItem}
            className={cn(
                "relative bg-white rounded-2xl shadow-card p-6 text-center group hover:shadow-card-hover transition-shadow",
                className
            )}
        >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center font-heading shadow-sm">
                {stepNumber}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 mx-auto mt-4 mb-4 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold font-heading text-charcoal mb-2">
                {title}
            </h3>
            <p className="text-sm text-muted font-body leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

export type { StepCardProps };
