const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "new User",
        name: "Junior",
        password: "123",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    const usernameInput = page.getByLabel("Username:");
    const passwordInput = page.getByLabel("Password:");

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("Succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByLabel("Username:").fill("new User");
      await page.getByLabel("Password:").fill("123");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("Welcome, Junior!")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByLabel("Username:").fill("new User");
      await page.getByLabel("Password:").fill("0000");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText("Invalid username or password"),
      ).toBeVisible();
    });
  });
});
