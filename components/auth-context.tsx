"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { MockService } from "@/lib/mock-service"

interface User {
  id: number | string
  nome: string
  email: string
  perfil: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = () => {
      try {
        const currentUser = MockService.getCurrentUser()
        if (currentUser) {
          console.log("Usuário autenticado:", currentUser)
          setUser(currentUser)
        } else {
          console.log("Nenhum usuário autenticado encontrado")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Adicionar listener para mudanças no localStorage
    window.addEventListener("storage", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      console.log("Tentando login com:", email)
      const response = await MockService.login(email, password)
      console.log("Login bem-sucedido:", response)
      setUser(response.usuario)
      return response
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    console.log("Fazendo logout")
    MockService.logout()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
