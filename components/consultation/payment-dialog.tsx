"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ConsultationFormValues } from "@/lib/validations/consultation"
import { toast } from "sonner"
import { initCashfree, openCashfreeCheckout } from "@/lib/cashfree"
import { initRazorpay, openRazorpayCheckout } from "@/lib/razorpay"
import { formatINR } from "@/lib/utils"

interface PaymentDialogProps {
  formData: Partial<ConsultationFormValues>
  onBack: () => void
  onComplete: () => void
}

export function PaymentDialog({ formData, onBack, onComplete }: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<'razorpay' | 'cashfree' | null>(null)

  const calculatePrice = (duration: string) => {
    const minutes = parseInt(duration) || 0
    const ratePerMinute = 200 // ₹200 per minute
    return minutes * ratePerMinute
  }

  const handleCashfreePayment = async () => {
    try {
      setIsProcessing(true)
      const amount = calculatePrice(formData.duration || "0")
      
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
        onComplete()
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
      const amount = calculatePrice(formData.duration || "0")

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

      // Verify payment on success
      if (response.razorpay_payment_id) {
        toast.success("Payment successful!")
        onComplete()
      }
    } catch (error) {
      console.error("Razorpay error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (selectedMethod === 'razorpay') {
      handleRazorpayPayment()
    } else {
      handleCashfreePayment()
    }
  }

  return (
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
              <p className="text-lg font-bold">Total: {formatINR(calculatePrice(formData.duration || "0"))}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Payment Method</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedMethod === 'razorpay' ? 'default' : 'outline'}
              className="h-24 flex flex-col items-center justify-center gap-2 relative"
              onClick={() => setSelectedMethod('razorpay')}
            >
              <Image
                src="https://razorpay.com/assets/razorpay-logo.svg"
                alt="Razorpay"
                width={120}
                height={30}
                className="mb-2"
              />
              <span className="text-sm">Pay with Razorpay</span>
            </Button>

            <Button
              variant={selectedMethod === 'cashfree' ? 'default' : 'outline'}
              className="h-24 flex flex-col items-center justify-center gap-2 relative"
              onClick={() => setSelectedMethod('cashfree')}
            >
              <Image
                src="https://www.cashfree.com/images/logo.svg"
                alt="Cashfree"
                width={120}
                height={30}
                className="mb-2"
              />
              <span className="text-sm">Pay with Cashfree</span>
            </Button>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing || !selectedMethod}
            className="w-full h-12"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Your payment is secured by {selectedMethod === 'razorpay' ? 'Razorpay' : 'Cashfree'}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isProcessing}
          >
            Back
          </Button>
        </div>
      </div>
    </>
  )
}