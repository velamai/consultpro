"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Calendar as CalendarIcon, User, Mail, AlertCircle } from "lucide-react"

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

const consultationSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email"),
  date: z.date({
    required_error: "Please select a date",
  }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Please select a future date"),
  notes: z.string().optional(),
  documents: z.any().optional()
})

type ConsultationFormValues = z.infer<typeof consultationSchema>

interface ConsultationFormProps {
  onSubmit?: (data: ConsultationFormValues) => void
}

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const consultationForm = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      notes: ""
    },
  })

  const handleConsultationSubmit = async (data: ConsultationFormValues) => {
    const fileurl = selectedFile ? "https://example.com/file.pdf" : "https://example.com/default.pdf" // Default file URL

    const payload = {
      name: data.clientName,
      email: data.clientEmail,
      calendarDate: format(data.date, "yyyy-MM-dd"),
      fileurl: fileurl,
    }

    try {
      const response = await fetch("https://consultpro.ksangeeth76.workers.dev/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit consultation")
      }

      const result = await response.json()
      toast.success("Consultation scheduled successfully!")
      setIsOpen(false)
      consultationForm.reset()
      setSelectedFile(null)
    } catch (error) {
      console.error("Failed to schedule consultation:", error)
      toast.error("Failed to schedule consultation. Please try again.")
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success("File uploaded successfully")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        consultationForm.reset()
        setSelectedFile(null)
      }
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Schedule Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh] rounded-lg">
        <DialogHeader>
          <DialogTitle>Schedule New Consultation</DialogTitle>
          <DialogDescription>
            Fill in the details for your consultation session
          </DialogDescription>
        </DialogHeader>

        <Form {...consultationForm}>
          <form onSubmit={consultationForm.handleSubmit(handleConsultationSubmit)} className="space-y-6 py-4">
            <FormField
              control={consultationForm.control}
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
              control={consultationForm.control}
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
              control={consultationForm.control}
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
                          onClick={() => {
                            if (field.value) {
                              field.onChange(null)
                            }
                          }}
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
                        onSelect={(date) => {
                          field.onChange(date)
                          document.body.click() // Close the calendar
                        }}
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}