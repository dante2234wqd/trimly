"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Clock,
  User,
  ImageIcon,
  Calendar,
} from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock data
const appointments = [
  {
    id: 1,
    time: "9:00 AM",
    endTime: "9:30 AM",
    clientName: "Carlos Rodriguez",
    service: "Haircut + Beard",
    isVip: true,
    hasReferencePhoto: true,
    referencePhoto: "/placeholder.svg?height=60&width=60",
    status: "upcoming" as const,
  },
  {
    id: 2,
    time: "10:00 AM",
    endTime: "10:30 AM",
    clientName: "Miguel Santos",
    service: "Haircut",
    isVip: false,
    hasReferencePhoto: false,
    referencePhoto: null,
    status: "in-progress" as const,
  },
  {
    id: 3,
    time: "11:00 AM",
    endTime: "11:45 AM",
    clientName: "David Chen",
    service: "Full Service",
    isVip: true,
    hasReferencePhoto: true,
    referencePhoto: "/placeholder.svg?height=60&width=60",
    status: "upcoming" as const,
  },
  {
    id: 4,
    time: "1:00 PM",
    endTime: "1:30 PM",
    clientName: "James Wilson",
    service: "Beard Trim",
    isVip: false,
    hasReferencePhoto: false,
    referencePhoto: null,
    status: "done" as const,
  },
  {
    id: 5,
    time: "2:30 PM",
    endTime: "3:00 PM",
    clientName: "Alex Martinez",
    service: "Kids Cut",
    isVip: true,
    hasReferencePhoto: true,
    referencePhoto: "/placeholder.svg?height=60&width=60",
    status: "upcoming" as const,
  },
];

const dayFilters = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "week", label: "This Week" },
];

type AppointmentStatus = "upcoming" | "in-progress" | "done";

function StatusChip({ status }: { status: AppointmentStatus }) {
  const config = {
    upcoming: {
      bg: "bg-primary/10",
      text: "text-primary",
      label: "Upcoming",
    },
    "in-progress": {
      bg: "bg-[#FEC93B]/20",
      text: "text-[#1A0041]",
      label: "In Progress",
    },
    done: {
      bg: "bg-[#22C55E]/10",
      text: "text-[#22C55E]",
      label: "Done",
    },
  };

  const { bg, text, label } = config[status];

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("today");

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter((a) => a.status === "upcoming").length,
    inProgress: appointments.filter((a) => a.status === "in-progress").length,
    done: appointments.filter((a) => a.status === "done").length,
  };

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
            <ArrowLeft size={20} className="text-[#1A0041]" />
          </button>

          <h1 className="text-lg font-bold text-[#1A0041]">My Schedule</h1>

          <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center relative">
            <Bell size={20} className="text-[#1A0041]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>

        {/* Day Filter */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 p-1 bg-white rounded-full shadow-soft">
            {dayFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveDay(filter.id)}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeDay === filter.id
                    ? "bg-[#4905AC] text-white"
                    : "text-[#6B7280] hover:text-[#1A0041]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pb-8 space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-[16px] p-3 shadow-soft text-center">
            <p className="text-2xl font-bold text-[#4905AC]">{stats.upcoming}</p>
            <p className="text-xs text-[#6B7280]">Upcoming</p>
          </div>
          <div className="bg-white rounded-[16px] p-3 shadow-soft text-center">
            <p className="text-2xl font-bold text-[#FEC93B]">{stats.inProgress}</p>
            <p className="text-xs text-[#6B7280]">In Progress</p>
          </div>
          <div className="bg-white rounded-[16px] p-3 shadow-soft text-center">
            <p className="text-2xl font-bold text-[#22C55E]">{stats.done}</p>
            <p className="text-xs text-[#6B7280]">Done</p>
          </div>
        </div>

        {/* Date Header */}
        <div className="flex items-center gap-2 pt-2">
          <Calendar size={18} className="text-[#6B7280]" />
          <span className="text-sm font-medium text-[#6B7280]">
            {activeDay === "today"
              ? "Today, January 30"
              : activeDay === "tomorrow"
              ? "Tomorrow, January 31"
              : "Jan 30 - Feb 5"}
          </span>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <Link
              key={appointment.id}
              href={`/schedule/${appointment.id}`}
              className="block"
            >
              <div className="bg-white rounded-[20px] p-4 shadow-soft hover:shadow-soft-lg transition-shadow active:scale-[0.99]">
                <div className="flex gap-4">
                  {/* Time Column */}
                  <div className="flex-shrink-0 text-center">
                    <p className="text-lg font-bold text-[#1A0041]">
                      {appointment.time.split(" ")[0]}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {appointment.time.split(" ")[1]}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-[#E2E8F0] self-stretch" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1A0041] truncate">
                          {appointment.clientName}
                        </h3>
                        {appointment.isVip && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEC93B] text-[#1A0041]">
                            VIP
                          </span>
                        )}
                      </div>
                      <StatusChip status={appointment.status} />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                        <Clock size={14} />
                        <span>{appointment.service}</span>
                      </div>
                    </div>

                    {/* Reference Photo Thumbnail */}
                    {appointment.hasReferencePhoto && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#F4F6F8] overflow-hidden flex items-center justify-center">
                          {appointment.referencePhoto ? (
                            <img
                              src={appointment.referencePhoto}
                              alt="Reference"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={16} className="text-[#6B7280]" />
                          )}
                        </div>
                        <span className="text-xs text-[#6B7280]">
                          Reference photo attached
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (conditionally shown) */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#F4F6F8] flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-[#6B7280]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A0041] mb-1">
              No appointments
            </h3>
            <p className="text-sm text-[#6B7280]">
              You have no scheduled appointments for this day.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
