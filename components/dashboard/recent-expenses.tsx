"use client"

import { Badge } from "@/components/ui/badge"
import { useSingleRequest } from "@/hooks/use-single-request"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Manutenção do elevador",
    amount: 1200.5,
    category: "manutenção",
    date: "2023-05-10T10:30:00Z",
  },
  {
    id: "2",
    description: "Conta de água",
    amount: 850.75,
    category: "utilidades",
    date: "2023-05-09T14:20:00Z",
  },
  {
    id: "3",
    description: "Serviço de limpeza",
    amount: 600,
    category: "serviços",
    date: "2023-05-08T09:15:00Z",
  },
]

export function RecentExpenses() {
  const { data: expenses, isLoading } = useSingleRequest<Expense[]>({
    endpoint: "/expenses/recent",
    mockData: mockExpenses,
  })

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "manutenção":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Manutenção
          </Badge>
        )
      case "utilidades":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Utilidades
          </Badge>
        )
      case "serviços":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Serviços
          </Badge>
        )
      default:
        return <Badge variant="outline">Outros</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {expenses?.map((expense) => (
        <div key={expense.id} className="flex flex-col space-y-2">
          <div className="font-medium">{expense.description}</div>
          <div className="flex justify-between">
            {getCategoryBadge(expense.category)}
            <span className="font-semibold">{formatCurrency(expense.amount)}</span>
          </div>
          <div className="text-xs text-muted-foreground">{formatDate(new Date(expense.date))}</div>
        </div>
      ))}
    </div>
  )
}
