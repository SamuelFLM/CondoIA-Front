"use client"

import { useEffect, useState } from "react"

interface SingleRequestOptions<T> {
  endpoint: string
  mockData?: T
}

export function useSingleRequest<T>({ endpoint, mockData }: SingleRequestOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simular atraso de rede
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Se estamos usando dados mockados, retorná-los
        if (mockData) {
          setData(mockData)
          return
        }

        // Caso contrário, fazer a requisição real
        const response = await fetch(`/api${endpoint}`)
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro desconhecido ao buscar dados"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, isLoading, error }
}
