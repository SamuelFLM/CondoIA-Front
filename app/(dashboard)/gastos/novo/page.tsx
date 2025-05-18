"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { ArrowLeft, Save, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useMobileDetect } from "@/hooks/use-mobile"
import { ErrorBoundary } from "@/components/error-boundary"
import { useApiError } from "@/hooks/use-api-error"
import { ValidatedForm } from "@/components/ui/validated-form"

// Schema de validação aprimorado
const formSchema = z.object({
  descricao: z
    .string()
    .min(3, { message: "A descrição deve ter pelo menos 3 caracteres." })
    .max(100, { message: "A descrição deve ter no máximo 100 caracteres." })
    .refine((val) => val.trim().length > 0, { message: "A descrição não pode estar vazia." }),

  valor: z
    .string()
    .min(1, { message: "O valor é obrigatório." })
    .refine((val) => !isNaN(Number.parseFloat(val.replace(",", "."))), {
      message: "O valor deve ser um número válido.",
    })
    .refine((val) => Number.parseFloat(val.replace(",", ".")) > 0, {
      message: "O valor deve ser maior que zero.",
    }),

  data: z
    .string()
    .min(1, { message: "A data é obrigatória." })
    .refine(
      (val) => {
        const date = new Date(val)
        return !isNaN(date.getTime())
      },
      { message: "Data inválida." },
    ),

  categoria: z
    .string()
    .min(1, { message: "A categoria é obrigatória." })
    .refine((val) => ["manutencao", "limpeza", "seguranca", "agua", "energia", "internet", "outros"].includes(val), {
      message: "Categoria inválida. Selecione uma das opções disponíveis.",
    }),

  tipo: z
    .string()
    .min(1, { message: "O tipo é obrigatório." })
    .refine((val) => ["fixo", "variavel", "extraordinario"].includes(val), {
      message: "Tipo inválido. Selecione uma das opções disponíveis.",
    }),

  observacoes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function NovoGastoPage() {
  const router = useRouter()
  const { isMobile } = useMobileDetect()
  const { handleError } = useApiError()
  const [isResetting, setIsResetting] = useState(false)

  const defaultValues: FormValues = {
    descricao: "",
    valor: "",
    data: new Date().toISOString().split("T")[0],
    categoria: "",
    tipo: "",
    observacoes: "",
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      // Em produção, isso seria uma chamada real à API
      // Simulação para desenvolvimento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Dados do gasto:", values)

      // Simular chamada à API
      // await api.post("/gastos", values)

      toast({
        title: "Gasto registrado com sucesso!",
        description: `O gasto ${values.descricao} foi registrado.`,
      })

      router.push("/gastos")
    } catch (error: any) {
      handleError(error)
      throw error
    }
  }

  const handleCancel = () => {
    if (window.confirm("Tem certeza que deseja cancelar? Todas as informações não salvas serão perdidas.")) {
      router.push("/gastos")
    }
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Gasto</h1>
            <p className="text-muted-foreground">Registre um novo gasto no sistema</p>
          </div>
          <Button variant="outline" asChild aria-label="Voltar para lista de gastos">
            <Link href="/gastos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Gasto</CardTitle>
            <CardDescription>Preencha os dados do novo gasto</CardDescription>
          </CardHeader>
          <ValidatedForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            showErrorSummary={true}
            successMessage="Gasto registrado com sucesso!"
          >
            {(form) => (
              <>
                <CardContent className="space-y-6">
                  <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Descrição <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Conta de luz" {...field} />
                          </FormControl>
                          <FormDescription>Informe uma descrição clara para o gasto.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="valor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Valor (R$) <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0.01"
                              placeholder="0,00"
                              {...field}
                              onChange={(e) => {
                                // Garantir que o valor seja positivo
                                const value = e.target.value
                                if (value === "" || Number(value) >= 0) {
                                  field.onChange(value)
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>Informe o valor do gasto (somente números positivos).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="data"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Data <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" max={new Date().toISOString().split("T")[0]} {...field} />
                          </FormControl>
                          <FormDescription>Informe a data do gasto (não pode ser futura).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="manutencao">Manutenção</SelectItem>
                              <SelectItem value="limpeza">Limpeza</SelectItem>
                              <SelectItem value="seguranca">Segurança</SelectItem>
                              <SelectItem value="agua">Água</SelectItem>
                              <SelectItem value="energia">Energia</SelectItem>
                              <SelectItem value="internet">Internet</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Selecione a categoria do gasto.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Tipo <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fixo">Fixo</SelectItem>
                              <SelectItem value="variavel">Variável</SelectItem>
                              <SelectItem value="extraordinario">Extraordinário</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Selecione o tipo do gasto.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="observacoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Informações adicionais sobre o gasto..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Opcional: Adicione observações relevantes sobre o gasto.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className={`flex ${isMobile ? "flex-col space-y-2" : "justify-between"}`}>
                  <div className={isMobile ? "w-full" : ""}>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja limpar o formulário?")) {
                          form.reset(defaultValues)
                          toast({
                            title: "Formulário limpo",
                            description: "Os campos do formulário foram limpos.",
                          })
                        }
                      }}
                      className={isMobile ? "w-full" : ""}
                      aria-label="Limpar formulário"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Limpar
                    </Button>
                  </div>
                  <div className={`${isMobile ? "flex flex-col space-y-2" : "space-x-2"}`}>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleCancel}
                      className={isMobile ? "w-full" : ""}
                      aria-label="Cancelar e voltar para lista de gastos"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting || !form.formState.isValid}
                      className={isMobile ? "w-full" : ""}
                      aria-label="Salvar novo gasto"
                    >
                      {form.formState.isSubmitting ? (
                        "Salvando..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Gasto
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </ValidatedForm>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
