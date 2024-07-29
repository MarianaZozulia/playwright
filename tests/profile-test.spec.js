const { test } = require('@playwright/test');
const ProfilePage=require('../integrations/pageObjects/pages/profilePage')

const name="newMariana";
const lastname="newZozulia";

test.skip('test the modified data', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.changeProfileData(name,lastname);
    await profilePage.goto();
    await profilePage.verifyProfileData(name,lastname);
});