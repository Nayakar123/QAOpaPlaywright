const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { OrderPage } = require("./OrderPage");
class POManager {
  constructor(page, productName) {
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
