import { test, expect } from "./setup"

test.describe("Gastos", () => {
  test("deve listar gastos existentes", async ({ page }) => {
    // Navegar para página de gastos
    await page.click("text=Gastos")
    await page.waitForURL("**/gastos")

    // Verificar se a tabela de gastos está visível
    const gastosTable = await page.isVisible("table")
    expect(gastosTable).toBeTruthy()

    // Verificar se há pelo menos um gasto na lista
    const firstRow = await page.isVisible("table tbody tr")
    expect(firstRow).toBeTruthy()
  })

  test("deve abrir formulário de novo gasto", async ({ page }) => {
    // Navegar para página de gastos
    await page.click("text=Gastos")

    // Clicar no botão de novo gasto
    await page.click("text=Novo Gasto")

    // Verificar se o formulário está visível
    await page.waitForURL("**/gastos/novo")
    const form = await page.isVisible("form")
    expect(form).toBeTruthy()

    // Verificar campos do formulário
    const descricaoInput = await page.isVisible('input[name="descricao"]')
    const valorInput = await page.isVisible('input[name="valor"]')
    const dataInput = await page.isVisible('input[name="data"]')
    const categoriaSelect = await page.isVisible('select[name="categoria"]')

    expect(descricaoInput).toBeTruthy()
    expect(valorInput).toBeTruthy()
    expect(dataInput).toBeTruthy()
    expect(categoriaSelect).toBeTruthy()
  })
})
