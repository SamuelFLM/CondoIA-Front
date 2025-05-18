"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreHorizontal, Edit, Trash } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
import { useSingleRequest } from "@/hooks/use-single-request"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { ErrorMessage } from "@/components/ui/error-message"
import { toast } from "@/components/ui/use-toast"

// Tipos
interface Expense {
  id: number
  descricao: string
  valor: number
  data: string
  categoria: string
  tipo: string
}

// Mapeamento de categoria para cores
const categoryColors: Record<string, string> = {
  manutencao: "bg-blue-100 text-blue-800",
  limpeza: "bg-green-100 text-green-800",
  seguranca: "bg-purple-100 text-purple-800",
  agua: "bg-cyan-100 text-cyan-800",
  energia: "bg-yellow-100 text-yellow-800",
  internet: "bg-indigo-100 text-indigo-800",
  outros: "bg-gray-100 text-gray-800",
}

// Mapeamento de tipo para cores
const typeColors: Record<string, string> = {
  fixo: "bg-blue-100 text-blue-800",
  variavel: "bg-amber-100 text-amber-800",
  extraordinario: "bg-red-100 text-red-800",
}

export function ExpensesTable() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    data: expenses,
    isLoading,
    refetch,
  } = useSingleRequest<Expense[]>({
    endpoint: "/gastos",
    mockData: [
      {
        id: 1,
        descricao: "Conta de Energia",
        valor: 1250.75,
        data: "2023-06-10T00:00:00Z",
        categoria: "energia",
        tipo: "fixo",
      },
      {
        id: 2,
        descricao: "Manutenção Elevador",
        valor: 850.0,
        data: "2023-06-05T00:00:00Z",
        categoria: "manutencao",
        tipo: "variavel",
      },
      {
        id: 3,
        descricao: "Limpeza da Piscina",
        valor: 350.0,
        data: "2023-06-08T00:00:00Z",
        categoria: "limpeza",
        tipo: "fixo",
      },
    ],
    onError: (err) => {
      setError(`Erro ao carregar gastos: ${err.message}`)
    },
  })

  const handleViewExpense = (id: number) => {
    router.push(`/gastos/${id}`)
  }

  const handleEditExpense = (id: number) => {
    router.push(`/gastos/editar/${id}`)
  }

  const handleDeleteExpense = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este gasto?")) {
      // Simulação de exclusão
      toast({
        title: "Gasto excluído",
        description: "O gasto foi excluído com sucesso.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
    } catch (error) {
      return "Data inválida"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "manutencao":
        return "Manutenção"
      case "limpeza":
        return "Limpeza"
      case "seguranca":
        return "Segurança"
      case "agua":
        return "Água"
      case "energia":
        return "Energia"
      case "internet":
        return "Internet"
      case "outros":
        return "Outros"
      default:
        return category
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "fixo":
        return "Fixo"
      case "variavel":
        return "Variável"
      case "extraordinario":
        return "Extraordinário"
      default:
        return type
    }
  }

  const columns = [
    {
      header: "ID",
      accessorKey: "id" as keyof Expense,
      hideOnMobile: true,
    },
    {
      header: "Descrição",
      accessorKey: "descricao" as keyof Expense,
    },
    {
      header: "Valor",
      accessorKey: "valor" as keyof Expense,
      cell: (expense: Expense) => formatCurrency(expense.valor),
    },
    {
      header: "Data",
      accessorKey: "data" as keyof Expense,
      cell: (expense: Expense) => formatDate(expense.data),
      hideOnMobile: true,
    },
    {
      header: "Categoria",
      accessorKey: "categoria" as keyof Expense,
      cell: (expense: Expense) => (
        <Badge variant="outline" className={categoryColors[expense.categoria] || ""}>
          {getCategoryLabel(expense.categoria)}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      header: "Tipo",
      accessorKey: "tipo" as keyof Expense,
      cell: (expense: Expense) => (
        <Badge variant="outline" className={typeColors[expense.tipo] || ""}>
          {getTypeLabel(expense.tipo)}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      header: "Ações",
      accessorKey: "id" as keyof Expense,
      cell: (expense: Expense) => (
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
              <DropdownMenuItem onClick={() => handleViewExpense(expense.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditExpense(expense.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteExpense(expense.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  if (error) {
    return <ErrorMessage message={error} retry={refetch} />
  }

  return (
    <ResponsiveTable
      data={expenses || []}
      columns={columns}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      onRowClick={(item) => handleViewExpense(item.id)}
      emptyMessage="Nenhum gasto encontrado"
    />
  )
}
