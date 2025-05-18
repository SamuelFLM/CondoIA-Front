"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ExpenseFilters() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar gastos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row md:w-2/3">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="maintenance">Manutenção</SelectItem>
            <SelectItem value="utilities">Serviços Públicos</SelectItem>
            <SelectItem value="cleaning">Limpeza</SelectItem>
            <SelectItem value="security">Segurança</SelectItem>
            <SelectItem value="staff">Funcionários</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Forma de Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="cash">Dinheiro</SelectItem>
            <SelectItem value="credit-card">Cartão de Crédito</SelectItem>
            <SelectItem value="debit-card">Cartão de Débito</SelectItem>
            <SelectItem value="bank-transfer">Transferência</SelectItem>
            <SelectItem value="pix">PIX</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="this-month">Este Mês</SelectItem>
            <SelectItem value="last-month">Mês Passado</SelectItem>
            <SelectItem value="this-year">Este Ano</SelectItem>
            <SelectItem value="custom">Personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
