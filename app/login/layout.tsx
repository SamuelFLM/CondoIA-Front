import type React from "react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-muted/40">{children}</div>
}
