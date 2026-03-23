import { test, expect } from '@playwright/test'

test('login page loads correctly', async ({ page }) => {
  await page.goto('/')

  // Check login page elements
  await expect(page.getByRole('heading', { name: /Löneportalen/i })).toBeVisible()
  await expect(page.getByText(/Logga in för att fortsätta/i)).toBeVisible()
  await expect(page.locator('input#username')).toBeVisible()
  await expect(page.locator('input#password')).toBeVisible()
})

test('user can login and see activities page', async ({ page }) => {
  await page.goto('/')

  // Fill in login form
  await page.locator('input#username').fill('testuser')
  await page.locator('input#password').fill('password123')

  // Submit form
  await page.click('button[type="submit"]')

  // Wait for navigation and page load (using correct route: /activities not /aktiviteter)
  await page.waitForURL('/activities')

  // Should show activities page content
  await expect(page.getByRole('heading', { name: /Aktiviteter/i })).toBeVisible()

  // Check header shows user info (mock login sets name to 'Demo User')
  await expect(page.getByText('Demo User')).toBeVisible()
})
