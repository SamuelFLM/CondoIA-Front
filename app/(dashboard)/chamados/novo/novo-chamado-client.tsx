"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useMobileDetect } from "@/hooks/use-mobile"
import { ValidatedForm } from "@/components/ui/validated-form"
import { ErrorBoundary } from "@/components/error-boundary"
import { useApiError } from "@/hooks/use-api-error"
import { useCrudOperations } from "@/hooks/use-crud-operations"
import { useAuth } from "@/contexts/auth-context"

// Schema de validação aprimorado
const formSchema = z.object({
  titulo: z
    .string()
    .min(5, { message: "O título deve ter pelo menos 5 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." })
    .refine((val) => val.trim().length > 0, { message: "O título não pode estar vazio." }),

  categoria: z
    .string({
      required_error: "Selecione uma categoria.",
    })
    .refine((val) => ["maintenance", "security", "cleaning", "noise", "other"].includes(val), {
      message: "Categoria inválida. Selecione uma das opções disponíveis.",
    }),

  prioridade: z
    .string({
      required_error: "Selecione uma prioridade.",
    })
    .refine((val) => ["low", "medium", "high", "urgent"].includes(val), {
      message: "Prioridade inválida. Selecione uma das opções disponíveis.",
    }),

  localizacao: z
    .string()
    .min(3, { message: "A localização deve ter pelo menos 3 caracteres." })
    .max(100, { message: "A localização deve ter no máximo 100 caracteres." })
    .refine((val) => val.trim().length > 0, { message: "A localização não pode estar vazia." }),

  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
    .max(1000, { message: "A descrição deve ter no máximo 1000 caracteres." })
    .refine((val) => val.trim().length > 0, { message: "A descrição não pode estar vazia." }),
})

type FormValues = z.infer<typeof formSchema>

export default function NovoChamadoClient() {
  const router = useRouter()
  const { isMobile } = useMobileDetect()
  const { handleError } = useApiError()
  const { user } = useAuth()

  // Usar o hook de CRUD para criar um novo chamado
  const { createResource, isCreating } = useCrudOperations({
    resourceType: "chamados",
    onSuccess: () => {
      toast({
        title: "Chamado registrado com sucesso!",
        description: "Seu chamado foi registrado e será analisado em breve.",
      })
      router.push("/chamados")
    },
  })

  const defaultValues: FormValues = {
    titulo: "",
    categoria: "",
    prioridade: "",
    localizacao: "",
    descricao: "",
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      // Mapear valores do formulário para o formato esperado pelo backend
      const chamadoData = {
        titulo: values.titulo,
        descricao: values.descricao,
        status: "Aberto",
        prioridade: mapPrioridade(values.prioridade),
        categoria: mapCategoria(values.categoria),
        localizacao: values.localizacao,
        dataAbertura: new Date().toISOString(),
        dataFechamento: null,
        nomeUsuario: user?.nome || "Usuário",
        nomeResponsavel: null,
        solicitante: user?.id || "1",
        responsavel: null,
        comentarios: [],
      }

      // Criar o chamado usando o serviço de mock
      await createResource(chamadoData)
    } catch (error: any) {
      handleError(error)
      throw error
    }
  }

  // Mapear valores do formulário para o formato esperado pelo backend
  const mapPrioridade = (prioridade: string): string => {
    const map: Record<string, string> = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente",
    }
    return map[prioridade] || prioridade
  }

  const mapCategoria = (categoria: string): string => {
    const map: Record<string, string> = {
      maintenance: "Manutenção",
      security: "Segurança",
      cleaning: "Limpeza",
      noise: "Barulho",
      other: "Outros",
    }
    return map[categoria] || categoria
  }

  const handleCancel = () => {
    if (window.confirm("Tem certeza que deseja cancelar? Todas as informações não salvas serão perdidas.")) {
      router.push("/chamados")
    }
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/chamados" aria-label="Voltar para lista de chamados">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Chamado</h1>
            <p className="text-muted-foreground">Registre um novo chamado no sistema</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Chamado</CardTitle>
            <CardDescription>Preencha os dados para registrar um novo chamado</CardDescription>
          </CardHeader>
          <ValidatedForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            showErrorSummary={true}
            successMessage="Chamado registrado com sucesso!"
          >
            {(form) => (
              <>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Título <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input id="titulo" placeholder="Ex: Vazamento na garagem" {...field} />
                        </FormControl>
                        <FormDescription>Informe um título claro e objetivo para o chamado.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className={`grid grid-cols-1 gap-4 ${isMobile ? "" : "md:grid-cols-2"}`}>
                    <FormField
                      control={form.control}
                      name="categoria"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Categoria <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="categoria">
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="maintenance">Manutenção</SelectItem>
                              <SelectItem value="security">Segurança</SelectItem>
                              <SelectItem value="cleaning">Limpeza</SelectItem>
                              <SelectItem value="noise">Barulho</SelectItem>
                              <SelectItem value="other">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prioridade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Prioridade <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="prioridade">
                                <SelectValue placeholder="Selecione a prioridade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Baixa</SelectItem>
                              <SelectItem value="medium">Média</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                              <SelectItem value="urgent">Urgente</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="localizacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Localização <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input id="localizacao" placeholder="Ex: Bloco A, Apartamento 101" {...field} />
                        </FormControl>
                        <FormDescription>Informe onde o problema está ocorrendo.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Descrição <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="descricao"
                            placeholder="Descreva o problema em detalhes..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Forneça detalhes sobre o problema, incluindo quando começou e quaisquer informações
                          relevantes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className={`flex ${isMobile ? "flex-col space-y-2" : "justify-between"}`}>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                    className={isMobile ? "w-full" : ""}
                    aria-label="Cancelar e voltar para lista de chamados"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || !form.formState.isValid}
                    className={isMobile ? "w-full" : ""}
                    aria-label="Registrar novo chamado"
                  >
                    {isCreating ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Registrar Chamado
                      </>
                    )}
                  </Button>
                </CardFooter>
              </>
            )}
          </ValidatedForm>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
