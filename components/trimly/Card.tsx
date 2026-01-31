import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = "md", className = "", ...props }, ref) => {
    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={`bg-card rounded-[16px] shadow-soft ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
