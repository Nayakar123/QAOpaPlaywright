const { expect } = require("@playwright/test");

class CartPage {
  constructor(page, productName) {
    this.productName = productName ? productName.trim() : "";
    this.productsList = page.locator("h3");
    this.checkOutLink = page.locator("text=Checkout");
    this.cvvField = page
      .locator("div.field.small")
      .filter({ hasText: "CVV Code" })
      .locator("input");
    this.nameonField = page
      .locator('div.title:has-text("Name on Card")')
      .locator("xpath=following-sibling::input[1]");
    this.applyCouponField = page
      .locator('div.title:has-text("Apply Coupon")')
      .locator("xpath=following-sibling::input[1]");
    this.applyCouponButton = page.getByRole("button", {
      name: "Apply Coupon",
      exact: true,
    });
    this.couponApplied = page.locator("text=* Coupon Applied");
    this.country = page.locator("[placeholder*='Country']");
    this.countryList = page.locator(".ta-results");
    this.userNameText = page.locator("label[type='text']");
    this.submitAction = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async cartPageValidations(userName) {
    const matchingProduct = this.productsList.filter({
      hasText: new RegExp(this.productName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    });
    await expect(matchingProduct).toBeVisible();

    //Checkout
    await this.checkOutLink.click();
    //Clear CVV
    await this.cvvField.fill("");
    //Fill CVV
    await this.cvvField.fill("123");

    //Clear Name on Card
    await this.nameonField.fill("");

    //Fill Name on Card
    await this.nameonField.fill("Rahul Sheetty");

    //Clear Coupon Code
    await this.applyCouponField.fill("");

    //Fill Coupon Code
    await this.applyCouponField.fill("rahulshettyacademy");

    //Click on Apply Coupon
    await this.applyCouponButton.click();
    await expect(this.couponApplied).toBeVisible();

    //Enter Country
    await this.country.pressSequentially("ind");
    const indiaOption = this.countryList.getByRole("button", {
      name: /India$/,
    });
    await expect(indiaOption).toBeVisible();
    await indiaOption.click();
    await expect(this.userNameText).toHaveText(userName);
    await this.submitAction.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. ",
    );
    const order_id = await this.orderId.textContent();
    return order_id;
  }
}
module.exports = { CartPage };
