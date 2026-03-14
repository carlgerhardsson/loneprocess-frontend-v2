import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByText('Löneportalen v2.0')).toBeVisible()
  await expect(page.getByText('Modern React + TypeScript Migration')).toBeVisible()
})

test('counter increments on click', async ({ page }) => {
  await page.goto('/')
  
  const button = page.getByRole('button', { name: /Test Counter: 0/i })
  await expect(button).toBeVisible()
  
  await button.click()
  await expect(page.getByText('Test Counter: 1')).toBeVisible()
})