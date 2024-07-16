const { expect ,test,describe,beforeAll,afterAll} = require('@playwright/test');
const MainPage=require('../integrations/pageObjects/pages/mainPage')

test.describe('Main page',()=>{
    let mainPage;

    test.beforeAll(async({browser})=>{
        const context=await browser.newContext();
        const page=await context.newPage();
        mainPage=new MainPage(page);
    });

    test.afterAll(async({browser})=>{
        await page.close();
        await browser.close();
    });

    test('Open main page',async()=>{
        await mainPage.open();
        await mainPage.waitLoaded();
        await mainPage.footer.waitLoaded();
    });
})