// Este script verifica e corrige problemas com dependências do Babel
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("Verificando dependências do Babel...")

// Lista de dependências do Babel que precisamos garantir
const babelDeps = ["@babel/core", "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript", "babel-jest"]

try {
  // Verifica se o package.json existe
  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    console.error("Arquivo package.json não encontrado!")
    process.exit(1)
  }

  // Lê o package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Verifica se as dependências do Babel estão nas dependencies
  const missingDeps = []
  for (const dep of babelDeps) {
    if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
      missingDeps.push(dep)
    }
  }

  // Se houver dependências faltando, instala-as
  if (missingDeps.length > 0) {
    console.log(`Instalando dependências faltando: ${missingDeps.join(", ")}`)
    execSync(`npm install ${missingDeps.join(" ")} --save`, { stdio: "inherit" })
    console.log("Dependências instaladas com sucesso!")
  } else {
    console.log("Todas as dependências do Babel estão presentes!")
  }

  // Verifica se o .babelrc existe e está correto
  const babelrcPath = path.join(process.cwd(), ".babelrc")
  if (!fs.existsSync(babelrcPath)) {
    console.log("Criando arquivo .babelrc...")
    const babelrc = {
      presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
    }
    fs.writeFileSync(babelrcPath, JSON.stringify(babelrc, null, 2))
    console.log("Arquivo .babelrc criado com sucesso!")
  }

  console.log("Verificação de dependências do Babel concluída!")
} catch (error) {
  console.error("Erro ao verificar dependências:", error)
  process.exit(1)
}
