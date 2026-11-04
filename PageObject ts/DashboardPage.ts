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

  async seachProductsAndAddToCart(productName: string) {
    await this.productText.first().waitFor();

    const normalizedProductName = productName.trim().toLowerCase();
    const productsCount = await this.products.count();
    for (let i = 0; i < productsCount; ++i) {
      const displayedProductName = (
        await this.products.nth(i).locator("b").textContent()
      )
        ?.trim()
        .toLowerCase();

      if (displayedProductName === normalizedProductName) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        return;
      }
    }

    throw new Error(`Product "${productName}" was not found on the dashboard.`);
  }
  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
