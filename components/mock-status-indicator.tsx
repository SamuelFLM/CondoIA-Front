"use client"

import { CloudOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function MockStatusIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs", className)}>
      <CloudOff className="h-3.5 w-3.5 text-blue-500" />
      <span className="text-muted-foreground">Modo Mock</span>
    </div>
  )
}
