"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { NotificationToast, type NotificationProps } from "@/components/ui/notification-toast"

type NotificationWithId = NotificationProps & { id: string }

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationProps, "onClose">) => string
  hideNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationWithId[]>([])

  const showNotification = useCallback((notification: Omit<NotificationProps, "onClose">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
    return id
  }, [])

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
