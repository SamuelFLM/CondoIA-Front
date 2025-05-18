// Configuração básica para testes E2E
import { test as baseTest } from "@playwright/test"

// Extensão do teste base com login automático
export const test = baseTest.extend({
  // Login automático antes de cada teste
  page: async ({ page }, use) => {
    // Navegar para a página de login
    await page.goto("/login")

    // Preencher credenciais e fazer login
    await page.fill('[data-testid="email-input"]', "sindico@condominio.com")
    await page.fill('[data-testid="password-input"]', "senha123")
    await page.click('[data-testid="login-button"]')

    // Esperar redirecionamento para o dashboard
    await page.waitForURL("**/dashboard")

    // Usar a página logada para o teste
    await use(page)
  },
})

export { expect } from "@playwright/test"
