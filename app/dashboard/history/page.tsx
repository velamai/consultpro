"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

interface Booking {
  uid: string;
  name: string;
  email: string;
  calendarDate: string;
  fileurl: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to access history");
        router.push("/auth/login");
        return;
      }

      try {
        // Decode the token to get the user ID
        const payload = jwtDecode<{ uuid: string; role: string }>(token);
        const userid = payload.uuid;

        // Fetch bookings for the user
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://consultpro.ksangeeth76.workers.dev";
        const response = await fetch(`${API_URL}/bookings/user/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ConsultPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/auth/login")}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Consultation History</h1>
            <p className="text-muted-foreground">View your past consultation sessions</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Past Sessions</CardTitle>
            <CardDescription>Your completed and cancelled consultation sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.uid}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.calendarDate).toLocaleDateString()} at{" "}
                        {new Date(booking.calendarDate).toLocaleTimeString()}
                      </p>
                      <p className="text-sm">Status: {booking.status}</p>
                      <p className="text-sm">Payment Status: {booking.paymentStatus}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {booking.status === "confirmed" && (
                        <Button
                          onClick={() => window.open(booking.fileurl, "_blank")}
                        >
                          View Details
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(booking.uid);
                          toast.success("Booking ID copied to clipboard");
                        }}
                      >
                        Copy Booking ID
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}