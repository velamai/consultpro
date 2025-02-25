"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

interface ConsultationHistory {
  id: string
  title: string
  date: string
  paymentId: string
  meetLink: string
  status: "completed" | "cancelled"
}

export default function HistoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Mock history data - in a real app, this would come from your backend
  const historyData: ConsultationHistory[] = [
    {
      id: "1",
      title: "Business Strategy Review",
      date: "2024-03-15 14:00",
      paymentId: "PAY-123456",
      meetLink: "https://meet.zoom.us/j/123456789",
      status: "completed"
    },
    {
      id: "2",
      title: "Financial Planning Session",
      date: "2024-03-10 11:00",
      paymentId: "PAY-789012",
      meetLink: "https://meet.zoom.us/j/987654321",
      status: "completed"
    },
    {
      id: "3",
      title: "Marketing Strategy Consultation",
      date: "2024-03-05 15:30",
      paymentId: "PAY-345678",
      meetLink: "https://meet.zoom.us/j/456789123",
      status: "cancelled"
    }
  ]

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      toast.error("Please login to access history")
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
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
              {historyData.map((session) => (
                <div
                  key={session.id}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                      <p className="text-sm">Payment ID: {session.paymentId}</p>
                      <span className={`text-sm ${
                        session.status === "completed" ? "text-green-500" : "text-red-500"
                      }`}>
                        Status: {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {session.status === "completed" && (
                        <Button
                          onClick={() => window.open(session.meetLink, "_blank")}
                        >
                          View Recording
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => {
                        navigator.clipboard.writeText(session.paymentId)
                        toast.success("Payment ID copied to clipboard")
                      }}>
                        Copy Payment ID
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
  )
}