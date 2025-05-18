// Tipo para a configuração da aplicação
export interface AppConfig {
  useMockData: boolean
  apiUrl: string
  mockDelay: number
}

// Configuração padrão
const defaultConfig: AppConfig = {
  useMockData: true, // Sempre true já que não temos backend
  apiUrl: "http://localhost:7001/api",
  mockDelay: 500,
}

// Variável para armazenar a configuração carregada
let appConfig: AppConfig = { ...defaultConfig }

// Função para carregar a configuração
export async function loadConfig(): Promise<AppConfig> {
  try {
    // Tenta carregar a configuração do arquivo
    const response = await fetch("/config.json")

    if (!response.ok) {
      console.warn("Arquivo de configuração não encontrado, usando configuração padrão.")
      return appConfig
    }

    // Corrigindo o erro "t.json is not a function"
    // Antes: const config = t.json()
    const config = await response.json()

    appConfig = { ...defaultConfig, ...config }
    console.log("Configuração carregada:", appConfig)
    return appConfig
  } catch (error) {
    console.error("Erro ao carregar configuração:", error)
    return appConfig
  }
}

// Função para obter a configuração atual
export function getConfig(): AppConfig {
  return appConfig
}

// Função para atualizar a configuração em tempo de execução
export function updateConfig(newConfig: Partial<AppConfig>): AppConfig {
  appConfig = { ...appConfig, ...newConfig }

  // Salvar no localStorage para persistir entre reloads da página
  if (typeof window !== "undefined") {
    localStorage.setItem("appConfig", JSON.stringify(appConfig))
  }

  return appConfig
}

// Função para carregar a configuração do localStorage (se disponível)
export function loadConfigFromStorage(): void {
  if (typeof window !== "undefined") {
    const storedConfig = localStorage.getItem("appConfig")
    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig)
        appConfig = { ...appConfig, ...parsedConfig }
        console.log("Configuração carregada do localStorage:", appConfig)
      } catch (error) {
        console.error("Erro ao carregar configuração do localStorage:", error)
      }
    }
  }
}

// Inicializar a configuração do localStorage
loadConfigFromStorage()
