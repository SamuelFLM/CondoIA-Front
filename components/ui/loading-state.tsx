"use client"

import type React from "react"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingStateProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
  spinnerSize?: "sm" | "md" | "lg"
  fullHeight?: boolean
  overlay?: boolean
}

export function LoadingState({
  isLoading,
  children,
  loadingText = "Carregando...",
  className,
  spinnerSize = "md",
  fullHeight = false,
  overlay = false,
}: LoadingStateProps) {
  const spinnerSizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[spinnerSize]

  if (!isLoading) {
    return <>{children}</>
  }

  if (overlay) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className={cn("animate-spin text-primary", spinnerSizeClass)} />
            {loadingText && <p className="text-sm text-muted-foreground">{loadingText}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-4", fullHeight && "min-h-[200px]", className)}>
      <Loader2 className={cn("animate-spin text-primary mb-2", spinnerSizeClass)} />
      {loadingText && <p className="text-sm text-muted-foreground">{loadingText}</p>}
    </div>
  )
}
