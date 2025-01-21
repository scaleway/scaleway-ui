import { expect, test } from '@playwright/test'

test('open modal, fill text inputs, close modal', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()
  await page.getByLabel('First name').click()
  await page.getByLabel('First name').fill('Test First Name')

  await expect(page.locator('div[data-testid="input-value"]')).toHaveText(
    'Test First Name',
  )

  await page.getByLabel('Last name').click()
  await page.getByLabel('Last name').fill('Test Last Name')

  await expect(page.locator('div[data-testid="form-content"]')).toHaveText(
    'Test Last Name',
  )
})

test('open modal, click and fill on select input, close modal', async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()
  await page.getByLabel('First name').click()
  await page.getByLabel('First name').fill('Test First Name')

  await expect(page.locator('div[data-testid="input-value"]')).toHaveText(
    'Test First Name',
  )

  await page.getByLabel('Last name').click()
  await page.getByLabel('Last name').fill('Test Last Name')

  await expect(page.locator('div[data-testid="form-content"]')).toHaveText(
    'Test Last Name',
  )
})
