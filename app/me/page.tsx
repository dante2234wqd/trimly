"use client";

import { useState } from "react";
import { Card, Badge, PrimaryButton, FloatingBottomNav } from "@/components/trimly";
import {
  User,
  Bell,
  ChevronRight,
  Lock,
  Globe,
  HelpCircle,
  MessageCircle,
  Award,
  Crown,
  Zap,
  Calendar,
  Clock,
  Star,
  Settings,
  FileText,
} from "@/components/trimly/Icons";

// Mock data
const clientData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: null,
  isVip: false,
  points: 42,
  vipThreshold: 50,
};

const upcomingAppointment = {
  shop: "Don Luis Barbería",
  date: "Today, 2:30 PM",
  service: "Haircut + Beard",
};

const achievements = [
  { id: 1, name: "On time x10", icon: Clock, unlocked: true, color: "bg-green-500" },
  { id: 2, name: "No-cancel", icon: Star, unlocked: true, color: "bg-blue-500" },
  { id: 3, name: "VIP Member", icon: Crown, unlocked: false, color: "bg-[#FEC93B]" },
  { id: 4, name: "Top customer", icon: Award, unlocked: true, color: "bg-purple-500" },
];

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col pb-28">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-[#1A0041]">Profile</h1>
          <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
            <Settings size={20} className="text-[#1A0041]" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 space-y-6">
        {/* Profile Card */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#4905AC]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#4905AC]">
                {clientData.name.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#1A0041] truncate">
                    {clientData.name}
                  </h2>
                  <p className="text-sm text-[#6B7280] truncate">{clientData.email}</p>
                </div>
                <Badge variant={clientData.isVip ? "accent" : "muted"}>
                  {clientData.isVip ? "VIP" : "Regular"}
                </Badge>
              </div>

              {/* Points Progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#6B7280]">
                    Points: <span className="font-semibold text-[#1A0041]">{clientData.points}</span>
                  </span>
                  <span className="text-[#6B7280]">{clientData.vipThreshold - clientData.points} to VIP</span>
                </div>
                <div className="h-2 bg-[#E7ECF0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FEC93B] rounded-full transition-all duration-500"
                    style={{ width: `${(clientData.points / clientData.vipThreshold) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <section>
          <h3 className="text-base font-semibold text-[#1A0041] mb-3">Achievements</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-[16px] min-w-[80px] ${
                    achievement.unlocked
                      ? "bg-white shadow-soft"
                      : "bg-white/50 opacity-60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      achievement.unlocked ? achievement.color : "bg-gray-300"
                    }`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-[#1A0041] text-center leading-tight">
                    {achievement.name}
                  </span>
                  {!achievement.unlocked && (
                    <span className="text-[8px] text-[#6B7280] mt-0.5">Locked</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Appointments */}
        <section>
          <h3 className="text-base font-semibold text-[#1A0041] mb-3">Appointments</h3>
          <Card className="space-y-4">
            {/* Upcoming */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-0.5">Upcoming appointment</p>
                <p className="font-semibold text-[#1A0041]">{upcomingAppointment.shop}</p>
                <p className="text-sm text-[#6B7280]">
                  {upcomingAppointment.date} • {upcomingAppointment.service}
                </p>
              </div>
              <PrimaryButton size="sm" variant="secondary">
                View
              </PrimaryButton>
            </div>

            <div className="h-px bg-[#E7ECF0]" />

            {/* History */}
            <SettingsRow
              icon={<Calendar size={20} />}
              title="Appointment history"
              showArrow
            />
          </Card>
        </section>

        {/* Account Settings */}
        <section>
          <h3 className="text-base font-semibold text-[#1A0041] mb-3">Account</h3>
          <Card padding="none">
            <SettingsRow
              icon={<User size={20} />}
              title="Manage profile"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<Lock size={20} />}
              title="Password & security"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<Bell size={20} />}
              title="Notifications"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<Globe size={20} />}
              title="Language"
              rightContent={<span className="text-sm text-[#6B7280]">English</span>}
              showArrow
            />
          </Card>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-base font-semibold text-[#1A0041] mb-3">Preferences</h3>
          <Card padding="none">
            <SettingsRow
              icon={<Zap size={20} />}
              title="Theme"
              rightContent={<span className="text-sm text-[#6B7280]">Light</span>}
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<FileText size={20} />}
              title="About us"
              showArrow
            />
          </Card>
        </section>

        {/* Upgrade Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-[#4905AC] to-[#6B21A8] border-0">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FEC93B]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={20} className="text-[#FEC93B]" />
              <span className="text-sm font-semibold text-[#FEC93B]">PRO</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Upgrade to PRO</h4>
            <p className="text-sm text-white/80 mb-4">
              Get VIP calendar access, priority slots, and smart reminders.
            </p>
            <button className="w-full py-3 px-4 bg-[#FEC93B] text-[#1A0041] font-semibold rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              <Zap size={18} />
              Upgrade Now
            </button>
          </div>
        </Card>

        {/* Support */}
        <section>
          <h3 className="text-base font-semibold text-[#1A0041] mb-3">Support</h3>
          <Card padding="none">
            <SettingsRow
              icon={<HelpCircle size={20} />}
              title="Help Center"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<MessageCircle size={20} />}
              title="Contact"
              showArrow
            />
          </Card>
        </section>

        {/* Logout */}
        <button className="w-full py-3 text-center text-[#EF4444] font-medium rounded-[12px] bg-white shadow-soft active:bg-red-50 transition-colors">
          Log out
        </button>
      </main>

      {/* Bottom Navigation */}
      <FloatingBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showFab={false}
      />
    </div>
  );
}

// Helper Components
function SettingsRow({
  icon,
  title,
  rightContent,
  showArrow,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  rightContent?: React.ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className="flex items-center gap-4 w-full p-4 text-left hover:bg-[#F4F6F8]/50 active:bg-[#F4F6F8] transition-colors cursor-pointer"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-[12px] bg-[#F4F6F8] flex items-center justify-center text-[#4905AC]">
        {icon}
      </div>
      <span className="flex-1 text-base font-medium text-[#1A0041]">{title}</span>
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
      {showArrow && (
        <ChevronRight size={20} className="flex-shrink-0 text-[#9CA3AF]" />
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[#E7ECF0] mx-4" />;
}
