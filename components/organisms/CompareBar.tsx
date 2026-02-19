"use client";

/**
 * CompareBar organism
 * Sticky bottom bar that appears when user selects cars to compare
 * - Slides up from bottom via animation
 * - Shows selected cars with remove buttons
 * - "Bandingkan" CTA links to /compare
 * - Shows "full" indicator when 3 cars selected
 */

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompareArrows, ArrowRight } from "lucide-react";
import Button from "@/components/atoms/Button";
import { compareBarSlide } from "@/lib/animations";
import { useCompareStore, MAX_COMPARE } from "@/lib/compareStore";

export default function CompareBar() {
    const { cars, removeCar, clearAll } = useCompareStore();
    const isVisible = cars.length > 0;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="compare-bar"
                    initial={compareBarSlide.initial}
                    animate={compareBarSlide.animate}
                    exit={compareBarSlide.exit}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-floating"
                >
                    <div className="container-main py-3">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            {/* Left: Selected Cars */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-charcoal font-body shrink-0">
                                    <GitCompareArrows className="w-4 h-4 text-primary" />
                                    <span>
                                        {cars.length}/{MAX_COMPARE} dipilih
                                    </span>
                                </div>

                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="flex items-center gap-2 bg-surface rounded-lg px-2.5 py-1.5 pr-1.5"
                                    >
                                        <div className="w-8 h-8 relative rounded overflow-hidden shrink-0">
                                            <Image
                                                src={car.images[0]}
                                                alt={car.name}
                                                fill
                                                className="object-cover"
                                                sizes="32px"
                                            />
                                        </div>
                                        <span className="text-xs font-medium font-body text-charcoal max-w-[80px] truncate">
                                            {car.name}
                                        </span>
                                        <button
                                            onClick={() => removeCar(car.id)}
                                            className="p-1 rounded-full hover:bg-gray-200 text-muted hover:text-charcoal transition-colors ml-1"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {/* Empty slots */}
                                {Array.from({ length: MAX_COMPARE - cars.length }, (_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="w-12 h-10 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
                                    >
                                        <span className="text-xs text-muted">+</span>
                                    </div>
                                ))}
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={clearAll}
                                    className="text-sm text-muted hover:text-charcoal font-body transition-colors"
                                >
                                    Hapus Semua
                                </button>
                                <Link href="/compare">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        pill
                                        disabled={cars.length < 2}
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                    >
                                        Bandingkan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
