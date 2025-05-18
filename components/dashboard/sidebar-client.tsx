"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FileText,
  DollarSign,
  Users,
  Calendar,
  Bell,
  BarChart2,
  Settings,
  Menu,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebar } from "@/contexts/sidebar-context"

interface SidebarClientProps {
  onLogout?: () => void
}

export function SidebarClient({ onLogout }: SidebarClientProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { isOpen, toggle, close } = useSidebar()

  // Fechar o menu ao navegar em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      close()
    }
  }, [pathname, isMobile, close])

  const navigation = [
    { name: "Dashboard", href: "/home", icon: Home },
    { name: "Chamados", href: "/chamados", icon: FileText },
    { name: "Gastos", href: "/gastos", icon: DollarSign },
    { name: "Moradores", href: "/moradores", icon: Users },
    { name: "Reservas", href: "/reservas", icon: Calendar },
    { name: "Avisos", href: "/avisos", icon: Bell },
    { name: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
  ]

  const NavLinks = () => (
    <>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Gestão de Condomínio</h2>
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Link href="/perfil">
          <Button variant="outline" className="w-full justify-start mb-2">
            <User className="mr-2 h-4 w-4" />
            Meu Perfil
          </Button>
        </Link>
        <Button variant="outline" className="w-full justify-start text-destructive" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </>
  )

  // Versão para desktop
  if (!isMobile) {
    return (
      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
        <ScrollArea className="flex-1 pt-4 pb-6">
          <NavLinks />
        </ScrollArea>
      </div>
    )
  }

  // Versão para mobile com Sheet
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggle}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <ScrollArea className="h-full pt-4 pb-6">
            <NavLinks />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
