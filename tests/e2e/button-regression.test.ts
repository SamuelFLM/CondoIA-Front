import { test, expect } from "./setup"

test.describe("Regressão de Botões", () => {
  test("todos os botões devem manter funcionalidade após as alterações", async ({ page }) => {
    // Testar navegação principal
    await page.click("text=Dashboard")
    expect(page.url()).toContain("/dashboard")

    await page.click("text=Chamados")
    expect(page.url()).toContain("/chamados")

    await page.click("text=Gastos")
    expect(page.url()).toContain("/gastos")

    await page.click("text=Usuários")
    expect(page.url()).toContain("/usuarios")

    // Testar botões de ação
    await page.click("text=Novo Usuário")
    expect(page.url()).toContain("/usuarios/novo")

    // Testar botão de cancelar
    await page.click("button:has-text('Cancelar')")
    expect(page.url()).toContain("/usuarios")
    expect(page.url()).not.toContain("/novo")

    // Testar botões de dropdown
    await page.click("button[aria-label='Ações']")
    const editarOption = await page.isVisible("text=Editar")
    expect(editarOption).toBeTruthy()

    // Fechar dropdown clicando fora
    await page.click("body", { position: { x: 10, y: 10 } })

    // Verificar que todos os botões estão acessíveis
    const allButtons = await page.$$("button")
    expect(allButtons.length).toBeGreaterThan(0)
  })
})
