const { test:base} = require('@playwright/test');
const GaragePage = require('../integrations/pageObjects/pages/garagePage');

const test = base.extend({
  
  fixturedGaragePage: async ({ browser }, use) => {
    // Завантажуємо збережений стан сесії
    const context = await browser.newContext({ storageState: 'storageState.json' });
    const page = await context.newPage();
    await page.goto(`${process.env.BASE_URL_STAGING}panel/garage`);
    const garagePage = new GaragePage(page);
    //garagePage.goto();
    // Передаємо об'єкт сторінки у фікстуру
    await use(garagePage);
    // Закриваємо контекст після використання
    await context.close();
  },
});

module.exports={test};

