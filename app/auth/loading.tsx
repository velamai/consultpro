"use client"

import { FormSkeleton } from "@/components/skeletons/form-skeleton"

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <FormSkeleton />
      </div>
    </div>
  )
}