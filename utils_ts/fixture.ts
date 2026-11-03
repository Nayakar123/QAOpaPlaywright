const base: typeof import("@playwright/test") = require("@playwright/test");
const {
  request: playwrightRequest,
}: {
  request: import("@playwright/test").APIRequest;
} = require("@playwright/test");
const { APIUtils } = require("./apiUtils.js");

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderItem {
  country: string;
  productOrderedId: string;
}

interface OrderPayload {
  orders: OrderItem[];
}

const loginPayLoad: LoginPayload = {
  userEmail: "girish.nayakar25@gmail.com",
  userPassword: "Renuka@123",
};
const orderPayLoad: OrderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

module.exports = base.test.extend({
  authenticatedPage: async (
    { browser }: { browser: import("@playwright/test").Browser },
    use: (page: import("@playwright/test").Page) => Promise<void>,
  ) => {
    const page: import("@playwright/test").Page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(loginPayLoad.userEmail);
    await page.locator("#userPassword").fill(loginPayLoad.userPassword);
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await use(page);
    await page.close();
  },
  createOrder: async (
    {}: Record<string, never>,
    use: (response: any) => Promise<void>,
  ) => {
    const apiContext: import("@playwright/test").APIRequestContext =
      await playwrightRequest.newContext();
    const apiUtils: { createOrder: (payload: OrderPayload) => Promise<any> } =
      new APIUtils(apiContext, loginPayLoad);
    const response: any = await apiUtils.createOrder(orderPayLoad);
    await use(response);
    await apiContext.dispose();
  },
});
