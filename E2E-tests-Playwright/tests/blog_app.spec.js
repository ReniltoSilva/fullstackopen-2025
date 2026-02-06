const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  // beforeEach(async ({ page, request }) => {
  //   await request.post("http://localhost:3001/api/testing/reset");
  //   await request.post("http://localhost:3001/api/users", {
  //     data: {
  //       username: "userA",
  //       name: "User A",
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
    //   await page.getByLabel("Username:").fill("userA");
    //   await page.getByLabel("Password:").fill("0000");
    //   await page.getByRole("button", { name: "Login" }).click();

    //   await expect(
    //     page.getByText("Invalid username or password"),
    //   ).toBeVisible();
    // });

    // test("Succeeds with correct credentials", async ({ page }) => {
    //   await page.getByRole("button", { name: "Login" }).click();
    //   await page.getByLabel("Username:").fill("userA");
    //   await page.getByLabel("Password:").fill("123");
    //   await page.getByRole("button", { name: "Login" }).click();

    //   await expect(page.getByText("Welcome, User A!")).toBeVisible();
    // });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        // await page.getByRole("button", { name: "Login" }).click();
        // await page.getByLabel("Username:").fill("new User");
        // await page.getByLabel("Password:").fill("123");
        // await page.getByRole("button", { name: "Login" }).click();
        // await expect(page.getByText("Welcome, Junior!")).toBeVisible();

        await page.goto("http://localhost:5173");
      });

      // test("a new blog can be created", async ({ page }) => {
      // await page.getByRole("button", { name: "New Blog" }).click();
      // await page.getByLabel("Title:").fill("");
      // await page.getByLabel("Author:").fill("Junior");
      // await page.getByLabel("Url:").fill("wwww");
      // await page.getByRole("button", { name: "Create" }).click();
      // await expect(page.getByText("Title: New blog created")).toBeVisible();
      // });

      // test("make sure the blog can be liked", async ({ page }) => {
      // await page.getByRole("button", { name: "View" }).click();
      // await page.getByRole("button", { name: "like" }).click();
      // await expect(page.getByText("Likes: 0")).not.toBeVisible();
      // });

      // test("make sure to delete a blog", async ({ page }) => {
      // await page.getByRole("button", { name: "View" }).click();
      /* dialog.accept() method has to come before the action.
        In this case, before clicking the Delete button  */
      // page.on("dialog", (dialog) => dialog.accept());
      // await page.getByRole("button", { name: "Delete" }).click();
      // });

      // test("delete button can only be seen by user who created it", async({
      //   page,
      // }) => {
      //   await page.getByRole("button", { name: "View" }).click();
      //   await expect(page.getByRole("button", { name: "like" })).toBeVisible();
      //   await expect(
      //     page.getByRole("button", { name: "Delete" }),
      //   ).not.toBeVisible();
      //   await expect(page.getByRole("button", { name: "Hide" })).toBeVisible();
      // }));

      test("blogs are in order of most liked ones", async ({ page }) => {
        const viewButtons = await page
          .getByRole("button", { name: "View" })
          .all();

        const likes = [];

        for (const button of viewButtons) {
          await button.click();

          const likeElement = await page.locator(".likes").last();
          const likeText = await likeElement.textContent();

          const likeCount = parseInt(likeText.match(/\d+/)[0]);
          likes.push(likeCount);
        }

        for (let i = 0; i < likes.length - 1; i++) {
          expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
        }
      });
    });
  });
});
