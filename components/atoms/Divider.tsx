/**
 * Divider atom component
 * Horizontal line separator with optional label
 */

import { cn } from "@/lib/utils";

interface DividerProps {
    label?: string;
    className?: string;
}

export default function Divider({ label, className }: DividerProps) {
    if (label) {
        return (
            <div className={cn("flex items-center gap-4", className)}>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-muted font-body">{label}</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>
        );
    }

    return <hr className={cn("border-gray-200", className)} />;
}

export type { DividerProps };
