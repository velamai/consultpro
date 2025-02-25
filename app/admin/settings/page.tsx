"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Settings, ArrowLeft, CreditCard, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"

const settingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  supportEmail: z.string().email("Please enter a valid email"),
  enableNotifications: z.boolean(),
  enableMaintenanceMode: z.boolean(),
})

const paymentSchema = z.object({
  razorpayKeyId: z.string().min(1, "Razorpay Key ID is required"),
  razorpayKeySecret: z.string().min(1, "Razorpay Key Secret is required"),
  cashfreeAppId: z.string().min(1, "Cashfree App ID is required"),
  cashfreeSecretKey: z.string().min(1, "Cashfree Secret Key is required"),
  enableTestMode: z.boolean(),
})

const meetingSchema = z.object({
  zoomApiKey: z.string().min(1, "Zoom API Key is required"),
  zoomApiSecret: z.string().min(1, "Zoom API Secret is required"),
  zoomAccountId: z.string().min(1, "Zoom Account ID is required"),
  enableRecording: z.boolean(),
  enableWaitingRoom: z.boolean(),
})

export default function AdminSettings() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("general")

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      toast.error("Unauthorized access")
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const generalForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "ConsultPro",
      supportEmail: "support@consultpro.com",
      enableNotifications: true,
      enableMaintenanceMode: false,
    },
  })

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      razorpayKeyId: "",
      razorpayKeySecret: "",
      cashfreeAppId: "",
      cashfreeSecretKey: "",
      enableTestMode: true,
    },
  })

  const meetingForm = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      zoomApiKey: "",
      zoomApiSecret: "",
      zoomAccountId: "",
      enableRecording: true,
      enableWaitingRoom: true,
    },
  })

  async function onGeneralSubmit(values: z.infer<typeof settingsSchema>) {
    try {
      console.log(values)
      toast.success("General settings updated successfully")
    } catch (error) {
      toast.error("Failed to update settings")
    }
  }

  async function onPaymentSubmit(values: z.infer<typeof paymentSchema>) {
    try {
      console.log(values)
      toast.success("Payment gateway settings updated successfully")
    } catch (error) {
      toast.error("Failed to update payment settings")
    }
  }

  async function onMeetingSubmit(values: z.infer<typeof meetingSchema>) {
    try {
      console.log(values)
      toast.success("Meeting settings updated successfully")
    } catch (error) {
      toast.error("Failed to update meeting settings")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Admin Settings</h1>
            <p className="text-muted-foreground">Manage platform settings and configurations</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
            <TabsTrigger value="meeting">Meeting Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure basic platform settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="enableNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notifications</FormLabel>
                            <FormDescription>
                              Enable email notifications for system events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="enableMaintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Maintenance Mode</FormLabel>
                            <FormDescription>
                              Enable maintenance mode for the platform
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Save General Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Gateway Settings
                </CardTitle>
                <CardDescription>Configure payment gateway credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...paymentForm}>
                  <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Razorpay Configuration</h3>
                      <FormField
                        control={paymentForm.control}
                        name="razorpayKeyId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key ID</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="razorpayKeySecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Secret</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Cashfree Configuration</h3>
                      <FormField
                        control={paymentForm.control}
                        name="cashfreeAppId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>App ID</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="cashfreeSecretKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secret Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={paymentForm.control}
                      name="enableTestMode"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Test Mode</FormLabel>
                            <FormDescription>
                              Enable test mode for payment gateways
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Save Payment Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meeting">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Meeting Settings
                </CardTitle>
                <CardDescription>Configure video meeting settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...meetingForm}>
                  <form onSubmit={meetingForm.handleSubmit(onMeetingSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Zoom Configuration</h3>
                      <FormField
                        control={meetingForm.control}
                        name="zoomApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={meetingForm.control}
                        name="zoomApiSecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Secret</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={meetingForm.control}
                        name="zoomAccountId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account ID</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={meetingForm.control}
                      name="enableRecording"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Meeting Recording</FormLabel>
                            <FormDescription>
                              Automatically record all meetings
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={meetingForm.control}
                      name="enableWaitingRoom"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Waiting Room</FormLabel>
                            <FormDescription>
                              Enable waiting room for all meetings
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Save Meeting Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}