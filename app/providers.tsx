"use client"

import { ThemeProvider } from "next-themes"
import { usePathname } from "next/navigation"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Force light theme for landing page and auth pages
  const forceLightTheme = pathname === "/" || pathname.startsWith("/auth/")

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme={forceLightTheme ? "light" : "system"} 
      enableSystem={!forceLightTheme}
      forcedTheme={forceLightTheme ? "light" : undefined}
    >
      {children}
    </ThemeProvider>
  )
}