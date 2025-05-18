"use client"

import { Badge } from "@/components/ui/badge"
import { useSingleRequest } from "@/hooks/use-single-request"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Ticket {
  id: string
  title: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Vazamento no apartamento 102",
    status: "open",
    priority: "high",
    createdAt: "2023-05-10T10:30:00Z",
    updatedAt: "2023-05-10T10:30:00Z",
  },
  {
    id: "2",
    title: "Lâmpada queimada no corredor",
    status: "in_progress",
    priority: "medium",
    createdAt: "2023-05-09T14:20:00Z",
    updatedAt: "2023-05-09T15:45:00Z",
  },
  {
    id: "3",
    title: "Problema com interfone",
    status: "closed",
    priority: "low",
    createdAt: "2023-05-08T09:15:00Z",
    updatedAt: "2023-05-08T16:30:00Z",
  },
]

export function RecentTickets() {
  const { data: tickets, isLoading } = useSingleRequest<Ticket[]>({
    endpoint: "/tickets/recent",
    mockData: mockTickets,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-orange-500">Aberto</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">Em Andamento</Badge>
      case "closed":
        return <Badge className="bg-green-500">Concluído</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Baixa
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Média
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Alta
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecida</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets?.map((ticket) => (
        <div key={ticket.id} className="flex flex-col space-y-2">
          <div className="font-medium">{ticket.title}</div>
          <div className="flex space-x-2">
            {getStatusBadge(ticket.status)}
            {getPriorityBadge(ticket.priority)}
          </div>
          <div className="text-xs text-muted-foreground">Criado em {formatDate(new Date(ticket.createdAt))}</div>
        </div>
      ))}
    </div>
  )
}
