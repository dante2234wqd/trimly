"use client";

import { Home, Calendar, ShoppingBag, User, Plus } from "./Icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface FloatingBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  showFab?: boolean;
  onFabClick?: () => void;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "shop", label: "Shop", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
];

export function FloatingBottomNav({
  activeTab,
  onTabChange,
  showFab = true,
  onFabClick,
}: FloatingBottomNavProps) {
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="relative mx-auto max-w-md">
        {/* Center FAB */}
        {showFab && (
          <button
            onClick={onFabClick}
            className="absolute left-1/2 -translate-x-1/2 -top-6 z-10 w-14 h-14 rounded-full bg-[#FEC93B] shadow-lg flex items-center justify-center transition-transform duration-200 active:scale-95 hover:shadow-xl"
            aria-label="Book appointment"
          >
            <Plus size={24} className="text-[#1A0041]" />
          </button>
        )}

        {/* Nav Bar */}
        <div className="bg-white rounded-full shadow-[0_4px_24px_rgba(26,0,65,0.12)] px-3 py-2">
          <div className="flex items-center justify-between">
            {/* Left Items */}
            <div className="flex items-center gap-1">
              {leftItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition-all duration-200 min-w-[60px] ${
                      isActive
                        ? "text-[#4905AC]"
                        : "text-[#9CA3AF] hover:text-[#6B7280]"
                    }`}
                  >
                    <Icon size={22} />
                    <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center spacer for FAB */}
            {showFab && <div className="w-14" />}

            {/* Right Items */}
            <div className="flex items-center gap-1">
              {rightItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition-all duration-200 min-w-[60px] ${
                      isActive
                        ? "text-[#4905AC]"
                        : "text-[#9CA3AF] hover:text-[#6B7280]"
                    }`}
                  >
                    <Icon size={22} />
                    <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
