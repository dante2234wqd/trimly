"use client";

import { useState } from "react";
import { ArrowLeft, Clock } from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock time slots data
const timeSlots = [
  { id: 1, time: "9:00 AM", available: true },
  { id: 2, time: "9:30 AM", available: false, bookedBy: "John" },
  { id: 3, time: "10:00 AM", available: true },
  { id: 4, time: "10:30 AM", available: true },
  { id: 5, time: "11:00 AM", available: false, bookedBy: "Sarah" },
  { id: 6, time: "11:30 AM", available: true },
  { id: 7, time: "12:00 PM", available: true },
  { id: 8, time: "12:30 PM", available: false, bookedBy: "Mike" },
  { id: 9, time: "1:00 PM", available: true },
  { id: 10, time: "1:30 PM", available: true },
  { id: 11, time: "2:00 PM", available: true },
  { id: 12, time: "2:30 PM", available: false, bookedBy: "Lisa" },
  { id: 13, time: "3:00 PM", available: true },
  { id: 14, time: "3:30 PM", available: true },
  { id: 15, time: "4:00 PM", available: true },
  { id: 16, time: "4:30 PM", available: false, bookedBy: "Alex" },
  { id: 17, time: "5:00 PM", available: true },
];

// Mock selected date (would come from previous screen)
const selectedDate = {
  day: 18,
  month: "May",
  year: 2026,
  formatted: "May 18th",
};

export default function SelectTimePage() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const canProceed = selectedSlot !== null;

  const handleSelectSlot = (id: number, available: boolean) => {
    if (available) {
      setSelectedSlot(id);
    }
  };

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </button>

          <h1 className="text-lg font-bold text-foreground">Select the Time</h1>

          <Badge variant="accent" size="sm" className="px-3 py-1.5">
            {selectedDate.formatted}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-32">
        {/* Time info */}
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Available slots for {selectedDate.formatted}
          </p>
        </div>

        {/* Time Slots List */}
        <div className="space-y-3">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot === slot.id;
            const isAvailable = slot.available;

            return (
              <button
                key={slot.id}
                onClick={() => handleSelectSlot(slot.id, isAvailable)}
                disabled={!isAvailable}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-[20px] transition-all duration-200
                  ${
                    isSelected
                      ? "bg-[#FEC93B] border-2 border-primary shadow-soft-lg"
                      : isAvailable
                      ? "bg-card border-2 border-transparent shadow-soft hover:shadow-soft-lg active:scale-[0.98]"
                      : "bg-muted border-2 border-transparent opacity-50 cursor-not-allowed"
                  }
                `}
              >
                {/* Radio Indicator */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${
                      isSelected
                        ? "border-primary bg-primary"
                        : isAvailable
                        ? "border-muted-foreground/40 bg-transparent"
                        : "border-muted-foreground/20 bg-transparent"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Time */}
                <div className="flex-1 text-left">
                  <p
                    className={`
                      text-lg font-semibold
                      ${
                        isSelected
                          ? "text-foreground"
                          : isAvailable
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    {slot.time}
                  </p>
                  {!isAvailable && (
                    <p className="text-xs text-muted-foreground">
                      Booked
                    </p>
                  )}
                </div>

                {/* Status indicator */}
                {isAvailable ? (
                  <span
                    className={`
                      text-xs font-medium px-2 py-1 rounded-full
                      ${
                        isSelected
                          ? "bg-primary/20 text-primary"
                          : "bg-success/10 text-success"
                      }
                    `}
                  >
                    {isSelected ? "Selected" : "Available"}
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted-foreground/10 text-muted-foreground">
                    Unavailable
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Summary */}
        {selectedSlot && (
          <Card className="mt-6 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Your selection</p>
            <p className="font-semibold text-foreground">
              {selectedDate.formatted} at{" "}
              {timeSlots.find((s) => s.id === selectedSlot)?.time}
            </p>
          </Card>
        )}
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-[#E7ECF0]/95 backdrop-blur-sm z-20">
        <div className="max-w-md mx-auto">
          <PrimaryButton
            fullWidth
            disabled={!canProceed}
            className="shadow-soft-lg"
          >
            Book appointment
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
