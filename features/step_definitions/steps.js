const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { POManager } = require("../../PageObject/POManager");

function getPoManager(world, productName) {
  return new POManager(world.page, productName);
}

Given(
  "login to the Ecommerce application with the {string} and {string}",
  async function (userName, password) {
    this.userName = userName;
    this.password = password;

    const loginPage = getPoManager(this).getLoginPage();
    await loginPage.launcBrowser();
    await loginPage.validLogin(userName, password);
  },
);

When("Add {string} to the cart", async function (productName) {
  this.productName = productName;

  const dashboardPage = getPoManager(this, productName).getDashboardPage();
  await dashboardPage.seachProductsAndAddToCart(productName);
});

Then(
  "validate that {string} displayed to the cart",
  async function (productName) {
    this.productName = productName;

    const dashboardPage = getPoManager(this, productName).getDashboardPage();
    await dashboardPage.navigateToCart();
  },
);

When("valid details were added and placed the order", async function () {
  const cartPage = getPoManager(this, this.productName).getCartPage();
  this.orderId = await cartPage.cartPageValidations(this.userName);
});

Then(
  "verify order details present in the order history page",
  async function () {
    const orderPage = getPoManager(this, this.productName).getOrderPage();
    await orderPage.orderPageValidation(this.orderId);
  },
);

Given(
  "login to the Ecommerce2 application with the {string} and {string}",
  async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#signInBtn").click();
  },
);

Then("Verify the error message displayed", async function () {
  await expect(this.page.locator('[style*="block"]')).toContainText(
    /Incorrect|Empty username\/password\./,
  );
});
