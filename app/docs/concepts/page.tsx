"use client"

import Link from "next/link"
import { ArrowLeft, Book, Users, Calendar, Video, CreditCard, Shield, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ConceptsPage() {
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
                <Book className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Core Concepts</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Understanding ConsultPro</h1>
            <p className="text-xl text-muted-foreground">
              Learn about the core concepts and architecture of the ConsultPro platform.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>What is ConsultPro?</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <p>
                  ConsultPro is a comprehensive consultation management platform that connects experts with clients seeking professional guidance. The platform streamlines the entire consultation process, from booking to payment processing and video conferencing.
                </p>
                <h3 className="text-lg font-semibold mt-4">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Advanced scheduling system</li>
                  <li>Secure video consultations</li>
                  <li>Integrated payment processing</li>
                  <li>User management and authentication</li>
                  <li>Real-time notifications</li>
                  <li>Analytics and reporting</li>
                </ul>
              </CardContent>
            </Card>

            {/* Core Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Core Components
                </CardTitle>
                <CardDescription>Main building blocks of the platform</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">User Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Handles user authentication, roles (client/consultant/admin), and profile management. Supports email-based authentication and role-based access control.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Scheduling System</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manages consultation bookings, availability, and calendar synchronization. Supports timezone handling and conflict prevention.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <Video className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Video Consultations</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Integrated video conferencing system with recording capabilities, screen sharing, and chat functionality.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Payment Processing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Secure payment handling with support for multiple payment methods, refunds, and automated reconciliation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Architecture */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Architecture</CardTitle>
                <CardDescription>System design and technology stack</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Frontend</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Next.js 13+ with App Router</li>
                      <li>React Server Components</li>
                      <li>Tailwind CSS for styling</li>
                      <li>shadcn/ui component library</li>
                      <li>TypeScript for type safety</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Backend Services</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>API Routes for server-side logic</li>
                      <li>Database integration with Supabase</li>
                      <li>Real-time updates using WebSocket</li>
                      <li>Secure authentication system</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Third-party Integrations</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Zoho Meet for video consultations</li>
                      <li>Cashfree for payment processing</li>
                      <li>Email service for notifications</li>
                      <li>Calendar integrations (Google, Outlook)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Model
                </CardTitle>
                <CardDescription>Security architecture and practices</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    ConsultPro implements a comprehensive security model to protect user data and ensure secure communications:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>End-to-end encryption for video consultations</li>
                    <li>Secure authentication with JWT tokens</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>PCI-compliant payment processing</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>GDPR and HIPAA compliance measures</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Support System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Support System
                </CardTitle>
                <CardDescription>User support and assistance</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert">
                <div className="space-y-4">
                  <p>
                    The platform includes a robust support system to assist users:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ticket-based support system</li>
                    <li>Real-time chat support</li>
                    <li>Knowledge base and FAQs</li>
                    <li>Email support</li>
                    <li>Admin dashboard for support management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}