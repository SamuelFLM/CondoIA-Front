"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ErrorHandler } from "@/components/ui/error-handler"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { formatDateTime } from "@/lib/validation"
import { useCrudOperations } from "@/hooks/use-crud-operations"
import { LoadingState } from "@/components/ui/loading-state"

interface Comment {
  id: string
  text: string
  author: string
  authorAvatar?: string
  createdAt: string
}

interface Ticket {
  id: string
  title: string
  description: string
  status: "aberto" | "em_andamento" | "resolvido" | "fechado"
  priority: "baixa" | "media" | "alta" | "urgente"
  category: string
  createdBy: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

export default function TicketDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const ticketId = params.id as string

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const { update, isLoading: isUpdating } = useCrudOperations<Ticket>({
    entityName: "Chamado",
    basePath: "/chamados",
    apiEndpoint: "/api/chamados",
    onSuccess: (data) => {
      // Atualizar o ticket local após uma atualização bem-sucedida
      if (ticket) {
        setTicket({ ...ticket, ...data })
      }
    },
  })

  useEffect(() => {
    const fetchTicket = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Buscar dados do localStorage
        const storageKey = "api_chamados"
        const ticketsStr = localStorage.getItem(storageKey)
        const tickets = ticketsStr ? JSON.parse(ticketsStr) : []

        const foundTicket = tickets.find((t: Ticket) => t.id === ticketId)

        if (!foundTicket) {
          throw new Error("Chamado não encontrado")
        }

        // Garantir que o ticket tenha um array de comentários
        if (!foundTicket.comments) {
          foundTicket.comments = []
        }

        setTicket(foundTicket)
      } catch (err: any) {
        setError(err)
        toast({
          variant: "destructive",
          title: "Erro ao carregar chamado",
          description: err.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTicket()
  }, [ticketId])

  const handleStatusChange = async (newStatus: Ticket["status"]) => {
    if (!ticket) return

    try {
      await update(ticketId, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })

      // Atualizar o estado local
      setTicket({
        ...ticket,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: "Status atualizado",
        description: `O status do chamado foi alterado para ${getStatusLabel(newStatus)}`,
      })
    } catch (err) {
      // Erro já tratado pelo hook useCrudOperations
    }
  }

  const handleAddComment = async () => {
    if (!ticket || !newComment.trim()) return

    setIsSubmittingComment(true)

    try {
      // Criar novo comentário
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        text: newComment.trim(),
        author: "Usuário Atual",
        createdAt: new Date().toISOString(),
      }

      // Adicionar comentário à lista
      const updatedComments = [...(ticket.comments || []), comment]

      // Atualizar o ticket no localStorage
      const storageKey = "api_chamados"
      const ticketsStr = localStorage.getItem(storageKey)
      const tickets = ticketsStr ? JSON.parse(ticketsStr) : []

      const updatedTickets = tickets.map((t: Ticket) =>
        t.id === ticketId ? { ...t, comments: updatedComments, updatedAt: new Date().toISOString() } : t,
      )

      localStorage.setItem(storageKey, JSON.stringify(updatedTickets))

      // Verificar se os dados foram realmente salvos
      const verificationData = localStorage.getItem(storageKey)
      if (!verificationData) {
        throw new Error("Falha ao salvar comentário")
      }

      // Atualizar o estado local
      setTicket({
        ...ticket,
        comments: updatedComments,
        updatedAt: new Date().toISOString(),
      })

      // Limpar o campo de comentário
      setNewComment("")

      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi adicionado com sucesso",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar comentário",
        description: err.message,
      })
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const getStatusLabel = (status: Ticket["status"]) => {
    const statusMap = {
      aberto: "Aberto",
      em_andamento: "Em Andamento",
      resolvido: "Resolvido",
      fechado: "Fechado",
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: Ticket["status"]) => {
    const colorMap = {
      aberto: "bg-yellow-500",
      em_andamento: "bg-blue-500",
      resolvido: "bg-green-500",
      fechado: "bg-gray-500",
    }
    return colorMap[status] || "bg-gray-500"
  }

  const getPriorityLabel = (priority: Ticket["priority"]) => {
    const priorityMap = {
      baixa: "Baixa",
      media: "Média",
      alta: "Alta",
      urgente: "Urgente",
    }
    return priorityMap[priority] || priority
  }

  const getPriorityColor = (priority: Ticket["priority"]) => {
    const colorMap = {
      baixa: "bg-green-500",
      media: "bg-yellow-500",
      alta: "bg-orange-500",
      urgente: "bg-red-500",
    }
    return colorMap[priority] || "bg-gray-500"
  }

  if (isLoading) {
    return <LoadingIndicator text="Carregando detalhes do chamado..." />
  }

  if (error) {
    return (
      <ErrorHandler
        type="client"
        title="Erro ao carregar chamado"
        message={error.message}
        onRetry={() => router.refresh()}
      />
    )
  }

  if (!ticket) {
    return (
      <ErrorHandler
        type="client"
        title="Chamado não encontrado"
        message="O chamado solicitado não foi encontrado"
        onRetry={() => router.push("/chamados")}
      />
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{ticket.title}</h1>
          <p className="text-sm text-muted-foreground">
            Chamado #{ticket.id} • Criado em {formatDateTime(ticket.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getPriorityColor(ticket.priority)}>{getPriorityLabel(ticket.priority)}</Badge>
          <Badge className={getStatusColor(ticket.status)}>{getStatusLabel(ticket.status)}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Chamado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Descrição</h3>
            <p className="mt-1 text-muted-foreground whitespace-pre-line">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Categoria</h3>
              <p className="mt-1 text-muted-foreground">{ticket.category}</p>
            </div>
            <div>
              <h3 className="font-medium">Criado por</h3>
              <p className="mt-1 text-muted-foreground">{ticket.createdBy}</p>
            </div>
            {ticket.assignedTo && (
              <div>
                <h3 className="font-medium">Atribuído a</h3>
                <p className="mt-1 text-muted-foreground">{ticket.assignedTo}</p>
              </div>
            )}
            <div>
              <h3 className="font-medium">Última atualização</h3>
              <p className="mt-1 text-muted-foreground">{formatDateTime(ticket.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button
            variant={ticket.status === "aberto" ? "default" : "outline"}
            onClick={() => handleStatusChange("aberto")}
            disabled={ticket.status === "aberto" || isUpdating}
          >
            Aberto
          </Button>
          <Button
            variant={ticket.status === "em_andamento" ? "default" : "outline"}
            onClick={() => handleStatusChange("em_andamento")}
            disabled={ticket.status === "em_andamento" || isUpdating}
          >
            Em Andamento
          </Button>
          <Button
            variant={ticket.status === "resolvido" ? "default" : "outline"}
            onClick={() => handleStatusChange("resolvido")}
            disabled={ticket.status === "resolvido" || isUpdating}
          >
            Resolvido
          </Button>
          <Button
            variant={ticket.status === "fechado" ? "default" : "outline"}
            onClick={() => handleStatusChange("fechado")}
            disabled={ticket.status === "fechado" || isUpdating}
          >
            Fechado
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comentários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.comments && ticket.comments.length > 0 ? (
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    {comment.authorAvatar ? (
                      <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                    ) : (
                      <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{comment.author}</h3>
                      <span className="text-xs text-muted-foreground">{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground whitespace-pre-line">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">Nenhum comentário ainda.</p>
          )}

          <Separator className="my-4" />

          <div className="space-y-4">
            <Textarea
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <LoadingState isLoading={isSubmittingComment} overlay={true}>
              <Button onClick={handleAddComment} disabled={!newComment.trim() || isSubmittingComment}>
                Adicionar Comentário
              </Button>
            </LoadingState>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
