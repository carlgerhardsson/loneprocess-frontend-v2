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

  // Wait for navigation to activities page
  await page.waitForURL('/activities')

  // Verify we're logged in by checking header shows user info
  // (Don't wait for activities to load - that requires mock API setup)
  await expect(page.getByText('Demo User')).toBeVisible()

  // Verify logout button is present (confirms authenticated state)
  await expect(page.getByRole('button', { name: /Logga ut/i })).toBeVisible()
})
