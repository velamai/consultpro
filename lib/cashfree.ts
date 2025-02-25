import { loadScript } from "@/lib/utils"

interface CustomerDetails {
  customerId: string
  customerEmail: string
  customerPhone: string
  customerName: string
}

interface CashfreeSessionParams {
  orderId: string
  orderAmount: number
  orderCurrency: string
  customerDetails: CustomerDetails
}

export async function initCashfree(params: CashfreeSessionParams) {
  try {
    // Load Cashfree SDK
    await loadScript("https://sdk.cashfree.com/js/v3/cashfree.js")

    const response = await fetch("/api/payments/cashfree/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Failed to create payment session")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Cashfree initialization error:", error)
    throw error
  }
}

export function openCashfreeCheckout(sessionId: string, orderDetails: any) {
  return new Promise((resolve, reject) => {
    const cashfree = new (window as any).Cashfree()
    
    cashfree.initialiseDropin({
      sessionId: sessionId,
      orderToken: orderDetails.order_token,
      parentElement: document.body,
      theme: "#000000",
      style: {
        backgroundColor: "#ffffff",
        color: "#11111",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        errorColor: "#ff0000",
        theme: "light"
      },
      onSuccess: (data: any) => {
        resolve(data)
      },
      onFailure: (error: any) => {
        reject(error)
      },
      onClose: () => {
        reject(new Error("Checkout closed by user"))
      },
    })
  })
}