"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Globe,
  FileText,
  Moon,
  Sun,
  HelpCircle,
  MessageCircle,
  Award,
  Crown,
  Zap,
  Palette,
  Clock,
  Check,
  ChevronRight,
  X,
} from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton } from "@/components/trimly";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: null,
  role: "Barber", // "Client" | "Barber" | "Owner"
  isVIP: true,
};

const shopBranding = {
  name: "Don Luis Barbería",
  logo: null,
};

const achievements = [
  { id: 1, name: "On Time x10", icon: Clock, unlocked: true, highlight: false },
  { id: 2, name: "VIP Member", icon: Crown, unlocked: true, highlight: true },
  { id: 3, name: "No-Cancel", icon: Check, unlocked: true, highlight: false },
  { id: 4, name: "Top Customer", icon: Award, unlocked: false, highlight: false },
  { id: 5, name: "Early Bird", icon: Zap, unlocked: true, highlight: false },
];

export default function ProfilePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const isBarberOrOwner = userData.role === "Barber" || userData.role === "Owner";

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-4 space-y-6">
        {/* Profile Card */}
        <Card className="flex flex-col items-center text-center py-6">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {userData.name.charAt(0)}
                </span>
              )}
            </div>
            {userData.isVIP && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FEC93B] flex items-center justify-center shadow-soft">
                <Crown size={16} className="text-[#1A0041]" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-foreground mb-1">
            {userData.name}
          </h2>
          <p className="text-muted-foreground text-sm mb-3">{userData.email}</p>

          <div className="flex gap-2">
            <Badge variant={userData.isVIP ? "accent" : "muted"}>
              {userData.isVIP ? "VIP Member" : "Regular"}
            </Badge>
            <Badge variant="primary">{userData.role}</Badge>
          </div>
        </Card>

        {/* Shop Branding (Barber/Owner only) */}
        {isBarberOrOwner && (
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
              Shop Branding
            </h3>
            <Card className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[16px] bg-muted flex items-center justify-center flex-shrink-0">
                {shopBranding.logo ? (
                  <img
                    src={shopBranding.logo}
                    alt={shopBranding.name}
                    className="w-full h-full rounded-[16px] object-cover"
                  />
                ) : (
                  <Palette size={24} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {shopBranding.name}
                </p>
                <p className="text-sm text-muted-foreground">Shop logo & colors</p>
              </div>
              <button
                onClick={() => setShowBrandingModal(true)}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                Customize
              </button>
            </Card>
          </section>
        )}

        {/* Account Section */}
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            Account
          </h3>
          <Card padding="none">
            <SettingsRow
              icon={<User size={20} />}
              title="Manage Profile"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<Shield size={20} />}
              title="Password & Security"
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
              rightContent={
                <span className="text-sm text-muted-foreground">English</span>
              }
              showArrow
            />
          </Card>
        </section>

        {/* Preferences Section */}
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            Preferences
          </h3>
          <Card padding="none">
            <SettingsRow
              icon={<FileText size={20} />}
              title="About Us"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              title="Theme"
              rightContent={
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    theme === "dark" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-card shadow transition-transform ${
                      theme === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              }
            />
          </Card>
        </section>

        {/* Achievements Section */}
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            Achievements
          </h3>
          <Card>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-[16px] min-w-[80px] ${
                    achievement.unlocked
                      ? achievement.highlight
                        ? "bg-[#FEC93B]/20"
                        : "bg-muted/50"
                      : "bg-muted/30 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      achievement.unlocked
                        ? achievement.highlight
                          ? "bg-[#FEC93B] text-[#1A0041]"
                          : "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <achievement.icon size={20} />
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      achievement.unlocked
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Upgrade to PRO */}
        <section>
          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEC93B]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#FEC93B]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FEC93B] flex items-center justify-center">
                  <Zap size={16} className="text-[#1A0041]" />
                </div>
                <span className="text-sm font-semibold text-[#FEC93B]">
                  PREMIUM
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">Upgrade to PRO</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Unlock 30-day booking, priority slots, exclusive discounts, and
                no-show protection.
              </p>

              <PrimaryButton variant="accent" fullWidth className="shadow-soft-lg">
                <Zap size={18} className="mr-2" />
                Upgrade Now
              </PrimaryButton>
            </div>
          </Card>
        </section>

        {/* Support Section */}
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            Support
          </h3>
          <Card padding="none">
            <SettingsRow
              icon={<HelpCircle size={20} />}
              title="Help Center"
              showArrow
            />
            <Divider />
            <SettingsRow
              icon={<MessageCircle size={20} />}
              title="Contact Us"
              showArrow
            />
          </Card>
        </section>

        {/* Logout */}
        <button className="w-full py-4 text-center text-destructive font-medium">
          Log out
        </button>
      </main>

      {/* Branding Modal */}
      {showBrandingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowBrandingModal(false)}
          />
          <div className="relative bg-card rounded-[24px] p-6 w-full max-w-sm shadow-soft-lg">
            <button
              onClick={() => setShowBrandingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            >
              <X size={18} className="text-muted-foreground" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">
              Customize Branding
            </h3>

            <div className="space-y-4">
              {/* Logo Upload */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Shop Logo
                </label>
                <div className="w-full h-32 rounded-[16px] border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted/30">
                  <Palette size={32} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Tap to upload logo
                  </span>
                </div>
              </div>

              {/* Color Picker Placeholder */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Brand Color
                </label>
                <div className="flex gap-3">
                  {["#4905AC", "#FEC93B", "#22C55E", "#EF4444", "#3B82F6"].map(
                    (color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-border"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              <PrimaryButton fullWidth className="mt-4">
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
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
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full p-4 text-left hover:bg-muted/50 active:bg-muted transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="flex-1 text-base font-medium text-foreground">{title}</span>
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
      {showArrow && (
        <ChevronRight size={20} className="flex-shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-border mx-4" />;
}
