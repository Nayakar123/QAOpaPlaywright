import { test, expect } from "@playwright/test";
import { POManager } from "../PageObject ts/POManager";
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/clientapp_POM_TestData.json")),
);

for (const data of dataSet) {
  test(`Client App E2E Validation for ${data.productName}`, async ({
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
