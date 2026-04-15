import { test, expect } from '@playwright/test'
import { loginAsTestUser } from '../fixtures/auth'

test.describe('T-01 — Login', () => {
  test('login com email + senha redireciona para /dashboard', async ({ page }) => {
    await loginAsTestUser(page)
    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByRole('heading', { name: /painel principal/i })).toBeVisible()
  })
})

test.describe('T-02 — Logout', () => {
  test('logout encerra sessão e redireciona para /login', async ({ page }) => {
    await loginAsTestUser(page)
    await page.getByRole('button', { name: /sair/i }).click()
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe('T-10 — Proteção de rota', () => {
  test('/dashboard sem auth redireciona para /login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })
})
