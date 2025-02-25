import { NextResponse } from "next/server"
import { z } from "zod"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || ""
})

const orderSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  currency: z.string(),
  customerDetails: z.object({
    customerId: z.string(),
    customerEmail: z.string().email(),
    customerPhone: z.string(),
    customerName: z.string()
  })
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = orderSchema.parse(body)

    const order = await razorpay.orders.create({
      amount: validatedData.amount * 100, // Convert to paise
      currency: validatedData.currency,
      receipt: validatedData.orderId,
      notes: {
        customerName: validatedData.customerDetails.customerName,
        customerEmail: validatedData.customerDetails.customerEmail
      }
    })

    return NextResponse.json(order)

  } catch (error) {
    console.error("Razorpay order creation error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    )
  }
}