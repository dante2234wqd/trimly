"use client";

import { useState } from "react";
import {
  AppShell,
  TopBar,
  Card,
  PrimaryButton,
  ListItemRow,
  Badge,
  StatCard,
  AvatarRow,
  FloatingBottomNav,
  ModalSheet,
  Toast,
  SuccessPopup,
} from "@/components/trimly";
import {
  Bell,
  Scissors,
  Clock,
  Star,
  Calendar,
  MapPin,
  CreditCard,
  Settings,
  TrendingUp,
} from "lucide-react";

// Mock data
const upcomingAppointment = {
  barber: "Marcus Johnson",
  service: "Haircut + Beard Trim",
  date: "Today, 2:30 PM",
  location: "Downtown Studio",
  price: "$45",
};

const topBarbers = [
  { name: "Marcus Johnson", rating: "4.9", specialty: "Fades & Designs", badge: "VIP" },
  { name: "David Chen", rating: "4.8", specialty: "Classic Cuts", badge: null },
  { name: "James Wilson", rating: "4.7", specialty: "Beard Styling", badge: null },
];

const services = [
  { name: "Haircut", price: "$30", duration: "30 min", icon: Scissors },
  { name: "Beard Trim", price: "$15", duration: "15 min", icon: Scissors },
  { name: "Full Service", price: "$45", duration: "45 min", icon: Star },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showBookingSheet, setShowBookingSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookNow = () => {
    setShowBookingSheet(false);
    setShowSuccess(true);
  };

  return (
    <AppShell>
      {/* Top Bar */}
      <TopBar
        title="Trimly"
        leftAction={
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary text-sm">T</span>
          </div>
        }
        rightAction={
          <button
            onClick={() => setShowToast(true)}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <Bell size={20} className="text-foreground" />
          </button>
        }
      />

      <main className="px-4 space-y-6">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Good afternoon, Alex
          </h2>
          <p className="text-muted-foreground">Ready for your next fresh cut?</p>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Calendar size={20} />}
            label="Appointments"
            value="12"
            trend={{ value: "3 this month", positive: true }}
            accentColor="primary"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Loyalty Points"
            value="850"
            trend={{ value: "50 to VIP", positive: true }}
            accentColor="accent"
          />
        </section>

        {/* Upcoming Appointment */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">
              Upcoming Appointment
            </h3>
            <Badge variant="success">Confirmed</Badge>
          </div>

          <Card className="space-y-4">
            <AvatarRow
              name={upcomingAppointment.barber}
              subtitle={upcomingAppointment.service}
              badge="VIP"
              badgeVariant="accent"
            />

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{upcomingAppointment.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{upcomingAppointment.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-lg font-bold text-foreground">
                {upcomingAppointment.price}
              </span>
              <PrimaryButton size="sm" variant="secondary">
                Reschedule
              </PrimaryButton>
            </div>
          </Card>
        </section>

        {/* Top Barbers */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Top Barbers</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>

          <Card padding="sm">
            {topBarbers.map((barber, index) => (
              <AvatarRow
                key={barber.name}
                name={barber.name}
                subtitle={`${barber.specialty} • ${barber.rating} ★`}
                badge={barber.badge || undefined}
                badgeVariant="accent"
                onClick={() => setShowBookingSheet(true)}
                size="md"
              />
            ))}
          </Card>
        </section>

        {/* Quick Services */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Book
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {services.map((service) => (
              <Card
                key={service.name}
                className="text-center cursor-pointer hover:shadow-soft-lg transition-shadow"
                onClick={() => setShowBookingSheet(true)}
              >
                <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <service.icon size={20} className="text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">
                  {service.name}
                </p>
                <p className="text-xs text-muted-foreground">{service.price}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Settings List Demo */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Quick Actions
          </h3>
          <Card padding="none">
            <ListItemRow
              title="Payment Methods"
              subtitle="Manage your cards"
              leftIcon={<CreditCard size={20} />}
              showArrow
              onClick={() => {}}
            />
            <div className="h-px bg-border mx-4" />
            <ListItemRow
              title="Preferences"
              subtitle="Notifications, language"
              leftIcon={<Settings size={20} />}
              showArrow
              onClick={() => {}}
            />
          </Card>
        </section>

        {/* Button Showcase */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Book Your Next Cut
          </h3>
          <div className="space-y-3">
            <PrimaryButton fullWidth onClick={() => setShowBookingSheet(true)}>
              Book Appointment
            </PrimaryButton>
            <PrimaryButton fullWidth variant="accent">
              Redeem VIP Reward
            </PrimaryButton>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <FloatingBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Booking Modal Sheet */}
      <ModalSheet
        isOpen={showBookingSheet}
        onClose={() => setShowBookingSheet(false)}
        title="Book Appointment"
      >
        <div className="space-y-4">
          <AvatarRow
            name="Marcus Johnson"
            subtitle="Fades & Designs Specialist"
            badge="VIP"
            badgeVariant="accent"
            size="lg"
          />

          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Select Service</h4>
            {services.map((service) => (
              <Card
                key={service.name}
                className="flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration}
                  </p>
                </div>
                <span className="font-semibold text-primary">{service.price}</span>
              </Card>
            ))}
          </div>

          <div className="pt-4">
            <PrimaryButton fullWidth onClick={handleBookNow}>
              Confirm Booking
            </PrimaryButton>
          </div>
        </div>
      </ModalSheet>

      {/* Toast */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message="You have 2 new notifications"
        variant="info"
      />

      {/* Success Popup */}
      <SuccessPopup
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Booking Confirmed!"
        message="Your appointment has been scheduled"
      />
    </AppShell>
  );
}
