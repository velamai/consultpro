import { NextResponse } from "next/server"
import { z } from "zod"

const sessionSchema = z.object({
  orderId: z.string(),
  orderAmount: z.number(),
  orderCurrency: z.string(),
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
    const validatedData = sessionSchema.parse(body)

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
        "x-client-id": process.env.CASHFREE_APP_ID || "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY || ""
      },
      body: JSON.stringify({
        order_id: validatedData.orderId,
        order_amount: validatedData.orderAmount,
        order_currency: validatedData.orderCurrency,
        customer_details: {
          customer_id: validatedData.customerDetails.customerId,
          customer_email: validatedData.customerDetails.customerEmail,
          customer_phone: validatedData.customerDetails.customerPhone,
          customer_name: validatedData.customerDetails.customerName
        },
        order_meta: {
          return_url: `${request.headers.get("origin")}/payment/callback?order_id={order_id}`
        }
      })
    })

    if (!response.ok) {
      throw new Error("Failed to create Cashfree order")
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Payment session error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Failed to create payment session" },
      { status: 500 }
    )
  }
}