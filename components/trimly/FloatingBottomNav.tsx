"use client";

import { Home, Calendar, ShoppingBag, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface FloatingBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "shop", label: "Shop", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
];

export function FloatingBottomNav({ activeTab, onTabChange }: FloatingBottomNavProps) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-card rounded-[24px] shadow-soft-lg px-2 py-2 mx-auto max-w-md">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all duration-200 min-w-[64px] ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
