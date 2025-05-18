"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Home, LogOut, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function AccessDeniedPage() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/dashboard")
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleLogout = () => {
    // Implementação segura de logout que não depende do useAuth
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/login")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <ShieldAlert className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Acesso Negado</CardTitle>
            <CardDescription className="text-base">Você não tem permissão para acessar esta página.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-4">
              <p>Seu perfil atual não possui as permissões necessárias para acessar este recurso.</p>
              <p>
                Se você acredita que deveria ter acesso a esta página, entre em contato com o administrador do sistema.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button onClick={handleGoHome} className="w-full" variant="default">
              <Home className="mr-2 h-4 w-4" />
              Ir para o Dashboard
            </Button>
            <Button onClick={handleGoBack} className="w-full" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={handleLogout} className="w-full" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Sair do Sistema
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
