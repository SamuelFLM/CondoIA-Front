import { test, expect } from "@playwright/test"

// Função auxiliar para fazer login
async function fazerLogin(page) {
  await page.goto("/login")
  await page.fill('input[type="email"]', "admin@condominio.com")
  await page.fill('input[type="password"]', "admin")
  await page.click('button[type="submit"]')
  await page.waitForURL("**/home")
}

test.describe("Dashboard", () => {
  // Antes de cada teste, faz login
  test.beforeEach(async ({ page }) => {
    await fazerLogin(page)
  })

  test("deve exibir todos os componentes do dashboard", async ({ page }) => {
    // Verifica se o título está presente
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible()

    // Verifica se os cards de estatísticas estão presentes
    await expect(page.locator(".card")).toHaveCount(4)

    // Verifica se os gráficos estão presentes
    await expect(page.locator("canvas")).toHaveCount(2)

    // Verifica se as listas de chamados e gastos recentes estão presentes
    await expect(page.locator('h3:has-text("Chamados Recentes")')).toBeVisible()
    await expect(page.locator('h3:has-text("Gastos Recentes")')).toBeVisible()
  })

  test("deve permitir alternar entre as abas do gráfico financeiro", async ({ page }) => {
    // Clica na aba "Categorias"
    await page.click('button:has-text("Categorias")')

    // Verifica se a aba "Categorias" está ativa
    await expect(page.locator('button:has-text("Categorias").active')).toBeVisible()

    // Clica na aba "Mensal"
    await page.click('button:has-text("Mensal")')

    // Verifica se a aba "Mensal" está ativa
    await expect(page.locator('button:has-text("Mensal").active')).toBeVisible()
  })

  test("deve ser responsivo em diferentes tamanhos de tela", async ({ page }) => {
    // Testa em desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator(".card")).toHaveCount(4)

    // Testa em tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator(".card")).toHaveCount(4)

    // Testa em smartphone
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator(".card")).toHaveCount(4)
  })
})
