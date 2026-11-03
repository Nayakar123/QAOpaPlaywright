const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");
const loginPayLoad = {
  userEmail: "girish.nayakar25@gmail.com",
  userPassword: "Renuka@123",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};
const fakePayLoad = { data: [], orders: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("@API api test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "girish.nayakar25@gmail.com";

  // Click on Orders
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        body: JSON.stringify(fakePayLoad),
        headers: {
          ...response.headers(),
          "content-type": "application/json",
        },
      });
    },
  );
  await page.locator('button[routerlink*="myorders"]').click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  await expect(page.locator("text=No Orders")).toBeVisible();
  console.log(await page.locator("text=No Orders").textContent());
});
