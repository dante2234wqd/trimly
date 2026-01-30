"use client";

import Link from "next/link";
import { Check, Star, Calendar, MapPin, Clock } from "@/components/trimly/Icons";
import { Card, PrimaryButton } from "@/components/trimly";

// Mock booking data
const bookingData = {
  barber: {
    name: "Marcus Johnson",
    rating: 4.9,
    specialty: "Fades & Designs",
  },
  service: "Haircut + Beard Trim",
  date: "Sunday, May 18th",
  time: "2:30 PM",
  shop: {
    name: "Don Luis Barbería",
    address: "123 Main Street, Downtown",
  },
  confirmationCode: "TRM-2024-0518",
};

export default function ConfirmationPage() {
  return (
    <div
      className="min-h-screen min-h-dvh w-full flex flex-col"
      style={{
        background: "linear-gradient(180deg, #E7ECF0 0%, #E2E0F0 50%, #DDD8F0 100%)",
      }}
    >
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Success Icon */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-28 h-28 rounded-full bg-primary/20 animate-pulse" />
          {/* Main circle */}
          <div className="relative w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-soft-lg">
            <Check size={48} className="text-primary-foreground" />
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent" />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-primary/40" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center text-balance">
          {"You're all set!"}
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          Your appointment has been confirmed. See you soon!
        </p>

        {/* Booking Card */}
        <Card className="w-full max-w-sm space-y-5">
          {/* Barber Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
              {bookingData.barber.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">
                  {bookingData.barber.name}
                </h3>
                {/* Rating Pill */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-xs font-medium text-accent-foreground flex-shrink-0">
                  <Star size={10} className="fill-current text-accent" />
                  <span>{bookingData.barber.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {bookingData.barber.specialty}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Appointment Details */}
          <div className="space-y-3">
            {/* Service */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium text-foreground">{bookingData.service}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">
                  {bookingData.date} at {bookingData.time}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{bookingData.shop.name}</p>
                <p className="text-xs text-muted-foreground">{bookingData.shop.address}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Confirmation Code */}
          <div className="flex items-center justify-between bg-muted/50 rounded-[12px] p-3">
            <div>
              <p className="text-xs text-muted-foreground">Confirmation code</p>
              <p className="font-mono font-semibold text-foreground tracking-wide">
                {bookingData.confirmationCode}
              </p>
            </div>
            <button className="text-xs font-medium text-primary">
              Copy
            </button>
          </div>
        </Card>
      </main>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 pt-4 space-y-3 max-w-sm mx-auto w-full">
        {/* Add to Calendar - Outline Button */}
        <button className="w-full h-14 rounded-[16px] border-2 border-primary bg-transparent text-primary font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-primary/5">
          <Calendar size={20} />
          Add to calendar
        </button>

        {/* Back to Home - Primary Button */}
        <Link href="/" className="block">
          <PrimaryButton fullWidth className="h-14">
            Back to home
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
