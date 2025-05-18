"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./button"

interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
      <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
      <h3 className="mb-2 text-lg font-semibold text-red-700 dark:text-red-400">Ocorreu um erro</h3>
      <p className="mb-4 text-red-600 dark:text-red-300">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
