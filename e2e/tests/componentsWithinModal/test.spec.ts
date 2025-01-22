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

  await page.getByLabel('close').click()
  await expect(page.locator('dialog')).not.toBeVisible()
})

test('open modal, select an option, open nested modal through select input, close modal', async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}/componentsWithinModal`)
  await page.getByRole('button', { name: 'Open Modal' }).click()

  await page.getByTestId('select-input-color').click()
  await page.getByTestId('option-stack-red').locator('div').click()
  await page.getByTestId('select-input-color').click()

  await page.getByRole('button', { name: 'Open Nested Modal' }).click()
  await page
    .locator('dialog')
    .filter({ hasText: 'This is the nested modal' })
    .getByLabel('close')
    .click()

  await page.getByLabel('close').click()
  await expect(page.locator('dialog')).not.toBeVisible()
})
