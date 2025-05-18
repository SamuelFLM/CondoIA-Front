"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreHorizontal, Edit, Trash, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { ErrorMessage } from "@/components/ui/error-message"
import { toast } from "@/components/ui/use-toast"

// Tipos
interface Usuario {
  id: number
  nome: string
  email: string
  perfil: string
  status: string
  apartamento?: string
  bloco?: string
}

interface UsersTableProps {
  usuarios: Usuario[]
  isLoading?: boolean
  error?: string
  onRetry?: () => void
}

// Mapeamento de perfil para cores
const profileColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-800",
  sindico: "bg-blue-100 text-blue-800",
  morador: "bg-green-100 text-green-800",
  funcionario: "bg-amber-100 text-amber-800",
}

// Mapeamento de status para cores
const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800",
  inativo: "bg-red-100 text-red-800",
  pendente: "bg-yellow-100 text-yellow-800",
}

export function UsersTable({ usuarios = [], isLoading = false, error, onRetry }: UsersTableProps) {
  const router = useRouter()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleViewUser = (id: number) => {
    router.push(`/usuarios/${id}`)
  }

  const handleEditUser = (id: number) => {
    router.push(`/usuarios/editar/${id}`)
  }

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      // Simulação de exclusão
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      })
    }
  }

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "ativo" ? "inativo" : "ativo"
    // Simulação de atualização
    toast({
      title: "Status atualizado",
      description: `O usuário foi ${newStatus === "ativo" ? "ativado" : "desativado"} com sucesso.`,
    })
  }

  const getPerfilLabel = (perfil: string) => {
    switch (perfil) {
      case "admin":
        return "Administrador"
      case "sindico":
        return "Síndico"
      case "morador":
        return "Morador"
      case "funcionario":
        return "Funcionário"
      default:
        return perfil
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "inativo":
        return "Inativo"
      case "pendente":
        return "Pendente"
      default:
        return status
    }
  }

  // Dados mockados para demonstração
  const mockUsers: Usuario[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@exemplo.com",
      perfil: "sindico",
      status: "ativo",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@exemplo.com",
      perfil: "morador",
      status: "ativo",
      apartamento: "101",
      bloco: "A",
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@exemplo.com",
      perfil: "funcionario",
      status: "inativo",
    },
  ]

  const dataToShow = usuarios.length > 0 ? usuarios : mockUsers

  const columns = [
    {
      header: "ID",
      accessorKey: "id" as keyof Usuario,
      hideOnMobile: true,
    },
    {
      header: "Nome",
      accessorKey: "nome" as keyof Usuario,
    },
    {
      header: "Email",
      accessorKey: "email" as keyof Usuario,
      hideOnMobile: true,
    },
    {
      header: "Perfil",
      accessorKey: "perfil" as keyof Usuario,
      cell: (usuario: Usuario) => (
        <Badge variant="outline" className={profileColors[usuario.perfil] || ""}>
          {getPerfilLabel(usuario.perfil)}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Usuario,
      cell: (usuario: Usuario) => (
        <Badge variant="outline" className={statusColors[usuario.status] || ""}>
          {usuario.status === "ativo" ? <UserCheck className="mr-1 h-3 w-3" /> : <UserX className="mr-1 h-3 w-3" />}
          {getStatusLabel(usuario.status)}
        </Badge>
      ),
    },
    {
      header: "Apartamento",
      accessorKey: "apartamento" as keyof Usuario,
      cell: (usuario: Usuario) =>
        usuario.apartamento && usuario.bloco ? `${usuario.bloco} - ${usuario.apartamento}` : "-",
      hideOnMobile: true,
    },
    {
      header: "Ações",
      accessorKey: "id" as keyof Usuario,
      cell: (usuario: Usuario) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu de ações">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewUser(usuario.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditUser(usuario.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleStatus(usuario.id, usuario.status)}>
                {usuario.status === "ativo" ? (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Desativar
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Ativar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteUser(usuario.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  if (error || localError) {
    return <ErrorMessage message={error || localError || ""} retry={onRetry} />
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <ResponsiveTable
      data={dataToShow}
      columns={columns}
      keyExtractor={(item) => item.id}
      onRowClick={(item) => handleViewUser(item.id)}
      emptyMessage="Nenhum usuário encontrado"
    />
  )
}
