"use client";

import { useState } from "react";
import {
  Bell,
  User,
  DollarSign,
  Wallet,
  History,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Scissors,
} from "@/components/trimly/Icons";
import { Card, Badge, FloatingBottomNav } from "@/components/trimly";

// Mock data
const balanceData = {
  available: 450.54,
  pending: 125.0,
  thisWeek: 892.3,
  thisMonth: 3450.75,
};

const quickActions = [
  { id: "add", label: "Add sale", icon: Plus, color: "bg-[#4905AC]" },
  { id: "withdraw", label: "Withdraw", icon: Wallet, color: "bg-[#22C55E]" },
  { id: "history", label: "History", icon: History, color: "bg-[#6B7280]" },
  { id: "reports", label: "Reports", icon: BarChart3, color: "bg-[#FEC93B]" },
];

const services = [
  { id: 1, name: "Haircut", revenue: 1250, count: 42, trend: 12 },
  { id: 2, name: "Beard Trim", revenue: 680, count: 34, trend: 8 },
  { id: 3, name: "Fade", revenue: 890, count: 28, trend: -3 },
  { id: 4, name: "Coloring", revenue: 420, count: 12, trend: 15 },
  { id: 5, name: "Kids Cut", revenue: 310, count: 18, trend: 5 },
  { id: 6, name: "Hot Shave", revenue: 240, count: 16, trend: -2 },
];

const recentTransactions = [
  { id: 1, service: "Haircut + Beard", client: "Carlos M.", amount: 45, time: "2h ago" },
  { id: 2, service: "Fade", client: "Miguel R.", amount: 35, time: "3h ago" },
  { id: 3, service: "Kids Cut", client: "Ana L.", amount: 25, time: "5h ago" },
];

// Simple bar chart data
const chartData = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 150 },
  { label: "Thu", value: 220 },
  { label: "Fri", value: 280 },
  { label: "Sat", value: 350 },
  { label: "Sun", value: 190 },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [timeFilter, setTimeFilter] = useState<"week" | "month">("week");

  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col pb-28">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="w-11 h-11 rounded-full bg-[#4905AC]/10 flex items-center justify-center">
            <User size={22} className="text-[#4905AC]" />
          </div>

          <h1 className="text-lg font-bold text-[#1A0041]">Balance</h1>

          <button className="w-11 h-11 rounded-full bg-white shadow-soft flex items-center justify-center">
            <Bell size={20} className="text-[#1A0041]" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 space-y-5">
        {/* Balance Card */}
        <Card className="bg-[#4905AC] text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-bold mb-4">
              ${balanceData.available.toFixed(2)}
            </p>

            {/* Time filter chips */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setTimeFilter("week")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  timeFilter === "week"
                    ? "bg-[#FEC93B] text-[#1A0041]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                This week
              </button>
              <button
                onClick={() => setTimeFilter("month")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  timeFilter === "month"
                    ? "bg-[#FEC93B] text-[#1A0041]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                This month
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center shadow-lg`}
                  >
                    <action.icon
                      size={20}
                      className={action.id === "reports" ? "text-[#1A0041]" : "text-white"}
                    />
                  </div>
                  <span className="text-[11px] text-white/80 font-medium">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Revenue Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
              <ArrowUpRight size={20} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#1A0041]">
                ${timeFilter === "week" ? balanceData.thisWeek : balanceData.thisMonth}
              </p>
              <p className="text-xs text-[#6B7280]">Income</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEC93B]/20 flex items-center justify-center">
              <DollarSign size={20} className="text-[#1A0041]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#1A0041]">
                ${balanceData.pending.toFixed(2)}
              </p>
              <p className="text-xs text-[#6B7280]">Pending</p>
            </div>
          </Card>
        </div>

        {/* Revenue by Service Chart */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1A0041]">
              Revenue this week
            </h3>
            <button className="text-sm text-[#4905AC] font-medium">Details</button>
          </div>

          <Card>
            <div className="flex items-end justify-between gap-2 h-32">
              {chartData.map((day, index) => {
                const height = (day.value / maxChartValue) * 100;
                const isHighest = day.value === maxChartValue;

                return (
                  <div key={day.label} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                        isHighest ? "bg-[#4905AC]" : "bg-[#4905AC]/30"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-[#6B7280] font-medium">
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Top Services */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1A0041]">
              Top Services
            </h3>
            <button className="text-sm text-[#4905AC] font-medium">See all</button>
          </div>

          <Card padding="sm">
            {services.slice(0, 4).map((service, index) => {
              const percentage = (service.revenue / services[0].revenue) * 100;

              return (
                <div
                  key={service.id}
                  className={`flex items-center gap-3 py-3 ${
                    index !== 3 ? "border-b border-[#E2E8F0]" : ""
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0
                        ? "bg-[#FEC93B] text-[#1A0041]"
                        : "bg-[#F4F6F8] text-[#6B7280]"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Service Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#4905AC]/10 flex items-center justify-center">
                    <Scissors size={16} className="text-[#4905AC]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[#1A0041]">
                        {service.name}
                      </p>
                      <p className="text-sm font-bold text-[#1A0041]">
                        ${service.revenue}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4905AC] rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-[#6B7280]">
                        {service.count} bookings
                      </p>
                      <p
                        className={`text-[10px] font-medium flex items-center gap-0.5 ${
                          service.trend >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                        }`}
                      >
                        {service.trend >= 0 ? (
                          <ArrowUpRight size={10} />
                        ) : (
                          <ArrowDownRight size={10} />
                        )}
                        {Math.abs(service.trend)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1A0041]">
              Recent Transactions
            </h3>
            <button className="text-sm text-[#4905AC] font-medium">View all</button>
          </div>

          <Card padding="sm">
            {recentTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`flex items-center gap-3 py-3 ${
                  index !== recentTransactions.length - 1
                    ? "border-b border-[#E2E8F0]"
                    : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                  <DollarSign size={18} className="text-[#22C55E]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A0041] truncate">
                    {tx.service}
                  </p>
                  <p className="text-xs text-[#6B7280]">{tx.client}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-[#22C55E]">+${tx.amount}</p>
                  <p className="text-[10px] text-[#6B7280]">{tx.time}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* Services Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1A0041]">
              Services Revenue
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="text-center cursor-pointer hover:shadow-soft-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4905AC]/10 flex items-center justify-center mx-auto mb-2">
                  <Scissors size={18} className="text-[#4905AC]" />
                </div>
                <p className="text-xs font-medium text-[#1A0041] mb-0.5 truncate">
                  {service.name}
                </p>
                <p className="text-sm font-bold text-[#4905AC]">${service.revenue}</p>
                <p
                  className={`text-[10px] font-medium ${
                    service.trend >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                  }`}
                >
                  {service.trend >= 0 ? "+" : ""}
                  {service.trend}%
                </p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <FloatingBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showFab={true}
        onFabClick={() => {}}
      />
    </div>
  );
}
