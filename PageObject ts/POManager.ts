//const { LoginPage } = require("./LoginPage");
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrderPage } from "./OrderPage";
import { Page } from "@playwright/test";

export class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  orderPage: OrderPage;
  page: Page;
  constructor(page: Page, productName: any) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page, productName);
    this.orderPage = new OrderPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderPage() {
    return this.orderPage;
  }
}
module.exports = { POManager };
