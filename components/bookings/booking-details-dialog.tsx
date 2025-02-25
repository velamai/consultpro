"use client"

import { Calendar, Clock, User, Mail, Phone, CreditCard, FileText, CheckCircle, XCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { toast } from "sonner"

interface BookingDetails {
  id: string
  user: {
    name: string
    email: string
    phone: string
  }
  service: string
  date: string
  time: string
  duration: string
  status: string
  consultant: string
  paymentStatus: string
  paymentId: string
  amount: number
  notes?: string
  meetingLink?: string
}

interface BookingDetailsDialogProps {
  booking: BookingDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDetailsDialog({
  booking,
  open,
  onOpenChange
}: BookingDetailsDialogProps) {
  if (!booking) return null

  const handleStatusChange = (newStatus: string) => {
    toast.success(`Booking status updated to ${newStatus}`)
  }

  const handleJoinMeeting = () => {
    if (booking.meetingLink) {
      window.open(booking.meetingLink, '_blank')
    } else {
      toast.error("Meeting link not available")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>View and manage booking information</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <Card>
            <CardContent className="grid gap-6 pt-4">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Time & Duration</p>
                        <p className="font-medium">{booking.time} ({booking.duration})</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Service</p>
                        <p className="font-medium">{booking.service}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Consultant</p>
                        <p className="font-medium">{booking.consultant}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                      <div className="flex gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange("confirmed")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange("cancelled")}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  className="ml-4" 
                  onClick={handleJoinMeeting}
                  disabled={!booking.meetingLink || booking.status !== "confirmed"}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              </div>

              <div className="grid gap-4 pt-4">
                <h3 className="text-lg font-semibold">Client Information</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-medium">{booking.user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{booking.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="font-medium">{booking.user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 pt-4">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Payment ID</p>
                      <p className="font-medium">{booking.paymentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Amount</p>
                      <p className="font-medium">${booking.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="grid gap-4 pt-4">
                  <h3 className="text-lg font-semibold">Additional Notes</h3>
                  <p className="text-sm">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}