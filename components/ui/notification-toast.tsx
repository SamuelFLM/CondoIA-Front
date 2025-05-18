"use client"

import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

export interface NotificationProps {
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
  onClose?: () => void
}

export function showNotificationToast({ type, title, message, duration = 5000, onClose }: NotificationProps) {
  const variant = type === "error" ? "destructive" : "default"

  let icon
  switch (type) {
    case "success":
      icon = <CheckCircle className="h-5 w-5 text-green-500" />
      break
    case "error":
      icon = <AlertCircle className="h-5 w-5 text-destructive" />
      break
    case "warning":
      icon = <AlertTriangle className="h-5 w-5 text-amber-500" />
      break
    case "info":
    default:
      icon = <Info className="h-5 w-5 text-blue-500" />
      break
  }

  toast({
    variant,
    title,
    description: message,
    duration,
    action: icon,
  })

  if (onClose && duration > 0) {
    setTimeout(onClose, duration)
  }
}

export function NotificationToast(props: NotificationProps) {
  useEffect(() => {
    showNotificationToast(props)
  }, [])

  return null
}
