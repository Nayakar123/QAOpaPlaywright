class DashboardPage {
  constructor(page) {
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async seachProductsAndAddToCart(productName) {
    await this.productText.first().waitFor();

    const normalizedProductName = productName.trim().toLowerCase();
    const productsCount = await this.products.count();

    for (let i = 0; i < productsCount; ++i) {
      const productText = (await this.products.nth(i).locator("b").textContent())
        ?.trim()
        .toLowerCase();

      if (productText === normalizedProductName) {
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
