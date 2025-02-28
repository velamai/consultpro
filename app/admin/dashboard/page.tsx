"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut, Users, Bell, Search, LayoutGrid, LayoutList, Video, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"; // Add this import

export default function AdminDashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://consultpro.ksangeeth76.workers.dev";
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/bookings`, {
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
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings to show only upcoming or today's bookings
  const filterUpcomingBookings = (bookings) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.calendarDate);
      return bookingDate >= today;
    });
  };

  const upcomingBookings = filterUpcomingBookings(bookings);

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      href: "/admin/users"
    },
    {
      title: "Active Bookings",
      value: upcomingBookings.length.toString(),
      icon: Settings,
      change: "+8%",
      href: "/admin/bookings"
    },
    {
      title: "Revenue",
      value: "₹12,345",
      icon: Users,
      change: "+23%",
      href: "/admin/revenue"
    },
  ];

  const menuItems = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "View Bookings",
      description: "Manage consultation bookings",
      href: "/admin/bookings",
      icon: Settings,
    },
    {
      title: "Support Tickets",
      description: "Handle customer support requests",
      href: "/admin/support",
      icon: Bell,
    },
    {
      title: "Settings",
      description: "Configure system settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/admin/settings")}>
                <Settings className="h-5 w-5" />
              </Button>
              <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search users, bookings..." className="pl-10" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => router.push(stat.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Bookings
            </CardTitle>
            <CardDescription>List of upcoming consultation bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <div
                      key={booking.uid}
                      className="bg-muted p-4 rounded-lg"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{booking.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(booking.calendarDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(booking.calendarDate).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Email:</span> {booking.email} |{" "}
                            <span className="text-muted-foreground">Status:</span> {booking.status}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(booking.fileurl);
                              toast.success("File URL copied to clipboard");
                            }}
                            variant="outline"
                          >
                            Join Meeting
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No upcoming bookings found.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
          {menuItems.map((item) => (
            viewMode === "grid" ? (
              <Card
                key={item.title}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(item.href)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card
                key={item.title}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push(item.href)}
              >
                <CardContent className="flex items-center gap-4 py-4">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
}