"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

// Criação do contexto com valor padrão para evitar o erro quando usado fora do provider
const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  open: () => {},
  close: () => {},
})

// Hook personalizado com verificação de cliente
export function useSidebar() {
  // Verificar se estamos no cliente
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>{children}</SidebarContext.Provider>
}

// Componente de cliente para usar o hook com segurança
export function ClientSidebarProvider({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>
}
