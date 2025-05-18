import { BanknoteIcon as Bank } from "lucide-react"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Carregando..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Bank className="h-12 w-12 text-primary animate-pulse" />
          <span className="bank-loader absolute inset-0"></span>
        </div>
        <p className="text-lg font-medium text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
