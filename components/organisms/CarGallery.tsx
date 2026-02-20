"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";


interface CarGalleryProps {
    images: string[];
    name: string;
}

export default function CarGallery({ images, name }: CarGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface shadow-sm">
                {/* Background Grid */}
                <div
                    className="absolute inset-0 z-0 opacity-50"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px',
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent)'
                    }}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center p-8 z-10"
                    >
                        <Image
                            src={images[activeIndex]}
                            alt={`${name} - View ${activeIndex + 1}`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                            "relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200",
                            activeIndex === idx
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <div
                            className="absolute inset-0 z-0 opacity-30"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                                `,
                                backgroundSize: '12px 12px'
                            }}
                        />
                        <div className="absolute inset-0 p-2 z-10 flex items-center justify-center">
                            <Image
                                src={img}
                                alt={`${name} thumbnail ${idx + 1}`}
                                fill
                                className="object-contain drop-shadow-md"
                                sizes="20vw"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
