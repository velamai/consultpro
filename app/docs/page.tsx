"use client"

import Link from "next/link"
import { ArrowLeft, Book, FileText, Code, Terminal, Puzzle, Zap, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Book className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Documentation</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/api">
                <Button variant="outline" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  API Reference
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">ConsultPro Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about using ConsultPro for your consultation needs.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription>Learn the basics of ConsultPro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link href="/docs/quickstart" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Quick Start Guide</h3>
                    <p className="text-sm text-muted-foreground">Get up and running in minutes</p>
                  </Link>
                  <Link href="/docs/concepts" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Core Concepts</h3>
                    <p className="text-sm text-muted-foreground">Understanding the platform basics</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Integration Guides
                </CardTitle>
                <CardDescription>Connect ConsultPro with your tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link href="/docs/api-integration" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">API Integration</h3>
                    <p className="text-sm text-muted-foreground">Learn how to integrate with our API</p>
                  </Link>
                  <Link href="/docs/webhooks" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Webhooks</h3>
                    <p className="text-sm text-muted-foreground">Real-time event notifications</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-primary" />
                  Features
                </CardTitle>
                <CardDescription>Explore platform capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/docs/scheduling" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Scheduling System</h3>
                    <p className="text-sm text-muted-foreground">Advanced booking management</p>
                  </Link>
                  <Link href="/docs/payments" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Payment Processing</h3>
                    <p className="text-sm text-muted-foreground">Secure payment handling</p>
                  </Link>
                  <Link href="/docs/video" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Video Consultations</h3>
                    <p className="text-sm text-muted-foreground">High-quality video meetings</p>
                  </Link>
                  <Link href="/docs/analytics" className="block p-4 rounded-lg border hover:bg-accent">
                    <h3 className="font-semibold mb-1">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Data insights and reporting</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security
                  </CardTitle>
                  <CardDescription>Security best practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Link href="/docs/security/authentication" className="block p-4 rounded-lg border hover:bg-accent">
                      <h3 className="font-semibold mb-1">Authentication</h3>
                      <p className="text-sm text-muted-foreground">User authentication guides</p>
                    </Link>
                    <Link href="/docs/security/encryption" className="block p-4 rounded-lg border hover:bg-accent">
                      <h3 className="font-semibold mb-1">Data Encryption</h3>
                      <p className="text-sm text-muted-foreground">Data protection measures</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Guides
                  </CardTitle>
                  <CardDescription>Role-specific documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Link href="/docs/guides/consultants" className="block p-4 rounded-lg border hover:bg-accent">
                      <h3 className="font-semibold mb-1">For Consultants</h3>
                      <p className="text-sm text-muted-foreground">Consultant-specific features</p>
                    </Link>
                    <Link href="/docs/guides/clients" className="block p-4 rounded-lg border hover:bg-accent">
                      <h3 className="font-semibold mb-1">For Clients</h3>
                      <p className="text-sm text-muted-foreground">Client user guides</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}