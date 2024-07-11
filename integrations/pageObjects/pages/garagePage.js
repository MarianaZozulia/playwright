const { expect } = require('@playwright/test');
const BasePage = require('../basePage');

class GaragePage extends BasePage {
  constructor(page) {
    super(page);
    this.addCarButton = page.locator('button.btn.btn-primary');
  }

  async clickSomeElement() {
    await this.someElement.click();
  }

  async isElementVisible(element) {
    return await element.isVisible();
  }
}

module.exports = GaragePage;

