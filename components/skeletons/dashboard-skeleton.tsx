"use client"

import { CardSkeleton } from "./card-skeleton"
import { TableSkeleton } from "./table-skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <CardSkeleton />
      <TableSkeleton />
    </div>
  )
}