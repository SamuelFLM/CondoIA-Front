"use client"

import { useState, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type ErrorType =
  | "server"
  | "client"
  | "network"
  | "auth"
  | "forbidden"
  | "notFound"
  | "validation"
  | "timeout"
  | "unknown"

interface ApiError {
  status?: number
  message: string
  details?: string
  type: ErrorType
}

export function useApiError() {
  const [error, setError] = useState<ApiError | null>(null)
  const router = useRouter()

  const handleError = useCallback(
    (err: any) => {
      console.error("API Error:", err)

      // Determinar o tipo de erro
      let errorType: ErrorType = "unknown"
      const status = err.status || err.statusCode || 0
      const message = err.message || "Ocorreu um erro inesperado"
      const details = err.details || err.data?.message || ""

      // Classificar o erro com base no status HTTP
      if (status >= 500) {
        errorType = "server"
      } else if (status === 400) {
        errorType = "client"
      } else if (status === 401) {
        errorType = "auth"
        // Redirecionar para login em caso de erro de autenticação
        router.push("/login")
      } else if (status === 403) {
        errorType = "forbidden"
      } else if (status === 404) {
        errorType = "notFound"
      } else if (status === 422) {
        errorType = "validation"
      } else if (err.name === "AbortError" || err.code === "ECONNABORTED") {
        errorType = "timeout"
      } else if (!navigator.onLine || err.message?.includes("network") || err.code === "ECONNREFUSED") {
        errorType = "network"
      }

      // Criar objeto de erro
      const apiError: ApiError = {
        status,
        message,
        details,
        type: errorType,
      }

      // Definir o erro no estado
      setError(apiError)

      // Mostrar toast para erros que não são de servidor (500+)
      // Para erros de servidor, usamos o componente ErrorHandler
      if (errorType !== "server") {
        toast({
          title: getErrorTitle(errorType),
          description: message,
          variant: "destructive",
        })
      }

      return apiError
    },
    [router],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getErrorTitle = (type: ErrorType): string => {
    switch (type) {
      case "server":
        return "Erro no servidor"
      case "client":
        return "Erro na requisição"
      case "network":
        return "Erro de conexão"
      case "auth":
        return "Sessão expirada"
      case "forbidden":
        return "Acesso negado"
      case "notFound":
        return "Não encontrado"
      case "validation":
        return "Erro de validação"
      case "timeout":
        return "Tempo esgotado"
      default:
        return "Erro inesperado"
    }
  }

  return { error, handleError, clearError }
}
