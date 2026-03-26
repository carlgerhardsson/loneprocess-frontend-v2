import { test, expect } from '@playwright/test'

/**
 * E2E-tester för Löneportalen
 *
 * Autentisering sker automatiskt via VITE_LONEPROCESS_API_KEY (API-nyckel).
 * Ingen inloggningssida med formulär visas längre.
 */

test('login page visar spinner och ansluter automatiskt', async ({ page }) => {
  await page.goto('/')

  // Sidan ska visa Löneportalen-rubriken och anslutningstext
  await expect(page.getByRole('heading', { name: /Löneportalen/i })).toBeVisible()
  await expect(page.getByText(/Ansluter till systemet/i)).toBeVisible()

  // Inga inmatningsfält ska finnas
  await expect(page.locator('input#username')).not.toBeVisible()
  await expect(page.locator('input#password')).not.toBeVisible()
})

test('autentiserad användare redirectas till dashboard', async ({ page }) => {
  // Sätt autentiserat state direkt i localStorage innan sidan laddas
  await page.addInitScript(() => {
    const authState = {
      state: {
        user: {
          id: 'api-key-user',
          email: 'system@loneportalen.se',
          name: 'Löneportalen',
          role: 'viewer',
          permissions: ['activities:read', 'periods:read'],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        },
        session: {
          token: 'test-api-key',
          expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
          refreshToken: '',
        },
        isAuthenticated: true,
      },
      version: 0,
    }
    localStorage.setItem('auth-storage', JSON.stringify(authState))
  })

  await page.goto('/')

  // Ska redirectas till dashboard
  await page.waitForURL('**/dashboard', { timeout: 10000 })

  // Logga ut-knapp ska finnas (bekräftar autentiserat tillstånd)
  await expect(page.getByRole('button', { name: /Logga ut/i })).toBeVisible()
})
