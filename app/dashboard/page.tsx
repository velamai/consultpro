"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, FileText, Users, Settings, LogOut, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConsultationForm } from "@/components/consultation-form";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  // Mock pending payments data
  const pendingPayments = [
    {
      id: "PAY-001",
      title: "Business Strategy Session",
      amount: 199.99,
      dueDate: "2024-03-25",
      consultant: "Dr. Sarah Johnson",
      duration: "60 minutes",
      scheduledFor: "March 25, 2024 10:00 AM"
    },
    {
      id: "PAY-002",
      title: "Financial Planning Review",
      amount: 149.99,
      dueDate: "2024-03-27",
      consultant: "Michael Chen",
      duration: "45 minutes",
      scheduledFor: "March 27, 2024 2:00 PM"
    }
  ];

  // Fetch bookings for the logged-in user
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
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

  const handleConsultationSubmit = async (data: any) => {
    console.log("New consultation data:", data);
    toast.success("Consultation scheduled successfully");
  };

  const handlePayment = (paymentId: string) => {
    toast.success(`Processing payment for ₹{paymentId}`);
    // Implement payment processing logic here
  };

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, User!</h1>
            <p className="text-muted-foreground">Manage your consultations and appointments</p>
          </div>
          <ConsultationForm onSubmit={handleConsultationSubmit} />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Past Sessions
              </CardTitle>
              <CardDescription>Completed consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Total Sessions
              </CardTitle>
              <CardDescription>All-time consultation sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">10</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled consultation sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.uid}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.calendarDate).toLocaleDateString()} at{" "}
                        {new Date(booking.calendarDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <Button>Join Meeting</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payments Pending */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payments Pending
            </CardTitle>
            <CardDescription>Outstanding payments for upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{payment.title}</h3>
                      <p className="text-sm text-muted-foreground">Due by: {payment.dueDate}</p>
                      <p className="text-sm font-medium text-primary">₹{payment.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-5 w-5" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{payment.title}</h4>
                            <div className="text-sm">
                              <p><span className="font-medium">Consultant:</span> {payment.consultant}</p>
                              <p><span className="font-medium">Duration:</span> {payment.duration}</p>
                              <p><span className="font-medium">Scheduled for:</span> {payment.scheduledFor}</p>
                              <p><span className="font-medium">Amount:</span> ₹{payment.amount}</p>
                              <p><span className="font-medium">Payment ID:</span> {payment.id}</p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      <Button 
                        variant="default"
                        onClick={() => handlePayment(payment.id)}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="w-full" onClick={() => router.push("/dashboard/history")}>
                View History
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/support")}>
                Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}