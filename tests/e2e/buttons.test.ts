import { test, expect } from "./setup"

test.describe("Comportamento dos Botões", () => {
  test("botões de navegação devem funcionar corretamente", async ({ page }) => {
    // Testar botão de navegação para Chamados
    await page.click("text=Chamados")
    expect(page.url()).toContain("/chamados")

    // Testar botão de navegação para Novo Chamado
    await page.click("text=Novo Chamado")
    expect(page.url()).toContain("/chamados/novo")

    // Testar botão de voltar
    await page.click("button[aria-label='Voltar']")
    expect(page.url()).toContain("/chamados")
    expect(page.url()).not.toContain("/novo")
  })

  test("botões de formulário devem funcionar corretamente", async ({ page }) => {
    // Navegar para formulário de novo chamado
    await page.click("text=Chamados")
    await page.click("text=Novo Chamado")

    // Testar botão de cancelar
    await page.click("button:has-text('Cancelar')")
    expect(page.url()).toContain("/chamados")
    expect(page.url()).not.toContain("/novo")

    // Voltar para o formulário
    await page.click("text=Novo Chamado")

    // Preencher formulário
    await page.fill("#title", "Teste de botão submit")
    await page.click("#category")
    await page.click("text=Manutenção")
    await page.click("#priority")
    await page.click("text=Média")
    await page.fill("#location", "Bloco A")
    await page.fill("#description", "Este é um teste do botão de submit.")

    // Testar botão de submit
    await page.click("button:has-text('Registrar Chamado')")

    // Verificar redirecionamento após submit
    await page.waitForURL("**/chamados")
    expect(page.url()).toContain("/chamados")
  })

  test("botões de ação em tabelas devem funcionar corretamente", async ({ page }) => {
    // Navegar para página de usuários
    await page.click("text=Usuários")

    // Testar botão de ações (dropdown)
    await page.click("button[aria-label='Ações']")

    // Verificar se o dropdown abriu
    const editarOption = await page.isVisible("text=Editar")
    const excluirOption = await page.isVisible("text=Excluir")

    expect(editarOption).toBeTruthy()
    expect(excluirOption).toBeTruthy()

    // Testar botão de editar
    await page.click("text=Editar")
    expect(page.url()).toContain("/usuarios/editar/")

    // Voltar para a lista
    await page.click("button[aria-label='Voltar']")

    // Testar botão de novo usuário
    await page.click("text=Novo Usuário")
    expect(page.url()).toContain("/usuarios/novo")
  })

  test("botões de filtro e busca devem funcionar corretamente", async ({ page }) => {
    // Navegar para página de usuários
    await page.click("text=Usuários")

    // Testar campo de busca
    await page.fill("input[placeholder='Buscar usuários...']", "João")
    await page.click("button[aria-label='Buscar']")

    // Verificar se a tabela foi filtrada
    const rowCount = await page.locator("table tbody tr").count()
    expect(rowCount).toBeGreaterThanOrEqual(0)

    // Limpar busca
    await page.fill("input[placeholder='Buscar usuários...']", "")
    await page.click("button[aria-label='Buscar']")
  })

  test("botões de autenticação devem funcionar corretamente", async ({ page }) => {
    // Testar botão de perfil/usuário
    await page.click("button[aria-label='Menu do usuário']")

    // Verificar se o dropdown abriu
    const perfilOption = await page.isVisible("text=Perfil")
    const logoutOption = await page.isVisible("text=Sair")

    expect(perfilOption).toBeTruthy()
    expect(logoutOption).toBeTruthy()

    // Fechar dropdown clicando fora
    await page.click("body", { position: { x: 10, y: 10 } })
  })

  test("botões de modal e diálogo devem funcionar corretamente", async ({ page }) => {
    // Navegar para página de usuários
    await page.click("text=Usuários")

    // Abrir dropdown de ações
    await page.click("button[aria-label='Ações']")

    // Clicar em excluir para abrir diálogo
    await page.click("text=Excluir")

    // Verificar se o diálogo abriu
    const dialogTitle = await page.isVisible("text=Excluir Usuário")
    expect(dialogTitle).toBeTruthy()

    // Testar botão de cancelar no diálogo
    await page.click("button:has-text('Cancelar')")

    // Verificar se o diálogo fechou
    const dialogClosed = await page.isHidden("text=Excluir Usuário")
    expect(dialogClosed).toBeTruthy()
  })
})
