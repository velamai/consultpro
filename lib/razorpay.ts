import { loadScript } from "@/lib/utils"

interface CustomerDetails {
  customerId: string
  customerEmail: string
  customerPhone: string
  customerName: string
}

interface RazorpaySessionParams {
  orderId: string
  amount: number
  currency: string
  customerDetails: CustomerDetails
}

export async function initRazorpay(params: RazorpaySessionParams) {
  try {
    // Load Razorpay script
    await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    // Create order on your backend
    const response = await fetch("/api/payments/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Razorpay initialization error:", error)
    throw error
  }
}

export function openRazorpayCheckout(options: any) {
  return new Promise((resolve, reject) => {
    const rzp = new (window as any).Razorpay({
      ...options,
      handler: (response: any) => {
        resolve(response)
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Checkout closed by user"))
        }
      }
    })
    rzp.open()
  })
}