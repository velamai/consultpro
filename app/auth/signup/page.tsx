"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

// Define Zod Schema
const signupSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignupFormValues) => {
    setLoading(true);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://consultpro.ksangeeth76.workers.dev";

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      toast.success("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setSocialLoading(true);
    toast.info("Google login is not yet implemented.");
    setTimeout(() => setSocialLoading(false), 2000);
  };

  const handleFacebookLogin = () => {
    setSocialLoading(true);
    toast.info("Facebook login is not yet implemented.");
    setTimeout(() => setSocialLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {/* Horizontal Line with "OR" */}
          <div className="relative my-6">
            <hr className="border-t border-gray-300" />
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
              OR
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4">
            {socialLoading ? (
              <>
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="h-5 w-5" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleFacebookLogin}
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                  Facebook
                </Button>
              </>
            )}
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
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