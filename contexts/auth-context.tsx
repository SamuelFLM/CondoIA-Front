"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/api"
import Cookies from "js-cookie"

// Definição do tipo de usuário
interface User {
  id: string
  nome: string
  email: string
  perfil: string
  apartamento?: string | null
}

// Definição do contexto de autenticação
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Criação do contexto com valor padrão para evitar o erro quando usado fora do provider
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
})

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

// Provedor do contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica se há um token nos cookies
        const token = Cookies.get("auth-token")
        if (!token) {
          setLoading(false)
          return
        }

        // Obtém os dados do usuário dos cookies
        const userJson = Cookies.get("user-data")
        if (userJson) {
          try {
            const userData = JSON.parse(userJson)
            setUser(userData)
          } catch (error) {
            console.error("Erro ao processar dados do usuário:", error)
            Cookies.remove("auth-token")
            Cookies.remove("user-data")
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      console.log("Tentando login com:", email, password)

      const response = await apiService.login(email, password)
      console.log("Resposta do login:", response)

      if (response && response.token && response.usuario) {
        // Armazena o token e os dados do usuário em cookies
        Cookies.set("auth-token", response.token, { expires: 1, path: "/" }) // Expira em 1 dia
        Cookies.set("user-data", JSON.stringify(response.usuario), { expires: 1, path: "/" })

        console.log("Dados armazenados em cookies")
        setUser(response.usuario)
        router.push("/home")
      } else {
        throw new Error("Resposta de login inválida")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Função de logout
  const logout = () => {
    Cookies.remove("auth-token")
    Cookies.remove("user-data")
    setUser(null)
    router.push("/login")
  }

  // Valor do contexto
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
