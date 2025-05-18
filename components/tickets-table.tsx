"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreHorizontal, CheckCircle, Clock, AlertTriangle } from "lucide-react"
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
import { useDataRequest } from "@/hooks/use-data-request"
import { ResponsiveTable, type Column } from "@/components/ui/responsive-table"
import { ErrorMessage } from "@/components/ui/error-message"
import { useMobileDetect } from "@/hooks/use-mobile"

// Tipos
interface Ticket {
  id: number
  title: string
  status: string
  priority: string
  category: string
  createdAt: string
  updatedAt: string
  location: string
  requesterName: string
  assigneeName?: string
}

// Mapeamento de status para cores
const statusColors: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  inProgress: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  closed: "bg-green-100 text-green-800 hover:bg-green-200",
}

// Mapeamento de prioridade para cores
const priorityColors: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
}

// Componente de ícone de status
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "open":
      return <AlertTriangle className="mr-1 h-4 w-4 text-yellow-600" />
    case "inProgress":
      return <Clock className="mr-1 h-4 w-4 text-blue-600" />
    case "closed":
      return <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
    default:
      return null
  }
}

export function TicketsTable() {
  const router = useRouter()
  const { isMobile } = useMobileDetect()
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [priorityFilter, setPriorityFilter] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const {
    data: tickets,
    isLoading,
    error,
    refresh,
  } = useDataRequest<Ticket[]>({
    endpoint: "/chamados",
    mockData: [
      {
        id: 1,
        title: "Vazamento no banheiro",
        status: "open",
        priority: "high",
        category: "maintenance",
        createdAt: "2023-06-15T10:30:00Z",
        updatedAt: "2023-06-15T10:30:00Z",
        location: "Bloco A, Apto 101",
        requesterName: "João Silva",
      },
      {
        id: 2,
        title: "Barulho excessivo",
        status: "inProgress",
        priority: "medium",
        category: "noise",
        createdAt: "2023-06-14T15:45:00Z",
        updatedAt: "2023-06-15T09:20:00Z",
        location: "Bloco B, Apto 202",
        requesterName: "Maria Santos",
        assigneeName: "Carlos Técnico",
      },
      {
        id: 3,
        title: "Limpeza da área comum",
        status: "closed",
        priority: "low",
        category: "cleaning",
        createdAt: "2023-06-10T08:15:00Z",
        updatedAt: "2023-06-12T14:30:00Z",
        location: "Área de lazer",
        requesterName: "Pedro Oliveira",
        assigneeName: "Ana Limpeza",
      },
      {
        id: 4,
        title: "Problema na porta de entrada",
        status: "open",
        priority: "urgent",
        category: "security",
        createdAt: "2023-06-16T07:30:00Z",
        updatedAt: "2023-06-16T07:30:00Z",
        location: "Entrada principal",
        requesterName: "Roberto Morador",
      },
    ],
    retryCount: 3,
    autoRefreshInterval: 60000, // Atualizar a cada minuto
  })

  const handleViewTicket = (id: number) => {
    router.push(`/chamados/${id}`)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
    } catch (error) {
      return "Data inválida"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Aberto"
      case "inProgress":
        return "Em Andamento"
      case "closed":
        return "Concluído"
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return "Baixa"
      case "medium":
        return "Média"
      case "high":
        return "Alta"
      case "urgent":
        return "Urgente"
      default:
        return priority
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "maintenance":
        return "Manutenção"
      case "security":
        return "Segurança"
      case "cleaning":
        return "Limpeza"
      case "noise":
        return "Barulho"
      case "other":
        return "Outros"
      default:
        return category
    }
  }

  // Filtrar tickets
  const filteredTickets = tickets
    ? tickets.filter((ticket) => {
        // Aplicar filtro de status
        if (statusFilter && ticket.status !== statusFilter) {
          return false
        }

        // Aplicar filtro de prioridade
        if (priorityFilter && ticket.priority !== priorityFilter) {
          return false
        }

        // Aplicar termo de busca
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase()
          return (
            ticket.title.toLowerCase().includes(searchLower) ||
            ticket.location.toLowerCase().includes(searchLower) ||
            ticket.requesterName.toLowerCase().includes(searchLower) ||
            (ticket.assigneeName && ticket.assigneeName.toLowerCase().includes(searchLower))
          )
        }

        return true
      })
    : []

  const columns: Column<Ticket>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "font-medium",
      hideOnMobile: true,
      sortable: true,
    },
    {
      header: "Título",
      accessorKey: "title",
      sortable: true,
      searchable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (ticket: Ticket) => (
        <Badge variant="outline" className={statusColors[ticket.status] || ""}>
          <StatusIcon status={ticket.status} />
          {getStatusLabel(ticket.status)}
        </Badge>
      ),
      sortable: true,
      filterOptions: [
        { label: "Aberto", value: "open" },
        { label: "Em Andamento", value: "inProgress" },
        { label: "Concluído", value: "closed" },
      ],
    },
    {
      header: "Prioridade",
      accessorKey: "priority",
      cell: (ticket: Ticket) => (
        <Badge variant="outline" className={priorityColors[ticket.priority] || ""}>
          {getPriorityLabel(ticket.priority)}
        </Badge>
      ),
      hideOnMobile: true,
      sortable: true,
      filterOptions: [
        { label: "Baixa", value: "low" },
        { label: "Média", value: "medium" },
        { label: "Alta", value: "high" },
        { label: "Urgente", value: "urgent" },
      ],
    },
    {
      header: "Categoria",
      accessorKey: "category",
      cell: (ticket: Ticket) => getCategoryLabel(ticket.category),
      hideOnMobile: true,
      sortable: true,
    },
    {
      header: "Data",
      accessorKey: "createdAt",
      cell: (ticket: Ticket) => formatDate(ticket.createdAt),
      hideOnMobile: true,
      sortable: true,
    },
    {
      header: "Solicitante",
      accessorKey: "requesterName",
      hideOnMobile: true,
      searchable: true,
    },
    {
      header: "Ações",
      accessorKey: "id",
      cell: (ticket: Ticket) => (
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
              <DropdownMenuItem onClick={() => handleViewTicket(ticket.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  if (error) {
    return (
      <ErrorMessage
        message={`Erro ao carregar chamados: ${error.message}`}
        retry={refresh}
        severity="error"
        actions={
          <Button variant="outline" size="sm" onClick={() => router.push("/chamados/novo")}>
            Criar Novo Chamado
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Chamados</h2>
        <Button onClick={() => router.push("/chamados/novo")}>Novo Chamado</Button>
      </div>

      <ResponsiveTable
        data={filteredTickets}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => handleViewTicket(item.id)}
        emptyMessage="Nenhum chamado encontrado"
        searchPlaceholder="Buscar chamados..."
        initialSortColumn="createdAt"
        initialSortDirection="desc"
      />
    </div>
  )
}
