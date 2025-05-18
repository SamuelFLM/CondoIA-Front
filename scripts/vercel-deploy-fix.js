// Este script prepara o projeto para deploy no Vercel
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("🚀 Preparando projeto para deploy no Vercel...")

// Função para executar comandos
function runCommand(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: "inherit" })
  } catch (error) {
    console.error(`Erro ao executar comando: ${command}`)
    return null
  }
}

// Verificar e criar .npmrc para o Vercel
function createNpmrc() {
  console.log("📝 Criando .npmrc para o Vercel...")

  const npmrcContent = `legacy-peer-deps=true
node-linker=hoisted
`

  fs.writeFileSync(".npmrc", npmrcContent)
  console.log("✅ Arquivo .npmrc criado com sucesso.")
}

// Verificar e atualizar package.json para o Vercel
function updatePackageJson() {
  console.log("📝 Atualizando package.json para o Vercel...")

  const packageJsonPath = "package.json"
  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ Arquivo package.json não encontrado!")
    return false
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Remover scripts que podem causar problemas no Vercel
  if (packageJson.scripts) {
    // Remover prebuild que pode causar problemas
    if (packageJson.scripts.prebuild) {
      delete packageJson.scripts.prebuild
    }

    // Simplificar o script de build
    packageJson.scripts.build = "next build"

    // Adicionar script de vercel-build
    packageJson.scripts["vercel-build"] = "next build"
  }

  // Garantir que as dependências estejam corretas
  if (!packageJson.dependencies) {
    packageJson.dependencies = {}
  }

  // Garantir que next, react e react-dom estejam nas dependências
  packageJson.dependencies.next = packageJson.dependencies.next || "14.0.3"
  packageJson.dependencies.react = packageJson.dependencies.react || "18.2.0"
  packageJson.dependencies["react-dom"] = packageJson.dependencies["react-dom"] || "18.2.0"

  // Salvar as alterações
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log("✅ Arquivo package.json atualizado com sucesso.")

  return true
}

// Criar arquivo .env.production
function createEnvFile() {
  console.log("📝 Criando arquivo .env.production...")

  const envContent = `NEXT_PUBLIC_API_URL=https://mock-api.vercel.app/api
NODE_ENV=production
`

  fs.writeFileSync(".env.production", envContent)
  console.log("✅ Arquivo .env.production criado com sucesso.")
}

// Limpar cache e node_modules
function cleanProject() {
  console.log("🧹 Limpando projeto...")

  // Limpar cache do Next.js
  if (fs.existsSync(".next")) {
    try {
      fs.rmSync(".next", { recursive: true, force: true })
      console.log("✅ Diretório .next removido com sucesso.")
    } catch (error) {
      console.error("❌ Erro ao remover diretório .next:", error.message)
    }
  }

  // Limpar node_modules (opcional)
  if (fs.existsSync("node_modules")) {
    console.log("🧹 Removendo node_modules (isso pode levar algum tempo)...")
    try {
      fs.rmSync("node_modules", { recursive: true, force: true })
      console.log("✅ Diretório node_modules removido com sucesso.")
    } catch (error) {
      console.error("❌ Erro ao remover diretório node_modules:", error.message)
    }
  }

  return true
}

// Função principal
async function main() {
  console.log("🚀 Iniciando preparação para deploy no Vercel...")

  // Executar as funções
  createNpmrc()
  updatePackageJson()
  createEnvFile()
  cleanProject()

  console.log("🎉 Projeto preparado para deploy no Vercel!")
  console.log("")
  console.log("Próximos passos:")
  console.log('1. Execute "npm install" para reinstalar as dependências')
  console.log('2. Execute "npm run build" para verificar se o build funciona localmente')
  console.log("3. Faça o deploy no Vercel usando o CLI ou o dashboard")
  console.log("")
  console.log("Comando para deploy via CLI:")
  console.log("vercel --prod")
}

// Executar o script
main().catch((error) => {
  console.error("❌ Erro fatal:", error)
  process.exit(1)
})
