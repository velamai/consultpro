"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const orderId = searchParams.get("order_id")
  const paymentStatus = searchParams.get("payment_status")

  useEffect(() => {
    // Verify payment status with backend
    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        })

        if (!response.ok) {
          throw new Error("Payment verification failed")
        }

        // Handle successful verification
      } catch (error) {
        console.error("Payment verification error:", error)
      }
    }

    if (orderId && paymentStatus) {
      verifyPayment()
    }
  }, [orderId, paymentStatus])

  const isSuccess = paymentStatus === "SUCCESS"

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {isSuccess ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                Payment Successful
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-500" />
                Payment Failed
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground">
                {isSuccess
                  ? "Your consultation has been scheduled successfully."
                  : "There was an issue processing your payment. Please try again."}
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Order ID: {orderId}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Button onClick={() => router.push("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}