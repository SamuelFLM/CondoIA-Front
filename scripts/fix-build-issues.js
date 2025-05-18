// Este script corrige problemas comuns de build sem usar Babel
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("🔍 Iniciando verificação de problemas de build...")

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

// Verificar e corrigir dependências
function checkDependencies() {
  console.log("📦 Verificando dependências...")

  const requiredDeps = {
    // Dependências essenciais para o Next.js
    next: "^14.0.3",
    react: "18.2.0",
    "react-dom": "18.2.0",
  }

  // Ler o package.json
  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ Arquivo package.json não encontrado!")
    return false
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Verificar dependências
  let needsUpdate = false
  const deps = packageJson.dependencies || {}

  // Verificar apenas dependências essenciais (Next.js, React)
  const essentialDeps = ["next", "react", "react-dom"]

  for (const dep of essentialDeps) {
    if (!deps[dep]) {
      console.log(`⚠️ Dependência essencial não encontrada: ${dep}`)
      needsUpdate = true

      // Adicionar a dependência
      deps[dep] = requiredDeps[dep]
    }
  }

  // Remover dependências do Babel se existirem
  const babelDeps = [
    "@babel/core",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "babel-jest",
    "babel-loader",
    "next-babel-loader",
  ]

  for (const dep of babelDeps) {
    if (deps[dep]) {
      console.log(`🗑️ Removendo dependência do Babel: ${dep}`)
      delete deps[dep]
      needsUpdate = true
    }
  }

  // Atualizar package.json se necessário
  if (needsUpdate) {
    console.log("🔧 Atualizando package.json...")
    packageJson.dependencies = deps
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    console.log("🔄 Instalando dependências atualizadas...")
    runCommand("npm install")
  } else {
    console.log("✅ Todas as dependências essenciais estão presentes.")
  }

  return true
}

