import { test, expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  products: Locator;
  productText: Locator;
  cart: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async seachProductsAndAddToCart(productName: String) {
    await this.productText.first().waitFor();

    // Getting the Products count
    const productsCount = await this.products.count();
    for (let i = 0; i < productsCount; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        // Click on Add to Cart button
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
