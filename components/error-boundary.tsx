"use client"

import React from "react"
import { ErrorHandler } from "@/components/ui/error-handler"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Aqui podemos registrar o erro em um serviço de monitoramento
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Fallback personalizado ou componente de erro padrão
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 max-w-3xl mx-auto">
          <ErrorHandler
            type="client"
            title="Ops, algo deu errado!"
            message="Encontramos um problema ao exibir esta página."
            details={this.state.error?.message || "Erro desconhecido"}
            onRetry={() => this.setState({ hasError: false, error: null })}
          />
        </div>
      )
    }

    return this.props.children
  }
}

// Componente funcional para facilitar o uso
export function WithErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
}
