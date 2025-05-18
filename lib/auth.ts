import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Tipos para o usuário
export interface User {
  id: string
  nome: string
  email: string
  perfil: string
  avatar?: string
}

// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  // Em um ambiente cliente, verificamos o localStorage
  if (typeof window !== "undefined") {
    return !!window.localStorage.getItem("user") && !!window.localStorage.getItem("token")
  }

  // Em um ambiente servidor, verificamos os cookies
  const cookieStore = cookies()
  return !!cookieStore.get("auth-token")?.value
}

// Função para obter o token de autenticação
export function getAuthToken(): string | null {
  // Em um ambiente cliente, pegamos do localStorage
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token")
  }

  // Em um ambiente servidor, pegamos dos cookies
  const cookieStore = cookies()
  return cookieStore.get("auth-token")?.value || null
}

// Função para obter o usuário atual
export function getCurrentUser(): User | null {
  // Esta função só deve ser chamada no cliente
  if (typeof window === "undefined") {
    return null
  }

  const userStr = window.localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as User
  } catch (err) {
    console.error("Erro ao parsear usuário:", err)
    return null
  }
}

// Middleware para verificar autenticação em server components
export function authMiddleware() {
  if (!isAuthenticated()) {
    redirect("/login")
  }
}

// Middleware para verificar autenticação e perfil em server components
export function authRoleMiddleware(roles: string[]) {
  if (!isAuthenticated()) {
    redirect("/login")
  }

  const user = getCurrentUser()
  if (!user || !roles.includes(user.perfil)) {
    redirect("/acesso-negado")
  }
}

// Simulação de login para desenvolvimento
export async function mockLogin(email: string, senha: string): Promise<User> {
  // Simular uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Verificar credenciais mockadas
  if (email === "admin@condominio.com" && senha === "admin") {
    const user: User = {
      id: "1",
      nome: "Administrador",
      email: "admin@condominio.com",
      perfil: "admin",
      avatar: "/diverse-avatars.png",
    }

    // Armazenar dados no localStorage e cookies
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(user))
      window.localStorage.setItem("token", "mock-jwt-token-for-development")

      // Definir cookie para expirar em 24 horas
      document.cookie = "auth-token=mock-jwt-token-for-development; path=/; max-age=86400; samesite=strict"

      // Disparar evento de storage para notificar outros componentes
      window.dispatchEvent(new Event("storage"))
    }

    return user
  }

  throw new Error("Credenciais inválidas")
}

// Função de logout
export function logout() {
  // Limpar localStorage
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")

    // Limpar cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict"

    // Redirecionar para login
    window.location.href = "/login"
  }
}

// Adicionar mecanismo de auto-logout por inatividade
export function setupInactivityTimeout(timeoutMinutes = 30) {
  if (typeof window === "undefined") return

  let inactivityTimer: NodeJS.Timeout

  const resetTimer = () => {
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(
      () => {
        // Se o usuário estiver inativo pelo tempo definido, faça logout
        if (isAuthenticated()) {
          alert("Sua sessão expirou por inatividade. Por favor, faça login novamente.")
          logout()
        }
      },
      timeoutMinutes * 60 * 1000,
    )
  }

  // Eventos para resetar o timer de inatividade
  window.addEventListener("mousemove", resetTimer)
  window.addEventListener("mousedown", resetTimer)
  window.addEventListener("keypress", resetTimer)
  window.addEventListener("touchmove", resetTimer)
  window.addEventListener("scroll", resetTimer)

  // Iniciar o timer
  resetTimer()

  // Retornar função para limpar eventos quando não for mais necessário
  return () => {
    clearTimeout(inactivityTimer)
    window.removeEventListener("mousemove", resetTimer)
    window.removeEventListener("mousedown", resetTimer)
    window.removeEventListener("keypress", resetTimer)
    window.removeEventListener("touchmove", resetTimer)
    window.removeEventListener("scroll", resetTimer)
  }
}
