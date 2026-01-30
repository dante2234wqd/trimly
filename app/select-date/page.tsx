"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, Star } from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock user data - toggle this to test VIP vs Non-VIP
const userInfo = {
  name: "Alex",
  isVIP: true, // Change to false to test Non-VIP view
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Mock unavailable dates (some random dates)
const UNAVAILABLE_DATES = [3, 7, 14, 21, 28];

export default function SelectDatePage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calculate max selectable date based on VIP status
  const maxSelectableDate = useMemo(() => {
    const max = new Date(today);
    max.setDate(max.getDate() + (userInfo.isVIP ? 30 : 7));
    return max;
  }, []);

  // Get calendar data for current month
  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth, currentYear]);

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Can't select past dates
    if (date < todayStart) return false;
    
    // Can't select beyond max date
    if (date > maxSelectableDate) return false;
    
    // Check if date is unavailable (mock)
    if (UNAVAILABLE_DATES.includes(day)) return false;
    
    return true;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handleDateSelect = (day: number) => {
    if (!isDateSelectable(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if previous month navigation should be disabled
  const canGoPrevious = !(currentMonth === today.getMonth() && currentYear === today.getFullYear());

  // Check if next month navigation should be disabled (based on max date)
  const canGoNext = new Date(currentYear, currentMonth + 1, 1) <= maxSelectableDate;

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      month: "long", 
      day: "numeric" 
    };
    return selectedDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>

          <h1 className="text-lg font-bold text-foreground">Select the Date</h1>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
              <Bell size={20} className="text-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary text-sm">
                {userInfo.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 space-y-6 pb-32">
        {/* VIP Status Banner */}
        <div className="flex items-center justify-center gap-2">
          <Badge variant={userInfo.isVIP ? "accent" : "muted"} size="md">
            {userInfo.isVIP ? (
              <span className="flex items-center gap-1">
                <Star size={12} className="fill-current" />
                VIP Member
              </span>
            ) : (
              "Regular Member"
            )}
          </Badge>
        </div>

        {/* Calendar Card */}
        <Card className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              disabled={!canGoPrevious}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canGoPrevious
                  ? "bg-muted hover:bg-primary/10 text-foreground"
                  : "bg-muted/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <h2 className="text-lg font-bold text-foreground">
              {MONTHS[currentMonth]} {currentYear}
            </h2>

            <button
              onClick={goToNextMonth}
              disabled={!canGoNext}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canGoNext
                  ? "bg-muted hover:bg-primary/10 text-foreground"
                  : "bg-muted/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const selectable = isDateSelectable(day);
              const selected = isDateSelected(day);
              const todayDate = isToday(day);

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  disabled={!selectable}
                  className={`aspect-square rounded-[12px] flex items-center justify-center text-sm font-medium transition-all ${
                    selected
                      ? "bg-accent text-accent-foreground shadow-soft"
                      : todayDate
                      ? "bg-primary/10 text-primary border-2 border-primary"
                      : selectable
                      ? "bg-muted/50 text-foreground hover:bg-primary/10"
                      : "bg-transparent text-muted-foreground/40 cursor-not-allowed"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Card>

        {/* VIP Note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {userInfo.isVIP ? (
              <span className="flex items-center justify-center gap-1">
                <Star size={14} className="text-accent fill-accent" />
                VIP members get 30 days of availability
              </span>
            ) : (
              <span>
                Upgrade to VIP for 30 days of availability.{" "}
                <button className="text-primary font-medium underline">
                  Learn more
                </button>
              </span>
            )}
          </p>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <Card className="border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Selected Date</p>
                <p className="font-semibold text-foreground">
                  {formatSelectedDate()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-[12px] bg-accent/20 flex items-center justify-center">
                <span className="text-lg font-bold text-accent-foreground">
                  {selectedDate.getDate()}
                </span>
              </div>
            </div>
          </Card>
        )}
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-[#E7ECF0]/95 backdrop-blur-sm z-20">
        <div className="max-w-md mx-auto">
          <PrimaryButton
            fullWidth
            disabled={!selectedDate}
            className="shadow-soft-lg"
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
