// Configuração base da API
const API_URL = "https://localhost:7001/api"

// Função auxiliar para fazer requisições
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Erro na requisição: ${response.status}`)
  }

  return response.json()
}

// Serviço de autenticação
export const authService = {
  login: async (email: string, senha: string) => {
    return fetchWithAuth("/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    })
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },
}

// Serviço de chamados
export const chamadoService = {
  getChamados: () => fetchWithAuth("/chamados"),

  getChamadoById: (id: number) => fetchWithAuth(`/chamados/${id}`),

  createChamado: (chamado: any) =>
    fetchWithAuth("/chamados", {
      method: "POST",
      body: JSON.stringify(chamado),
    }),

  updateChamado: (id: number, chamado: any) =>
    fetchWithAuth(`/chamados/${id}`, {
      method: "PUT",
      body: JSON.stringify(chamado),
    }),

  deleteChamado: (id: number) =>
    fetchWithAuth(`/chamados/${id}`, {
      method: "DELETE",
    }),
}

// Serviço de gastos
export const gastoService = {
  getGastos: () => fetchWithAuth("/gastos"),

  getGastoById: (id: number) => fetchWithAuth(`/gastos/${id}`),

  createGasto: (gasto: any) =>
    fetchWithAuth("/gastos", {
      method: "POST",
      body: JSON.stringify(gasto),
    }),

  updateGasto: (id: number, gasto: any) =>
    fetchWithAuth(`/gastos/${id}`, {
      method: "PUT",
      body: JSON.stringify(gasto),
    }),

  deleteGasto: (id: number) =>
    fetchWithAuth(`/gastos/${id}`, {
      method: "DELETE",
    }),
}

// Serviço de usuários
export const usuarioService = {
  getUsuarios: () => fetchWithAuth("/usuarios"),

  getUsuarioById: (id: number) => fetchWithAuth(`/usuarios/${id}`),

  createUsuario: (usuario: any) =>
    fetchWithAuth("/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
    }),

  updateUsuario: (id: number, usuario: any) =>
    fetchWithAuth(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
    }),

  deleteUsuario: (id: number) =>
    fetchWithAuth(`/usuarios/${id}`, {
      method: "DELETE",
    }),
}

// Serviço de dashboard
export const dashboardService = {
  getDashboardData: () => fetchWithAuth("/dashboard"),
}
