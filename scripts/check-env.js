// Este script verifica se as variáveis de ambiente necessárias estão definidas
const fs = require("fs")
const path = require("path")

console.log("🔍 Verificando variáveis de ambiente...")

// Lista de variáveis de ambiente necessárias
const requiredEnvVars = ["NEXT_PUBLIC_API_URL"]

// Verificar se o arquivo .env.local existe
const envPath = path.join(process.cwd(), ".env.local")
let envFileExists = false
const envVars = {}

if (fs.existsSync(envPath)) {
  envFileExists = true
  console.log("✅ Arquivo .env.local encontrado.")

  // Ler o arquivo .env.local
  const envContent = fs.readFileSync(envPath, "utf8")
  const envLines = envContent.split("\n")

  // Extrair variáveis de ambiente
  for (const line of envLines) {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      envVars[key] = value
    }
  }
} else {
  console.log("⚠️ Arquivo .env.local não encontrado.")
}

// Verificar variáveis de ambiente
const missingVars = []

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] && !envVars[envVar]) {
    missingVars.push(envVar)
  }
}

// Criar arquivo .env.local se necessário
if (missingVars.length > 0) {
  console.log(`⚠️ Variáveis de ambiente faltando: ${missingVars.join(", ")}`)

  // Criar ou atualizar arquivo .env.local
  let envContent = ""

  // Manter variáveis existentes
  for (const [key, value] of Object.entries(envVars)) {
    envContent += `${key}=${value}\n`
  }

  // Adicionar variáveis faltando com valores padrão
  for (const envVar of missingVars) {
    let defaultValue = ""

    // Definir valores padrão para variáveis específicas
    if (envVar === "NEXT_PUBLIC_API_URL") {
      defaultValue = "http://localhost:7001/api"
    }

    envContent += `${envVar}=${defaultValue}\n`
  }

  // Escrever arquivo .env.local
  fs.writeFileSync(envPath, envContent)

  console.log("✅ Arquivo .env.local criado/atualizado com valores padrão.")
  console.log("⚠️ Por favor, verifique e atualize os valores conforme necessário.")
} else {
  console.log("✅ Todas as variáveis de ambiente necessárias estão definidas.")
}
