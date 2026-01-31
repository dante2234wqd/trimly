"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  User,
  ImageIcon,
  Camera,
  Check,
  Star,
  MapPin,
  X,
} from "@/components/trimly/Icons";
import { Card, Badge, PrimaryButton, ModalSheet, Toast } from "@/components/trimly";

// Mock appointment data
const mockAppointment = {
  id: 1,
  clientName: "Carlos Rodriguez",
  clientAvatar: null,
  isVip: true,
  service: "Haircut + Beard Trim",
  duration: "45 min",
  price: "$45",
  date: "Today, January 30",
  time: "9:00 AM",
  shopName: "Don Luis Barberia",
  address: "123 Main Street, Downtown",
  referencePhoto: "/placeholder.svg?height=400&width=300",
  hasReferencePhoto: true,
  notes: "Prefers short fade on sides, keep top longer. No product after.",
  status: "upcoming" as "upcoming" | "in-progress" | "done",
};

type CutStatus = "idle" | "started" | "finished";
type ArrivalStatus = "on-time" | "late-client" | "shop-delay" | null;
type PaymentMethod = "cash" | "transfer" | "card" | null;

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [cutStatus, setCutStatus] = useState<CutStatus>("idle");
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showArrivalSheet, setShowArrivalSheet] = useState(false);
  const [showFinishSheet, setShowFinishSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [arrivalStatus, setArrivalStatus] = useState<ArrivalStatus>(null);
  const [resultPhoto, setResultPhoto] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const handleStartCut = () => {
    setShowArrivalSheet(true);
  };

  const handleArrivalSelected = (status: ArrivalStatus) => {
    setArrivalStatus(status);
    setShowArrivalSheet(false);
    setCutStatus("started");
  };

  const handleFinishCut = () => {
    setShowFinishSheet(true);
  };

  const handleUploadResult = () => {
    // Mock upload - in real app would open file picker
    setResultPhoto("/placeholder.svg?height=200&width=200");
  };

  const handleProceedToPayment = () => {
    setShowFinishSheet(false);
    setShowPaymentSheet(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentSheet(false);
    setCutStatus("finished");
    setShowToast(true);
    
    // Navigate back after a delay
    setTimeout(() => {
      router.push("/schedule");
    }, 2000);
  };

  const arrivalOptions = [
    { id: "on-time", label: "On time", icon: Check, color: "text-[#22C55E]" },
    { id: "late-client", label: "Late arrival (client)", icon: Clock, color: "text-[#FEC93B]" },
    { id: "shop-delay", label: "Shop delay", icon: Clock, color: "text-[#EF4444]" },
  ];

  const paymentOptions = [
    { id: "cash", label: "Cash", emoji: "💵" },
    { id: "transfer", label: "Transfer", emoji: "📱" },
    { id: "card", label: "Card", emoji: "💳" },
  ];

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#E7ECF0] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-[#1A0041]" />
          </button>

          <h1 className="text-lg font-bold text-[#1A0041]">Appointment Details</h1>

          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 px-4 pb-32 space-y-4">
        {/* Client Card */}
        <div className="bg-white rounded-[20px] p-4 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4905AC]/10 flex items-center justify-center text-[#4905AC] text-xl font-bold">
              {mockAppointment.clientName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-[#1A0041]">
                  {mockAppointment.clientName}
                </h2>
                {mockAppointment.isVip && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEC93B] text-[#1A0041]">
                    VIP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                <Star size={14} className="text-[#FEC93B] fill-[#FEC93B]" />
                <span>Regular client - 12 visits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-[20px] p-4 shadow-soft space-y-4">
          <h3 className="font-semibold text-[#1A0041]">Service Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#4905AC]/10 flex items-center justify-center">
                  <Clock size={20} className="text-[#4905AC]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A0041]">{mockAppointment.service}</p>
                  <p className="text-sm text-[#6B7280]">{mockAppointment.duration}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#4905AC]">{mockAppointment.price}</span>
            </div>

            <div className="h-px bg-[#E2E8F0]" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#FEC93B]/20 flex items-center justify-center">
                <Clock size={20} className="text-[#1A0041]" />
              </div>
              <div>
                <p className="font-medium text-[#1A0041]">{mockAppointment.date}</p>
                <p className="text-sm text-[#6B7280]">{mockAppointment.time}</p>
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0]" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4F6F8] flex items-center justify-center">
                <MapPin size={20} className="text-[#6B7280]" />
              </div>
              <div>
                <p className="font-medium text-[#1A0041]">{mockAppointment.shopName}</p>
                <p className="text-sm text-[#6B7280]">{mockAppointment.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Photo */}
        {mockAppointment.hasReferencePhoto && (
          <div className="bg-white rounded-[20px] p-4 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1A0041]">Reference Photo</h3>
              <button
                onClick={() => setShowPhotoViewer(true)}
                className="text-sm font-medium text-[#4905AC]"
              >
                View full
              </button>
            </div>
            
            <button
              onClick={() => setShowPhotoViewer(true)}
              className="w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#F4F6F8]"
            >
              <img
                src={mockAppointment.referencePhoto}
                alt="Reference"
                className="w-full h-full object-cover"
              />
            </button>

            {mockAppointment.notes && (
              <div className="p-3 bg-[#F4F6F8] rounded-[12px]">
                <p className="text-sm text-[#6B7280]">
                  <span className="font-medium text-[#1A0041]">Notes: </span>
                  {mockAppointment.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Status Indicator */}
        {cutStatus !== "idle" && (
          <div className={`rounded-[16px] p-4 ${
            cutStatus === "started" 
              ? "bg-[#FEC93B]/20 border border-[#FEC93B]" 
              : "bg-[#22C55E]/10 border border-[#22C55E]"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                cutStatus === "started" ? "bg-[#FEC93B]" : "bg-[#22C55E]"
              }`}>
                {cutStatus === "started" ? (
                  <Clock size={20} className="text-[#1A0041]" />
                ) : (
                  <Check size={20} className="text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-[#1A0041]">
                  {cutStatus === "started" ? "Cut in progress" : "Appointment complete"}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {cutStatus === "started" 
                    ? `Client arrived: ${arrivalStatus === "on-time" ? "On time" : arrivalStatus === "late-client" ? "Late" : "Shop delay"}`
                    : "Payment registered successfully"
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#E7ECF0]/95 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          {cutStatus === "idle" && (
            <PrimaryButton fullWidth onClick={handleStartCut}>
              Start cut
            </PrimaryButton>
          )}
          {cutStatus === "started" && (
            <PrimaryButton fullWidth variant="accent" onClick={handleFinishCut}>
              Finish cut
            </PrimaryButton>
          )}
          {cutStatus === "finished" && (
            <PrimaryButton fullWidth disabled>
              Completed
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {showPhotoViewer && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowPhotoViewer(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X size={24} className="text-white" />
            </button>
            <span className="text-white font-medium">Reference Photo</span>
            <div className="w-10" />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={mockAppointment.referencePhoto}
              alt="Reference"
              className="max-w-full max-h-full object-contain rounded-[16px]"
            />
          </div>
        </div>
      )}

      {/* Arrival Status Sheet */}
      <ModalSheet
        isOpen={showArrivalSheet}
        onClose={() => setShowArrivalSheet(false)}
        title="Client arrival status"
      >
        <div className="space-y-3">
          <p className="text-sm text-[#6B7280] mb-4">
            How did the client arrive for their appointment?
          </p>
          {arrivalOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleArrivalSelected(option.id as ArrivalStatus)}
                className="w-full flex items-center gap-4 p-4 bg-[#F4F6F8] rounded-[16px] hover:bg-[#E7ECF0] transition-colors active:scale-[0.99]"
              >
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${option.color}`}>
                  <Icon size={20} />
                </div>
                <span className="font-medium text-[#1A0041]">{option.label}</span>
              </button>
            );
          })}
        </div>
      </ModalSheet>

      {/* Finish Cut Sheet */}
      <ModalSheet
        isOpen={showFinishSheet}
        onClose={() => setShowFinishSheet(false)}
        title="Complete appointment"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-[#1A0041] mb-3">Upload result photo</h4>
            {resultPhoto ? (
              <div className="relative">
                <img
                  src={resultPhoto}
                  alt="Result"
                  className="w-full aspect-square object-cover rounded-[16px]"
                />
                <button
                  onClick={() => setResultPhoto(null)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleUploadResult}
                className="w-full aspect-video border-2 border-dashed border-[#E2E8F0] rounded-[16px] flex flex-col items-center justify-center gap-2 hover:border-[#4905AC] hover:bg-[#4905AC]/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4F6F8] flex items-center justify-center">
                  <Camera size={24} className="text-[#6B7280]" />
                </div>
                <span className="text-sm font-medium text-[#6B7280]">
                  Tap to upload photo
                </span>
              </button>
            )}
          </div>

          <PrimaryButton
            fullWidth
            onClick={handleProceedToPayment}
          >
            Continue to payment
          </PrimaryButton>
        </div>
      </ModalSheet>

      {/* Payment Sheet */}
      <ModalSheet
        isOpen={showPaymentSheet}
        onClose={() => setShowPaymentSheet(false)}
        title="Register payment"
      >
        <div className="space-y-4">
          <div className="text-center py-4">
            <p className="text-sm text-[#6B7280] mb-1">Amount to collect</p>
            <p className="text-3xl font-bold text-[#1A0041]">{mockAppointment.price}</p>
          </div>

          <div>
            <h4 className="font-medium text-[#1A0041] mb-3">Payment method</h4>
            <div className="grid grid-cols-3 gap-3">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id as PaymentMethod)}
                  className={`p-4 rounded-[16px] text-center transition-all ${
                    paymentMethod === option.id
                      ? "bg-[#4905AC] text-white shadow-lg scale-[1.02]"
                      : "bg-[#F4F6F8] text-[#1A0041] hover:bg-[#E7ECF0]"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton
            fullWidth
            disabled={!paymentMethod}
            onClick={handlePaymentComplete}
          >
            Confirm payment
          </PrimaryButton>
        </div>
      </ModalSheet>

      {/* Success Toast */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message="Saved and reputation updated"
        variant="success"
      />
    </div>
  );
}
