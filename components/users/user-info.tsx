"use client"

import { User } from "@/types/user"
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  BookOpen, 
  Clock, 
  Wallet 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UserInfoProps {
  user: User
}

export function UserInfo({ user }: UserInfoProps) {
  const infoItems = [
    {
      icon: UserIcon,
      label: "Name",
      value: user.name
    },
    {
      icon: Mail,
      label: "Email",
      value: user.email
    },
    {
      icon: Phone,
      label: "Phone",
      value: user.phone
    },
    {
      icon: Shield,
      label: "Role",
      value: user.role.charAt(0).toUpperCase() + user.role.slice(1)
    },
    {
      icon: Calendar,
      label: "Joined",
      value: user.joinedDate
    },
    {
      icon: BookOpen,
      label: "Consultations Booked",
      value: user.consultationsBooked.toString()
    },
    {
      icon: Clock,
      label: "Last Consultation",
      value: user.lastConsultation || "N/A"
    },
    {
      icon: Wallet,
      label: "Total Spent",
      value: `₹₹{user.totalSpent.toFixed(2)}`
    }
  ]

  return (
    <Card>
      <CardContent className="grid gap-4 pt-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}