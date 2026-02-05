const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  // beforeEach(async ({ page, request }) => {
  //   await request.post("http://localhost:3001/api/testing/reset");
  //   await request.post("http://localhost:3001/api/users", {
  //     data: {
  //       username: "new User",
  //       name: "Junior",
  //       password: "123",
  //     },
  //   });

  //   await page.goto("http://localhost:5173");
  // });

  // test("login form is shown", async ({ page }) => {
  //   await page.goto("http://localhost:5173");

  //   await page.getByRole("button", { name: "Login" }).click();

  //   await expect(page.getByLabel("Username:")).toBeVisible();
  //   await expect(page.getByLabel("Password:")).toBeVisible();
  // });

  describe("Login", () => {
    // test("fails with wrong credentials", async ({ page }) => {
    //   await page.getByRole("button", { name: "Login" }).click();
    //   await page.getByLabel("Username:").fill("new User");
    //   await page.getByLabel("Password:").fill("0000");
    //   await page.getByRole("button", { name: "Login" }).click();

    //   await expect(
    //     page.getByText("Invalid username or password"),
    //   ).toBeVisible();
    // });

    // test("Succeeds with correct credentials", async ({ page }) => {
    //   await page.getByRole("button", { name: "Login" }).click();
    //   await page.getByLabel("Username:").fill("new User");
    //   await page.getByLabel("Password:").fill("123");
    //   await page.getByRole("button", { name: "Login" }).click();

    //   await expect(page.getByText("Welcome, Junior!")).toBeVisible();
    // });

    describe("When logged in", () => {
      // beforeEach(async ({ page }) => {
      //   await page.getByRole("button", { name: "Login" }).click();
      //   await page.getByLabel("Username:").fill("new User");
      //   await page.getByLabel("Password:").fill("123");
      //   await page.getByRole("button", { name: "Login" }).click();
      //   await expect(page.getByText("Welcome, Junior!")).toBeVisible();
      // });

      test("a new blog can be created", async ({ page }) => {
        await page.goto("http://localhost:5173");

        await page.getByRole("button", { name: "New Blog" }).click();

        await page.getByLabel("Title:").fill("New blog created");
        await page.getByLabel("Author:").fill("Junior");
        await page.getByLabel("Url:").fill("wwww");

        await page.getByRole("button", { name: "Create" }).click();

        await expect(page.getByText("Title: New blog created")).toBeVisible();
      });
    });
  });
});
