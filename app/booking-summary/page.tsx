"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Scissors,
  Clock,
  Calendar,
  MapPin,
  Camera,
  ImageIcon,
  Bell,
} from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock booking data
const bookingDetails = {
  barber: {
    name: "Marcus Johnson",
    specialty: "Fades & Designs Specialist",
    rating: 4.9,
  },
  service: {
    name: "Haircut + Beard Trim",
    duration: "45 min",
    price: "$45",
  },
  date: "Sunday, May 18th",
  time: "2:30 PM",
  shop: {
    name: "Don Luis Barbería",
    address: "123 Main Street, Downtown",
  },
};

export default function BookingSummaryPage() {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleConfirmBooking = () => {
    if (remindersEnabled) {
      setShowPermissionModal(true);
    } else {
      // Proceed with booking
      alert("Booking confirmed!");
    }
  };

  const handleAllowNotifications = () => {
    setShowPermissionModal(false);
    // Proceed with booking
    alert("Notifications enabled! Booking confirmed!");
  };

  const handleSkipNotifications = () => {
    setShowPermissionModal(false);
    // Proceed with booking
    alert("Booking confirmed!");
  };

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href="/select-time"
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>

          <h1 className="text-lg font-bold text-foreground">Booking Summary</h1>

          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 space-y-4 pb-32">
        {/* Summary Card */}
        <Card className="space-y-5">
          {/* Barber Section */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {bookingDetails.barber.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {bookingDetails.barber.name}
                </h3>
                <Badge variant="accent" size="sm">VIP</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {bookingDetails.barber.specialty}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Service */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scissors size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {bookingDetails.service.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                <Clock size={14} />
                <span>{bookingDetails.service.duration}</span>
                <span>•</span>
                <span className="font-semibold text-primary">
                  {bookingDetails.service.price}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {bookingDetails.date}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {bookingDetails.time}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {bookingDetails.shop.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {bookingDetails.shop.address}
              </p>
            </div>
          </div>
        </Card>

        {/* Reference Photo Section */}
        <Card>
          <h3 className="font-semibold text-foreground mb-3">
            Reference Photo
            <span className="text-muted-foreground font-normal text-sm ml-1">
              (optional)
            </span>
          </h3>

          <div className="flex gap-3">
            {/* Upload Placeholder */}
            <button className="flex-1 h-24 rounded-[16px] border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 hover:bg-primary/5 transition-colors">
              <Camera size={24} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                Add photo
              </span>
            </button>

            {/* Use History Button */}
            <button className="flex-1 h-24 rounded-[16px] border-2 border-border bg-card flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 hover:bg-primary/5 transition-colors">
              <ImageIcon size={24} className="text-primary" />
              <span className="text-xs text-primary font-medium">
                Use history
              </span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            Share a photo to help your barber understand the style you want
          </p>
        </Card>

        {/* Reminders Toggle */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center">
                <Bell size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Enable reminders</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get notified before your appointment
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              onClick={() => setRemindersEnabled(!remindersEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                remindersEnabled ? "bg-primary" : "bg-border"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  remindersEnabled ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Price Summary */}
        <Card className="bg-primary/5 border border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              {bookingDetails.service.price}
            </span>
          </div>
        </Card>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-[#E7ECF0]/95 backdrop-blur-sm z-20">
        <div className="max-w-md mx-auto">
          <PrimaryButton
            fullWidth
            onClick={handleConfirmBooking}
            className="shadow-soft-lg"
          >
            Confirm booking
          </PrimaryButton>
        </div>
      </div>

      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setShowPermissionModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-card rounded-[24px] shadow-soft-lg w-full max-w-sm p-6 animate-scale-in">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-primary" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-foreground text-center mb-2">
              Turn on reminders?
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-center text-sm mb-6">
              We will send you a reminder 24 hours and 1 hour before your appointment
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <PrimaryButton fullWidth onClick={handleAllowNotifications}>
                Allow notifications
              </PrimaryButton>
              <PrimaryButton
                fullWidth
                variant="ghost"
                onClick={handleSkipNotifications}
              >
                Not now
              </PrimaryButton>
            </div>
          </div>

          <style jsx>{`
            @keyframes scale-in {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-scale-in {
              animation: scale-in 0.2s ease-out;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
