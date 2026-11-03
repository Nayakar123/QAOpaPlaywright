import { test, expect } from "@playwright/test";

test("practice form and special locators", async ({ page }) => {
  //Launch the application
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //Fill Username, Email and Password
  await page.locator('form input[name="name"]').fill("Girish Nayakar");
  await page.locator("input[name='email']").fill("girish.nayakar@gmail.com");
  await page.locator("#exampleInputPassword1").fill("Test@123");

  // Select the checkbox
  await page.getByLabel("Check me out if you Love IceCreams!").check();

  // Select the Gender from dropdown
  await page.locator("#exampleFormControlSelect1").selectOption("Male");

  //Select employment status radio button
  await page.getByLabel("Employed").check();

  //Enter date of birth
  await page.locator("[type='date']").fill("1990-01-01");

  //Click on submit button
  await page.getByRole("button", { name: "Submit" }).click();

  //Verify the success message
  await expect(page.locator(".alert-success")).toContainText(
    "Success! The Form has been submitted successfully!",
  );
});

test("Timeout Test", async ({ page }) => {
  test.setTimeout(9000); // Set the timeout for this test to 9 seconds
  const slowExpect = expect.configure({ timeout: 60000 }); // Set the timeout for expect to 9 seconds

  //Launch the application
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //Fill Username, Email and Password
  await page.locator('form input[name="name"]').fill("Girish Nayakar");
  await page.locator("input[name='email']").fill("girish.nayakar@gmail.com");
  await page.locator("#exampleInputPassword1").fill("Test@123");

  // Select the checkbox
  await page.getByLabel("Check me out if you Love IceCreams!").check();

  // Select the Gender from dropdown
  await page.locator("#exampleFormControlSelect1").selectOption("Male");

  //Select employment status radio button
  await page.getByLabel("Employed").check();

  //Enter date of birth
  await page.locator("[type='date']").fill("1990-01-01");

  //Click on submit button
  await page.locator("[type='submit']").click();

  //Verify the success message
  await slowExpect(page.locator(".alert-success")).toContainText(
    "Success! The Form has been submitted successfully!",
  );

  //Verify the success message with expect timeout
  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible();

  // Timeout at the expect level to wait for the success message to appear
  await expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible();
});
