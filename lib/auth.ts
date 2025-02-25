import { z } from "zod"

export interface User {
  id: string
  email: string
  role: string
  name: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  errors?: any[]
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Failed to login. Please try again.",
    }
  }
}

export async function logout(): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Failed to logout. Please try again.",
    }
  }
}