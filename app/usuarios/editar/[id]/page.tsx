"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    telefone: "",
    perfil: "",
    apartamento: "",
    ativo: true,
  })

  useEffect(() => {
    // Simulação de carregamento de dados - em produção, isso seria uma chamada real à API
    setTimeout(() => {
      // Dados simulados
      setUserData({
        nome: "João da Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        perfil: "Morador",
        apartamento: "Bloco A, Apto 101",
        ativo: true,
      })
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio - em produção, isso seria uma chamada real à API
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/usuarios")
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando dados do usuário...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/usuarios">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Usuário</h1>
          <p className="text-muted-foreground">Atualize os dados do usuário</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
            <CardDescription>Atualize os dados do usuário conforme necessário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={userData.nome}
                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={userData.telefone}
                  onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha (deixe em branco para manter a atual)</Label>
                <Input id="password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile">Perfil</Label>
                <Select
                  value={userData.perfil}
                  onValueChange={(value) => setUserData({ ...userData, perfil: value })}
                  required
                >
                  <SelectTrigger id="profile">
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Sindico">Síndico</SelectItem>
                    <SelectItem value="Funcionario">Funcionário</SelectItem>
                    <SelectItem value="Morador">Morador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">Apartamento (se morador)</Label>
                <Input
                  id="apartment"
                  value={userData.apartamento}
                  onChange={(e) => setUserData({ ...userData, apartamento: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={userData.ativo}
                onCheckedChange={(checked) => setUserData({ ...userData, ativo: checked })}
              />
              <Label htmlFor="active">Usuário Ativo</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/usuarios")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
