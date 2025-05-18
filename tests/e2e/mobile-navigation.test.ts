import { test, expect } from "@playwright/test"

// Função auxiliar para fazer login
async function fazerLogin(page) {
  await page.goto("/login")
  await page.fill('input[type="email"]', "admin@condominio.com")
  await page.fill('input[type="password"]', "admin")
  await page.click('button[type="submit"]')
  await page.waitForURL("**/home")
}

test.describe("Navegação em dispositivos móveis", () => {
  // Antes de cada teste, faz login e configura viewport para mobile
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await fazerLogin(page)
  })

  test("deve abrir e fechar o menu lateral em dispositivos móveis", async ({ page }) => {
    // Verifica se o botão de menu está visível
    await expect(page.locator('button[aria-label="Menu"]')).toBeVisible()

    // Clica no botão de menu para abrir o menu lateral
    await page.click('button[aria-label="Menu"]')

    // Verifica se o menu lateral está visível
    await expect(page.locator("nav.sidebar")).toBeVisible()

    // Clica fora do menu para fechá-lo
    await page.click("main", { position: { x: 300, y: 300 } })

    // Verifica se o menu lateral está fechado
    await expect(page.locator("nav.sidebar")).not.toBeVisible()
  })

  test("deve navegar entre páginas pelo menu lateral em dispositivos móveis", async ({ page }) => {
    // Abre o menu lateral
    await page.click('button[aria-label="Menu"]')

    // Clica no link para a página de chamados
    await page.click('nav.sidebar a:has-text("Chamados")')

    // Verifica se foi redirecionado para a página de chamados
    await page.waitForURL("**/chamados")
    await expect(page).toHaveURL(/chamados/)

    // Abre o menu lateral novamente
    await page.click('button[aria-label="Menu"]')

    // Clica no link para a página de gastos
    await page.click('nav.sidebar a:has-text("Gastos")')

    // Verifica se foi redirecionado para a página de gastos
    await page.waitForURL("**/gastos")
    await expect(page).toHaveURL(/gastos/)
  })
})
