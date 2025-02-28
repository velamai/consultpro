"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for the email form validation using Zod
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Define the schema for the OTP and password form validation using Zod
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  // Initialize react-hook-form for email input
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Initialize react-hook-form for OTP and password input
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  // Handle email submission to send OTP
  const handleSendOtp = async (data: EmailFormValues) => {
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://consultpro.ksangeeth76.workers.dev";
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Failed to send OTP");

      toast.success("OTP sent to your email");
      setEmailSent(true);
      setEmail(data.email); // Save the email for OTP validation
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP and password submission to reset password
  const handleResetPassword = async (data: OtpFormValues) => {
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://consultpro.ksangeeth76.workers.dev";
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: data.otp, newPassword: data.newPassword }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Failed to reset password");

      toast.success("Password reset successfully");
      router.push("/auth/login"); // Redirect to login page after success
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {emailSent ? "Reset Password" : "Forgot Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!emailSent ? (
            // Email Form
            <form onSubmit={handleSubmitEmail(handleSendOtp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...registerEmail("email")}
                />
                {emailErrors.email && (
                  <p className="text-red-500 text-sm">{emailErrors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            // OTP and Password Form
            <form onSubmit={handleSubmitOtp(handleResetPassword)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  {...registerOtp("otp")}
                />
                {otpErrors.otp && (
                  <p className="text-red-500 text-sm">{otpErrors.otp.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  {...registerOtp("newPassword")}
                />
                {otpErrors.newPassword && (
                  <p className="text-red-500 text-sm">{otpErrors.newPassword.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {emailSent ? "Remember your password? " : "Already have an account? "}
            </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}