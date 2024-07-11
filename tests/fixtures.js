const { test:base} = require('@playwright/test');
const GaragePage = require('../integrations/pageObjects/pages/garagePage');

const test = base.extend({
  
  fixturedGaragePage: async ({ browser }, use) => {

    const context = await browser.newContext({ storageState: 'storageState.json' });
    const page = await context.newPage();
    await page.goto(`${process.env.BASE_URL_STAGING}panel/garage`);
    const garagePage = new GaragePage(page);
    await use(garagePage);
    await context.close();
  },
});

module.exports={test};

