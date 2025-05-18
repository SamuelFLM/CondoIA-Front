"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface ValidatedFormProps<T extends z.ZodType> {
  schema: T
  defaultValues?: Partial<z.infer<T>>
  onSubmit: (values: z.infer<T>) => Promise<{ success: boolean; message?: string } | void>
  children: React.ReactNode
  submitText?: string
  resetOnSuccess?: boolean
  successMessage?: string
  className?: string
  id?: string
}

export function ValidatedForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = "Salvar",
  resetOnSuccess = false,
  successMessage = "Operação realizada com sucesso!",
  className,
  id,
}: ValidatedFormProps<T>) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  })

  const handleSubmit = async (values: z.infer<T>) => {
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      try {
        const result = await onSubmit(values)

        if (result && !result.success) {
          setError(result.message || "Ocorreu um erro ao processar a solicitação.")
          return
        }

        if (resetOnSuccess) {
          form.reset(defaultValues as any)
        }

        setSuccess(result?.message || successMessage)
      } catch (err) {
        console.error("Erro ao enviar formulário:", err)
        setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar a solicitação.")
      }
    })
  }

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className={className} noValidate>
        <div className="space-y-4">
          {children}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Alert variant="success">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              submitText
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
