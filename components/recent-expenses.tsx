import { Badge } from "@/components/ui/badge"

export function RecentExpenses() {
  // Dados simulados - em produção, viriam de uma API
  const expenses = [
    {
      id: "E-5678",
      description: "Manutenção do elevador",
      amount: 2500.0,
      category: "maintenance",
      date: "2023-05-14",
    },
    {
      id: "E-5677",
      description: "Conta de água",
      amount: 1850.75,
      category: "utilities",
      date: "2023-05-12",
    },
    {
      id: "E-5676",
      description: "Serviço de limpeza",
      amount: 1200.0,
      category: "cleaning",
      date: "2023-05-10",
    },
    {
      id: "E-5675",
      description: "Salários dos funcionários",
      amount: 4500.0,
      category: "staff",
      date: "2023-05-05",
    },
    {
      id: "E-5674",
      description: "Manutenção do portão eletrônico",
      amount: 850.0,
      category: "maintenance",
      date: "2023-05-03",
    },
  ]

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Manutenção
          </Badge>
        )
      case "utilities":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Serviços
          </Badge>
        )
      case "cleaning":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Limpeza
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Funcionários
          </Badge>
        )
      case "security":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Segurança
          </Badge>
        )
      default:
        return <Badge variant="secondary">Outros</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-start gap-4 rounded-lg border p-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{expense.id}</span>
              {getCategoryBadge(expense.category)}
            </div>
            <p className="text-sm font-medium">{expense.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{formatDate(expense.date)}</span>
              <span className="font-medium text-primary">{formatCurrency(expense.amount)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
