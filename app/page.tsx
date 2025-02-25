"use client"

import Link from "next/link"
import { Calendar, Clock, Star, Users, Video, CreditCard, Shield, Globe, Check, Wallet, RefreshCw, Book, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ConsultPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/docs">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Documentation
                </Button>
              </Link>
              <Link href="/api">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  API
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Expert Consultants,<br />Just a Click Away
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top-tier consultants for personalized guidance in business, 
            finance, and strategy. Book your session today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="text-lg">
              Book a Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              View All Experts
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Book appointments that fit your schedule with our easy-to-use calendar
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Star className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Verified Experts</CardTitle>
                <CardDescription>
                  All consultants are thoroughly vetted and highly rated
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Instant Booking</CardTitle>
                <CardDescription>
                  Secure your consultation slot instantly with real-time availability
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Powered by Advanced Technology</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We use cutting-edge technology to provide you with a seamless consultation experience
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Zoho Meet Card */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <Video className="h-8 w-8 text-primary" />
                  <CardTitle>Zoho Meet Integration</CardTitle>
                </div>
                <CardDescription className="text-lg font-medium text-gray-900">
                  Crystal Clear Video Consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Browser-Based Solution</h4>
                        <p className="text-gray-600">No downloads required - works right in your browser</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">End-to-End Encryption</h4>
                        <p className="text-gray-600">Complete privacy and security for all consultations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Session Recording</h4>
                        <p className="text-gray-600">Automatic recording for future reference</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cashfree Card */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <CardTitle>Cashfree Payments</CardTitle>
                </div>
                <CardDescription className="text-lg font-medium text-gray-900">
                  Secure and Seamless Payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Bank-Grade Security</h4>
                        <p className="text-gray-600">Enterprise-level security for all transactions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Multiple Payment Methods</h4>
                        <p className="text-gray-600">Cards, UPI, net banking, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Instant Processing</h4>
                        <p className="text-gray-600">Quick refunds and automated reconciliation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust our platform for expert consultation
          </p>
          <Button size="lg" variant="secondary" className="text-primary">
            Book Your First Session
          </Button>
        </div>
      </section>
    </div>
  )
}