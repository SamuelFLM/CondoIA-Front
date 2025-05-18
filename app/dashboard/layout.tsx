"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const userStr = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!userStr || !token) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(userStr)
      setUser(userData)
    } catch (error) {
      console.error("Erro ao processar dados do usuário:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Gestão de Condomínio</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/chamados" className="block p-2 rounded hover:bg-gray-100">
                Chamados
              </Link>
            </li>
            <li>
              <Link href="/gastos" className="block p-2 rounded hover:bg-gray-100">
                Gastos
              </Link>
            </li>
            <li>
              <Link href="/moradores" className="block p-2 rounded hover:bg-gray-100">
                Moradores
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold">Bem-vindo, {user?.nome}</h2>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Sair
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
