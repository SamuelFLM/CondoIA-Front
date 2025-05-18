"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Monitor, Settings, Bell, Shield, Database } from "lucide-react"

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme()
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    sms: false,
    push: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      {/* Card principal com gradiente */}
      <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Configurações do Sistema</CardTitle>
          <CardDescription className="text-white/80">
            Personalize o sistema de acordo com suas preferências
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Tema</div>
              <div className="mt-1 text-xl font-bold capitalize">{theme}</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Notificações</div>
              <div className="mt-1 text-xl font-bold">Ativas</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Segurança</div>
              <div className="mt-1 text-xl font-bold">Avançada</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-white/80">Backup</div>
              <div className="mt-1 text-xl font-bold">Diário</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Configurações Gerais</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <Settings className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Configurações básicas do sistema</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <div className="rounded-full bg-amber-500/10 p-1">
              <Bell className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Gerenciamento de alertas</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segurança</CardTitle>
            <div className="rounded-full bg-green-500/10 p-1">
              <Shield className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Proteção de dados e acessos</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistema</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <Database className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Configurações técnicas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="aparencia">Aparência</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Gerencie as configurações gerais do condomínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condominio-nome">Nome do Condomínio</Label>
                <Input id="condominio-nome" defaultValue="Condomínio Residencial Exemplo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condominio-endereco">Endereço</Label>
                <Input id="condominio-endereco" defaultValue="Rua Exemplo, 123 - Bairro - Cidade/UF" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condominio-telefone">Telefone</Label>
                <Input id="condominio-telefone" defaultValue="(11) 1234-5678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condominio-email">Email</Label>
                <Input id="condominio-email" type="email" defaultValue="contato@condominio.com" />
              </div>
              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Sun className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Claro</p>
                        <p className="text-sm text-muted-foreground">Tema claro para ambientes bem iluminados</p>
                      </div>
                    </div>
                    <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                      {theme === "light" ? "Ativo" : "Selecionar"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Moon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Escuro</p>
                        <p className="text-sm text-muted-foreground">Tema escuro para ambientes com pouca luz</p>
                      </div>
                    </div>
                    <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                      {theme === "dark" ? "Ativo" : "Selecionar"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Monitor className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Sistema</p>
                        <p className="text-sm text-muted-foreground">Segue as configurações do seu sistema</p>
                      </div>
                    </div>
                    <Button variant={theme === "system" ? "default" : "outline"} onClick={() => setTheme("system")}>
                      {theme === "system" ? "Ativo" : "Selecionar"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como as notificações são enviadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificacoes.email}
                  onCheckedChange={(checked) => setNotificacoes((prev) => ({ ...prev, email: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">Receba notificações por SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notificacoes.sms}
                  onCheckedChange={(checked) => setNotificacoes((prev) => ({ ...prev, sms: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">Receba notificações push no navegador</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notificacoes.push}
                  onCheckedChange={(checked) => setNotificacoes((prev) => ({ ...prev, push: checked }))}
                />
              </div>
              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Gerencie as configurações técnicas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-logout">Logout Automático</Label>
                  <p className="text-sm text-muted-foreground">Desconectar após 30 minutos de inatividade</p>
                </div>
                <Switch id="auto-logout" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Coleta de Dados Analíticos</Label>
                  <p className="text-sm text-muted-foreground">Permitir coleta de dados para melhorias</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
