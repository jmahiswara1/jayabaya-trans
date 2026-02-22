/**
 * Badge atom component
 * Used for car type, transmission, fuel labels on CarCard and detail pages
 * Variants: type | transmission | fuel | default
 */

import { cn } from "@/lib/utils";

type BadgeVariant = "type" | "transmission" | "fuel" | "driver" | "default";

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    type: "bg-primary/10 text-primary border-primary/20",
    transmission: "bg-blue-50 text-blue-700 border-blue-200",
    fuel: "bg-green-50 text-green-700 border-green-200",
    driver: "bg-yellow-50 text-yellow-700 border-yellow-200",
    default: "bg-surface text-muted border-gray-200",
};

export default function Badge({
    variant = "default",
    children,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 text-xs font-medium font-body rounded-full border",
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

export type { BadgeProps, BadgeVariant };
