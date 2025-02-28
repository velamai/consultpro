"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, Users, ArrowLeft, Plus, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { NewTicketDialog } from "@/components/new-ticket-dialog"
import { toast } from "sonner"

interface SupportTicket {
  id: string
  title: string
  date: string
  status: "open" | "closed" | "in-progress"
  ticketId: string
  lastUpdate: string
}

export default function SupportPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Mock ticket data - in a real app, this would come from your backend
  const ticketData: SupportTicket[] = [
    {
      id: "1",
      title: "Issue with Meeting Link",
      date: "2024-03-15 14:00",
      status: "open",
      ticketId: "TKT-123456",
      lastUpdate: "2 hours ago"
    },
    {
      id: "2",
      title: "Payment Not Reflected",
      date: "2024-03-10 11:00",
      status: "in-progress",
      ticketId: "TKT-789012",
      lastUpdate: "1 day ago"
    },
    {
      id: "3",
      title: "Schedule Change Request",
      date: "2024-03-05 15:30",
      status: "closed",
      ticketId: "TKT-345678",
      lastUpdate: "5 days ago"
    }
  ]

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      toast.error("Please login to access support")
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleNewTicket = (data: any) => {
    console.log("New ticket data:", data)
    toast.success("Support ticket created successfully")
  }

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
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Support</h1>
              <p className="text-muted-foreground">Manage your support tickets</p>
            </div>
          </div>
          <NewTicketDialog onSubmit={handleNewTicket} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>View and manage your support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketData.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-muted p-4 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{ticket.title}</h3>
                      <p className="text-sm text-muted-foreground">Created: {ticket.date}</p>
                      <p className="text-sm">Ticket ID: {ticket.ticketId}</p>
                      <p className="text-sm text-muted-foreground">Last update: {ticket.lastUpdate}</p>
                      <span className={`text-sm ₹{
                        ticket.status === "open" ? "text-blue-500" : 
                        ticket.status === "in-progress" ? "text-yellow-500" : 
                        "text-green-500"
                      }`}>
                        Status: {ticket.status.split("-").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => {
                          // In a real app, this would open the ticket details/chat
                          toast.info("Opening ticket chat...")
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        View Chat
                      </Button>
                      <Button variant="outline" onClick={() => {
                        navigator.clipboard.writeText(ticket.ticketId)
                        toast.success("Ticket ID copied to clipboard")
                      }}>
                        Copy Ticket ID
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