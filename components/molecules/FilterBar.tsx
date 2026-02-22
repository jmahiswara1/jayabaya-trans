"use client";

/**
 * FilterBar molecule
 * Sidebar filter for catalog page: type, transmission, capacity, price range
 * All filter values synced with URL params for shareable links
 */

import { useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAR_TYPES, TRANSMISSIONS, CAPACITY_OPTIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { MAX_CAR_PRICE } from "@/data/cars";

interface FilterState {
    type: string[];
    transmission: string;
    capacity: string;
    minPrice: number;
    maxPrice: number;
}

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onReset: () => void;
    className?: string;
}

const MIN_PRICE = 200000;
const MAX_PRICE = MAX_CAR_PRICE;
const PRICE_STEP = 50000;

export default function FilterBar({
    filters,
    onFilterChange,
    onReset,
    className,
}: FilterBarProps) {
    const updateFilter = useCallback(
        <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
            onFilterChange({ ...filters, [key]: value });
        },
        [filters, onFilterChange]
    );

    const hasActiveFilters =
        filters.type.length > 0 ||
        filters.transmission ||
        filters.capacity ||
        filters.minPrice > MIN_PRICE ||
        filters.maxPrice < MAX_PRICE;

    return (
        <aside className={cn("bg-white rounded-2xl shadow-card p-6 space-y-6", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading text-charcoal">Filter</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold font-body text-charcoal uppercase tracking-wide">
                    Tipe Kendaraan
                </h4>
                <div className="space-y-2">
                    {CAR_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.type.includes(type)}
                                onChange={() => {
                                    const newTypes = filters.type.includes(type)
                                        ? filters.type.filter((t) => t !== type)
                                        : [...filters.type, type];
                                    updateFilter("type", newTypes);
                                }}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                            />
                            <span className="text-sm font-body text-charcoal group-hover:text-primary transition-colors">
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission Filter */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold font-body text-charcoal uppercase tracking-wide">
                    Transmisi
                </h4>
                <div className="flex gap-2">
                    {TRANSMISSIONS.map((trans) => (
                        <button
                            key={trans}
                            onClick={() =>
                                updateFilter("transmission", filters.transmission === trans ? "" : trans)
                            }
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                                filters.transmission === trans
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-charcoal border-gray-200 hover:border-primary hover:text-primary"
                            )}
                        >
                            {trans}
                        </button>
                    ))}
                </div>
            </div>

            {/* Capacity Filter */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold font-body text-charcoal uppercase tracking-wide">
                    Kapasitas
                </h4>
                <div className="flex flex-wrap gap-2">
                    {CAPACITY_OPTIONS.map((cap) => (
                        <button
                            key={cap}
                            onClick={() =>
                                updateFilter("capacity", filters.capacity === String(cap) ? "" : String(cap))
                            }
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors",
                                filters.capacity === String(cap)
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-charcoal border-gray-200 hover:border-primary hover:text-primary"
                            )}
                        >
                            {cap === 14 ? "14+" : cap} Kursi
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold font-body text-charcoal uppercase tracking-wide">
                    Harga per Hari
                </h4>
                <div className="space-y-2">
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={PRICE_STEP}
                        value={filters.maxPrice}
                        onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
                        className="w-full accent-primary"
                    />
                    <div className="flex items-center justify-between text-xs text-muted font-body">
                        <span>{formatCurrency(MIN_PRICE)}</span>
                        <span className="font-semibold text-charcoal">
                            Maks: {formatCurrency(filters.maxPrice)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {filters.type.map((activeType) => (
                            <span key={activeType} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                {activeType}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter("type", filters.type.filter(t => t !== activeType))}
                                />
                            </span>
                        ))}
                        {filters.transmission && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                {filters.transmission}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter("transmission", "")}
                                />
                            </span>
                        )}
                        {filters.capacity && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                {filters.capacity === "14" ? "14+" : filters.capacity} Kursi
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter("capacity", "")}
                                />
                            </span>
                        )}
                    </div>
                </div>
            )}
        </aside>
    );
}

export type { FilterBarProps, FilterState };
