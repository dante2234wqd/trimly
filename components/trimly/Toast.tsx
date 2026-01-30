"use client";

import { useEffect } from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  variant?: "success" | "error" | "info";
  duration?: number;
}

export function Toast({
  isVisible,
  onClose,
  message,
  variant = "success",
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const variants = {
    success: {
      bg: "bg-success",
      icon: Check,
    },
    error: {
      bg: "bg-destructive",
      icon: AlertCircle,
    },
    info: {
      bg: "bg-primary",
      icon: Info,
    },
  };

  const Icon = variants[variant].icon;

  return (
    <div className="fixed top-4 left-4 right-4 z-[60] flex justify-center animate-fade-in">
      <div
        className={`${variants[variant].bg} text-white px-4 py-3 rounded-[16px] shadow-soft-lg flex items-center gap-3 max-w-md w-full`}
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon size={14} />
        </div>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// Success Popup - larger modal-style success message
interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
}

export function SuccessPopup({
  isVisible,
  onClose,
  title,
  message,
}: SuccessPopupProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-[24px] shadow-soft-lg p-8 text-center max-w-xs w-full animate-pop-in">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        {message && <p className="text-muted-foreground text-sm">{message}</p>}
      </div>

      <style jsx>{`
        @keyframes pop-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
