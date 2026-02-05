const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByLabel("Username:").fill("new User");
    await page.getByLabel("Password:").fill("123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Welcome, Renilto!")).toBeVisible();
  });
});
