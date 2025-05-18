"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersTable } from "@/components/users-table"
import { mockApiRequest } from "@/lib/api"
import { mockUsers } from "@/lib/mock-data"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await mockApiRequest("/usuarios", mockUsers)
        setUsuarios(data)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error)
        setError("Não foi possível carregar a lista de usuários.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/usuarios/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Usuário
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Usuários</CardTitle>
          <CardDescription>Visualize e gerencie todos os usuários do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-4 text-destructive">{error}</div>
          ) : (
            <UsersTable usuarios={usuarios} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
