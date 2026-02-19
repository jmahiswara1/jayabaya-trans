"use client";

/**
 * CarCard molecule
 * Displays a single car in grid/list format
 * Features: photo, name, badges, capacity, price, detail + compare buttons
 * Used in catalog grid, featured section, and related cars
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, GitCompareArrows } from "lucide-react";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cardItem, imageHover } from "@/lib/animations";
import { formatCurrency } from "@/lib/utils";
import type { Car } from "@/data/cars";

interface CarCardProps {
    car: Car;
    onCompare?: (car: Car) => void;
    isCompared?: boolean;
}

export default function CarCard({ car, onCompare, isCompared }: CarCardProps) {
    return (
        <motion.div
            variants={cardItem}
            className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col"
        >
            {/* Car Image */}
            <Link href={`/catalog/${car.slug}`} className="block relative overflow-hidden aspect-[4/3]">
                <motion.div whileHover={imageHover} className="w-full h-full">
                    <Image
                        src={car.images[0]}
                        alt={`${car.name} - ${car.type} ${car.transmission}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </motion.div>
                {/* Type Badge overlay */}
                <div className="absolute top-3 right-3">
                    <Badge variant="type">{car.type}</Badge>
                </div>
            </Link>

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Name & Badges */}
                <div className="mb-3">
                    <Link href={`/catalog/${car.slug}`}>
                        <h3 className="text-lg font-bold font-heading text-charcoal hover:text-primary transition-colors">
                            {car.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant="transmission">{car.transmission}</Badge>
                        <Badge variant="fuel">{car.fuel}</Badge>
                    </div>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-1.5 text-sm text-muted mb-3">
                    <Users className="w-4 h-4" />
                    <span>{car.capacity} Kursi</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-3">
                        <div>
                            <span className="text-xs text-muted">Mulai dari</span>
                            <p className="text-xl font-bold font-heading text-primary">
                                {formatCurrency(car.pricePerDay)}
                            </p>
                        </div>
                        <span className="text-xs text-muted">/hari</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {onCompare && (
                            <Button
                                variant={isCompared ? "primary" : "outline"}
                                size="sm"
                                onClick={() => onCompare(car)}
                                className="flex-1"
                                leftIcon={<GitCompareArrows className="w-4 h-4" />}
                            >
                                {isCompared ? "Dipilih" : "Bandingkan"}
                            </Button>
                        )}
                        <Link href={`/catalog/${car.slug}`} className="flex-1">
                            <Button
                                variant="primary"
                                size="sm"
                                fullWidth
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                Detail
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export type { CarCardProps };
