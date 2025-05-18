"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Home,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Bell,
  Calendar,
  LogOut,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobileDetect } from "@/hooks/use-mobile"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function BankSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const { isMobile } = useMobileDetect()

  // Fechar sidebar ao clicar em um link em dispositivos móveis
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "bg-card z-50 flex h-screen flex-col border-r transition-all duration-300",
          isOpen ? "w-64" : "w-0 sm:w-16",
          isMobile && !isOpen && "w-0",
          isMobile && isOpen && "fixed left-0 top-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn("flex items-center gap-2", !isOpen && "sm:justify-center")}>
            <Building2 className="h-6 w-6 text-primary" />
            <span className={cn("font-semibold", !isOpen && "hidden")}>CondoGestão</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 px-2">
          <nav className="flex flex-col gap-1 py-2">
            <NavItem
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={pathname === "/dashboard"}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/chamados"
              icon={<FileText className="h-5 w-5" />}
              label="Chamados"
              isActive={pathname.includes("/chamados")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/gastos"
              icon={<DollarSign className="h-5 w-5" />}
              label="Gastos"
              isActive={pathname.includes("/gastos")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/moradores"
              icon={<Users className="h-5 w-5" />}
              label="Moradores"
              isActive={pathname.includes("/moradores")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/reservas"
              icon={<Calendar className="h-5 w-5" />}
              label="Reservas"
              isActive={pathname.includes("/reservas")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/avisos"
              icon={<Bell className="h-5 w-5" />}
              label="Avisos"
              isActive={pathname.includes("/avisos")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/relatorios"
              icon={<BarChart3 className="h-5 w-5" />}
              label="Relatórios"
              isActive={pathname.includes("/relatorios")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
            <NavItem
              href="/configuracoes"
              icon={<Settings className="h-5 w-5" />}
              label="Configurações"
              isActive={pathname.includes("/configuracoes")}
              isCollapsed={!isOpen}
              onClick={handleLinkClick}
            />
          </nav>
        </ScrollArea>
        <div className="border-t p-2">
          <NavItem
            href="/login"
            icon={<LogOut className="h-5 w-5" />}
            label="Sair"
            isActive={false}
            isCollapsed={!isOpen}
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              handleLinkClick()
            }}
          />
        </div>
      </aside>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
  onClick?: () => void
}

function NavItem({ href, icon, label, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
      onClick={onClick}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}
