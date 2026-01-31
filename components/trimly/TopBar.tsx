"use client";

import { ReactNode } from "react";

interface TopBarProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export function TopBar({
  title,
  subtitle,
  leftAction,
  rightAction,
  transparent = false,
}: TopBarProps) {
  return (
    <header
      className={`sticky top-0 z-40 px-4 py-3 ${
        transparent ? "bg-transparent" : "bg-background"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-[48px]">
          {leftAction}
        </div>

        <div className="flex-1 text-center">
          {title && (
            <h1 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3 min-w-[48px] justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
