import { test, expect } from "./setup"

test.describe("Páginas de Detalhes", () => {
  test("deve exibir detalhes de um chamado", async ({ page }) => {
    // Navegar para página de chamados
    await page.click("text=Chamados")

    // Clicar no primeiro chamado da lista
    await page.click("table tbody tr:first-child")

    // Verificar se a página de detalhes carregou
    await page.waitForSelector('h1:has-text("Vazamento no 3º andar")')

    // Verificar componentes principais
    const titulo = await page.textContent("h1")
    const descricao = await page.textContent("text=Descrição >> xpath=./following-sibling::div")
    const status = await page.isVisible("text=Aberto")
    const comentarios = await page.isVisible("text=Comentários")

    expect(titulo).toContain("Vazamento no 3º andar")
    expect(descricao).toBeTruthy()
    expect(status).toBeTruthy()
    expect(comentarios).toBeTruthy()

    // Verificar funcionalidade de atualização de status
    await page.click("text=Selecione um status")
    await page.click("text=Em Andamento")
    await page.click('button:has-text("Atualizar Status")')

    // Verificar se o status foi atualizado
    const novoStatus = await page.isVisible("text=Em Andamento")
    expect(novoStatus).toBeTruthy()

    // Verificar funcionalidade de comentários
    await page.fill("textarea#comentario", "Teste de comentário via E2E")
    await page.click('button:has-text("Enviar")')

    // Verificar se o comentário foi adicionado
    const comentario = await page.textContent("text=Teste de comentário via E2E")
    expect(comentario).toBeTruthy()
  })

  test("deve exibir detalhes de um gasto", async ({ page }) => {
    // Navegar para página de gastos
    await page.click("text=Gastos")

    // Clicar no primeiro gasto da lista
    await page.click("table tbody tr:first-child")

    // Verificar se a página de detalhes carregou
    await page.waitForSelector('h1:has-text("Manutenção do elevador")')

    // Verificar componentes principais
    const titulo = await page.textContent("h1")
    const valor = await page.textContent("text=Valor >> xpath=./following-sibling::div")
    const categoria = await page.isVisible("text=Manutenção")
    const fornecedor = await page.textContent("text=Fornecedor >> xpath=./following-sibling::div")

    expect(titulo).toContain("Manutenção do elevador")
    expect(valor).toContain("R$")
    expect(categoria).toBeTruthy()
    expect(fornecedor).toContain("Elevadores Rápidos")

    // Verificar botões de ação
    const editarBtn = await page.isVisible('button:has-text("Editar")')
    const excluirBtn = await page.isVisible('button:has-text("Excluir")')

    expect(editarBtn).toBeTruthy()
    expect(excluirBtn).toBeTruthy()
  })
})
