// Este arquivo contém a lógica para fazer chamadas à API
// ou usar dados mockados, dependendo da configuração

import axios from "axios"
import { MockService } from "./mock-service"
import { mockData } from "./mock-data"

// Verifica se deve usar dados mockados
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === "true"

// Cria uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7001/api",
})

// Adiciona um interceptor para incluir o token de autenticação
api.interceptors.request.use((config) => {
  // Obtém o token do localStorage (apenas no cliente)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Mock API request function for testing and development
export const mockApiRequest = async (endpoint: string, method = "GET", data = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API response based on endpoint
      if (endpoint.includes("usuarios")) {
        resolve({ data: mockData.usuarios })
      } else if (endpoint.includes("chamados")) {
        resolve({ data: mockData.chamados })
      } else if (endpoint.includes("gastos")) {
        resolve({ data: mockData.gastos })
      } else if (endpoint.includes("moradores")) {
        resolve({ data: mockData.moradores })
      } else {
        resolve({ data: {} })
      }
    }, 500)
  })
}

// Get current user function
export const getCurrentUser = async () => {
  if (useMocks) {
    // Return a mock user for development
    return mockData.usuarios[0]
  } else {
    try {
      const response = await api.get("auth/me")
      return response.data
    } catch (error) {
      console.error("Error fetching current user:", error)
      return null
    }
  }
}

// Funções para interagir com a API ou usar dados mockados
export const apiService = {
  // Função para obter dados
  async get(endpoint: string, params?: any) {
    try {
      if (useMocks) {
        // Extrai o tipo e o ID do endpoint
        const parts = endpoint.split("/")
        const type = parts[0]
        const id = parts.length > 1 ? parts[1] : undefined
        return await MockService.getData(type, id, params)
      } else {
        // Faz a chamada real à API
        const response = await api.get(endpoint, { params })
        return response.data
      }
    } catch (error) {
      console.error("Erro ao obter dados:", error)
      throw error
    }
  },

  // Função para criar dados
  async post(endpoint: string, data: any) {
    try {
      if (useMocks) {
        // Extrai o tipo do endpoint
        const type = endpoint.split("/")[0]
        return await MockService.createData(type, data)
      } else {
        // Faz a chamada real à API
        const response = await api.post(endpoint, data)
        return response.data
      }
    } catch (error) {
      console.error("Erro ao criar dados:", error)
      throw error
    }
  },

  // Função para atualizar dados
  async put(endpoint: string, data: any) {
    try {
      if (useMocks) {
        // Extrai o tipo e o ID do endpoint
        const parts = endpoint.split("/")
        const type = parts[0]
        const id = parts[1]
        return await MockService.updateData(type, id, data)
      } else {
        // Faz a chamada real à API
        const response = await api.put(endpoint, data)
        return response.data
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error)
      throw error
    }
  },

  // Função para excluir dados
  async delete(endpoint: string) {
    try {
      if (useMocks) {
        // Extrai o tipo e o ID do endpoint
        const parts = endpoint.split("/")
        const type = parts[0]
        const id = parts[1]
        return await MockService.deleteData(type, id)
      } else {
        // Faz a chamada real à API
        const response = await api.delete(endpoint)
        return response.data
      }
    } catch (error) {
      console.error("Erro ao excluir dados:", error)
      throw error
    }
  },

  // Função para autenticar usuário
  async login(email: string, password: string) {
    try {
      console.log("API login attempt:", email, password)

      if (useMocks) {
        const response = await MockService.login(email, password)
        console.log("Mock login response:", response)
        return response
      } else {
        // Faz a chamada real à API
        const response = await api.post("auth/login", { email, password })
        console.log("Real API login response:", response.data)
        return response.data
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error)
      throw error
    }
  },
}
