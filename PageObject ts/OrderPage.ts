import { test, expect, Locator, Page } from "@playwright/test";

export class OrderPage {
  page: Page;
  orderPageLink: Locator;
  orders: Locator;
  orderRow: Locator;
  orderDetails: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderPageLink = page.locator('button[routerlink*="myorders"]');
    this.orders = page.locator("tbody");
    this.orderRow = page.locator("tbody tr");
    this.orderDetails = page.locator(".col-text");
  }

  async orderPageValidation(orderId: any) {
    const normalizedOrderId = orderId.replace(/\|/g, "").trim();
    await this.orderPageLink.click();
    await expect(this.orders).toBeVisible();
    const matchingOrder = this.orderRow.filter({
      hasText: normalizedOrderId,
    });
    await expect(matchingOrder).toHaveCount(1);
    await matchingOrder.locator("button").first().click();
    await expect(this.orderDetails).toContainText(normalizedOrderId);
  }
}
module.exports = { OrderPage };
