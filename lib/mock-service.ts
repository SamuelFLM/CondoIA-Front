// Serviço de mock com persistência em cookies
import { mockData } from "./mock-data"
import Cookies from "js-cookie"

// Simula um atraso na resposta para simular uma API real
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simula erros aleatórios para testar tratamento de erros (opcional)
const shouldSimulateError = () => {
  // Retorna true em 5% das chamadas para simular erros
  return Math.random() < 0.05
}

export class MockService {
  // Função para autenticar usuário
  static async login(email: string, password: string) {
    await delay(1000) // Simula latência de rede
    console.log("Mock login attempt:", email, password)

    // Credenciais fixas para teste
    if (email === "admin@condominio.com" && password === "admin") {
      // Gera um token fictício
      const token = `mock-token-${Date.now()}`

      // Cria um usuário de teste
      const usuario = {
        id: "1",
        nome: "Administrador",
        email: "admin@condominio.com",
        perfil: "admin",
        avatar: "/diverse-avatars.png",
      }

      // Armazena o token e o usuário atual em cookies
      Cookies.set("auth-token", token, { expires: 1, path: "/" })
      Cookies.set("user-data", JSON.stringify(usuario), { expires: 1, path: "/" })

      console.log("Mock login successful:", usuario)

      // Retorna os dados do usuário e o token
      return {
        usuario,
        token,
      }
    }

    console.log("Mock login failed: Invalid credentials")
    throw new Error("Credenciais inválidas")
  }

  // Função para verificar se o usuário está autenticado
  static getCurrentUser() {
    const userJson = Cookies.get("user-data")
    if (!userJson) return null

    try {
      return JSON.parse(userJson)
    } catch (error) {
      console.error("Erro ao parsear usuário atual:", error)
      return null
    }
  }

  // Função para fazer logout
  static logout() {
    Cookies.remove("auth-token")
    Cookies.remove("user-data")
  }

  // Função para obter dados mockados
  static async getData(type: string, id?: string, params?: any) {
    await delay(500) // Simula latência de rede

    // Simula erro aleatório (opcional)
    if (shouldSimulateError()) {
      throw new Error("Erro simulado na API")
    }

    // Retorna dados mockados com base no tipo
    switch (type) {
      case "usuarios":
        return id ? mockData.usuarios.find((u) => u.id.toString() === id.toString()) : mockData.usuarios
      case "chamados":
        return id ? mockData.chamados.find((c) => c.id.toString() === id.toString()) : mockData.chamados
      case "gastos":
        return id ? mockData.gastos.find((g) => g.id.toString() === id.toString()) : mockData.gastos
      case "moradores":
        return id ? mockData.moradores.find((m) => m.id.toString() === id.toString()) : mockData.moradores
      case "avisos":
        return mockData.avisos || []
      case "dashboard":
        // Calcula estatísticas para o dashboard
        const chamados = mockData.chamados || []
        const gastos = mockData.gastos || []
        const moradores = mockData.moradores || []

        const chamadosAbertos = chamados.filter((c: any) => c.status.toLowerCase() === "aberto").length
        const chamadosEmAndamento = chamados.filter((c: any) => c.status.toLowerCase() === "em andamento").length
        const chamadosConcluidos = chamados.filter((c: any) => c.status.toLowerCase() === "fechado").length

        const totalGastos = gastos.reduce((acc: number, g: any) => acc + g.valor, 0)
        const gastosRecentes = gastos.slice(0, 2).reduce((acc: number, g: any) => acc + g.valor, 0)

        return {
          totalChamados: chamados.length,
          chamadosAbertos,
          chamadosEmAndamento,
          chamadosConcluidos,
          totalGastos,
          gastosRecentes,
          totalMoradores: moradores.length,
          moradoresAtivos: moradores.filter((m: any) => m.ativo !== false).length,
        }
      default:
        return []
    }
  }

  // Função para criar dados mockados
  static async createData(type: string, data: any) {
    await delay(500) // Simula latência de rede

    // Simula erro aleatório (opcional)
    if (shouldSimulateError()) {
      throw new Error("Erro simulado na API")
    }

    // Gera um ID único
    const id = Date.now().toString()
    const newItem = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return newItem
  }

  // Função para atualizar dados mockados
  static async updateData(type: string, id: string, data: any) {
    await delay(500) // Simula latência de rede

    // Simula erro aleatório (opcional)
    if (shouldSimulateError()) {
      throw new Error("Erro simulado na API")
    }

    // Simula atualização de dados
    return {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
  }

  // Função para excluir dados mockados
  static async deleteData(type: string, id: string) {
    await delay(500) // Simula latência de rede

    // Simula erro aleatório (opcional)
    if (shouldSimulateError()) {
      throw new Error("Erro simulado na API")
    }

    return true
  }
}
