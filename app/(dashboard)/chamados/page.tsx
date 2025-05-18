"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PlusCircle, Search, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { ErrorMessage } from "@/components/ui/error-message"
import { MockService } from "@/lib/mock-service"
import { useIsMobile } from "@/hooks/use-mobile"

interface Chamado {
  id: string | number
  titulo: string
  descricao: string
  status: string
  prioridade: string
  categoria: string
  dataAbertura: string
  nomeUsuario: string
  localizacao?: string
}

export default function ChamadosPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    categoria: "",
    prioridade: "",
  })

  useEffect(() => {
    const fetchChamados = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Buscar chamados usando o serviço de mock
        const data = await MockService.getData("chamados")
        setChamados(data as Chamado[])
      } catch (err) {
        console.error("Erro ao buscar chamados:", err)
        setError("Não foi possível carregar os chamados. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchChamados()
  }, [])

  // Filtrar chamados com base na tab ativa, termo de busca e filtros
  const filteredChamados = chamados
    .filter((chamado) => {
      // Filtrar por status (tab)
      if (activeTab === "todos") return true
      if (activeTab === "abertos") return chamado.status.toLowerCase() === "aberto"
      if (activeTab === "andamento") return chamado.status.toLowerCase() === "em andamento"
      if (activeTab === "concluidos") return chamado.status.toLowerCase() === "fechado"
      return true
    })
    .filter((chamado) => {
      // Filtrar por termo de busca
      if (!searchTerm) return true
      return (
        chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chamado.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chamado.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (chamado.localizacao && chamado.localizacao.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    .filter((chamado) => {
      // Filtrar por categoria
      if (!filters.categoria) return true
      return chamado.categoria.toLowerCase() === filters.categoria.toLowerCase()
    })
    .filter((chamado) => {
      // Filtrar por prioridade
      if (!filters.prioridade) return true
      return chamado.prioridade.toLowerCase() === filters.prioridade.toLowerCase()
    })

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm("")
    setFilters({
      categoria: "",
      prioridade: "",
    })
  }

  // Colunas para a tabela responsiva
  const columns = [
    {
      header: "ID",
      accessorKey: "id" as keyof Chamado,
      className: "w-16",
    },
    {
      header: "Título",
      accessorKey: "titulo" as keyof Chamado,
      cell: (chamado: Chamado) => (
        <div className="font-medium">
          <div className="truncate max-w-[200px]">{chamado.titulo}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{chamado.localizacao}</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Chamado,
      cell: (chamado: Chamado) => {
        let badgeClass = ""
        switch (chamado.status.toLowerCase()) {
          case "aberto":
            badgeClass = "bg-blue-50 text-blue-700"
            break
          case "em andamento":
            badgeClass = "bg-amber-50 text-amber-700"
            break
          case "fechado":
            badgeClass = "bg-green-50 text-green-700"
            break
        }
        return (
          <Badge variant="outline" className={badgeClass}>
            {chamado.status}
          </Badge>
        )
      },
      filterOptions: [
        { label: "Aberto", value: "aberto" },
        { label: "Em Andamento", value: "em andamento" },
        { label: "Fechado", value: "fechado" },
      ],
    },
    {
      header: "Prioridade",
      accessorKey: "prioridade" as keyof Chamado,
      cell: (chamado: Chamado) => {
        let badgeClass = ""
        switch (chamado.prioridade.toLowerCase()) {
          case "alta":
            badgeClass = "bg-red-50 text-red-700"
            break
          case "média":
            badgeClass = "bg-amber-50 text-amber-700"
            break
          case "baixa":
            badgeClass = "bg-green-50 text-green-700"
            break
          case "urgente":
            badgeClass = "bg-purple-50 text-purple-700"
            break
        }
        return (
          <Badge variant="outline" className={badgeClass}>
            {chamado.prioridade}
          </Badge>
        )
      },
      filterOptions: [
        { label: "Baixa", value: "baixa" },
        { label: "Média", value: "média" },
        { label: "Alta", value: "alta" },
        { label: "Urgente", value: "urgente" },
      ],
    },
    {
      header: "Categoria",
      accessorKey: "categoria" as keyof Chamado,
      filterOptions: [
        { label: "Manutenção", value: "manutenção" },
        { label: "Segurança", value: "segurança" },
        { label: "Limpeza", value: "limpeza" },
        { label: "Barulho", value: "barulho" },
        { label: "Outros", value: "outros" },
      ],
    },
    {
      header: "Solicitante",
      accessorKey: "nomeUsuario" as keyof Chamado,
    },
    {
      header: "Data",
      accessorKey: "dataAbertura" as keyof Chamado,
      cell: (chamado: Chamado) => {
        const date = new Date(chamado.dataAbertura)
        return date.toLocaleDateString()
      },
    },
  ]

  if (error) {
    return <ErrorMessage message={error} retry={() => window.location.reload()} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chamados</h1>
          <p className="text-muted-foreground">Gerencie os chamados do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/chamados/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Chamado
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar chamados..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
        </Button>
        {(searchTerm || filters.categoria || filters.prioridade) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.categoria}
                  onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                >
                  <option value="">Todas</option>
                  <option value="manutenção">Manutenção</option>
                  <option value="segurança">Segurança</option>
                  <option value="limpeza">Limpeza</option>
                  <option value="barulho">Barulho</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridade</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.prioridade}
                  onChange={(e) => setFilters({ ...filters, prioridade: e.target.value })}
                >
                  <option value="">Todas</option>
                  <option value="baixa">Baixa</option>
                  <option value="média">Média</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="abertos">Abertos</TabsTrigger>
          <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
          <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">{renderTabContent(filteredChamados, isLoading)}</TabsContent>
        <TabsContent value="abertos">{renderTabContent(filteredChamados, isLoading)}</TabsContent>
        <TabsContent value="andamento">{renderTabContent(filteredChamados, isLoading)}</TabsContent>
        <TabsContent value="concluidos">{renderTabContent(filteredChamados, isLoading)}</TabsContent>
      </Tabs>
    </div>
  )

  function renderTabContent(chamados: Chamado[], isLoading: boolean) {
    if (isLoading) {
      return (
        <div className="space-y-4 mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
      )
    }

    if (chamados.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center mt-6">
          <p className="text-muted-foreground mb-4">Nenhum chamado encontrado.</p>
          <Button asChild>
            <Link href="/chamados/novo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Novo Chamado
            </Link>
          </Button>
        </div>
      )
    }

    return (
      <div className="mt-6">
        <ResponsiveTable
          data={chamados}
          columns={columns}
          keyExtractor={(item) => item.id.toString()}
          onRowClick={(item) => router.push(`/chamados/${item.id}`)}
          isLoading={isLoading}
          emptyMessage="Nenhum chamado encontrado."
          searchPlaceholder="Buscar chamados..."
          initialSortColumn="dataAbertura"
          initialSortDirection="desc"
        />
      </div>
    )
  }
}
