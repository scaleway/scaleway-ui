/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test'

const isCI = process.env['CI']

const baseURL = 'http://localhost:5173'

const times = {
  '1min': 60 * 1000,
  '3min': 3 * 60 * 1000,
}

export default defineConfig({
  webServer: {
    // it will start web app before running tests so you don't need to start it manually
    command: 'pnpm install && pnpm run start',
    url: baseURL,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'line',
  globalTimeout: isCI ? 5 * times['1min'] : undefined,
  timeout: isCI ? 1 * times['1min'] : undefined,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
