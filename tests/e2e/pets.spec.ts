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
    await expect(page.getByRole('dialog', { name: /adicionar pet/i })).toBeVisible()

    await page.getByLabel('Nome do pet').fill('Thanos Teste')
    await page.getByLabel('Espécie').selectOption('Cão')
    await page.getByLabel('Sexo').selectOption('Macho')
    await page.getByLabel('Raça').fill('Cane Corso')
    await page.getByLabel('Peso (kg)').fill('65')

    await page.getByRole('button', { name: /cadastrar pet/i }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.getByText('Thanos Teste')).toBeVisible()
  })
})

test.describe('T-04 — Botão Dashboard → shelf', () => {
  test('botão "Cadastrar meu primeiro pet" abre shelf em /pets', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('button', { name: /cadastrar meu primeiro pet/i }).click()
    await expect(page).toHaveURL(/\/pets/)
    await expect(page.getByRole('dialog', { name: /adicionar pet/i })).toBeVisible()
  })
})
