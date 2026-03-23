import { test, expect } from '@playwright/test'

test('login page loads and redirects to login', async ({ page }) => {
  await page.goto('/')

  // Should redirect to login when not authenticated
  await expect(page).toHaveURL(/\/login/)

  // Check login page elements
  await expect(page.getByRole('heading', { name: /Löneportalen/i })).toBeVisible()
  await expect(page.getByText(/Logga in för att fortsätta/i)).toBeVisible()
  await expect(page.getByLabelText(/Användarnamn/i)).toBeVisible()
  await expect(page.getByLabelText(/Lösenord/i)).toBeVisible()
  await expect(page.getByRole('button', { name: /Logga in/i })).toBeVisible()
})

test('user can login and see activities page', async ({ page }) => {
  await page.goto('/login')

  // Fill in login form
  await page.getByLabelText(/Användarnamn/i).fill('testuser')
  await page.getByLabelText(/Lösenord/i).fill('password123')

  // Submit form
  await page.getByRole('button', { name: /Logga in/i }).click()

  // Should redirect to activities page
  await expect(page).toHaveURL(/\/activities/)
  await expect(page.getByRole('heading', { name: /Aktiviteter/i })).toBeVisible()

  // Check header shows user info
  await expect(page.getByText('testuser')).toBeVisible()
  await expect(page.getByText(/Logga ut/i)).toBeVisible()
})
