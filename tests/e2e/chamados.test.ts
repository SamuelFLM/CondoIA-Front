import { test, expect } from "@playwright/test"

test.describe("Fluxo Completo de Chamados", () => {
  test.beforeEach(async ({ page }) => {
    // Fazer login
    await page.goto("/login")
    await page.fill('input[type="email"]', "sindico@exemplo.com")
    await page.fill('input[type="password"]', "123456")
    await page.click('button[type="submit"]')

    // Aguardar redirecionamento para o dashboard
    await page.waitForURL("**/dashboard")
  })

  test("Deve criar, visualizar, atualizar e fechar um chamado", async ({ page }) => {
    // 1. Criar um novo chamado
    await page.goto("/chamados/novo")

    // Preencher o formulário
    await page.fill('input[id="titulo"]', "Teste de Chamado E2E")
    await page.click('button:has-text("Selecione uma categoria")')
    await page.click('div[role="option"]:has-text("Manutenção")')
    await page.click('button:has-text("Selecione a prioridade")')
    await page.click('div[role="option"]:has-text("Média")')
    await page.fill('input[id="localizacao"]', "Bloco A, Apartamento 101")
    await page.fill('textarea[id="descricao"]', "Este é um chamado de teste criado pelo teste E2E automatizado.")

    // Enviar o formulário
    await page.click('button:has-text("Registrar Chamado")')

    // Verificar se foi redirecionado para a lista de chamados
    await page.waitForURL("**/chamados")

    // 2. Verificar se o chamado aparece na lista
    await expect(page.locator('text="Teste de Chamado E2E"')).toBeVisible()

    // 3. Visualizar detalhes do chamado
    await page.click('text="Teste de Chamado E2E"')

    // Verificar se está na página de detalhes
    await expect(page.locator('h1:has-text("Teste de Chamado E2E")')).toBeVisible()

    // 4. Adicionar um comentário
    await page.fill('textarea[id="comentario"]', "Este é um comentário de teste.")
    await page.click('button:has-text("Enviar")')

    // Verificar se o comentário foi adicionado
    await expect(page.locator('text="Este é um comentário de teste."')).toBeVisible()

    // 5. Atualizar o status do chamado
    await page.click('button:has-text("Selecione um status")')
    await page.click('div[role="option"]:has-text("Em Andamento")')
    await page.click('button:has-text("Atualizar Status")')

    // Verificar se o status foi atualizado
    await expect(page.locator('text="Em Andamento"')).toBeVisible()

    // 6. Fechar o chamado
    await page.click('button:has-text("Em Andamento")')
    await page.click('div[role="option"]:has-text("Fechado")')
    await page.click('button:has-text("Atualizar Status")')

    // Verificar se o status foi atualizado para Fechado
    await expect(page.locator('text="Fechado"')).toBeVisible()

    // 7. Voltar para a lista de chamados
    await page.click('a:has-text("Voltar")')

    // Verificar se está na lista de chamados
    await expect(page.url()).toContain("/chamados")
  })
})
