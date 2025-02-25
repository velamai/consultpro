"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookingDetailsDialog } from "@/components/bookings/booking-details-dialog"
import { toast } from "sonner"

const bookings = [
  {
    id: "BKG-001",
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900"
    },
    service: "Business Strategy Consultation",
    date: "2024-03-25",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "confirmed",
    consultant: "Dr. Sarah Johnson",
    paymentStatus: "paid",
    paymentId: "PAY-123456",
    amount: 199.99,
    notes: "Client wants to discuss expansion strategies",
    meetingLink: "https://meet.zoom.us/j/123456789"
  },
  {
    id: "BKG-002",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901"
    },
    service: "Financial Planning Session",
    date: "2024-03-27",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "pending",
    consultant: "Michael Chen",
    paymentStatus: "pending",
    paymentId: "PAY-789012",
    amount: 149.99,
    meetingLink: "https://meet.zoom.us/j/987654321"
  }
]

export default function AdminBookingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")
  const [consultantFilter, setConsultantFilter] = useState<string>("all")

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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesPaymentStatus = paymentStatusFilter === "all" || booking.paymentStatus === paymentStatusFilter
    const matchesConsultant = consultantFilter === "all" || booking.consultant === consultantFilter

    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesConsultant
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Get unique consultants for filter
  const consultants = Array.from(new Set(bookings.map(booking => booking.consultant)))

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-muted-foreground">Manage consultation bookings</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>View and manage consultation bookings</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Booking status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={consultantFilter} onValueChange={setConsultantFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter consultant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Consultants</SelectItem>
                      {consultants.map((consultant) => (
                        <SelectItem key={consultant} value={consultant}>
                          {consultant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Search bookings..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking Details</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Consultant</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {booking.user.name} ({booking.user.email})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {booking.time} ({booking.duration})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{booking.consultant}</span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <BookingDetailsDialog
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => !open && setSelectedBooking(null)}
        />
      </div>
    </div>
  )
}