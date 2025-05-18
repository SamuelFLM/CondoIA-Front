import * as z from "zod"

// Esquema para criação de um novo chamado
export const novoChamadoSchema = z.object({
  titulo: z
    .string()
    .min(5, { message: "O título deve ter pelo menos 5 caracteres" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "A descrição deve ter no máximo 1000 caracteres" }),
  prioridade: z.enum(["Baixa", "Média", "Alta"], {
    required_error: "Selecione a prioridade do chamado",
  }),
  categoria: z.enum(["Manutenção", "Segurança", "Limpeza", "Barulho", "Outros"], {
    required_error: "Selecione a categoria do chamado",
  }),
  local: z
    .string()
    .min(3, { message: "O local deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O local deve ter no máximo 100 caracteres" }),
  dataLimite: z
    .string()
    .optional()
    .refine((val) => !val || new Date(val) > new Date(), {
      message: "A data limite deve ser no futuro",
    }),
})

// Esquema para comentário em um chamado
export const comentarioChamadoSchema = z.object({
  conteudo: z
    .string()
    .min(1, { message: "O comentário não pode estar vazio" })
    .max(500, { message: "O comentário deve ter no máximo 500 caracteres" }),
})

// Esquema para atualização de status de um chamado
export const atualizarStatusChamadoSchema = z.object({
  status: z.enum(["Aberto", "Em Andamento", "Fechado"], {
    required_error: "Selecione um status válido",
  }),
  comentario: z.string().max(500, { message: "O comentário deve ter no máximo 500 caracteres" }).optional(),
})
