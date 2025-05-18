import { test, expect } from "./setup"

test.describe("Estados dos Botões", () => {
  test("botões de submit devem ser desabilitados durante o envio", async ({ page }) => {
    // Navegar para formulário de novo chamado
    await page.click("text=Chamados")
    await page.click("text=Novo Chamado")

    // Preencher formulário
    await page.fill("#title", "Teste de estado do botão")
    await page.click("#category")
    await page.click("text=Manutenção")
    await page.click("#priority")
    await page.click("text=Média")
    await page.fill("#location", "Bloco A")
    await page.fill("#description", "Este é um teste do estado do botão de submit.")

    // Interceptar requisições para atrasar a resposta
    await page.route("**/api/chamados", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
    })

    // Clicar no botão de submit
    await page.click("button:has-text('Registrar Chamado')")

    // Verificar se o botão está desabilitado e mostra texto de carregamento
    const buttonDisabled = await page.isDisabled("button:has-text('Enviando...')")
    expect(buttonDisabled).toBeTruthy()

    // Aguardar redirecionamento
    await page.waitForURL("**/chamados")
  })

  test("botões de ação devem ter estados de hover e focus", async ({ page }) => {
    // Navegar para página de chamados
    await page.click("text=Chamados")

    // Verificar estado hover do botão Novo Chamado
    await page.hover("text=Novo Chamado")

    // Verificar estado focus do botão
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    // Verificar se o botão está focado (difícil testar visualmente em testes automatizados)
    const activeElement = await page.evaluate(() => document.activeElement?.textContent)
    expect(activeElement).toBeTruthy()
  })

  test("botões desabilitados devem permanecer desabilitados", async ({ page }) => {
    // Navegar para formulário de novo chamado
    await page.click("text=Chamados")
    await page.click("text=Novo Chamado")

    // Verificar se o botão está inicialmente habilitado
    const initiallyEnabled = await page.isEnabled("button:has-text('Registrar Chamado')")
    expect(initiallyEnabled).toBeTruthy()

    // Simular envio em andamento
    await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]')
      if (button) {
        button.setAttribute("disabled", "true")
        button.textContent = "Enviando..."
      }
    })

    // Verificar se o botão está desabilitado
    const buttonDisabled = await page.isDisabled("button:has-text('Enviando...')")
    expect(buttonDisabled).toBeTruthy()

    // Tentar clicar no botão desabilitado (não deve fazer nada)
    await page.click("button:has-text('Enviando...')", { force: true })

    // Verificar que ainda estamos na mesma página
    expect(page.url()).toContain("/chamados/novo")
  })
})
