import { test, expect } from "@playwright/test"

// Tamanhos de tela para teste
const screenSizes = [
  { width: 1920, height: 1080, name: "Desktop" },
  { width: 768, height: 1024, name: "Tablet" },
  { width: 375, height: 667, name: "Mobile" },
]

test.describe("Testes de Responsividade", () => {
  // Testar login em diferentes tamanhos de tela
  screenSizes.forEach((size) => {
    test(`Login deve ser responsivo em ${size.name}`, async ({ page }) => {
      // Configurar tamanho da tela
      await page.setViewportSize({ width: size.width, height: size.height })

      // Navegar para a página de login
      await page.goto("/login")

      // Verificar se o formulário está visível e utilizável
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()

      // Verificar se não há overflow horizontal
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = await page.evaluate(() => window.innerWidth)
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
    })
  })

  // Testar dashboard em diferentes tamanhos de tela
  screenSizes.forEach((size) => {
    test(`Dashboard deve ser responsivo em ${size.name}`, async ({ page }) => {
      // Configurar tamanho da tela
      await page.setViewportSize({ width: size.width, height: size.height })

      // Fazer login
      await page.goto("/login")
      await page.fill('input[type="email"]', "sindico@exemplo.com")
      await page.fill('input[type="password"]', "123456")
      await page.click('button[type="submit"]')

      // Aguardar redirecionamento para o dashboard
      await page.waitForURL("**/dashboard")

      // Verificar se os elementos principais estão visíveis
      await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible()

      // Verificar se não há overflow horizontal
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = await page.evaluate(() => window.innerWidth)
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
    })
  })

  // Testar detalhes de chamado em diferentes tamanhos de tela
  screenSizes.forEach((size) => {
    test(`Detalhes de chamado devem ser responsivos em ${size.name}`, async ({ page }) => {
      // Configurar tamanho da tela
      await page.setViewportSize({ width: size.width, height: size.height })

      // Fazer login
      await page.goto("/login")
      await page.fill('input[type="email"]', "sindico@exemplo.com")
      await page.fill('input[type="password"]', "123456")
      await page.click('button[type="submit"]')

      // Navegar para a página de chamados
      await page.goto("/chamados")

      // Clicar no primeiro chamado
      await page.click("table tbody tr:first-child")

      // Verificar se os elementos principais estão visíveis
      await expect(page.locator("h1")).toBeVisible()
      await expect(page.locator('text="Descrição"')).toBeVisible()
      await expect(page.locator('text="Comentários"')).toBeVisible()

      // Verificar se não há overflow horizontal
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = await page.evaluate(() => window.innerWidth)
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
    })
  })
})
