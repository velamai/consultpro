"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ButtonLoader({
  loading = false,
  children,
  className,
  disabled,
  variant = "default",
  ...props
}: ButtonLoaderProps) {
  return (
    <Button
      className={cn(className)}
      disabled={loading || disabled}
      variant={variant}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}