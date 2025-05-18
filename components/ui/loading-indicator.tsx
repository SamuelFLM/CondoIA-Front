import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large"
  fullPage?: boolean
  text?: string
  className?: string
}

export function LoadingIndicator({ size = "medium", fullPage = false, text, className }: LoadingIndicatorProps) {
  const sizeMap = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  }

  const loaderSize = sizeMap[size]

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className={cn("flex flex-col items-center gap-2", className)}>
          <Loader2 className={cn("animate-spin text-primary", loaderSize)} />
          {text && <p className="text-muted-foreground text-sm">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center py-4", className)}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={cn("animate-spin text-primary", loaderSize)} />
        {text && <p className="text-muted-foreground text-sm">{text}</p>}
      </div>
    </div>
  )
}
