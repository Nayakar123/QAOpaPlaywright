const { test, expect } = require("@playwright/test");

test("browser playwright test", async ({ page }) => {
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "girish.nayakar25@gmail.com";
  const password = "Renuka@123";

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();

  // // Getting the Products count
  // const productsCount = await products.count();
  // for (let i = 0; i < productsCount; ++i) {
  //   if ((await products.nth(i).locator("b").textContent()) === productName) {
  //     // Click on Add to Cart button
  //     await products.nth(i).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }
  // await page.locator("[routerlink*='cart']").click();
  // await page.locator("div li").first().waitFor();
  // const productInCart = await page
  //   .locator(`h3:has-text("${productName}")`)
  //   .isVisible();
  // expect(productInCart).toBeTruthy();

  //Checkout
  await page.getByRole("button", { name: "Checkout" }).click();

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
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  const indiaOption = page
    .locator(".ta-results")
    .getByRole("button", { name: /India$/ });
  await expect(indiaOption).toBeVisible();
  await indiaOption.click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
