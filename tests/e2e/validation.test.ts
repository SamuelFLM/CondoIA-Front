import { test, expect } from "@playwright/test"

test.describe("Testes de Validação de Formulários", () => {
  test("Deve validar campos obrigatórios no formulário de novo chamado", async ({ page }) => {
    // Fazer login
    await page.goto("/login")
    await page.fill('input[type="email"]', "sindico@condominio.com")
    await page.fill('input[type="password"]', "senha123")
    await page.click('button[type="submit"]')

    // Navegar para a página de novo chamado
    await page.goto("/chamados/novo")

    // Tentar enviar formulário vazio
    await page.click('button[type="submit"]')

    // Verificar mensagens de erro para campos obrigatórios
    await expect(page.locator("text=O título deve ter pelo menos 5 caracteres")).toBeVisible()
    await expect(page.locator("text=Selecione uma categoria")).toBeVisible()
    await expect(page.locator("text=Selecione uma prioridade")).toBeVisible()
    await expect(page.locator("text=A localização deve ter pelo menos 3 caracteres")).toBeVisible()
    await expect(page.locator("text=A descrição deve ter pelo menos 10 caracteres")).toBeVisible()
  })

  test("Deve validar formato de dados no formulário de novo gasto", async ({ page }) => {
    // Fazer login
    await page.goto("/login")
    await page.fill('input[type="email"]', "sindico@condominio.com")
    await page.fill('input[type="password"]', "senha123")
    await page.click('button[type="submit"]')

    // Navegar para a página de novo gasto
    await page.goto("/gastos/novo")

    // Preencher com dados inválidos
    await page.fill('input[name="descricao"]', "AB") // Muito curto
    await page.fill('input[name="valor"]', "-100") // Valor negativo
    await page.fill('input[name="data"]', "2099-12-31") // Data futura

    // Tentar enviar formulário
    await page.click('button[type="submit"]')

    // Verificar mensagens de erro específicas
    await expect(page.locator("text=A descrição deve ter pelo menos 3 caracteres")).toBeVisible()
    await expect(page.locator("text=O valor deve ser maior que zero")).toBeVisible()
  })

  test("Deve aceitar formulário com dados válidos", async ({ page }) => {
    // Fazer login
    await page.goto("/login")
    await page.fill('input[type="email"]', "sindico@condominio.com")
    await page.fill('input[type="password"]', "senha123")
    await page.click('button[type="submit"]')

    // Navegar para a página de novo chamado
    await page.goto("/chamados/novo")

    // Preencher com dados válidos
    await page.fill("input#title", "Vazamento no banheiro do térreo")
    await page.click("#category")
    await page.click("text=Manutenção")
    await page.click("#priority")
    await page.click("text=Alta")
    await page.fill("input#location", "Bloco A, Térreo")
    await page.fill(
      "textarea#description",
      "Há um vazamento constante na pia do banheiro do térreo. A água está acumulando no piso.",
    )

    // Enviar formulário
    await page.click('button[type="submit"]')

    // Verificar redirecionamento após sucesso
    await expect(page).toHaveURL("/chamados")

    // Verificar mensagem de sucesso
    await expect(page.locator("text=Chamado registrado com sucesso")).toBeVisible()
  })
})
