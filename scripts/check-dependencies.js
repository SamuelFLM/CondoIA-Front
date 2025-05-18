// Este script verifica se todas as dependências necessárias estão instaladas
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("🔍 Verificando dependências...")

// Função para executar comandos e capturar saída
function runCommand(command) {
  try {
    return execSync(command, { encoding: "utf8" })
  } catch (error) {
    console.error(`Erro ao executar comando: ${command}`)
    console.error(error.message)
    return null
  }
}

// Verificar se o package.json existe
const packageJsonPath = path.join(process.cwd(), "package.json")
if (!fs.existsSync(packageJsonPath)) {
  console.error("❌ Arquivo package.json não encontrado!")
  process.exit(1)
}

// Ler o package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

// Verificar se node_modules existe
const nodeModulesPath = path.join(process.cwd(), "node_modules")
if (!fs.existsSync(nodeModulesPath)) {
  console.log("⚠️ Diretório node_modules não encontrado. Instalando dependências...")
  runCommand("npm install")
} else {
  console.log("✅ Diretório node_modules encontrado.")
}

// Verificar dependências críticas
const criticalDeps = ["next", "react", "react-dom"]
const missingDeps = []

for (const dep of criticalDeps) {
  const depPath = path.join(nodeModulesPath, dep)
  if (!fs.existsSync(depPath)) {
    missingDeps.push(dep)
  }
}

if (missingDeps.length > 0) {
  console.log(`⚠️ Dependências críticas faltando: ${missingDeps.join(", ")}. Reinstalando...`)
  runCommand("npm install")
} else {
  console.log("✅ Todas as dependências críticas estão instaladas.")
}

// Verificar versão do Node.js
const nodeVersion = process.version
const requiredNodeVersion = packageJson.engines && packageJson.engines.node

if (requiredNodeVersion) {
  console.log(`ℹ️ Versão do Node.js: ${nodeVersion}`)
  console.log(`ℹ️ Versão requerida: ${requiredNodeVersion}`)

  // Verificar se a versão do Node.js atende aos requisitos
  // Isso é uma verificação simplificada, uma verificação completa exigiria um parser de semver
  const currentVersion = nodeVersion.replace("v", "")
  const requiredMinVersion = requiredNodeVersion.replace(">=", "")

  if (currentVersion < requiredMinVersion) {
    console.log(`⚠️ A versão do Node.js (${currentVersion}) é menor que a requerida (${requiredMinVersion}).`)
    console.log("⚠️ Isso pode causar problemas de compatibilidade.")
  } else {
    console.log("✅ A versão do Node.js atende aos requisitos.")
  }
}

console.log("✅ Verificação de dependências concluída.")
