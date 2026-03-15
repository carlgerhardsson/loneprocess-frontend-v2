import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')

  // Check Header
  await expect(page.getByRole('heading', { name: /🚀 Löneportalen v2.0/ })).toBeVisible()

  // Check main content
  await expect(page.getByText('Welcome to Löneportalen v2.0')).toBeVisible()
  await expect(page.getByText(/Modern React \+ TypeScript migration/i)).toBeVisible()

  // Check Footer
  await expect(page.getByText(/API Status:/i)).toBeVisible()
})

test('counter increments on click', async ({ page }) => {
  await page.goto('/')

  const button = page.getByRole('button', { name: /Counter: 0/i })
  await expect(button).toBeVisible()

  await button.click()
  await expect(page.getByText('Counter: 1')).toBeVisible()
})
