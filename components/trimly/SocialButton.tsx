"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  provider: string;
}

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, provider, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          w-full flex items-center justify-center gap-3
          bg-card text-foreground
          border border-border rounded-[16px]
          py-4 px-6
          font-medium
          shadow-soft
          hover:bg-muted/50 active:scale-[0.98]
          transition-all duration-200
          ${className}
        `}
        {...props}
      >
        {icon}
        <span>Continue with {provider}</span>
      </button>
    );
  }
);

SocialButton.displayName = "SocialButton";
