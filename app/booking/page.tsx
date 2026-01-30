"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Clock, Check, Star } from "lucide-react";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock data
const shopInfo = {
  name: "Don Luis Barbería",
  memberType: "VIP", // or "Regular"
};

const services = [
  { id: 1, name: "Haircut", duration: "30 min", price: "$30" },
  { id: 2, name: "Beard Trim", duration: "20 min", price: "$20" },
  { id: 3, name: "Haircut + Beard", duration: "45 min", price: "$45" },
  { id: 4, name: "Kids Cut", duration: "25 min", price: "$25" },
  { id: 5, name: "Hot Towel Shave", duration: "30 min", price: "$35" },
  { id: 6, name: "Hair Design", duration: "40 min", price: "$50" },
];

const barbers = [
  { id: 1, name: "Marcus", rating: 4.9, avatar: null },
  { id: 2, name: "David", rating: 4.8, avatar: null },
  { id: 3, name: "James", rating: 4.7, avatar: null },
  { id: 4, name: "Carlos", rating: 4.9, avatar: null },
  { id: 5, name: "Miguel", rating: 4.6, avatar: null },
];

export default function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const canProceed = selectedServices.length > 0;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>

          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-foreground">{shopInfo.name}</h1>
            <Badge variant={shopInfo.memberType === "VIP" ? "accent" : "muted"} size="sm">
              {shopInfo.memberType}
            </Badge>
          </div>

          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
        </div>
      </header>

      <main className="px-4 space-y-6">
        {/* Section Title */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">
            What are we doing today?
          </h2>
          <p className="text-muted-foreground mt-1">
            Select your services below
          </p>
        </section>

        {/* Service Selector Grid */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">
            Services
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`relative text-left p-4 rounded-[20px] transition-all duration-200 active:scale-[0.98] ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-soft-lg"
                      : "bg-card text-card-foreground shadow-soft hover:shadow-soft-lg"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Check size={12} className="text-accent-foreground" />
                    </div>
                  )}
                  <p className="font-semibold text-[15px] mb-2 pr-6">{service.name}</p>
                  <div className="flex items-center gap-1.5 text-xs opacity-80 mb-1">
                    <Clock size={12} />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-lg font-bold">{service.price}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Barber Selector */}
        <section>
          <h3 className="text-base font-semibold text-foreground mb-3">
            Choose your barber
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {barbers.map((barber) => {
              const isSelected = selectedBarber === barber.id;
              return (
                <button
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber.id)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-[20px] transition-all duration-200 active:scale-[0.98] min-w-[90px] ${
                    isSelected
                      ? "bg-primary shadow-soft-lg"
                      : "bg-card shadow-soft hover:shadow-soft-lg"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 text-lg font-bold ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {barber.name.charAt(0)}
                  </div>

                  {/* Name */}
                  <p
                    className={`font-medium text-sm mb-1 ${
                      isSelected ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {barber.name}
                  </p>

                  {/* Rating Pill */}
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isSelected
                        ? "bg-accent text-accent-foreground"
                        : "bg-accent/20 text-accent-foreground"
                    }`}
                  >
                    <Star size={10} className="fill-current" />
                    <span>{barber.rating}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Summary */}
        {selectedServices.length > 0 && (
          <section>
            <Card className="border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Selected</p>
              <p className="font-semibold text-foreground">
                {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                {selectedBarber && ` with ${barbers.find(b => b.id === selectedBarber)?.name}`}
              </p>
              <p className="text-lg font-bold text-primary mt-1">
                $
                {selectedServices.reduce((total, id) => {
                  const service = services.find((s) => s.id === id);
                  return total + parseInt(service?.price.replace("$", "") || "0");
                }, 0)}
              </p>
            </Card>
          </section>
        )}
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-20">
        <div className="max-w-md mx-auto">
          <PrimaryButton
            fullWidth
            disabled={!canProceed}
            className="shadow-soft-lg"
          >
            Choose date
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
