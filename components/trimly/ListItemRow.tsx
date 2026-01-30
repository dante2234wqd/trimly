"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ListItemRowProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightContent?: ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
}

export function ListItemRow({
  title,
  subtitle,
  leftIcon,
  rightContent,
  showArrow = false,
  onClick,
}: ListItemRowProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`flex items-center gap-4 w-full p-4 text-left ${
        onClick
          ? "hover:bg-muted/50 active:bg-muted transition-colors cursor-pointer"
          : ""
      }`}
    >
      {leftIcon && (
        <div className="flex-shrink-0 w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center text-primary">
          {leftIcon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-foreground truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}

      {showArrow && (
        <ChevronRight size={20} className="flex-shrink-0 text-muted-foreground" />
      )}
    </Component>
  );
}
