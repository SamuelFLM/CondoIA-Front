"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface CrudOperationsOptions {
  entityName: string
  entityNamePlural?: string
  basePath: string
  apiEndpoint: string
  onSuccess?: (data: any, operation: "create" | "update" | "delete") => void
  onError?: (error: Error, operation: "create" | "update" | "delete") => void
}

export function useCrudOperations<T extends { id?: string | number }>({
  entityName,
  entityNamePlural,
  basePath,
  apiEndpoint,
  onSuccess,
  onError,
}: CrudOperationsOptions) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const plural = entityNamePlural || `${entityName}s`

  // Função para persistir dados no localStorage
  const persistData = (data: any, operation: "create" | "update" | "delete", id?: string | number) => {
    try {
      // Obter dados existentes
      const storageKey = `${apiEndpoint.replace(/\//g, "_")}`
      const existingDataStr = localStorage.getItem(storageKey)
      const existingData = existingDataStr ? JSON.parse(existingDataStr) : []

      // Atualizar dados com base na operação
      let updatedData

      if (operation === "create") {
        // Adicionar novo item com ID gerado se não existir
        const newItem = { ...data, id: data.id || `${Date.now()}` }
        updatedData = [...existingData, newItem]
      } else if (operation === "update" && id) {
        // Atualizar item existente
        updatedData = existingData.map((item: any) => (item.id === id ? { ...item, ...data } : item))
      } else if (operation === "delete" && id) {
        // Remover item
        updatedData = existingData.filter((item: any) => item.id !== id)
      }

      // Persistir dados atualizados
      if (updatedData) {
        localStorage.setItem(storageKey, JSON.stringify(updatedData))

        // Verificar se os dados foram realmente salvos
        const verificationData = localStorage.getItem(storageKey)
        if (!verificationData) {
          throw new Error(`Falha ao persistir dados de ${entityName}`)
        }
      }

      return true
    } catch (error) {
      console.error("Erro ao persistir dados:", error)
      throw error
    }
  }

  const create = async (data: Omit<T, "id">) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Persistir dados
      const success = persistData(data, "create")

      if (success) {
        toast({
          title: "Sucesso!",
          description: `${entityName} criado com sucesso.`,
        })

        if (onSuccess) onSuccess(data, "create")
        router.push(basePath)
        router.refresh()
      }
    } catch (err: any) {
      setError(err)
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `Não foi possível criar o ${entityName.toLowerCase()}: ${err.message}`,
      })
      if (onError) onError(err, "create")
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: string | number, data: Partial<T>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Persistir dados
      const success = persistData(data, "update", id)

      if (success) {
        toast({
          title: "Sucesso!",
          description: `${entityName} atualizado com sucesso.`,
        })

        if (onSuccess) onSuccess(data, "update")
        router.push(basePath)
        router.refresh()
      }
    } catch (err: any) {
      setError(err)
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `Não foi possível atualizar o ${entityName.toLowerCase()}: ${err.message}`,
      })
      if (onError) onError(err, "update")
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: string | number) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Persistir dados
      const success = persistData({}, "delete", id)

      if (success) {
        toast({
          title: "Sucesso!",
          description: `${entityName} removido com sucesso.`,
        })

        if (onSuccess) onSuccess({ id }, "delete")
        router.push(basePath)
        router.refresh()
      }
    } catch (err: any) {
      setError(err)
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `Não foi possível remover o ${entityName.toLowerCase()}: ${err.message}`,
      })
      if (onError) onError(err, "delete")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    update,
    remove,
    isLoading,
    error,
  }
}
