import { SidebarClient } from "./sidebar-client"

export function DashboardSidebar({ onLogout }: { onLogout?: () => void }) {
  return <SidebarClient onLogout={onLogout} />
}

// Exportar como Sidebar para compatibilidade
export const Sidebar = DashboardSidebar
