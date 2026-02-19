"use client";

/**
 * StatCard molecule
 * Displays a single statistic with animated counter effect
 * Used in About page and trust indicators
 */

import { motion } from "framer-motion";
import { cardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StatCardProps {
    value: string;
    label: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function StatCard({
    value,
    label,
    icon,
    className,
}: StatCardProps) {
    return (
        <motion.div
            variants={cardItem}
            className={cn(
                "bg-white rounded-2xl shadow-card p-6 text-center",
                className
            )}
        >
            {icon && (
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    {icon}
                </div>
            )}
            <p className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">
                {value}
            </p>
            <p className="text-sm text-muted font-body">{label}</p>
        </motion.div>
    );
}

export type { StatCardProps };
