import { z } from "zod"

// Validadores comuns
export const emailValidator = z
  .string()
  .min(1, { message: "O e-mail é obrigatório" })
  .email({ message: "Formato de e-mail inválido" })

export const passwordValidator = z
  .string()
  .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  .max(100, { message: "A senha deve ter no máximo 100 caracteres" })
  .refine((value) => /[A-Z]/.test(value), {
    message: "A senha deve conter pelo menos uma letra maiúscula",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "A senha deve conter pelo menos um número",
  })

export const nameValidator = z
  .string()
  .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
  .max(100, { message: "O nome deve ter no máximo 100 caracteres" })
  .refine((value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(value), {
    message: "O nome deve conter apenas letras e espaços",
  })

export const phoneValidator = z
  .string()
  .min(10, { message: "O telefone deve ter pelo menos 10 dígitos" })
  .max(15, { message: "O telefone deve ter no máximo 15 dígitos" })
  .refine((value) => /^[0-9()\-\s+]+$/.test(value), {
    message: "Formato de telefone inválido",
  })

export const dateValidator = z.string().refine(
  (value) => {
    const date = new Date(value)
    return !isNaN(date.getTime())
  },
  { message: "Data inválida" },
)

// Vamos melhorar a validação para não aceitar "coisas erradas"

// Encontre a validação de datas futuras e passadas
export const pastDateValidator = z
  .string()
  .refine(
    (value) => {
      const date = new Date(value)
      return !isNaN(date.getTime())
    },
    { message: "Data inválida" },
  )
  .refine(
    (value) => {
      const date = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date <= today
    },
    { message: "A data não pode ser futura" },
  )

export const futureDateValidator = z
  .string()
  .refine(
    (value) => {
      const date = new Date(value)
      return !isNaN(date.getTime())
    },
    { message: "Data inválida" },
  )
  .refine(
    (value) => {
      const date = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date >= today
    },
    { message: "A data não pode ser passada" },
  )

// Melhore a validação de valores monetários para não aceitar valores negativos
export const currencyValidator = z
  .string()
  .refine(
    (val) => {
      // Remover formatação de moeda
      const numericValue = val.replace(/[^\d.,]/g, "").replace(",", ".")
      return !isNaN(Number(numericValue))
    },
    { message: "Valor monetário inválido" },
  )
  .refine(
    (val) => {
      const numericValue = val.replace(/[^\d.,]/g, "").replace(",", ".")
      return Number(numericValue) > 0 // Alterado de >= para > para não aceitar zero
    },
    { message: "O valor deve ser maior que zero" }, // Mensagem melhorada
  )

// Funções auxiliares
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export const parseCurrency = (value: string): number => {
  const numericValue = value.replace(/[^\d.,]/g, "").replace(",", ".")
  return Number(numericValue)
}

export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("pt-BR")
}

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString("pt-BR")
}
