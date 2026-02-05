import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "./.auth/user.json");

setup("authenticate", async ({ page, request }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("http://localhost:5173");

  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Username:").fill("new User");
  await page.getByLabel("Password:").fill("123");
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //   await page.waitForURL("https://github.com/");

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText("Welcome, Junior!")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
