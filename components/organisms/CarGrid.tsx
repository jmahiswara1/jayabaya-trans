"use client";

/**
 * CarGrid organism
 * Responsive grid of CarCards with:
 * - Stagger container animation via Framer Motion
 * - Empty state when no results match filters
 * - Skeleton loading state
 * - Compare integration via useCompareStore
 */

import { motion } from "framer-motion";
import { Car as CarIcon } from "lucide-react";
import CarCard from "@/components/molecules/CarCard";
import Skeleton from "@/components/atoms/Skeleton";
import { cardContainer } from "@/lib/animations";
import { useCompareStore } from "@/lib/compareStore";
import type { Car } from "@/data/cars";

interface CarGridProps {
    cars: Car[];
    isLoading?: boolean;
    skeletonCount?: number;
}

function CarCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <Skeleton className="aspect-[4/3] rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton variant="text" className="w-3/4 h-5" />
                <div className="flex gap-2">
                    <Skeleton variant="text" className="w-16 h-5" />
                    <Skeleton variant="text" className="w-16 h-5" />
                </div>
                <Skeleton variant="text" className="w-1/2 h-4" />
                <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <Skeleton className="h-9 flex-1 rounded-lg" />
                    <Skeleton className="h-9 flex-1 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default function CarGrid({
    cars,
    isLoading = false,
    skeletonCount = 6,
}: CarGridProps) {
    const { toggleCar, isCompared, isFull } = useCompareStore();

    const handleCompare = (car: Car) => {
        if (!isCompared(car.id) && isFull()) return;
        toggleCar(car);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: skeletonCount }, (_, i) => (
                    <CarCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (cars.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4">
                    <CarIcon className="w-10 h-10 text-muted" />
                </div>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-2">
                    Tidak ada hasil
                </h3>
                <p className="text-muted font-body max-w-sm">
                    Tidak ada mobil yang cocok dengan filter yang dipilih. Coba ubah filter atau reset pencarian.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            variants={cardContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {cars.map((car) => (
                <CarCard
                    key={car.id}
                    car={car}
                    onCompare={handleCompare}
                    isCompared={isCompared(car.id)}
                />
            ))}
        </motion.div>
    );
}
