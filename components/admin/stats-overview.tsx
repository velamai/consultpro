"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/types/dashboard"

interface StatsOverviewProps {
  stats: StatsCard[]
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="cursor-pointer hover:bg-accent transition-colors"
          onClick={() => stat.onClick?.()}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}