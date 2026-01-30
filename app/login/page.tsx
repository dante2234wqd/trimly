"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "@/components/trimly/Icons";
import { PrimaryButton } from "@/components/trimly";
import { AuthInput } from "@/components/trimly/AuthInput";
import { SocialButton } from "@/components/trimly/SocialButton";

// Simple SVG icons for Google and Apple
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - would integrate with auth provider
    alert("Login submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Purple Header Section */}
      <div className="bg-primary pt-16 pb-24 px-6 rounded-b-[32px]">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-white/20 rounded-[20px] flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">T</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Trimly</h1>
          <p className="text-white/80 mt-1">Welcome back</p>
        </div>
      </div>

      {/* Form Section - overlaps header */}
      <div className="flex-1 px-6 -mt-12">
        <div className="bg-card rounded-[24px] shadow-soft-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              type="email"
              placeholder="Email address"
              icon={<Mail size={20} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <AuthInput
              type="password"
              placeholder="Password"
              icon={<Lock size={20} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <PrimaryButton
              type="submit"
              fullWidth
              variant="accent"
              disabled={!isFormValid}
            >
              Log In
            </PrimaryButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <SocialButton icon={<GoogleIcon />} provider="Google" />
            <SocialButton icon={<AppleIcon />} provider="Apple" />
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 pb-8">
          <p className="text-muted-foreground">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
