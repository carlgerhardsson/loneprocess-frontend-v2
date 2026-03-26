import { test, expect } from '@playwright/test'

/**
 * E2E-tester för Löneportalen
 *
 * Autentisering sker automatiskt via VITE_LONEPROCESS_API_KEY (API-nyckel).
 * Ingen inloggningssida med formulär visas — auto-login eller redirect sker direkt.
 *
 * OBS om CI-timing:
 * I CI är API-nyckeln satt som GitHub Secret, vilket gör att auto-login
 * sker på millisekunder och sidan kan redan ha redirectat till /dashboard
 * när testet körs. Testerna är därför skrivna för att vara robusta mot
 * båda scenarierna (spinner synlig ELLER redan på dashboard).
 */

test('ingen inloggningsformulär visas — auto-login eller redirect sker', async ({ page }) => {
  await page.goto('/')

  // Vänta tills sidan har stabiliserat sig (antingen spinner eller dashboard)
  await page.waitForLoadState('networkidle')

  // Oavsett vad som händer ska inga inmatningsfält för lösenord finnas
  await expect(page.locator('input#username')).not.toBeAttached()
  await expect(page.locator('input#password')).not.toBeAttached()

  // Sidan ska antingen visa spinner (ingen API-nyckel / långsamt nätverk)
  // ELLER ha redirectat till dashboard (snabb inloggning med API-nyckel)
  const onDashboard = page.url().includes('/dashboard')
  const onLogin = page.url().includes('/login') || page.url().endsWith('/')

  expect(onDashboard || onLogin).toBe(true)
})

test('autentiserad användare redirectas till dashboard', async ({ page }) => {
  // Sätt autentiserat state direkt i localStorage innan sidan laddas
  // så att testet inte är beroende av ett live API-anrop
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
