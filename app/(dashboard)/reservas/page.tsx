"use client"

import Link from "next/link"
import { PlusCircle, Calendar, CheckCircle, XCircle, Filter, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useSingleRequest } from "@/hooks/use-single-request"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ReservasPage() {
  const { data: reservas, isLoading } = useSingleRequest({
    endpoint: "/reservas",
    mockData: [],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
        <p className="text-muted-foreground">Gerencie as reservas de áreas comuns</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reservas</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">18</div>}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <div className="rounded-full bg-amber-500/10 p-1">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">3</div>}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">12</div>}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
            <div className="rounded-full bg-red-500/10 p-1">
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">3</div>}
          </CardContent>
        </Card>
      </div>

      {/* Próximas reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Reservas</CardTitle>
          <CardDescription>Reservas agendadas para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Salão de Festas</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Confirmada
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">João da Silva - Hoje, 18:00 às 22:00</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Churrasqueira</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Confirmada
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Maria Santos - Amanhã, 12:00 às 16:00</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>PO</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Quadra Poliesportiva</p>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                          Pendente
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Pedro Oliveira - 20/05, 09:00 às 11:00</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver todas as reservas
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input className="w-[250px]" placeholder="Buscar reservas..." />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        <Button asChild>
          <Link href="/reservas/nova">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Reserva
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Reservas</CardTitle>
              <CardDescription>Visualize e gerencie todas as reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center text-muted-foreground">Tabela de reservas em desenvolvimento</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservas Pendentes</CardTitle>
              <CardDescription>Visualize e gerencie as reservas pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center text-muted-foreground">
                  Tabela de reservas pendentes em desenvolvimento
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmadas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservas Confirmadas</CardTitle>
              <CardDescription>Visualize e gerencie as reservas confirmadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center text-muted-foreground">
                  Tabela de reservas confirmadas em desenvolvimento
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canceladas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservas Canceladas</CardTitle>
              <CardDescription>Visualize as reservas canceladas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center text-muted-foreground">
                  Tabela de reservas canceladas em desenvolvimento
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
