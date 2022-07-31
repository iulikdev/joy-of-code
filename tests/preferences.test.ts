import { expect, test } from '@playwright/test'

test.describe('preferences', () => {
  test('should be able to change theme', async ({ page, context }) => {
    await page.goto('/')

    const setTheme = '🌛 Night'
    const changedTheme = '☀️ Daylight'

    let theme = await page.locator('html').getAttribute('data-theme')
    let storage = await context.storageState()
    let localStorage = storage.origins[0].localStorage[0]
    expect(theme).toBe(setTheme)
    expect(localStorage.value).toBe(setTheme)

    await page.locator('[aria-label="Preferences"]').click()
    await page.locator('button:has-text("🌛 Night")').click()
    await page.locator('text=☀️ Daylight').click()

    theme = await page.locator('html').getAttribute('data-theme')
    storage = await context.storageState()
    localStorage = storage.origins[0].localStorage[0]
    expect(theme).toBe(changedTheme)
    expect(localStorage.value).toBe(changedTheme)
  })

  test.only('should be able to change text options', async ({ page }) => {
    await page.goto('/')

    await page.locator('input[name="text-size"]').click()
    await page.locator('input[name="text-length"]').click()
    await page.locator('input[name="text-height"]').click()

    // style="--post-txt-size:18px; --post-txt-length:70ch; --post-txt-height:48px;"

    // await page.pause()
  })

  // test('should be able to use font for dyslexia', async ({ page }) => {
  // await page.locator('button[role="switch"]').click()
  // data-font="dyslexic"
  // })

  // test('should be able to reset preferences', async ({ page }) => {
  // await page.locator('button[role="switch"]').click()
  // })
})
