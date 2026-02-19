/**
 * Select atom component
 * Dropdown select with label and error state
 */

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, className, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium font-body text-charcoal"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            "w-full px-4 py-2.5 text-sm font-body text-charcoal bg-white border border-gray-200 rounded-lg",
                            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                            "transition-colors duration-200 appearance-none pr-10",
                            error && "border-red-500 focus:ring-red-200 focus:border-red-500",
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                </div>
                {error && (
                    <p className="text-xs text-red-500 font-body">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
export type { SelectProps, SelectOption };
