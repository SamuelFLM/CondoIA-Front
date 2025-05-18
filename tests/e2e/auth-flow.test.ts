import { test, expect } from "@playwright/test"

// Teste de fluxo de autenticação completo
test.describe("Fluxo de autenticação", () => {
  test("deve fazer login, navegar pelo dashboard e fazer logout", async ({ page }) => {
    // 1. Acessa a página de login
    await page.goto("/login")
    await expect(page).toHaveTitle(/Login/)

    // 2. Preenche o formulário de login
    await page.fill('input[type="email"]', "admin@condominio.com")
    await page.fill('input[type="password"]', "admin")

    // 3. Clica no botão de login
    await page.click('button[type="submit"]')

    // 4. Verifica se foi redirecionado para o dashboard
    await page.waitForURL("**/home")
    await expect(page).toHaveURL(/home/)

    // 5. Verifica se o dashboard carregou corretamente
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible()

    // 6. Navega para a página de chamados
    await page.click('a:has-text("Chamados")')
    await page.waitForURL("**/chamados")
    await expect(page).toHaveURL(/chamados/)

    // 7. Navega para a página de gastos
    await page.click('a:has-text("Gastos")')
    await page.waitForURL("**/gastos")
    await expect(page).toHaveURL(/gastos/)

    // 8. Navega para a página de moradores
    await page.click('a:has-text("Moradores")')
    await page.waitForURL("**/moradores")
    await expect(page).toHaveURL(/moradores/)

    // 9. Faz logout
    await page.click('button:has-text("Sair")')

    // 10. Verifica se foi redirecionado para a página de login
    await page.waitForURL("**/login")
    await expect(page).toHaveURL(/login/)
  })
})

// Teste de redirecionamento para login quando não autenticado
test.describe("Proteção de rotas", () => {
  test("deve redirecionar para login ao acessar rota protegida sem autenticação", async ({ page }) => {
    // 1. Tenta acessar o dashboard diretamente
    await page.goto("/home")

    // 2. Verifica se foi redirecionado para o login
    await expect(page).toHaveURL(/login/)
  })
})

// Teste de validação de formulário
test.describe("Validação de formulário de login", () => {
  test("deve mostrar erro ao tentar login com credenciais inválidas", async ({ page }) => {
    // 1. Acessa a página de login
    await page.goto("/login")

    // 2. Preenche o formulário com credenciais inválidas
    await page.fill('input[type="email"]', "usuario@invalido.com")
    await page.fill('input[type="password"]', "senhaerrada")

    // 3. Clica no botão de login
    await page.click('button[type="submit"]')

    // 4. Verifica se a mensagem de erro é exibida
    await expect(page.locator("text=Credenciais inválidas")).toBeVisible()

    // 5. Verifica se permanece na página de login
    await expect(page).toHaveURL(/login/)
  })
})

// Teste de persistência de sessão
test.describe("Persistência de sessão", () => {
  test("deve manter a sessão ao recarregar a página", async ({ page }) => {
    // 1. Faz login
    await page.goto("/login")
    await page.fill('input[type="email"]', "admin@condominio.com")
    await page.fill('input[type="password"]', "admin")
    await page.click('button[type="submit"]')

    // 2. Verifica se foi redirecionado para o dashboard
    await page.waitForURL("**/home")

    // 3. Recarrega a página
    await page.reload()

    // 4. Verifica se continua no dashboard
    await expect(page).toHaveURL(/home/)
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible()
  })
})
