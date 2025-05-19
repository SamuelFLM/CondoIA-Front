"use client"

import { useEffect, useState } from "react"

interface DataRequestOptions<T> {
  endpoint: string
  mockData?: T
  autoRefreshInterval?: number
}

export function useDataRequest<T>({ endpoint, mockData, autoRefreshInterval }: DataRequestOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Se estamos usando dados mockados, retorná-los
      if (mockData) {
        setData(mockData)
        return
      }

      // // Caso contrário, fazer a requisição real
      // const response = await fetch(`/api${endpoint}`)
      // if (!response.ok) {
      //   throw new Error(`Erro ao buscar dados: ${response.statusText}`)
      // }

      // const result = await response.json()
      // setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro desconhecido ao buscar dados"))
    } finally {
      setIsLoading(false)
    }
  }

  const refresh = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()

    // Configurar auto-refresh se especificado
    if (autoRefreshInterval) {
      const intervalId = setInterval(fetchData, autoRefreshInterval)
      return () => clearInterval(intervalId)
    }
  }, [endpoint])

  return { data, isLoading, error, refresh }
}
