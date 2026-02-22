"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionTitle from "@/components/molecules/SectionTitle";
import FilterBar, { FilterState } from "@/components/molecules/FilterBar";
import SearchBar from "@/components/molecules/SearchBar";
import SortDropdown from "@/components/molecules/SortDropdown";
import CarGrid from "@/components/organisms/CarGrid";
import CompareBar from "@/components/organisms/CompareBar";
import Button from "@/components/atoms/Button";
import Skeleton from "@/components/atoms/Skeleton";
import { cars, MAX_CAR_PRICE } from "@/data/cars";

type SortOption = "price-asc" | "price-desc" | "newest" | "popular";

function CatalogContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial state from URL
    const typesParam = searchParams.get("type");
    const initialFilters: FilterState = {
        type: typesParam ? typesParam.split(",") : [],
        transmission: searchParams.get("transmission") || "",
        capacity: searchParams.get("capacity") || "",
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 200000,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : MAX_CAR_PRICE,
    };

    const initialSearch = searchParams.get("q") || "";
    const initialSort = (searchParams.get("sort") as SortOption) || "popular";

    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [sortBy, setSortBy] = useState<SortOption>(initialSort);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsFiltering(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Update URL on state change
    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set("q", searchQuery);
        if (sortBy !== "popular") params.set("sort", sortBy);

        if (filters.type.length > 0) params.set("type", filters.type.join(","));
        if (filters.transmission) params.set("transmission", filters.transmission);
        if (filters.capacity) params.set("capacity", filters.capacity);
        if (filters.minPrice > 200000) params.set("minPrice", String(filters.minPrice));
        if (filters.maxPrice < MAX_CAR_PRICE) params.set("maxPrice", String(filters.maxPrice));

        router.replace(`/katalog?${params.toString()}`, { scroll: false });
    }, [filters, searchQuery, sortBy, router]);

    const handleResetFilters = () => {
        setFilters({
            type: [],
            transmission: "",
            capacity: "",
            minPrice: 200000,
            maxPrice: MAX_CAR_PRICE,
        });
        setSearchQuery("");
        setSortBy("popular");
    };

    // Filtering Logic
    const filteredCars = useMemo(() => {
        return cars
            .filter((car) => {
                // Search
                if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                // Type (Multi-choice)
                if (filters.type.length > 0 && !filters.type.includes(car.type)) {
                    return false;
                }
                // Transmission
                if (filters.transmission && car.transmission !== filters.transmission) {
                    return false;
                }
                // Capacity (>= selected)
                if (filters.capacity && car.capacity < Number(filters.capacity)) {
                    return false;
                }
                // Price Range
                if (car.pricePerDay < filters.minPrice || car.pricePerDay > filters.maxPrice) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "price-asc":
                        return a.pricePerDay - b.pricePerDay;
                    case "price-desc":
                        return b.pricePerDay - a.pricePerDay;
                    case "newest":
                        return b.year - a.year;
                    case "popular":
                    default:
                        // Featured first, then popular
                        if (a.featured && !b.featured) return -1;
                        if (!a.featured && b.featured) return 1;
                        if (a.popular && !b.popular) return -1;
                        if (!a.popular && b.popular) return 1;
                        return 0;
                }
            });
    }, [filters, searchQuery, sortBy]);

    return (
        <div className="container-main py-8 md:py-12">
            <SectionTitle
                label="Katalog"
                title="Pilih Mobil Impian Anda"
                subtitle="Temukan mobil yang tepat untuk kebutuhan perjalanan Anda di Jayabaya Trans."
            />

            <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start relative">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full flex gap-3">
                    <Button
                        variant="outline"
                        leftIcon={<Filter className="w-4 h-4" />}
                        onClick={() => setIsMobileFilterOpen(true)}
                        fullWidth
                        className="justify-center"
                    >
                        Filter Mobil
                    </Button>
                    <div className="flex-1">
                        <SortDropdown value={sortBy} onChange={(val) => setSortBy(val as SortOption)} />
                    </div>
                </div>

                {/* Sidebar Filter (Desktop) */}
                <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
                    <FilterBar
                        filters={filters}
                        onFilterChange={setFilters}
                        onReset={handleResetFilters}
                    />
                </aside>

                {/* Mobile Filter Drawer */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="font-heading font-bold text-lg">Filter Mobil</h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 hover:bg-surface rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <FilterBar
                                filters={filters}
                                onFilterChange={setFilters}
                                onReset={handleResetFilters}
                            />
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <Button onClick={() => setIsMobileFilterOpen(false)} fullWidth>
                                Terapkan Filter
                            </Button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>
                        <div className="hidden lg:block w-48 shrink-0">
                            <SortDropdown value={sortBy} onChange={(val) => setSortBy(val as SortOption)} />
                        </div>
                    </div>

                    <CarGrid cars={filteredCars} isLoading={isFiltering} />
                </div>
            </div>

            <CompareBar />
        </div>
    );
}

function CatalogLoader() {
    return (
        <div className="container-main py-12">
            <div className="text-center mb-12">
                <Skeleton variant="text" className="w-32 h-6 mx-auto mb-4" />
                <Skeleton variant="text" className="w-64 h-10 mx-auto mb-4" />
                <Skeleton variant="text" className="w-96 h-6 mx-auto" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="hidden lg:block w-72 shrink-0">
                    <div className="space-y-6">
                        <Skeleton className="h-40 rounded-xl" />
                        <Skeleton className="h-40 rounded-xl" />
                        <Skeleton className="h-40 rounded-xl" />
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <Skeleton className="h-48 rounded-xl mb-4" />
                            <Skeleton variant="text" className="w-3/4 h-6 mb-2" />
                            <Skeleton variant="text" className="w-1/2 h-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <PageLayout>
            <Suspense fallback={<CatalogLoader />}>
                <CatalogContent />
            </Suspense>
        </PageLayout>
    );
}
