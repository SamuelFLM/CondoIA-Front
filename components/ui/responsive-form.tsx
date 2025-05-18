"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMobileDetect } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ResponsiveFormProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  contentClassName?: string
  footerClassName?: string
}

export function ResponsiveForm({
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
  footerClassName,
}: ResponsiveFormProps) {
  const { isMobile } = useMobileDetect()

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
        {description && <CardDescription className="text-sm sm:text-base">{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("space-y-4 px-4 sm:px-6", contentClassName)}>
        <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-2")}>{children}</div>
      </CardContent>
      {footer && (
        <CardFooter
          className={cn(
            "flex gap-2 px-4 sm:px-6 py-4",
            isMobile ? "flex-col items-stretch" : "flex-row items-center justify-end",
            footerClassName,
          )}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
