const { test } = require('@playwright/test');
require('dotenv').config();

test('Login and save user state', async ({ page }) => {
  await page.goto('/');
  await page.locator('.btn.btn-outline-white.header_signin').click();
  const signInModal = page.locator('.modal-content');
  await signInModal.locator('#signinEmail').fill('mariana@mariana.com');
  await signInModal.locator('#signinPassword').fill('QTdvXj4!FSsuH2');
  await signInModal.locator('.btn.btn-primary').click();
  await page.context().storageState({ path: 'storageState.json' });
});
