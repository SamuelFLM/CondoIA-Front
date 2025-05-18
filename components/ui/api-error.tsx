"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type ErrorType =
  | "server"
  | "client"
  | "network"
  | "auth"
  | "forbidden"
  | "notFound"
  | "validation"
  | "timeout"
  | "unknown"

interface ApiErrorProps {
  type?: ErrorType
  title?: string
  message: string
  details?: string
  onRetry?: () => void
  className?: string
}

export function ApiError({
  title = "Erro na comunicação com o servidor",
  message,
  details,
  onRetry,
  className,
}: ApiErrorProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{message}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Isso pode ser causado por problemas de conexão ou indisponibilidade temporária do servidor.
        </p>
      </CardContent>
      {onRetry && (
        <CardFooter>
          <Button variant="outline" onClick={onRetry} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
