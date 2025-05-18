// Configuração para o sistema de mocks

export interface ErrorType {
  type: "network" | "timeout" | "server" | "auth" | "forbidden" | "validation"
  probability: number // Probabilidade do erro ocorrer (0-1)
}

export interface MockConfig {
  enabled: boolean // Se os mocks estão ativados
  delay: number // Delay simulado em ms
  simulateRandomErrors: boolean // Se deve simular erros aleatórios
  errorProbability: number // Probabilidade de erro (0-1)
  errorTypes: ErrorType[] // Tipos de erro possíveis e suas probabilidades
}

// Configuração padrão
const defaultConfig: MockConfig = {
  enabled: true, // Sempre habilitado por padrão já que não temos backend
  delay: 500,
  simulateRandomErrors: false,
  errorProbability: 0.2,
  errorTypes: [
    { type: "network", probability: 0.3 },
    { type: "timeout", probability: 0.2 },
    { type: "server", probability: 0.2 },
    { type: "auth", probability: 0.1 },
    { type: "forbidden", probability: 0.1 },
    { type: "validation", probability: 0.1 },
  ],
}

// Configuração atual (começa com o padrão)
let currentConfig: MockConfig = { ...defaultConfig }

// Função para obter configuração atual
export function getMockConfig(): MockConfig {
  return { ...currentConfig }
}

// Função para atualizar configuração
export function updateMockConfig(newConfig: Partial<MockConfig>): MockConfig {
  currentConfig = { ...currentConfig, ...newConfig }

  // Persistir no localStorage para manter entre reloads
  if (typeof window !== "undefined") {
    localStorage.setItem("mockConfig", JSON.stringify(currentConfig))
  }

  return { ...currentConfig }
}

// Função para resetar configuração
export function resetMockConfig(): MockConfig {
  currentConfig = { ...defaultConfig }

  // Persistir no localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("mockConfig", JSON.stringify(currentConfig))
  }

  return { ...currentConfig }
}

// Função para carregar configuração salva no localStorage
export function loadMockConfigFromStorage(): void {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("mockConfig")
      if (stored) {
        const parsed = JSON.parse(stored)
        currentConfig = { ...defaultConfig, ...parsed }
      }
    } catch (error) {
      console.error("Erro ao carregar configuração de mock do localStorage:", error)
    }
  }
}

// Carregar configuração salva ao inicializar
loadMockConfigFromStorage()
