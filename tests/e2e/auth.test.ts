import { test, expect } from "./setup"

test.describe("Autenticação", () => {
  test("deve manter o usuário logado após navegação", async ({ page }) => {
    // Navegar para outra página
    await page.click("text=Chamados")

    // Verificar se continua logado (não redirecionou para login)
    expect(page.url()).toContain("/chamados")

    // Verificar se o nome do usuário está visível no header
    const userName = await page.textContent('[data-testid="user-name"]')
    expect(userName).toBeTruthy()
  })

  test("deve fazer logout corretamente", async ({ page }) => {
    // Clicar no menu de usuário
    await page.click('[data-testid="user-menu"]')

    // Clicar em logout
    await page.click("text=Sair")

    // Verificar redirecionamento para login
    await page.waitForURL("**/login")
    expect(page.url()).toContain("/login")
  })
})
