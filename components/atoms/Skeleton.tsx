/**
 * Skeleton atom component
 * Loading placeholder for content that is being fetched
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string;
    height?: string;
}

export default function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
}: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-gray-200",
                variant === "circular" && "rounded-full",
                variant === "text" && "rounded h-4",
                variant === "rectangular" && "rounded-2xl",
                className
            )}
            style={{ width, height }}
        />
    );
}

export type { SkeletonProps };
