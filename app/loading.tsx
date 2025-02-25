"use client"

import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <DashboardSkeleton />
    </div>
  )
}