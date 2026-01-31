import { ReactNode } from "react";
import { Card } from "./Card";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive?: boolean;
  };
  accentColor?: "primary" | "accent" | "success";
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  accentColor = "primary",
}: StatCardProps) {
  const accentStyles = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    success: "bg-success/10 text-success",
  };

  return (
    <Card className="flex flex-col gap-3">
      <div
        className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${accentStyles[accentColor]}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>

      {trend && (
        <p
          className={`text-xs font-medium ${
            trend.positive ? "text-success" : "text-destructive"
          }`}
        >
          {trend.positive ? "+" : ""}
          {trend.value}
        </p>
      )}
    </Card>
  );
}
