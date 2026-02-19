"use client";

/**
 * FAQItem molecule
 * Expandable accordion item for FAQ section
 * Uses Framer Motion for smooth expand/collapse animation
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { accordionContent } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
    defaultOpen?: boolean;
    className?: string;
}

export default function FAQItem({
    question,
    answer,
    defaultOpen = false,
    className,
}: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div
            className={cn(
                "border border-gray-200 rounded-xl overflow-hidden transition-colors",
                isOpen && "border-primary/30 bg-primary/5",
                className
            )}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left group"
            >
                <span className="text-base font-semibold font-heading text-charcoal pr-4 group-hover:text-primary transition-colors">
                    {question}
                </span>
                <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-surface group-hover:bg-primary/10 transition-colors">
                    {isOpen ? (
                        <Minus className="w-4 h-4 text-primary" />
                    ) : (
                        <Plus className="w-4 h-4 text-muted" />
                    )}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={accordionContent.initial}
                        animate={accordionContent.animate}
                        exit={accordionContent.exit}
                        className="overflow-hidden"
                    >
                        <div className="px-4 md:px-5 pb-4 md:pb-5">
                            <p className="text-sm text-muted font-body leading-relaxed">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export type { FAQItemProps };
