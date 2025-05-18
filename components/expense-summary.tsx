"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ExpenseSummary() {
  // Dados simulados - em produção, viriam de uma API
  const currentMonthTotal = 10050.75
  const previousMonthTotal = 9250.5
  const percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Tabs defaultValue="month" className="space-y-4">
      <TabsList>
        <TabsTrigger value="month">Este Mês</TabsTrigger>
        <TabsTrigger value="quarter">Este Trimestre</TabsTrigger>
        <TabsTrigger value="year">Este Ano</TabsTrigger>
      </TabsList>
      <TabsContent value="month" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Gastos</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(currentMonthTotal)}</div>
              <p className={`text-xs ${percentageChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                {percentageChange >= 0 ? "+" : ""}
                {percentageChange.toFixed(1)}% do mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manutenção</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(3350.0)}</div>
              <p className="text-xs text-muted-foreground">33.3% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Públicos</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(1850.75)}</div>
              <p className="text-xs text-muted-foreground">18.4% do total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(4500.0)}</div>
              <p className="text-xs text-muted-foreground">44.8% do total</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="quarter" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Trimestre</CardTitle>
            <CardDescription>Visão geral dos gastos nos últimos 3 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full bg-[url('/placeholder-l69yx.png')] bg-contain bg-center bg-no-repeat" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="year" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Ano</CardTitle>
            <CardDescription>Visão geral dos gastos no ano corrente</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full bg-[url('/placeholder-qp2nb.png')] bg-contain bg-center bg-no-repeat" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
