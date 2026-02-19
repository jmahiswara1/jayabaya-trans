"use client";

/**
 * CompareProvider — Zustand store for car comparison feature
 * Max 3 cars can be compared at once
 * Persisted in sessionStorage so compare survives page navigation
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Car } from "@/data/cars";

const MAX_COMPARE = 3;

interface CompareStore {
    cars: Car[];
    addCar: (car: Car) => void;
    removeCar: (carId: string) => void;
    toggleCar: (car: Car) => void;
    clearAll: () => void;
    isCompared: (carId: string) => boolean;
    isFull: () => boolean;
}

export const useCompareStore = create<CompareStore>()(
    persist(
        (set, get) => ({
            cars: [],

            addCar: (car) => {
                const { cars } = get();
                if (cars.length >= MAX_COMPARE) return;
                if (cars.find((c) => c.id === car.id)) return;
                set({ cars: [...cars, car] });
            },

            removeCar: (carId) => {
                set({ cars: get().cars.filter((c) => c.id !== carId) });
            },

            toggleCar: (car) => {
                const { cars, addCar, removeCar } = get();
                if (cars.find((c) => c.id === car.id)) {
                    removeCar(car.id);
                } else {
                    addCar(car);
                }
            },

            clearAll: () => set({ cars: [] }),

            isCompared: (carId) => !!get().cars.find((c) => c.id === carId),

            isFull: () => get().cars.length >= MAX_COMPARE,
        }),
        {
            name: "jayabaya-compare",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export { MAX_COMPARE };
