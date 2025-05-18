import axios from "axios"

const API_URL = "https://localhost:7001/api"

// Configuração do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para a página de login
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Serviço de autenticação
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/usuarios/login", { email, senha: password })
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.usuario))
    return response.data
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },
}

// Serviço de chamados
export const chamadoService = {
  getAll: async () => {
    const response = await api.get("/chamados")
    return response.data
  },
  getById: async (id: number) => {
    const response = await api.get(`/chamados/${id}`)
    return response.data
  },
  create: async (chamado: any) => {
    const response = await api.post("/chamados", chamado)
    return response.data
  },
  update: async (id: number, chamado: any) => {
    const response = await api.put(`/chamados/${id}`, chamado)
    return response.data
  },
  delete: async (id: number) => {
    await api.delete(`/chamados/${id}`)
  },
  getComentarios: async (chamadoId: number) => {
    const response = await api.get(`/chamados/${chamadoId}/comentarios`)
    return response.data
  },
  addComentario: async (comentario: any) => {
    const response = await api.post("/chamados/comentarios", comentario)
    return response.data
  },
}

// Serviço de gastos
export const gastoService = {
  getAll: async () => {
    const response = await api.get("/gastos")
    return response.data
  },
  getById: async (id: number) => {
    const response = await api.get(`/gastos/${id}`)
    return response.data
  },
  create: async (gasto: any) => {
    const response = await api.post("/gastos", gasto)
    return response.data
  },
  update: async (id: number, gasto: any) => {
    const response = await api.put(`/gastos/${id}`, gasto)
    return response.data
  },
  delete: async (id: number) => {
    await api.delete(`/gastos/${id}`)
  },
  getByCategoria: async (categoria: string) => {
    const response = await api.get(`/gastos/categoria/${categoria}`)
    return response.data
  },
  getByPeriodo: async (dataInicio: string, dataFim: string) => {
    const response = await api.get(`/gastos/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`)
    return response.data
  },
}

// Serviço de usuários
export const usuarioService = {
  getAll: async () => {
    const response = await api.get("/usuarios")
    return response.data
  },
  getById: async (id: number) => {
    const response = await api.get(`/usuarios/${id}`)
    return response.data
  },
  create: async (usuario: any) => {
    const response = await api.post("/usuarios", usuario)
    return response.data
  },
  update: async (id: number, usuario: any) => {
    const response = await api.put(`/usuarios/${id}`, usuario)
    return response.data
  },
  delete: async (id: number) => {
    await api.delete(`/usuarios/${id}`)
  },
  alterarSenha: async (alterarSenhaDto: any) => {
    await api.post("/usuarios/alterar-senha", alterarSenhaDto)
  },
}

// Serviço de dashboard
export const dashboardService = {
  getDashboardData: async () => {
    const response = await api.get("/dashboard")
    return response.data
  },
}

export default api
