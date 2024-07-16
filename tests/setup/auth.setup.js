import { test as setup, expect } from '@playwright/test';
const authFile = process.env.AUTH_FILE_PATH || 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto(process.env.AUTH_URL);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email').fill(process.env.EMAIL);
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(`${process.env.AUTH_URL}/panel/garage`);

  await expect(page.getByRole('button', { name: 'My profile' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
