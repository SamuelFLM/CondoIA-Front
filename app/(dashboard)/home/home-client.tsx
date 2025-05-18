"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useDataRequest } from "@/hooks/use-data-request"
import { ErrorMessage } from "@/components/ui/error-message"
import { PageTransition } from "@/components/ui/page-transition"
import { DashboardCharts } from "@/components/dashboard/charts"
import { RecentTickets } from "@/components/dashboard/recent-tickets"
import { RecentExpenses } from "@/components/dashboard/recent-expenses"
import { useIsMobile } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"

export function HomeClient() {
  const { data, isLoading, error } = useDataRequest("dashboard")
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useIsMobile()

  if (error) {
    return <ErrorMessage message="Erro ao carregar dados do dashboard" />
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do condomínio</p>

        {/* Tabs para dispositivos móveis */}
        {isMobile && (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="tickets">Chamados</TabsTrigger>
              <TabsTrigger value="expenses">Gastos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 mt-4">
                {/* Cards de estatísticas */}
                <StatsCards data={data} isLoading={isLoading} />

                {/* Gráficos */}
                <DashboardCharts data={data} isLoading={isLoading} />
              </div>
            </TabsContent>

            <TabsContent value="tickets">
              <div className="mt-4">
                <RecentTickets />
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <div className="mt-4">
                <RecentExpenses />
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Layout para desktop */}
        {!isMobile && (
          <>
            {/* Cards de estatísticas */}
            <StatsCards data={data} isLoading={isLoading} />

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardCharts data={data} isLoading={isLoading} />
              <div className="grid gap-4">
                <RecentTickets />
                <RecentExpenses />
              </div>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  )
}

// Componente para os cards de estatísticas
function StatsCards({ data, isLoading }: { data: any; isLoading: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card de Chamados */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de Chamados</CardTitle>
          <CardDescription>Chamados abertos e fechados</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <div className="text-2xl font-bold">{data?.totalChamados || 0}</div>
          )}
        </CardContent>
      </Card>

      {/* Card de Chamados Abertos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Chamados Abertos</CardTitle>
          <CardDescription>Aguardando atendimento</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <div className="text-2xl font-bold">{data?.chamadosAbertos || 0}</div>
          )}
        </CardContent>
      </Card>

      {/* Card de Gastos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de Gastos</CardTitle>
          <CardDescription>Gastos do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <div className="text-2xl font-bold">
              R$ {data?.totalGastos?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card de Moradores */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
          <CardDescription>Moradores ativos</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <div className="text-2xl font-bold">{data?.totalMoradores || 0}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
