"use client"

import Link from "next/link"
import { ArrowLeft, Code, Copy, Check, Terminal, Shield, Zap, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"

export default function APIPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

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
                <Code className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">API Reference</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/docs">
                <Button variant="outline" className="flex items-center gap-2">
                  Documentation
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
            <h1 className="text-4xl font-bold mb-4">ConsultPro API</h1>
            <p className="text-xl text-muted-foreground">
              Integrate ConsultPro's powerful features into your applications.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Authentication
                </CardTitle>
                <CardDescription>Secure your API requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY", "auth")}
                      >
                        {copiedEndpoint === "auth" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Include this header in all API requests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Endpoints
                </CardTitle>
                <CardDescription>Available API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">GET</span>
                        <code className="text-sm">/api/v1/consultations</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("/api/v1/consultations", "consultations")}
                      >
                        {copiedEndpoint === "consultations" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      List all consultations
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">POST</span>
                        <code className="text-sm">/api/v1/consultations</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("/api/v1/consultations", "create-consultation")}
                      >
                        {copiedEndpoint === "create-consultation" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Create a new consultation
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">PUT</span>
                        <code className="text-sm">/api/v1/consultations/:id</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("/api/v1/consultations/:id", "update-consultation")}
                      >
                        {copiedEndpoint === "update-consultation" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update an existing consultation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Rate Limiting
                  </CardTitle>
                  <CardDescription>API request limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Free tier:</span> 100 requests/hour
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Pro tier:</span> 1000 requests/hour
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Enterprise tier:</span> Custom limits
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    Webhooks
                  </CardTitle>
                  <CardDescription>Real-time notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Consultation created</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Consultation updated</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Payment processed</span>
                    </p>
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