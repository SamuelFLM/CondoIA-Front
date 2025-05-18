"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "checking">("checking")

  useEffect(() => {
    // Em desenvolvimento, assumimos que a API está offline para evitar erros
    if (process.env.NODE_ENV === "development") {
      setApiStatus("offline")
      return
    }

    // Em produção, verificamos o status da API
    const checkApiStatus = async () => {
      try {
        // Usamos um endpoint que sabemos que existe ou uma simples verificação
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:7001/api")
        setApiStatus(response.ok ? "online" : "offline")
      } catch (error) {
        setApiStatus("offline")
      }
    }

    checkApiStatus()

    // Verificar o status da API a cada 30 segundos
    const interval = setInterval(checkApiStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  if (apiStatus === "checking" || apiStatus === "online") {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Offline</AlertTitle>
      <AlertDescription>O servidor da API está offline. Usando dados simulados para desenvolvimento.</AlertDescription>
    </Alert>
  )
}
