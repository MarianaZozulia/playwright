// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL_STAGING,
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },
    screenshot: 'only-on-failure',
    video: 'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'staging',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL_STAGING,
        httpCredentials: {
          username: process.env.HTTP_USERNAME,
          password: process.env.HTTP_PASSWORD,
        },
        storageState: 'storageState.json'
      },
    },
    {
      name: 'setup',
      testMatch: /.*\.setup\.spec\.js/,
    },
    {
      name: 'production',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL_PRODUCTION,
        httpCredentials: {
          username: process.env.HTTP_USERNAME,
          password: process.env.HTTP_PASSWORD,
        },
        retries: 2,
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
