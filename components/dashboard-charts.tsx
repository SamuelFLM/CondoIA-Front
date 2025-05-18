"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardData {
  totalChamadosAbertos: number
  totalChamadosEmAndamento: number
  totalChamadosFechados: number
  totalGastosMes: number
  totalGastosAno: number
  gastosPorCategoria: { categoria: string; valor: number; percentual: number }[]
  chamadosPorStatus: { status: string; quantidade: number; percentual: number }[]
  gastosMensais: { mes: string; valor: number }[]
}

export function DashboardCharts() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("https://localhost:7001/api/dashboard")
        if (!response.ok) {
          throw new Error("Falha ao carregar dados do dashboard")
        }
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do dashboard.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Chamados por Mês</CardTitle>
            <CardDescription>Número de chamados abertos por mês</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <CardDescription>Distribuição de gastos por categoria</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Chamados por Status</CardTitle>
          <CardDescription>Distribuição de chamados por status</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {dashboardData ? (
            <div className="h-full w-full flex flex-col justify-center">
              {dashboardData.chamadosPorStatus.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.status}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.quantidade} ({item.percentual.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.percentual}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-muted-foreground">Nenhum dado disponível</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Distribuição de gastos por categoria</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {dashboardData && dashboardData.gastosPorCategoria.length > 0 ? (
            <div className="h-full w-full flex flex-col justify-center">
              {dashboardData.gastosPorCategoria.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.categoria}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.valor)} (
                      {item.percentual.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.percentual}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-muted-foreground">Nenhum dado disponível</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
