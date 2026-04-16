import { Page } from '@playwright/test'

export async function loginAsTestUser(page: Page) {
  await page.goto('/login')
  await page.getByPlaceholder('seu@email.com').fill(process.env.TEST_USER_EMAIL!)
  await page.getByPlaceholder('••••••••').fill(process.env.TEST_USER_PASSWORD!)
  await page.getByRole('button', { name: /entrar/i }).click()
  await page.waitForURL('**/dashboard')
}
