"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated, hasPermission } from "@/lib/auth"
import { LoadingScreen } from "@/components/ui/loading-screen"

interface RouteGuardProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function RouteGuard({ children, requiredPermission }: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Função para verificar se o usuário está autorizado
    const checkAuth = () => {
      // Rotas públicas que não requerem autenticação
      const publicPaths = ["/login", "/registro", "/recuperar-senha"]
      const isPublicPath = publicPaths.includes(pathname)

      if (!isAuthenticated() && !isPublicPath) {
        // Não autenticado e tentando acessar rota protegida
        setAuthorized(false)
        setLoading(false)
        router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
        return
      }

      if (isAuthenticated() && isPublicPath) {
        // Autenticado e tentando acessar rota pública
        setAuthorized(true)
        setLoading(false)
        router.push("/dashboard")
        return
      }

      if (requiredPermission && !hasPermission(requiredPermission)) {
        // Não tem permissão necessária
        setAuthorized(false)
        setLoading(false)
        router.push("/acesso-negado")
        return
      }

      // Autorizado
      setAuthorized(true)
      setLoading(false)
    }

    // Verificar autenticação quando o componente montar ou a rota mudar
    checkAuth()

    // Adicionar evento para verificar autenticação quando o usuário navegar
    window.addEventListener("storage", checkAuth)

    // Limpar evento ao desmontar
    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [pathname, router, requiredPermission])

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (loading) {
    return <LoadingScreen />
  }

  // Renderizar children apenas se autorizado
  return authorized ? <>{children}</> : null
}
