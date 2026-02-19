"use client";

/**
 * Button atom component
 * Variants: primary | outline | ghost | danger
 * Sizes: sm | md | lg
 * Supports pill (rounded-full) and standard (rounded-lg) shapes
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover, buttonTap } from "@/lib/animations";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    pill?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm",
    outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost:
        "text-charcoal hover:bg-surface",
    danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-2.5 text-base gap-2",
    lg: "px-8 py-3 text-lg gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            pill = false,
            fullWidth = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            className,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                whileHover={disabled || isLoading ? undefined : buttonHover}
                whileTap={disabled || isLoading ? undefined : buttonTap}
                className={cn(
                    "inline-flex items-center justify-center font-semibold font-heading transition-colors duration-200",
                    variantStyles[variant],
                    sizeStyles[size],
                    pill ? "rounded-full" : "rounded-lg",
                    fullWidth && "w-full",
                    (disabled || isLoading) && "opacity-50 cursor-not-allowed",
                    className
                )}
                disabled={disabled || isLoading}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                    </>
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
