// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for login form validation using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = async (data: LoginFormValues) => {
    setLoading(true);

    try {
      // For testing purposes, handle admin login directly
      if (data.email === "admin@test.com" && data.password === "Admin@123") {
        // Save token and role to localStorage
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("userRole", "admin");
        toast.success("Welcome Admin");
        router.push("/admin/dashboard");
        return;
      } else if (data.email === "user@test.com" && data.password === "User@123") {
        // Save token and role to localStorage
        localStorage.setItem("token", "user-token");
        localStorage.setItem("userRole", "user");
        toast.success("Welcome User");
        router.push("/dashboard");
        return;
      }

      // If not using test credentials, proceed with API call
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://consultpro.ksangeeth76.workers.dev";
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Login failed");

      const token = responseData.token;
      localStorage.setItem("token", token); // Save token to localStorage

      // Decode JWT token to get user role
      const decoded = jwtDecode<{ uuid: string; role: string }>(token);
      const { role } = decoded;

      // Save user role to localStorage
      localStorage.setItem("userRole", role);

      // Redirect based on role
      if (role === "admin") {
        toast.success("Welcome Admin");
        router.push("/admin/dashboard");
      } else {
        toast.success("Welcome User");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password");
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
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
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
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-2 text-right">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

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
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}