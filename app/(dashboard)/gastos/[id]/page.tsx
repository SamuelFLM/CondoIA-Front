"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ErrorMessage } from "@/components/ui/error-message"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ActionButton } from "@/components/action-button"

interface Gasto {
  id: number
  descricao: string
  valor: number
  data: string
  categoria: string
  tipo: string
  fornecedor: string
  numeroNota?: string
  observacoes?: string
  nomeUsuario: string
}

// Dados mockados para exemplo
const mockGasto: Gasto = {
  id: 1,
  descricao: "Manutenção do elevador",
  valor: 1200.0,
  data: "2023-05-10T00:00:00",
  categoria: "Manutenção",
  tipo: "Fixo",
  fornecedor: "Elevadores Rápidos",
  numeroNota: "NF-12345",
  observacoes: "Manutenção preventiva mensal do elevador do bloco A.",
  nomeUsuario: "Carlos Administrador",
}

export default function GastoDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [gasto, setGasto] = useState<Gasto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  useEffect(() => {
    const fetchGasto = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulação de chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Em produção, isso seria uma chamada real à API
        // const response = await fetch(`/api/gastos/${params.id}`)
        // const data = await response.json()

        // Usando dados mockados para exemplo
        setGasto(mockGasto)
      } catch (err) {
        console.error("Erro ao buscar detalhes do gasto:", err)
        setError("Não foi possível carregar os detalhes do gasto. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGasto()
  }, [params.id])

  const handleExcluir = async () => {
    setExcluindo(true)

    try {
      // Simulação de chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em produção, isso seria uma chamada real à API
      // await fetch(`/api/gastos/${params.id}`, {
      //   method: "DELETE"
      // })

      toast({
        title: "Gasto excluído",
        description: "O gasto foi excluído com sucesso.",
      })

      router.push("/gastos")
    } catch (err) {
      console.error("Erro ao excluir gasto:", err)
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o gasto. Tente novamente.",
        variant: "destructive",
      })
      setExcluindo(false)
    }
  }

  const formatarData = (dataString: string) => {
    return format(new Date(dataString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case "manutenção":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Manutenção
          </Badge>
        )
      case "limpeza":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Limpeza
          </Badge>
        )
      case "segurança":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Segurança
          </Badge>
        )
      case "água":
        return (
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700">
            Água
          </Badge>
        )
      case "energia":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Energia
          </Badge>
        )
      default:
        return <Badge variant="outline">{categoria}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "fixo":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Fixo
          </Badge>
        )
      case "variável":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Variável
          </Badge>
        )
      case "extraordinário":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Extraordinário
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error} retry={() => router.refresh()} />
  }

  if (!gasto) {
    return <ErrorMessage message="Gasto não encontrado" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/gastos" aria-label="Voltar para lista de gastos">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{gasto.descricao}</h1>
            <p className="text-muted-foreground">
              Gasto #{gasto.id} • Registrado em {formatarData(gasto.data)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/gastos/editar/${gasto.id}`} aria-label="Editar este gasto">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" aria-label="Excluir este gasto">
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Gasto</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este gasto? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <ActionButton
                  onClick={handleExcluir}
                  isLoading={excluindo}
                  loadingText="Excluindo..."
                  className="bg-red-500 hover:bg-red-600"
                  aria-label="Confirmar exclusão de gasto"
                >
                  Excluir
                </ActionButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Gasto</CardTitle>
              <CardDescription>Informações detalhadas sobre o gasto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium">Descrição</div>
                  <div className="mt-1">{gasto.descricao}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Valor</div>
                  <div className="mt-1 font-semibold text-lg">{formatarValor(gasto.valor)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Data</div>
                  <div className="mt-1">{formatarData(gasto.data)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Fornecedor</div>
                  <div className="mt-1">{gasto.fornecedor}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Categoria</div>
                  <div className="mt-1">{getCategoriaBadge(gasto.categoria)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Tipo</div>
                  <div className="mt-1">{getTipoBadge(gasto.tipo)}</div>
                </div>
                {gasto.numeroNota && (
                  <div>
                    <div className="text-sm font-medium">Número da Nota</div>
                    <div className="mt-1">{gasto.numeroNota}</div>
                  </div>
                )}
              </div>

              {gasto.observacoes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <div className="text-sm font-medium">Observações</div>
                    <div className="mt-1 whitespace-pre-line">{gasto.observacoes}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Registrado por</div>
                <div className="mt-1">{gasto.nomeUsuario}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Mês de Referência</div>
                <div className="mt-1">{format(new Date(gasto.data), "MMMM 'de' yyyy", { locale: ptBR })}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/gastos" aria-label="Voltar para lista de gastos">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Gastos
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
