const { test, expect } = require("@playwright/test");

test("browser playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //await page.route("**/*.css", (route) => route.abort());

  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const cartTitles = page.locator(".card-body a");

  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pageTitle = await page.title();
  console.log(pageTitle);

  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();
  // console.log(await cartTitles.first().textContent());
  // console.log(await cartTitles.nth(0).textContent());
  const cartTitleContents = await cartTitles.allTextContents();
  console.log(cartTitleContents);
});

test("UI Basics", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  const qaJobReadyLink = page.locator(
    "[href*='qa-career-accelerator-job-ready']",
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("Learning@830$3mK2");

  // Select DD values
  const dropDown = page.locator("select.form-control");
  dropDown.selectOption("consult");
  await expect(dropDown).toHaveValue("consult");

  // Select radio button
  const userType = page.locator("[value='user']");
  await userType.click();
  await page.locator("#okayBtn").click();
  await expect(page.locator("#myModal")).not.toBeVisible();
  //await expect(userType).toBeChecked();
  //await expect(page.locator("[value='admin']")).not.toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await expect(qaJobReadyLink).toHaveAttribute("class", "blinkingText");

  await signInBtn.click();
});

test("Handle child windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    documentLink.click(),
  ]);
  await expect(newPage.locator(".red")).toBeVisible();
  const text = await newPage.locator(".red").textContent();
  const arraytext = text.split("@");
  const doamain = arraytext[1].split(" ")[0];
  console.log(text);
  console.log(doamain);

  await page.locator("#username").fill(doamain);
  //'textContebt will get only the text within the DOM but 'inputvalue' will get the value of the input field. So we need to use 'inputValue' here.
  console.log(await page.locator("#username").inputValue());
});
