const { test } = require("@playwright/test");
const { POManager } = require("../PageObject/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/clientapp_POM_TestData.json")),
);

//E2E Test Integrated with CICD Pipeline new changes
for (const data of dataSet) {
  test(`@Web Client App E2E Validation for ${data.productName}`, async ({
    page,
  }) => {
    const poManager = new POManager(page, data.productName);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const orderPage = poManager.getOrderPage();

    await loginPage.launcBrowser();
    await loginPage.validLogin(data.userName, data.password);
    await dashboardPage.seachProductsAndAddToCart(data.productName);
    await dashboardPage.navigateToCart();
    const order_id = await cartPage.cartPageValidations(data.userName);
    await orderPage.orderPageValidation(order_id);
  });
}
