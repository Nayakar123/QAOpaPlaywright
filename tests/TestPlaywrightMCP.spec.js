const { test, expect } = require("@playwright/test");
const dataSet = require("../utils/clientapp_POM_TestData.json");

const productName = "ZARA COAT 3";
const testData = dataSet.find((data) => data.productName === productName);

if (!testData) {
  throw new Error(`Test data for "${productName}" was not found.`);
}

test("validates ZARA COAT 3 on the dashboard", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(testData.userName);
  await page.locator("#userPassword").fill(testData.password);
  await page.locator("#login").click();

  await expect(
    page.getByRole("heading", { name: productName, exact: true }),
  ).toBeVisible();
});
