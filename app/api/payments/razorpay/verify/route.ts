import { NextResponse } from "next/server"
import { z } from "zod"
import crypto from "crypto"

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verifySchema.parse(body)

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(text)
      .digest("hex")

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully"
      })
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      )
    }

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