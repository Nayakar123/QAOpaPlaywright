const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

setDefaultTimeout(120 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.context = context;
  this.page = await this.context.newPage();
});

After(async function () {
  try {
    if (this.context) {
      await this.context.close();
    }
  } finally {
    if (this.browser) {
      await this.browser.close();
    }
  }
});
