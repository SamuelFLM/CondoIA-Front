import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ApiStatusIndicator } from "@/components/api-status-indicator"
import { MockStatusIndicator } from "@/components/mock-status-indicator"
import { ClientSidebarProvider } from "@/contexts/sidebar-context"
import { AuthProvider } from "@/contexts/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ClientSidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
              <div className="fixed bottom-4 right-4 flex flex-col gap-2">
                <ApiStatusIndicator />
                <MockStatusIndicator />
              </div>
            </main>
          </div>
        </div>
      </ClientSidebarProvider>
    </AuthProvider>
  )
}
