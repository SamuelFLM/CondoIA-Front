"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebar()

  return (
    <Button variant="outline" size="icon" className={className} onClick={toggle}>
      <Menu className="h-5 w-5" />
      <span className="sr-only">Abrir menu</span>
    </Button>
  )
}
