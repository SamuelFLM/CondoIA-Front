"use client"

import Link from "next/link"
import { PlusCircle, DollarSign, TrendingDown, TrendingUp, Filter, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ExpensesTable } from "@/components/expenses-table"
import { Skeleton } from "@/components/ui/skeleton"
import { useSingleRequest } from "@/hooks/use-single-request"

export default function GastosPage() {
  const { data: gastos, isLoading } = useSingleRequest({
    endpoint: "/gastos",
    mockData: [],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gastos</h1>
        <p className="text-muted-foreground">Gerencie os gastos do condomínio</p>
      </div>

      {/* Cartão de resumo financeiro */}
      <Card className="overflow-hidden bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <CardHeader>
          <CardTitle className="text-white">Resumo Financeiro</CardTitle>
          <CardDescription className="text-white/80">Visão geral dos gastos do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="text-4xl font-bold">
              {isLoading ? (
                <Skeleton className="h-10 w-32 bg-white/20" />
              ) : (
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(4250.8)
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-red-100">
                <TrendingUp className="h-3 w-3" />
                +8%
              </span>
              <span className="text-white/80">em relação ao mês anterior</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-white/10 bg-black/10">
          <Link
            href="/relatorios/financeiro"
            className="flex w-full items-center justify-between text-sm text-white/90 hover:text-white"
          >
            <span>Ver relatório financeiro completo</span>
            <Calendar className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(28500.0)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Total de receitas no mês</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <div className="rounded-full bg-red-500/10 p-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(4250.8)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Total de despesas no mês</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(24249.2)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Saldo atual do mês</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input className="w-[250px]" placeholder="Buscar gastos..." />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        <Button asChild>
          <Link href="/gastos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Gasto
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="fixos">Fixos</TabsTrigger>
          <TabsTrigger value="variaveis">Variáveis</TabsTrigger>
          <TabsTrigger value="extraordinarios">Extraordinários</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Gastos</CardTitle>
              <CardDescription>Visualize e gerencie todos os gastos do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fixos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gastos Fixos</CardTitle>
              <CardDescription>Visualize e gerencie os gastos fixos</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variaveis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gastos Variáveis</CardTitle>
              <CardDescription>Visualize e gerencie os gastos variáveis</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extraordinarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gastos Extraordinários</CardTitle>
              <CardDescription>Visualize e gerencie os gastos extraordinários</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
