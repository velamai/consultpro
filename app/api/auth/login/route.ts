import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for login request
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = loginSchema.parse(body)
    
    // Check admin credentials
    if (validatedData.email === "admin@test.com" && validatedData.password === "Admin@123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "admin-123",
          email: validatedData.email,
          role: "admin",
          name: "Admin User"
        }
      })
    }
    
    // Check user credentials
    if (validatedData.email === "user@test.com" && validatedData.password === "User@123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "user-123",
          email: validatedData.email,
          role: "user",
          name: "Test User"
        }
      })
    }

    // If credentials don't match
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}