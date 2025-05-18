import { test, expect, type Page } from "@playwright/test"

// Função auxiliar para simular diferentes tipos de erro
async function setupErrorSimulation(page: Page, errorType: string) {
  // Navegar para a página de login
  await page.goto("/login")

  // Preencher credenciais e fazer login
  await page.fill('input[type="email"]', "admin@condominio.com")
  await page.fill('input[type="password"]', "admin")
  await page.click('button[type="submit"]')

  // Aguardar redirecionamento para o dashboard
  await page.waitForURL("**/dashboard")

  // Abrir o controlador de mocks e configurar para simular o erro específico
  await page.click("text=Controlador de Mocks")
  await page.click("text=Expandir")

  // Ativar simulação de erros
  const errorSwitch = page.locator('label:has-text("Simular Erros") + div >> switch')
  const isChecked = await errorSwitch.isChecked()
  if (!isChecked) {
    await errorSwitch.click()
  }

  // Configurar probabilidade para 100%
  await page.locator('label:has-text("Probabilidade") + div >> slider').fill("1")

  // Clicar no botão do erro específico
  await page.click(`text=${errorType}`)
}

test.describe("Tratamento de Erros", () => {
  test("Deve exibir mensagem de erro quando ocorrer erro 500", async ({ page }) => {
    await setupErrorSimulation(page, "Servidor (500)")

    // Navegar para a página de chamados para acionar o erro
    await page.goto("/chamados")

    // Verificar se a mensagem de erro é exibida corretamente
    await expect(page.locator("text=Erro no servidor")).toBeVisible()
    await expect(page.locator("text=Ocorreu um erro no servidor")).toBeVisible()
    await expect(page.locator("text=Tentar novamente")).toBeVisible()
  })

  test("Deve exibir mensagem de erro quando ocorrer erro de rede", async ({ page }) => {
    await setupErrorSimulation(page, "Rede")

    // Navegar para a página de chamados para acionar o erro
    await page.goto("/chamados")

    // Verificar se a mensagem de erro é exibida corretamente
    await expect(page.locator("text=Erro de conexão")).toBeVisible()
    await expect(page.locator("text=Não foi possível conectar ao servidor")).toBeVisible()
  })

  test("Deve redirecionar para página de acesso negado quando ocorrer erro 403", async ({ page }) => {
    await setupErrorSimulation(page, "Forbidden (403)")

    // Navegar para a página de chamados para acionar o erro
    await page.goto("/chamados")

    // Verificar se a mensagem de erro é exibida corretamente
    await expect(page.locator("text=Acesso negado")).toBeVisible()
    await expect(page.locator("text=Você não tem permissão para acessar este recurso")).toBeVisible()

    // Verificar se o botão de voltar ao dashboard está presente
    await expect(page.locator("text=Voltar ao Dashboard")).toBeVisible()
  })

  test("Deve redirecionar para página de login quando ocorrer erro 401", async ({ page }) => {
    await setupErrorSimulation(page, "Auth (401)")

    // Navegar para a página de chamados para acionar o erro
    await page.goto("/chamados")

    // Verificar se a mensagem de erro é exibida corretamente
    await expect(page.locator("text=Sessão expirada")).toBeVisible()

    // Verificar se é redirecionado para a página de login
    await page.waitForURL("**/login")
  })

  test("Deve exibir erros de validação quando ocorrer erro 422", async ({ page }) => {
    await setupErrorSimulation(page, "Validação (422)")

    // Navegar para a página de novo chamado
    await page.goto("/chamados/novo")

    // Preencher o formulário e enviar
    await page.fill('input[name="titulo"]', "Teste de Erro de Validação")
    await page.fill('textarea[name="descricao"]', "Descrição de teste")
    await page.click('button[type="submit"]')

    // Verificar se a mensagem de erro de validação é exibida
    await expect(page.locator("text=Erro de validação")).toBeVisible()
  })

  test("Deve permitir tentar novamente após um erro", async ({ page }) => {
    await setupErrorSimulation(page, "Servidor (500)")

    // Navegar para a página de chamados para acionar o erro
    await page.goto("/chamados")

    // Verificar se a mensagem de erro é exibida
    await expect(page.locator("text=Erro no servidor")).toBeVisible()

    // Desativar simulação de erros para que a próxima tentativa funcione
    await page.click("text=Controlador de Mocks")
    const errorSwitch = page.locator('label:has-text("Simular Erros") + div >> switch')
    await errorSwitch.click()

    // Clicar no botão "Tentar novamente"
    await page.click("text=Tentar novamente")

    // Verificar se os dados são carregados corretamente
    await expect(page.locator("text=Chamados")).toBeVisible()
    await expect(page.locator("text=Erro no servidor")).not.toBeVisible()
  })
})
