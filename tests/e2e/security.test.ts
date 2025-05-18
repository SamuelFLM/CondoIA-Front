import { test, expect } from "@playwright/test"

test.describe("Testes de Segurança e Autorização", () => {
  test("Deve redirecionar para login ao tentar acessar rota protegida sem autenticação", async ({ page }) => {
    // Tentar acessar dashboard sem login
    await page.goto("/dashboard")

    // Verificar se foi redirecionado para login
    await expect(page).toHaveURL(/.*login/)

    // Verificar se mensagem de erro é exibida
    await expect(page.locator("text=Acesso restrito")).toBeVisible()
  })

  test("Deve redirecionar para acesso negado ao tentar acessar rota com permissão insuficiente", async ({ page }) => {
    // Fazer login como morador (perfil com menos permissões)
    await page.goto("/login")
    await page.fill('input[type="email"]', "morador@condominio.com")
    await page.fill('input[type="password"]', "senha123")
    await page.click('button[type="submit"]')

    // Tentar acessar área administrativa
    await page.goto("/admin/configuracoes")

    // Verificar se foi redirecionado para acesso negado
    await expect(page).toHaveURL(/.*acesso-negado/)

    // Verificar se mensagem de acesso negado é exibida
    await expect(page.locator("text=Acesso Negado")).toBeVisible()
  })

  test("Deve expirar sessão após tempo limite", async ({ page }) => {
    // Fazer login
    await page.goto("/login")
    await page.fill('input[type="email"]', "sindico@condominio.com")
    await page.fill('input[type="password"]', "senha123")
    await page.click('button[type="submit"]')

    // Aguardar redirecionamento para o dashboard
    await page.waitForURL("/dashboard")

    // Simular expiração de token modificando localStorage
    await page.evaluate(() => {
      // Definir timestamp de expiração para o passado
      localStorage.setItem("auth_token_expiry", (Date.now() - 1000).toString())
    })

    // Tentar acessar uma página protegida
    await page.goto("/chamados")

    // Verificar se foi redirecionado para login
    await expect(page).toHaveURL(/.*login/)

    // Verificar se mensagem de sessão expirada é exibida
    await expect(page.locator("text=Sessão expirada")).toBeVisible()
  })

  test("Não deve permitir acesso a APIs protegidas sem token válido", async ({ page, request }) => {
    // Tentar acessar API protegida sem token
    const response = await request.get("/api/chamados")

    // Verificar se retorna 401 Unauthorized
    expect(response.status()).toBe(401)
  })
})
