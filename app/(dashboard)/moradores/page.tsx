"use client"

import Link from "next/link"
import { PlusCircle, Users, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/users-table"
import { Skeleton } from "@/components/ui/skeleton"
import { useSingleRequest } from "@/hooks/use-single-request"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function MoradoresPage() {
  const { data: moradores, isLoading } = useSingleRequest({
    endpoint: "/moradores",
    mockData: [],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Moradores</h1>
        <p className="text-muted-foreground">Gerencie os moradores do condomínio</p>
      </div>

      {/* Card principal com gradiente */}
      <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Resumo de Moradores</CardTitle>
          <CardDescription className="text-white/80">Visão geral dos moradores do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Total</div>
              <div className="mt-1 text-3xl font-bold">45</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Ativos</div>
              <div className="mt-1 text-3xl font-bold">42</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Inativos</div>
              <div className="mt-1 text-3xl font-bold">3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">45</div>}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moradores Ativos</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <UserCheck className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">42</div>}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moradores Inativos</CardTitle>
            <div className="rounded-full bg-red-500/10 p-1">
              <UserX className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">3</div>}
          </CardContent>
        </Card>
      </div>

      {/* Moradores recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Moradores Recentes</CardTitle>
          <CardDescription>Últimos moradores adicionados ao condomínio</CardDescription>
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
                      <p className="font-medium">João da Silva</p>
                      <p className="text-sm text-muted-foreground">Apartamento 101 - Bloco A</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Maria Santos</p>
                      <p className="text-sm text-muted-foreground">Apartamento 202 - Bloco B</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>PO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Pedro Oliveira</p>
                      <p className="text-sm text-muted-foreground">Apartamento 303 - Bloco C</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver todos os moradores
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-between">
        <Input className="w-[250px]" placeholder="Buscar moradores..." />
        <Button asChild>
          <Link href="/moradores/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Morador
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Moradores</CardTitle>
              <CardDescription>Visualize e gerencie todos os moradores do condomínio</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable usuarios={[]} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ativos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moradores Ativos</CardTitle>
              <CardDescription>Visualize e gerencie os moradores ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable usuarios={[]} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inativos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moradores Inativos</CardTitle>
              <CardDescription>Visualize e gerencie os moradores inativos</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable usuarios={[]} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
