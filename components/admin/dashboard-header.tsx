"use client"

import { Search, LayoutGrid, LayoutList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onSearch: (query: string) => void
}

export function DashboardHeader({ 
  viewMode, 
  onViewModeChange,
  onSearch 
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search users, bookings..." 
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
          >
            <LayoutList className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}