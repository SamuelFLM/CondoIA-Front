"use client"

import { AlertCircle, Server, Wifi, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type ErrorTypes = "server" | "client" | "network" | "validation" | "auth" | "unknown"

interface ErrorHandlerProps {
  type?: ErrorTypes
  title?: string
  message: string
  details?: string
  onRetry?: () => void
  className?: string
}

export function ErrorHandler({ type = "unknown", title, message, details, onRetry, className }: ErrorHandlerProps) {
  // Determinar o ícone com base no tipo de erro
  const getIcon = () => {
    switch (type) {
      case "server":
        return <Server className="h-5 w-5" />
      case "network":
        return <Wifi className="h-5 w-5" />
      case "auth":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  // Determinar o título com base no tipo de erro, se não for fornecido
  const getTitle = () => {
    if (title) return title

    switch (type) {
      case "server":
        return "Erro no servidor"
      case "client":
        return "Erro na aplicação"
      case "network":
        return "Erro de conexão"
      case "validation":
        return "Erro de validação"
      case "auth":
        return "Erro de autenticação"
      default:
        return "Ocorreu um erro"
    }
  }

  // Para erros simples, usar o componente Alert
  if (type === "validation" || (type === "client" && !details)) {
    return (
      <Alert variant="destructive" className={className}>
        {getIcon()}
        <AlertTitle>{getTitle()}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  // Para erros mais complexos, usar o Card com mais detalhes e ações
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          <span>{getTitle()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground">{message}</p>
        {details && (
          <div className="rounded-md bg-muted p-4 text-sm font-mono overflow-x-auto">
            <p className="text-muted-foreground break-words">{details}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        {onRetry && (
          <Button variant="outline" onClick={onRetry} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        )}
        <Button asChild className="w-full sm:w-auto">
          <Link href="/home">
            <Home className="mr-2 h-4 w-4" />
            Voltar para o início
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
