import * as z from "zod"

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .refine((password) => !password.includes(' '), "Password cannot contain spaces")

export const loginSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email cannot exceed 254 characters"),
  password: passwordSchema,
  rememberMe: z.boolean().optional()
})

export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email cannot exceed 254 characters"),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email cannot exceed 254 characters")
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, "Reset token is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email cannot exceed 254 characters"),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean()
})