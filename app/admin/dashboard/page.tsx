"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, Users, Bell, Search, LayoutGrid, LayoutList, Video, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
      value: "56",
      icon: Settings,
      change: "+8%",
      href: "/admin/bookings"
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: Users,
      change: "+23%",
      href: "/admin/revenue"
    },
  ]

  const upcomingMeets = [
    {
      id: "MEET-001",
      title: "Business Strategy Consultation",
      client: "John Doe",
      consultant: "Dr. Sarah Johnson",
      time: "10:00 AM",
      date: "2024-03-25",
      duration: "60 minutes",
      meetLink: "https://meet.zoom.us/j/123456789"
    },
    {
      id: "MEET-002",
      title: "Financial Planning Session",
      client: "Jane Smith",
      consultant: "Michael Chen",
      time: "2:00 PM",
      date: "2024-03-25",
      duration: "45 minutes",
      meetLink: "https://meet.zoom.us/j/987654321"
    },
    {
      id: "MEET-003",
      title: "Marketing Strategy Review",
      client: "Alice Johnson",
      consultant: "Emily Brown",
      time: "4:30 PM",
      date: "2024-03-25",
      duration: "30 minutes",
      meetLink: "https://meet.zoom.us/j/456789123"
    }
  ]

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
  ]

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      toast.error("Unauthorized access")
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

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
              <Button variant="ghost" size="icon" onClick={() => {
                localStorage.removeItem("userRole")
                router.push("/auth/login")
              }}>
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

        {/* Upcoming Meet Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Today's Meet Links
            </CardTitle>
            <CardDescription>Quick access to today's consultation sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeets.map((meet) => (
                <div
                  key={meet.id}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{meet.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {meet.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {meet.time} ({meet.duration})
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Client:</span> {meet.client} |{" "}
                        <span className="text-muted-foreground">Consultant:</span> {meet.consultant}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(meet.meetLink)
                          toast.success("Meet link copied to clipboard")
                        }}
                        variant="outline"
                      >
                        Copy Link
                      </Button>
                      <Button
                        onClick={() => window.open(meet.meetLink, "_blank")}
                      >
                        Join Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
  )
}