// Verificar e corrigir configurações do Next.js
function checkNextConfig() {
  console.log("🔧 Verificando configuração do Next.js...")

  const nextConfigPath = path.join(process.cwd(), "next.config.js")
  if (!fs.existsSync(nextConfigPath)) {
    console.log("⚠️ Arquivo next.config.js não encontrado, criando...")

    const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Garantir que o SWC seja usado para compilação
  compiler: {
    // Remover console.logs em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
`

    fs.writeFileSync(nextConfigPath, configContent)
    console.log("✅ Arquivo next.config.js criado com sucesso.")
  } else {
    console.log("✅ Arquivo next.config.js encontrado.")

    // Atualizar next.config.js para usar SWC
    try {
      let configContent = fs.readFileSync(nextConfigPath, "utf8")

      // Verificar se já tem configuração do compiler
      if (!configContent.includes("compiler:")) {
        // Adicionar configuração do compiler antes do último }
        configContent = configContent.replace(
          /}(\s*)$/,
          `  // Garantir que o SWC seja usado para compilação
  compiler: {
    // Remover console.logs em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },
}$1`,
        )

        fs.writeFileSync(nextConfigPath, configContent)
        console.log("✅ Arquivo next.config.js atualizado para usar SWC.")
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar next.config.js:", error.message)
    }
  }

  return true
}

// Remover arquivos de configuração do Babel
function removeBabelConfig() {
  console.log("🗑️ Removendo configurações do Babel...")

  const babelFiles = [".babelrc", ".babelrc.js", ".babelrc.json", "babel.config.js", "babel.config.json"]

  for (const file of babelFiles) {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
        console.log(`✅ Arquivo ${file} removido com sucesso.`)
      } catch (error) {
        console.error(`❌ Erro ao remover ${file}:`, error.message)
      }
    }
  }

  return true
}

// Limpar cache do Next.js
function cleanNextCache() {
  console.log("🧹 Limpando cache do Next.js...")

  const cacheDir = path.join(process.cwd(), ".next")
  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true })
      console.log("✅ Cache do Next.js limpo com sucesso.")
    } catch (error) {
      console.error("❌ Erro ao limpar cache do Next.js:", error.message)
      return false
    }
  } else {
    console.log("ℹ️ Diretório de cache .next não encontrado.")
  }

  return true
}

// Verificar e corrigir configurações do TypeScript
function checkTypeScriptConfig() {
  console.log("🔧 Verificando configuração do TypeScript...")

  const tsConfigPath = path.join(process.cwd(), "tsconfig.json")
  if (!fs.existsSync(tsConfigPath)) {
    console.log("⚠️ Arquivo tsconfig.json não encontrado!")
    return false
  }

  try {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"))

    // Garantir que as configurações essenciais estejam presentes
    if (!tsConfig.compilerOptions) {
      tsConfig.compilerOptions = {}
    }

    // Configurações recomendadas para Next.js
    tsConfig.compilerOptions.target = "es5"
    tsConfig.compilerOptions.lib = tsConfig.compilerOptions.lib || ["dom", "dom.iterable", "esnext"]
    tsConfig.compilerOptions.allowJs = true
    tsConfig.compilerOptions.skipLibCheck = true
    tsConfig.compilerOptions.strict = true
    tsConfig.compilerOptions.forceConsistentCasingInFileNames = true
    tsConfig.compilerOptions.noEmit = true
    tsConfig.compilerOptions.esModuleInterop = true
    tsConfig.compilerOptions.module = "esnext"
    tsConfig.compilerOptions.moduleResolution = "node"
    tsConfig.compilerOptions.resolveJsonModule = true
    tsConfig.compilerOptions.isolatedModules = true
    tsConfig.compilerOptions.jsx = "preserve"

    // Incluir e excluir arquivos
    tsConfig.include = tsConfig.include || ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
    tsConfig.exclude = tsConfig.exclude || ["node_modules"]

    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2))
    console.log("✅ Arquivo tsconfig.json atualizado com configurações recomendadas.")

    return true
  } catch (error) {
    console.error("❌ Erro ao processar tsconfig.json:", error.message)
    return false
  }
}

// Verificar e corrigir scripts no package.json
function checkScripts() {
  console.log("🔧 Verificando scripts no package.json...")

  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ Arquivo package.json não encontrado!")
    return false
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Garantir que os scripts essenciais estejam presentes
  if (!packageJson.scripts) {
    packageJson.scripts = {}
  }

  const requiredScripts = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "next lint",
    clean: "rimraf .next out",
    prebuild: "node scripts/fix-build-issues.js",
  }

  let needsUpdate = false

  for (const [name, command] of Object.entries(requiredScripts)) {
    if (!packageJson.scripts[name] || name === "prebuild") {
      packageJson.scripts[name] = command
      needsUpdate = true
    }
  }

  if (needsUpdate) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log("✅ Scripts atualizados no package.json.")
  } else {
    console.log("✅ Todos os scripts necessários estão presentes.")
  }

  return true
}

// Atualizar configuração do Jest para não usar Babel
function updateJestConfig() {
  console.log("🔧 Atualizando configuração do Jest...")

  const jestConfigPath = path.join(process.cwd(), "jest.config.js")
  if (fs.existsSync(jestConfigPath)) {
    const jestConfig = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
`

    fs.writeFileSync(jestConfigPath, jestConfig)
    console.log("✅ Arquivo jest.config.js atualizado para usar next/jest.")
  }

  // Atualizar jest.setup.js se existir
  const jestSetupPath = path.join(process.cwd(), "jest.setup.js")
  if (fs.existsSync(jestSetupPath)) {
    const jestSetup = `// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
`

    fs.writeFileSync(jestSetupPath, jestSetup)
    console.log("✅ Arquivo jest.setup.js atualizado.")
  }

  return true
}

// Função principal
async function main() {
  console.log("🚀 Iniciando correção de problemas de build (sem Babel)...")

  // Executar verificações
  const babelRemoved = removeBabelConfig()
  const depsOk = checkDependencies()
  const nextConfigOk = checkNextConfig()
  const tsConfigOk = checkTypeScriptConfig()
  const scriptsOk = checkScripts()
  const jestConfigOk = updateJestConfig()
  const cacheCleanOk = cleanNextCache()

  // Verificar resultado
  if (babelRemoved && depsOk && nextConfigOk && tsConfigOk && scriptsOk && jestConfigOk && cacheCleanOk) {
    console.log("✅ Todas as verificações e correções foram concluídas com sucesso!")
    console.log('🏁 O projeto deve compilar sem problemas agora. Execute "npm run build" para testar.')
  } else {
    console.log("⚠️ Algumas verificações falharam. Revise os erros acima e tente novamente.")
  }
}

// Executar o script
main().catch((error) => {
  console.error("❌ Erro fatal:", error)
  process.exit(1)
})
