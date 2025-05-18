"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth-context"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>
}
