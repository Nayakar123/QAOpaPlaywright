const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");
const loginPayLoad = {
  userEmail: "girish.nayakar25@gmail.com",
  userPassword: "Renuka@123",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("api test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "girish.nayakar25@gmail.com";

  // Click on Orders
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator("tbody").waitFor();
  const orderRows = await page.locator("tbody tr");
  for (let i = 0; i < (await orderRows.count()); ++i) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await orderRows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
