"use client";

import { ReactNode } from "react";
import { Badge } from "./Badge";

interface AvatarRowProps {
  name: string;
  subtitle?: string;
  avatarUrl?: string;
  initials?: string;
  badge?: string;
  badgeVariant?: "default" | "primary" | "accent" | "success" | "muted";
  rightContent?: ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function AvatarRow({
  name,
  subtitle,
  avatarUrl,
  initials,
  badge,
  badgeVariant = "accent",
  rightContent,
  onClick,
  size = "md",
}: AvatarRowProps) {
  const Component = onClick ? "button" : "div";

  const sizes = {
    sm: { avatar: "w-8 h-8 text-xs", text: "text-sm" },
    md: { avatar: "w-12 h-12 text-sm", text: "text-base" },
    lg: { avatar: "w-16 h-16 text-lg", text: "text-lg" },
  };

  return (
    <Component
      onClick={onClick}
      className={`flex items-center gap-4 w-full text-left ${
        onClick
          ? "hover:bg-muted/50 active:bg-muted transition-colors cursor-pointer p-3 rounded-[12px]"
          : ""
      }`}
    >
      <div
        className={`${sizes[size].avatar} rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0`}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-semibold text-primary">
            {initials || name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`${sizes[size].text} font-medium text-foreground truncate`}>
            {name}
          </p>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
    </Component>
  );
}
