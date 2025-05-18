import * as z from "zod"

// Esquema para criação de um novo gasto
export const novoGastoSchema = z.object({
  descricao: z
    .string()
    .min(5, { message: "A descrição deve ter pelo menos 5 caracteres" })
    .max(200, { message: "A descrição deve ter no máximo 200 caracteres" }),
  valor: z
    .number({
      required_error: "Digite o valor do gasto",
      invalid_type_error: "Digite um valor numérico",
    })
    .positive({ message: "O valor deve ser maior que zero" }),
  categoria: z.enum(["Manutenção", "Limpeza", "Segurança", "Água", "Energia", "Internet", "Outros"], {
    required_error: "Selecione a categoria do gasto",
  }),
  dataPagamento: z.string().refine((val) => Boolean(val), {
    message: "Selecione a data de pagamento",
  }),
  tipoGasto: z.enum(["Fixo", "Variável", "Extraordinário"], {
    required_error: "Selecione o tipo de gasto",
  }),
  comprovante: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true
        return file.size <= 5 * 1024 * 1024 // 5MB
      },
      { message: "O arquivo deve ter no máximo 5MB" },
    )
    .refine(
      (file) => {
        if (!file) return true
        return ["application/pdf", "image/jpeg", "image/png"].includes(file.type)
      },
      { message: "Formato de arquivo inválido. Use PDF, JPEG ou PNG" },
    ),
  observacao: z.string().max(500, { message: "A observação deve ter no máximo 500 caracteres" }).optional(),
})

// Esquema para filtro de gastos
export const filtroGastosSchema = z.object({
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  categoria: z.string().optional(),
  tipoGasto: z.string().optional(),
  valorMinimo: z.number().nonnegative({ message: "O valor mínimo não pode ser negativo" }).optional(),
  valorMaximo: z.number().positive({ message: "O valor máximo deve ser maior que zero" }).optional(),
})
