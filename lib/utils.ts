import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return "-"

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  } catch (error) {
    console.error("Erro ao formatar data:", error)
    return dateString
  }
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "-"

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  } catch (error) {
    console.error("Erro ao formatar data e hora:", error)
    return dateString
  }
}

export function formatCurrency(value: number): string {
  if (value === undefined || value === null) return "-"

  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  } catch (error) {
    console.error("Erro ao formatar moeda:", error)
    return String(value)
  }
}

export function formatPhone(phone: string): string {
  if (!phone) return ""

  // Remover todos os caracteres não numéricos
  const numbers = phone.replace(/\D/g, "")

  // Aplicar máscara de telefone brasileiro
  if (numbers.length === 11) {
    // Celular com DDD
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (numbers.length === 10) {
    // Telefone fixo com DDD
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
  } else if (numbers.length === 9) {
    // Celular sem DDD
    return numbers.replace(/(\d{5})(\d{4})/, "$1-$2")
  } else if (numbers.length === 8) {
    // Telefone fixo sem DDD
    return numbers.replace(/(\d{4})(\d{4})/, "$1-$2")
  }

  // Se não se encaixar em nenhum padrão, retorna como está
  return numbers
}

export function formatCPF(cpf: string): string {
  if (!cpf) return ""

  // Remover todos os caracteres não numéricos
  const numbers = cpf.replace(/\D/g, "")

  // Aplicar máscara de CPF
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  // Se não se encaixar no padrão, retorna como está
  return numbers
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("token")
  return !!token
}

export function getUser() {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error("Erro ao obter usuário:", error)
    return null
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return ""
  if (text.length <= maxLength) return text

  return text.substring(0, maxLength) + "..."
}
