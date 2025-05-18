import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentTickets() {
  // Dados simulados - em produção, viriam de uma API
  const tickets = [
    {
      id: "T-1234",
      title: "Vazamento no teto do apartamento 302",
      status: "open",
      priority: "high",
      createdAt: "2023-05-14T10:30:00",
      requester: "Maria Silva",
    },
    {
      id: "T-1233",
      title: "Lâmpada queimada no corredor do 2º andar",
      status: "in-progress",
      priority: "medium",
      createdAt: "2023-05-13T15:45:00",
      requester: "João Pereira",
    },
    {
      id: "T-1232",
      title: "Barulho excessivo no apartamento 105",
      status: "open",
      priority: "medium",
      createdAt: "2023-05-12T20:15:00",
      requester: "Ana Costa",
    },
    {
      id: "T-1231",
      title: "Problema na fechadura do portão principal",
      status: "in-progress",
      priority: "high",
      createdAt: "2023-05-11T09:00:00",
      requester: "Carlos Santos",
    },
    {
      id: "T-1230",
      title: "Entupimento na pia do salão de festas",
      status: "closed",
      priority: "low",
      createdAt: "2023-05-10T14:20:00",
      requester: "Luiza Oliveira",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Aberto</Badge>
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Em Progresso
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Baixa
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Média
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Alta
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecida</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {ticket.requester
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{ticket.id}</span>
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
            <p className="text-sm font-medium">{ticket.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{ticket.requester}</span>
              <span>•</span>
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
