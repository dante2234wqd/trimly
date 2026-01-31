"use client";

import { useState } from "react";
import { AppShell, Card, Badge, PrimaryButton, FloatingBottomNav } from "@/components/trimly";
import { Star, Clock, MapPin, Calendar } from "@/components/trimly/Icons";

// Mock data
const upcomingBooking = {
  barber: "Marcus Johnson",
  service: "Haircut + Beard",
  date: "Today",
  time: "2:30 PM",
  location: "Downtown Studio",
};

const quickActions = [
  { id: 1, label: "Book Now", icon: Calendar },
  { id: 2, label: "My History", icon: Clock },
  { id: 3, label: "Favorites", icon: Star },
];

export default function NavDemoPage() {
  const [activeTab, setActiveTab] = useState("home");

  const handleFabClick = () => {
    // Navigate to booking
    window.location.href = "/booking";
  };

  return (
    <AppShell hasBottomNav>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">Alex Martinez</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">A</span>
          </div>
        </div>

        {/* VIP Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="md">VIP Member</Badge>
          <span className="text-sm text-muted-foreground">850 points</span>
        </div>
      </header>

      <main className="px-4 space-y-6 pb-8">
        {/* Upcoming Booking Card */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Upcoming Appointment
          </h2>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {upcomingBooking.barber.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{upcomingBooking.barber}</p>
                <p className="text-sm text-muted-foreground">{upcomingBooking.service}</p>
              </div>
              <Badge variant="success" size="sm">Confirmed</Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{upcomingBooking.date}, {upcomingBooking.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{upcomingBooking.location}</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="text-center cursor-pointer hover:shadow-soft-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <action.icon size={20} className="text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">
                  {action.label}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Promo Card */}
        <section>
          <Card className="bg-[#4905AC] text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
            
            <div className="relative z-10">
              <Badge variant="accent" size="sm" className="mb-3">Limited Offer</Badge>
              <h3 className="text-lg font-bold mb-2">Refer a Friend</h3>
              <p className="text-sm text-white/80 mb-4">
                Get 500 points when your friend books their first appointment
              </p>
              <PrimaryButton variant="accent" size="sm">
                Share Now
              </PrimaryButton>
            </div>
          </Card>
        </section>

        {/* Active Tab Content Preview */}
        <section>
          <Card className="text-center py-8">
            <p className="text-muted-foreground mb-2">Current Tab</p>
            <p className="text-2xl font-bold text-primary capitalize">{activeTab}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Tap the navigation below to switch tabs
            </p>
          </Card>
        </section>
      </main>

      {/* Floating Bottom Navigation with FAB */}
      <FloatingBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showFab={true}
        onFabClick={handleFabClick}
      />
    </AppShell>
  );
}
