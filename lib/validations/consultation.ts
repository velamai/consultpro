import * as z from "zod"

export const consultationSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email"),
  date: z.date({
    required_error: "Please select a date",
  }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Please select a future date"),
  time: z.string().min(1, "Please select a time"),
  duration: z.string().min(1, "Please select duration"),
  notes: z.string().optional(),
  documents: z.any().optional()
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>