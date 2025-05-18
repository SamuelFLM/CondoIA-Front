"use client"

import { BarChart3, PieChart, LineChart, Download, FileText, DollarSign, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSingleRequest } from "@/hooks/use-single-request"

export default function RelatoriosPage() {
  const { isLoading } = useSingleRequest({
    endpoint: "/relatorios",
    mockData: [],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Visualize e exporte relatórios do condomínio</p>
      </div>

      {/* Card principal com gradiente */}
      <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Resumo de Relatórios</CardTitle>
          <CardDescription className="text-white/80">Visão geral dos relatórios disponíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Relatórios Financeiros</div>
              <div className="mt-1 text-3xl font-bold">12</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Relatórios de Chamados</div>
              <div className="mt-1 text-3xl font-bold">8</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Relatórios de Moradores</div>
              <div className="mt-1 text-3xl font-bold">5</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Financeiros</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Relatórios detalhados de receitas, despesas e fluxo de caixa
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Ver relatórios
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios de Chamados</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Análise de chamados por tipo, status e tempo de resolução</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Ver relatórios
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios de Moradores</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <Users className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Estatísticas sobre moradores, ocupação e perfil demográfico</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Ver relatórios
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="maio">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="janeiro">Janeiro</SelectItem>
              <SelectItem value="fevereiro">Fevereiro</SelectItem>
              <SelectItem value="marco">Março</SelectItem>
              <SelectItem value="abril">Abril</SelectItem>
              <SelectItem value="maio">Maio</SelectItem>
              <SelectItem value="junho">Junho</SelectItem>
              <SelectItem value="julho">Julho</SelectItem>
              <SelectItem value="agosto">Agosto</SelectItem>
              <SelectItem value="setembro">Setembro</SelectItem>
              <SelectItem value="outubro">Outubro</SelectItem>
              <SelectItem value="novembro">Novembro</SelectItem>
              <SelectItem value="dezembro">Dezembro</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2023">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatórios
        </Button>
      </div>

      <Tabs defaultValue="financeiro" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="chamados">Chamados</TabsTrigger>
          <TabsTrigger value="moradores">Moradores</TabsTrigger>
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Financeiro</CardTitle>
              <CardDescription>Análise financeira do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Receitas vs Despesas</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Distribuição de Gastos</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PieChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório Financeiro
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chamados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Chamados</CardTitle>
              <CardDescription>Análise dos chamados do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Chamados por Status</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PieChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Tempo Médio de Resolução</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <LineChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório de Chamados
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="moradores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Moradores</CardTitle>
              <CardDescription>Análise dos moradores do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Distribuição por Bloco</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Tempo de Residência</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <LineChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório de Moradores
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reservas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Reservas</CardTitle>
              <CardDescription>Análise das reservas de áreas comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Reservas por Área</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PieChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Reservas por Mês</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório de Reservas
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
