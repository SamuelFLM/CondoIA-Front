"use client"

import { ApiError, type ErrorType } from "@/components/ui/api-error"

interface ErrorStateProps {
  type: ErrorType
  title?: string
  message?: string
  details?: string
  onRetry?: () => void
  className?: string
  fullPage?: boolean
}

export function ErrorState({ type, title, message, details, onRetry, className, fullPage = false }: ErrorStateProps) {
  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
        <ApiError
          type={type}
          title={title}
          message={message}
          details={details}
          onRetry={onRetry}
          className={className}
        />
      </div>
    )
  }

  return (
    <ApiError type={type} title={title} message={message} details={details} onRetry={onRetry} className={className} />
  )
}
