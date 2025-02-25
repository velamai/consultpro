"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Mail, Clock, MessageSquare, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isAdmin: boolean
}

interface TicketDetails {
  id: string
  user: {
    name: string
    email: string
  }
  subject: string
  status: string
  priority: string
  category: string
  createdAt: string
  lastUpdate: string
  messages: Message[]
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [ticket, setTicket] = useState<TicketDetails | null>(null)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      toast.error("Unauthorized access")
      router.push("/auth/login")
      return
    }

    // Simulated API call to fetch ticket details
    const fetchTicket = async () => {
      // In a real app, this would be an API call
      const mockTicket: TicketDetails = {
        id: params.id,
        user: {
          name: "John Doe",
          email: "john@example.com"
        },
        subject: "Issue with Meeting Link",
        status: "open",
        priority: "high",
        category: "technical",
        createdAt: "2024-03-20 14:30",
        lastUpdate: "1 hour ago",
        messages: [
          {
            id: "1",
            sender: "John Doe",
            content: "I'm unable to access the meeting link for my upcoming consultation.",
            timestamp: "2024-03-20 14:30",
            isAdmin: false
          },
          {
            id: "2",
            sender: "Support Team",
            content: "Hi John, I'm sorry to hear that. Could you please provide more details about the error you're seeing?",
            timestamp: "2024-03-20 14:35",
            isAdmin: true
          },
          {
            id: "3",
            sender: "John Doe",
            content: "When I click the link, it says 'Meeting not found'.",
            timestamp: "2024-03-20 14:40",
            isAdmin: false
          }
        ]
      }
      setTicket(mockTicket)
      setIsLoading(false)
    }

    fetchTicket()
  }, [router, params.id])

  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would make an API call
    toast.success(`Ticket status updated to ${newStatus}`)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // In a real app, this would make an API call
    const message: Message = {
      id: Date.now().toString(),
      sender: "Support Team",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: true
    }

    setTicket(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message]
    } : null)
    
    setNewMessage("")
    toast.success("Message sent")
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!ticket) {
    return <div className="min-h-screen flex items-center justify-center">Ticket not found</div>
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'closed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/support")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Support Ticket Details</h1>
            <p className="text-muted-foreground">View and manage support ticket</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
              <CardDescription>Details about the support ticket</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Subject</p>
                      <p className="font-medium">{ticket.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p className="font-medium">{ticket.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                    <div className="flex gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange("in-progress")}>
                        Mark In Progress
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange("closed")}>
                        Close Ticket
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Priority</p>
                    <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Details about the user who created this ticket</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-medium">{ticket.user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{ticket.user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
              <CardDescription>Message history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${message.isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      message.isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}