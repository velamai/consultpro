"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, CreditCard, Calendar as CalendarIcon, Clock, User, Mail, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { initCashfree, openCashfreeCheckout } from "@/lib/cashfree"
import { initRazorpay, openRazorpayCheckout } from "@/lib/razorpay"

const consultationSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email"),
  date: z.date({
    required_error: "Please select a date",
  }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Please select a future date"),
  time: z.string().min(1, "Please select a time"),
  duration: z.string().min(1, "Please select duration"),
  notes: z.string().optional(),
  documents: z.any().optional()
})

type ConsultationFormValues = z.infer<typeof consultationSchema>

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormValues) => void
}

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<Partial<ConsultationFormValues>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cashfree' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const consultationForm = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      time: "",
      duration: "",
      notes: ""
    },
  })

  const calculatePrice = (duration: string) => {
    const minutes = parseInt(duration) || 0
    const ratePerMinute = 2.5 // $2.50 per minute
    return (minutes * ratePerMinute).toFixed(2)
  }

  const handleConsultationSubmit = async (data: ConsultationFormValues) => {
    setFormData({ ...data, documents: selectedFile })
    setShowPayment(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success("File uploaded successfully")
    }
  }

  const handleCashfreePayment = async () => {
    try {
      setIsProcessing(true)
      const amount = parseFloat(calculatePrice(formData.duration || "0"))
      
      // Initialize Cashfree payment session
      const session = await initCashfree({
        orderId: `ORDER-${Date.now()}`,
        orderAmount: amount,
        orderCurrency: "INR",
        customerDetails: {
          customerId: `CUST-${Date.now()}`,
          customerEmail: formData.clientEmail || "",
          customerPhone: "9999999999", // Required by Cashfree
          customerName: formData.clientName || ""
        }
      })

      if (!session.payment_session_id) {
        throw new Error("Failed to initialize payment")
      }

      // Open Cashfree checkout
      const result = await openCashfreeCheckout(session.payment_session_id, session)

      if (result.order_status === "PAID") {
        toast.success("Payment successful!")
        setIsOpen(false)
        if (formData) {
          onSubmit(formData as ConsultationFormValues)
        }
      } else {
        throw new Error("Payment failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true)
      const amount = parseFloat(calculatePrice(formData.duration || "0"))

      // Initialize Razorpay order
      const order = await initRazorpay({
        orderId: `ORDER-${Date.now()}`,
        amount: amount,
        currency: "INR",
        customerDetails: {
          customerId: `CUST-${Date.now()}`,
          customerEmail: formData.clientEmail || "",
          customerPhone: "9999999999",
          customerName: formData.clientName || ""
        }
      })

      // Open Razorpay checkout
      const response = await openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "ConsultPro",
        description: "Consultation Session Payment",
        order_id: order.id,
        prefill: {
          name: formData.clientName,
          email: formData.clientEmail,
          contact: "9999999999"
        },
        theme: {
          color: "#000000"
        }
      })

      if (response.razorpay_payment_id) {
        toast.success("Payment successful!")
        setIsOpen(false)
        if (formData) {
          onSubmit(formData as ConsultationFormValues)
        }
      }
    } catch (error) {
      console.error("Razorpay error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (paymentMethod === 'cashfree') {
      handleCashfreePayment()
    } else {
      handleRazorpayPayment()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        setShowPayment(false)
        consultationForm.reset()
        setSelectedFile(null)
        setPaymentMethod(null)
      }
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Schedule Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh] rounded-lg">
        {!showPayment ? (
          <>
            <DialogHeader>
              <DialogTitle>Schedule New Consultation</DialogTitle>
              <DialogDescription>
                Fill in the details for your consultation session
              </DialogDescription>
            </DialogHeader>

            <Form {...consultationForm}>
              <form onSubmit={consultationForm.handleSubmit(handleConsultationSubmit)} className="space-y-6 py-4">
                <FormField
                  control={consultationForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Enter client name" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={consultationForm.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input type="email" placeholder="Enter client email" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={consultationForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              onClick={() => {
                                if (field.value) {
                                  field.onChange(null)
                                }
                              }}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              document.body.click() // Close the calendar
                            }}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={consultationForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input type="time" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={consultationForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="number"
                            min="15"
                            step="15"
                            placeholder="Enter duration in minutes"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Upload Documents</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        {selectedFile ? selectedFile.name : "Upload Documents"}
                      </Button>
                    </div>
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX
                  </p>
                </FormItem>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Proceed to Payment
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Complete your payment to confirm the consultation</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Summary</CardTitle>
                  <CardDescription>Review your consultation details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {formData.clientName}</p>
                    <p><span className="font-medium">Date:</span> {formData.date?.toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {formData.time}</p>
                    <p><span className="font-medium">Duration:</span> {formData.duration} minutes</p>
                    <p className="text-lg font-bold">Total: ${calculatePrice(formData.duration || "0")}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={paymentMethod === 'razorpay' ? 'default' : 'outline'}
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => setPaymentMethod('razorpay')}
                  >
                    <CreditCard className="h-8 w-8" />
                    <span>Razorpay</span>
                  </Button>

                  <Button
                    variant={paymentMethod === 'cashfree' ? 'default' : 'outline'}
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => setPaymentMethod('cashfree')}
                  >
                    <CreditCard className="h-8 w-8" />
                    <span>Cashfree</span>
                  </Button>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !paymentMethod}
                  className="w-full h-12"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Your payment is secured by {paymentMethod === 'razorpay' ? 'Razorpay' : 'Cashfree'}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                  disabled={isProcessing}
                >
                  Back
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}