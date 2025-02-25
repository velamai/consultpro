"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Chrome } from "lucide-react"

interface SocialAuthProps {
  mode: "login" | "signup"
}

export function SocialAuth({ mode }: SocialAuthProps) {
  const handleGoogleAuth = async () => {
    // TODO: Implement Google authentication
    console.log("Google auth")
  }

  const handleFacebookAuth = async () => {
    // TODO: Implement Facebook authentication
    console.log("Facebook auth")
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleGoogleAuth}
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          onClick={handleFacebookAuth}
          className="w-full"
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>
    </div>
  )
}