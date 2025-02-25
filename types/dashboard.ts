import { LucideIcon } from "lucide-react"

export interface StatsCard {
  title: string
  value: string
  icon: LucideIcon
  change: string
  onClick?: () => void
}