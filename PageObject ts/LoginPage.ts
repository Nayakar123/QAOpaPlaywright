import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  userName: Locator;
  password: Locator;
  signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signInButton = page.locator("#login");
  }

  async launcBrowser() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(userName: string, password: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
