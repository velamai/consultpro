"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Calendar as CalendarIcon, Clock, User, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PaymentDialog } from "@/components/consultation/payment-dialog"
import { ConsultationFormValues, consultationSchema } from "@/lib/validations/consultation"

interface BookingFormProps {
  onSubmit: (data: ConsultationFormValues) => void
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<Partial<ConsultationFormValues>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      time: "",
      duration: "",
      notes: ""
    },
  })

  const handleConsultationSubmit = async (data: ConsultationFormValues) => {
    setFormData({ ...data, documents: selectedFile })
    setShowPayment(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success("File uploaded successfully")
    }
  }

  const handlePaymentComplete = () => {
    if (formData) {
      onSubmit(formData as ConsultationFormValues)
    }
    setIsOpen(false)
    setShowPayment(false)
    form.reset()
    setSelectedFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        setShowPayment(false)
        form.reset()
        setSelectedFile(null)
      }
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Schedule Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh] rounded-lg">
        {!showPayment ? (
          <>
            <DialogHeader>
              <DialogTitle>Schedule New Consultation</DialogTitle>
              <DialogDescription>
                Fill in the details for your consultation session
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleConsultationSubmit)} className="space-y-6 py-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Enter client name" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input type="email" placeholder="Enter client email" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input type="time" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="number"
                            min="15"
                            step="15"
                            placeholder="Enter duration in minutes"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Upload Documents</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        {selectedFile ? selectedFile.name : "Upload Documents"}
                      </Button>
                    </div>
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX
                  </p>
                </FormItem>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Proceed to Payment
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <PaymentDialog
            formData={formData}
            onBack={() => setShowPayment(false)}
            onComplete={handlePaymentComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}