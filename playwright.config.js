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

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_STAGING,
        httpCredentials: {
          username: process.env.HTTP_USERNAME,
          password: process.env.HTTP_PASSWORD,
        },
        storageState: process.env.AUTH_FILE_PATH,
      },
      dependencies: ['setup']
    },

  ],


});
