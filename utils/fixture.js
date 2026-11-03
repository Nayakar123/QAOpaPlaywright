const base = require("@playwright/test");
const { request: playwrightRequest } = require("@playwright/test");
const { APIUtils } = require("./apiUtils.js");

const loginPayLoad = {
  userEmail: "girish.nayakar25@gmail.com",
  userPassword: "Renuka@123",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

module.exports = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(loginPayLoad.userEmail);
    await page.locator("#userPassword").fill(loginPayLoad.userPassword);
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await use(page);
    await page.close();
  },
  createOrder: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    const response = await apiUtils.createOrder(orderPayLoad);
    await use(response);
    await apiContext.dispose();
  },
});
