import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "success" | "muted";
  size?: "sm" | "md";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", size = "sm", className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";

    const variants = {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
      success: "bg-success/10 text-success",
      muted: "bg-muted text-muted-foreground",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
