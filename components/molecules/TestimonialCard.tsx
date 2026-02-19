"use client";

/**
 * TestimonialCard molecule
 * Displays a single customer testimonial with name, rating, and review text
 */

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
    name: string;
    rating: number;
    text: string;
    role?: string;
    className?: string;
}

export default function TestimonialCard({
    name,
    rating,
    text,
    role,
    className,
}: TestimonialCardProps) {
    return (
        <motion.div
            variants={cardItem}
            className={cn(
                "bg-white rounded-2xl shadow-card p-6 flex flex-col",
                className
            )}
        >
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            "w-4 h-4",
                            i < rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                        )}
                    />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-charcoal font-body leading-relaxed flex-1 mb-4">
                &quot;{text}&quot;
            </p>

            {/* Author */}
            <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold font-heading text-charcoal">
                    {name}
                </p>
                {role && (
                    <p className="text-xs text-muted font-body mt-0.5">{role}</p>
                )}
            </div>
        </motion.div>
    );
}

export type { TestimonialCardProps };
