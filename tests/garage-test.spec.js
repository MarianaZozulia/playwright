const { test } = require('./fixtures');
const { expect } = require('@playwright/test');

test('Test using fixturedGaragePage fixture', async ({ fixturedGaragePage }) => {

  const isButtonVisible = await fixturedGaragePage.isElementVisible(fixturedGaragePage.addCarButton);
  expect(isButtonVisible).toBe(true);
});
