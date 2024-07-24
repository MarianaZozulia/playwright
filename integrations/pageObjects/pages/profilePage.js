const BasePage = require('../basePage');
const { expect } = require('@playwright/test');

class ProfilePage extends BasePage{
    constructor(page){
        super(page);
        this.fullNameLocator = page.locator('p.display-4.profile_name');

    }

    async goto() {
        await this.page.goto('/panel/profile');
        
    }

    async changeProfileData(name, lastname) {
        await this.page.route('/api/users/profile', async (route) => {
            const response = await this.page.request.fetch(route.request());
            const data = await response.json();
            this.userId = data.data.userId;
            route.fulfill({
                status: 200, 
                contentType: 'application/json',
                body: JSON.stringify({
                status: 'ok',
                data: {
                    userId: this.userId,
                    photoFilename: 'default-user.png',
                    name: name,
                    lastName: lastname }
                })
            });
        });
    }
    
    async verifyProfileData(name, lastname) {
        await expect(this.fullNameLocator).toHaveText(`${name} ${lastname}`);
    }
}

module.exports=ProfilePage;