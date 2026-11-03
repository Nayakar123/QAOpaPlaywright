const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../PageObject/LoginPage");

const productName = "ZARA COAT 3";
const email = "girish.nayakar25@gmail.com";

test.skip("browser playwright test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.launcBrowser();
  await loginPage.validLogin(email, "Renuka@123");
  await expect(page.locator(".card-body b").first()).toBeVisible();
  const products = page.locator(".card-body");

  // Getting the Products count
  const productsCount = await products.count();
  for (let i = 0; i < productsCount; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // Click on Add to Cart button
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const productInCart = await page
    .locator(`h3:has-text("${productName}")`)
    .isVisible();
  expect(productInCart).toBeTruthy();

  //Checkout
  await page.locator("text=Checkout").click();
  //Clear CVV
  await page
    .locator("div.field.small")
    .filter({ hasText: "CVV Code" })
    .locator("input")
    .fill("");
  //Fill CVV
  await page
    .locator("div.field.small")
    .filter({ hasText: "CVV Code" })
    .locator("input")
    .fill("123");

  //Clear Name on Card
  await page
    .locator('div.title:has-text("Name on Card")')
    .locator("xpath=following-sibling::input[1]")
    .fill("");

  //Fill Name on Card
  await page
    .locator('div.title:has-text("Name on Card")')
    .locator("xpath=following-sibling::input[1]")
    .fill("Rahul Sheetty");

  //Clear Coupon Code
  await page
    .locator('div.title:has-text("Apply Coupon")')
    .locator("xpath=following-sibling::input[1]")
    .fill("");

  //Fill Coupon Code
  await page
    .locator('div.title:has-text("Apply Coupon")')
    .locator("xpath=following-sibling::input[1]")
    .fill("rahulshettyacademy");

  //Click on Apply Coupon
  await page.getByRole("button", { name: "Apply Coupon", exact: true }).click();
  await expect(page.locator("text=* Coupon Applied")).toBeVisible();

  //Enter Country
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 100 });
  const countryResults = page.locator(".ta-results");
  await countryResults.waitFor();
  const resultsCount = await countryResults.locator("button").count();
  for (let i = 0; i < resultsCount; ++i) {
    const text = await countryResults.locator("button").nth(i).textContent();
    if (text.trim() === "India") {
      await countryResults.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator("label[type='text']")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const order_id = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  // Click on Orders
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator("tbody").waitFor();
  const orderRows = await page.locator("tbody tr");
  for (let i = 0; i < (await orderRows.count()); ++i) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    if (order_id.includes(rowOrderId)) {
      await orderRows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(order_id.includes(orderIdDetails)).toBeTruthy();
});
