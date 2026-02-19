"use client";

/**
 * SortDropdown molecule
 * Sorting options for catalog page: price asc/desc, newest, popular
 */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/lib/constants";

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export default function SortDropdown({
    value,
    onChange,
    className,
}: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
        SORT_OPTIONS.find((opt) => opt.value === value)?.label || "Urutkan";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium font-body",
                    "bg-white border border-gray-200 rounded-lg",
                    "hover:border-primary hover:text-primary transition-colors",
                    isOpen && "border-primary text-primary"
                )}
            >
                <ArrowUpDown className="w-4 h-4" />
                <span>{selectedLabel}</span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-floating z-50 py-1">
                    {SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full text-left px-4 py-2 text-sm font-body transition-colors",
                                value === option.value
                                    ? "bg-primary/5 text-primary font-medium"
                                    : "text-charcoal hover:bg-surface"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export type { SortDropdownProps };
