"use client"

import { useRouter } from "next/navigation"
import { Settings, Bell, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function AdminNav() {
  const router = useRouter()

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Settings className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                localStorage.removeItem("userRole")
                router.push("/auth/login")
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}