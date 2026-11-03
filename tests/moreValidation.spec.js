import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });
test.use({ headless: true });

const URL = "https://rahulshettyacademy.com/AutomationPractice/";

async function showAndHideTextbox(page) {
  const showButton = page.locator("#show-textbox");
  const hideButton = page.locator("#hide-textbox");
  const textbox = page.locator("#displayed-text");

  await expect(showButton).toBeVisible();
  await showButton.click();
  await expect(textbox).toBeVisible();

  await hideButton.click();
  await expect(textbox).toBeHidden();
}

test("more validation", async ({ page }) => {
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await showAndHideTextbox(page);

  page.once("dialog", async (dialog) => await dialog.accept());
  await page.locator("#alertbtn").click();

  page.once("dialog", async (dialog) => await dialog.dismiss());
  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();

  const frameLocator = page.frameLocator("#courses-iframe");
  const lifetimeAccessLink = frameLocator
    .locator("li a[href='lifetime-access']")
    .first();
  await expect(lifetimeAccessLink).toBeVisible();
  await lifetimeAccessLink.click();

  const text = await frameLocator.locator(".text h2").textContent();
  console.log(text);
  console.log(text.split(" ")[1]);
});

test("Screenshot", async ({ page }, testInfo) => {
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  await page.screenshot({
    path: testInfo.outputPath("screenshot.png"),
    animations: "disabled",
    timeout: 30000,
  });
});
