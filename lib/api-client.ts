import axios, { type AxiosError, type AxiosRequestConfig } from "axios"
import { getMockConfig } from "./mock-config"
import { mockData } from "./mock-data"
import { getTokenFromStorage } from "./auth"

// Função para obter a URL da API
const getApiUrl = (): string => {
  // Comentado pois estamos usando apenas dados mockados
  // return process.env.NEXT_PUBLIC_API_URL || "http://localhost:7001/api"
  return "http://mockapi/api" // URL fictícia para indicar que é um mock
}

// Criar instância do axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

// Add a request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login page or refresh token
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// Interceptor para tratar erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Verificar se é um erro de rede
    if (!error.response) {
      console.error("Erro de rede detectado:", error.message)
    }
    // Verificar se é um erro de autenticação
    else if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// Função para simular um atraso
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Função para simular um erro
const simulateError = () => {
  const config = getMockConfig()

  if (!config.simulateRandomErrors) return false

  // Determinar se deve gerar um erro
  if (Math.random() > config.errorProbability) return false

  // Determinar o tipo de erro
  const errorTypeRoll = Math.random()
  let cumulativeProbability = 0
  let selectedErrorType: string | null = null

  for (const errorType of config.errorTypes) {
    cumulativeProbability += errorType.probability
    if (errorTypeRoll <= cumulativeProbability) {
      selectedErrorType = errorType.type
      break
    }
  }

  // Se nenhum tipo de erro foi selecionado, não gerar erro
  if (!selectedErrorType) return false

  // Gerar o erro apropriado
  switch (selectedErrorType) {
    case "network":
      throw new Error("Network Error")
    case "timeout":
      throw new Error("Timeout Error")
    case "server":
      const error: any = new Error("Server Error")
      error.response = { status: 500, data: { message: "Internal Server Error" } }
      throw error
    case "auth":
      const authError: any = new Error("Authentication Error")
      authError.response = { status: 401, data: { message: "Unauthorized" } }
      throw authError
    case "forbidden":
      const forbiddenError: any = new Error("Forbidden Error")
      forbiddenError.response = { status: 403, data: { message: "Forbidden" } }
      throw forbiddenError
    case "validation":
      const validationError: any = new Error("Validation Error")
      validationError.response = {
        status: 422,
        data: {
          message: "Validation Error",
          errors: { field: ["Invalid value"] },
        },
      }
      throw validationError
    default:
      return false
  }
}

// Cliente de API com suporte a mocks
export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const mockConfig = getMockConfig()

    // Sempre usar dados mockados
    console.log(`[MOCK] GET ${url}`)
    await delay(mockConfig.delay)

    try {
      // Tentar simular um erro
      simulateError()

      // Obter dados mockados
      const mockPath = url.replace(/^\//, "").replace(/\//g, ".")
      const data = mockData[mockPath] || null

      if (!data) {
        console.warn(`[MOCK] Não foram encontrados dados mock para ${url}`)
      }

      return data as T
    } catch (error: any) {
      console.log(`[MOCK] Erro simulado para ${url}:`, error.message)
      throw error
    }

    // Código abaixo comentado pois não estamos fazendo chamadas reais à API
    /*
    // Se os mocks não estão habilitados, fazer requisição real
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
    */
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const mockConfig = getMockConfig()

    // Sempre usar dados mockados
    console.log(`[MOCK] POST ${url}`, data)
    await delay(mockConfig.delay)

    try {
      // Tentar simular um erro
      simulateError()

      // Obter dados mockados
      const mockPath = `${url.replace(/^\//, "").replace(/\//g, ".")}.post`
      const mockResponse = mockData[mockPath] || null

      if (!mockResponse) {
        console.warn(`[MOCK] Não foram encontrados dados mock para POST ${url}`)
      }

      return mockResponse as T
    } catch (error: any) {
      console.log(`[MOCK] Erro simulado para POST ${url}:`, error.message)
      throw error
    }

    // Código abaixo comentado pois não estamos fazendo chamadas reais à API
    /*
    // Se os mocks não estão habilitados, fazer requisição real
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
    */
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const mockConfig = getMockConfig()

    // Sempre usar dados mockados
    console.log(`[MOCK] PUT ${url}`, data)
    await delay(mockConfig.delay)

    try {
      // Tentar simular um erro
      simulateError()

      // Obter dados mockados
      const mockPath = `${url.replace(/^\//, "").replace(/\//g, ".")}.put`
      const mockResponse = mockData[mockPath] || null

      if (!mockResponse) {
        console.warn(`[MOCK] Não foram encontrados dados mock para PUT ${url}`)
      }

      return mockResponse as T
    } catch (error: any) {
      console.log(`[MOCK] Erro simulado para PUT ${url}:`, error.message)
      throw error
    }

    // Código abaixo comentado pois não estamos fazendo chamadas reais à API
    /*
    // Se os mocks não estão habilitados, fazer requisição real
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
    */
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const mockConfig = getMockConfig()

    // Sempre usar dados mockados
    console.log(`[MOCK] DELETE ${url}`)
    await delay(mockConfig.delay)

    try {
      // Tentar simular um erro
      simulateError()

      // Obter dados mockados
      const mockPath = `${url.replace(/^\//, "").replace(/\//g, ".")}.delete`
      const mockResponse = mockData[mockPath] || null

      if (!mockResponse) {
        console.warn(`[MOCK] Não foram encontrados dados mock para DELETE ${url}`)
      }

      return mockResponse as T
    } catch (error: any) {
      console.log(`[MOCK] Erro simulado para DELETE ${url}:`, error.message)
      throw error
    }

    // Código abaixo comentado pois não estamos fazendo chamadas reais à API
    /*
    // Se os mocks não estão habilitados, fazer requisição real
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
    */
  },
}

export default apiClient
