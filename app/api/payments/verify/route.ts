import { NextResponse } from "next/server"
import { z } from "zod"

const cashfreeApiKey = process.env.CASHFREE_API_KEY || ""
const cashfreeSecretKey = process.env.CASHFREE_SECRET_KEY || ""
const cashfreeBaseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.cashfree.com/pg"
  : "https://sandbox.cashfree.com/pg"

const verifySchema = z.object({
  orderId: z.string()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId } = verifySchema.parse(body)

    const response = await fetch(`${cashfreeBaseUrl}/orders/${orderId}`, {
      headers: {
        "x-api-version": "2022-09-01",
        "x-client-id": cashfreeApiKey,
        "x-client-secret": cashfreeSecretKey
      }
    })

    if (!response.ok) {
      throw new Error("Failed to verify payment")
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Payment verification error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Failed to verify payment" },
      { status: 500 }
    )
  }
}