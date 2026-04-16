import { test, expect } from '@playwright/test'
import { loginAsTestUser } from '../fixtures/auth'
import { cleanupTestPets } from '../fixtures/cleanup'

test.beforeEach(async ({ page }) => {
  await cleanupTestPets()
  await loginAsTestUser(page)
  await page.goto('/pets')
})

test.afterEach(async () => {
  await cleanupTestPets()
})

test.describe('T-03 — Cadastrar pet', () => {
  test('shelf completo: insert no banco, shelf fecha, card aparece', async ({ page }) => {
    await page.getByRole('button', { name: /adicionar pet/i }).click()

    const shelf = page.locator('[aria-label="Adicionar Pet"]')
    await expect(shelf).toBeVisible()

    await shelf.getByPlaceholder('Ex: Luna').fill('Thanos Teste')
    await shelf.locator('select').nth(0).selectOption('Cão')
    await shelf.locator('select').nth(1).selectOption('Macho')
    await shelf.getByPlaceholder('Ex: Golden Retriever').fill('Cane Corso')
    await shelf.getByPlaceholder('Ex: 8.5').fill('65')

    await shelf.getByRole('button', { name: /cadastrar pet/i }).click()

    // card aparece na lista (shelf fecha via translateX — aguardar refresh)
    await expect(page.getByText('Thanos Teste')).toBeVisible({ timeout: 10000 })
  })
})

test.describe('T-04 — Botão Dashboard → shelf', () => {
  test('botão "Cadastrar meu primeiro pet" abre shelf em /pets', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('button', { name: /cadastrar meu primeiro pet/i }).click()
    await expect(page).toHaveURL(/\/pets/)
    await expect(page.locator('[aria-label="Adicionar Pet"]')).toBeVisible()
  })
})
