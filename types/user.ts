export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  joinedDate: string
  consultationsBooked: number
  lastConsultation?: string
  totalSpent: number
}