"use client";

import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  hasBottomNav?: boolean;
}

export function AppShell({ children, hasBottomNav = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`max-w-md mx-auto ${hasBottomNav ? "pb-28" : "pb-8"}`}>
        {children}
      </div>
    </div>
  );
}
