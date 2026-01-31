"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "font-semibold rounded-[16px] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-primary text-primary-foreground shadow-soft hover:opacity-90",
      secondary: "bg-card text-card-foreground border border-border shadow-soft hover:bg-muted",
      accent: "bg-accent text-accent-foreground shadow-soft hover:opacity-90",
      ghost: "bg-transparent text-foreground hover:bg-muted",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[36px]",
      md: "px-6 py-3 text-base min-h-[48px]",
      lg: "px-8 py-4 text-lg min-h-[56px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
