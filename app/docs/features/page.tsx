"use client"

import Link from "next/link"
import { ArrowLeft, Code, FileText, Shield, Zap, Bug, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/docs">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Technical Features</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Technical Implementation</h1>
            <p className="text-xl text-muted-foreground">
              Detailed overview of key technical features and best practices implemented in ConsultPro.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Component Size */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Component Size Management
                </CardTitle>
                <CardDescription>Maintaining code quality through modular components</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    All components are kept under 200 lines of code to ensure maintainability and readability.
                    This is achieved through:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Separation of concerns with dedicated components for specific functionality</li>
                    <li>Component composition for complex features</li>
                    <li>Reusable UI components in the components/ui directory</li>
                    <li>Custom hooks for shared logic</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">Example component structure:</p>
                    <pre className="text-sm">
                      {`components/
├── admin/
│   ├── StatsOverview.tsx     (~100 lines)
│   └── DashboardHeader.tsx   (~80 lines)
├── users/
│   ├── UserInfo.tsx          (~120 lines)
│   ├── UserActions.tsx       (~90 lines)
│   └── UserEditForm.tsx      (~150 lines)`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TypeScript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  TypeScript Strict Mode
                </CardTitle>
                <CardDescription>Type safety across the application</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    Strict TypeScript configuration ensures type safety throughout the application:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Strict type checking enabled in tsconfig.json</li>
                    <li>Interface definitions for all data structures</li>
                    <li>Type-safe event handlers and form submissions</li>
                    <li>Proper typing for API responses and requests</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">Example type definitions:</p>
                    <pre className="text-sm">
                      {`interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
}

interface StatsCard {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  onClick?: () => void;
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Zod Validation
                </CardTitle>
                <CardDescription>Comprehensive data validation</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    Zod schemas provide robust validation for both frontend and backend:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Form validation with detailed error messages</li>
                    <li>API request/response validation</li>
                    <li>Runtime type checking</li>
                    <li>Custom validation rules</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">Example validation schema:</p>
                    <pre className="text-sm">
                      {`const loginSchema = z.object({
  email: z.string()
    .email("Invalid email")
    .min(5, "Email too short"),
  password: z.string()
    .min(8, "Password too short")
    .regex(/[A-Z]/, "Need uppercase")
    .regex(/[0-9]/, "Need number")
})`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Handling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-primary" />
                  Error Handling
                </CardTitle>
                <CardDescription>Comprehensive error management system</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    Structured error handling across the application:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Custom APIError class for consistent error responses</li>
                    <li>HTTP status codes mapping to specific errors</li>
                    <li>Toast notifications for user feedback</li>
                    <li>Form validation error display</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">Example error handling:</p>
                    <pre className="text-sm">
                      {`class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
  }

  static badRequest(message: string) {
    return new APIError(400, message)
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  Cypress Testing
                </CardTitle>
                <CardDescription>End-to-end testing coverage</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    Comprehensive test coverage with Cypress:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Authentication flows testing</li>
                    <li>User journey testing</li>
                    <li>Admin dashboard testing</li>
                    <li>Form validation testing</li>
                    <li>API integration testing</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">Example test suite:</p>
                    <pre className="text-sm">
                      {`describe('Auth Flow', () => {
  it('should login', () => {
    cy.visit('/auth/login')
    cy.get('[name="email"]')
      .type('test@example.com')
    cy.get('[name="password"]')
      .type('password123')
    cy.get('button').click()
    cy.url().should('include', 
      '/dashboard')
  })
})`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}