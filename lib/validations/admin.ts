import * as z from "zod"

export const adminSearchSchema = z.object({
  search: z.string().min(2, {
    message: "Search term must be at least 2 characters",
  }),
})

export type AdminSearchValues = z.infer<typeof adminSearchSchema>