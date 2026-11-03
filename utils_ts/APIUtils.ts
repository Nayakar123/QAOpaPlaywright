import { test, expect } from "@playwright/test";

export class APIUtils {
  apiContext: any;
  loginPayLoad: string;
  token!: string;

  constructor(apiContext: any, loginPayLoad: string) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayLoad },
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    this.token = token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayLoad: string) {
    //Order details API
    let response = { token: String, orderId: String };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );

    expect(orderResponse.ok()).toBeTruthy();

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);

    const orderId = orderResponseJson?.orders?.[0];
    if (!orderId) {
      throw new Error(
        `Order creation failed: ${JSON.stringify(orderResponseJson)}`,
      );
    }

    response.orderId = orderId;
    return response;
  }
}
module.exports = { APIUtils };
