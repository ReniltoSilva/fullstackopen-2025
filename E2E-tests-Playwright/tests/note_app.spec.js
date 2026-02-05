const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

/* Command test "test.only(...)" makes playwright to run only that specific test*/

// describe("Note app", () => {
//   beforeEach(async ({ page, request }) => {
//     // await request.post("http://localhost:5173/api/testing/reset");
//     // await request.post("http://localhost:5173/api/users", {
//     await request.post("/api/testing/reset");
//     await request.post("/api/users", {
//       data: {
//         name: "Matti Luukkainen",
//         username: "mluukkai",
//         password: "salainen",
//       },
//     });

//     // await page.goto("http://localhost:5173");
//     await page.goto("/");
//   });

//   test("front page can be opened", async ({ page }) => {
//     // await page.goto("http://localhost:5173");
//     await page.goto("/");

//     const locator = page.getByText("Notes");
//     await expect(locator).toBeVisible();
//     await expect(
//       page.getByText(
//         "Note app, Department of Computer Science, University of Helsinki 2025",
//       ),
//     ).toBeVisible();
//   });

//   test("user can log in", async ({ page }) => {
//     // await page.goto("http://localhost:5173");
//     // await page.goto("/");
//     // await page.getByRole("button", { name: "Login" }).click();
//     // await page.getByLabel("username").fill("mluukkai");
//     // await page.getByLabel("password").fill("salainen");
//     // await page.getByRole("button", { name: "login" }).click();
//     // // await expect(page.getByText("Welcome, Renilto!")).toBeVisible();
//     // await expect(
//     //   page.getByText("Welcome, Matti Luukkainen!"),
//     // ).toBeVisible(); /* If it's in test mode */

//     /* login test done with helper function to avoid duplicaded code */
//     await loginWith(page, "mluukkai", "salainen");

//     await expect(page.getByText("Welcome, Matti Luukkainen!")).toBeVisible();
//   });

//   test("login fails with wrong password", async ({ page }) => {
//     // await page.getByRole("button", { name: "Login" }).click();
//     // await page.getByLabel("username").fill("mluukkai");
//     // await page.getByLabel("password").fill("wrong");
//     // await page.getByRole("button", { name: "login" }).click();
//     /* Page.locator is used to find the element with the css class */

//     await loginWith(page, "mluukkai", "wrong");

//     const errorDiv = page.locator(".error");

//     await expect(errorDiv).toContainText("wrong credentials");
//     await expect(errorDiv).toHaveCSS("border-style", "solid");
//     /* Colors must be defined in Playwright as rgb codes */
//     await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

//     // await expect(page.getByText("wrong credentials")).toBeVisible();
//     await expect(
//       page.getByText("Welcome, Matti Luukkainen!"),
//     ).not.toBeVisible();
//   });

//   describe("when logged in", () => {
//     beforeEach(async ({ page }) => {
//       // await page.goto("http://localhost:5173");
//       // await page.goto("/");

//       // await page.getByRole("button", { name: "Login" }).click();
//       // await page.getByLabel("username").fill("mluukkai");
//       // await page.getByLabel("password").fill("salainen");
//       // await page.getByRole("button", { name: "login" }).click();

//       /* This is a helper function created to avoid duplicated code */
//       await loginWith(page, "mluukkai", "salainen");
//     });

//     test("a new note can be created", async ({ page }) => {
//       // await page.getByRole("button", { name: "New note" }).click();
//       // await page.getByLabel("content").fill("a note created by playwright");
//       // await page.getByRole("button", { name: "save" }).click();
//       /* Test fails because there is duplicated notes,
//       this will be solved in the next chapter */
//       //   await expect(
//       //     page.getByText("a note created by playwright"),
//       //   ).toBeVisible();
//       // await createNote(page, "a note created by playwright");
//       // await expect(
//       //   page.getByText("a note created by playwright"),
//       // ).toBeVisible();
//     });

//     // describe("and a note exists", () => {
//     // beforeEach(async ({ page }) => {
//     // await page.getByRole("button", { name: "New note" }).click();
//     // await page.getByRole("textbox").fill("another note by playwright");
//     // await page.getByRole("button", { name: "save" }).click();
//     // await createNote(page, "another note by playwright");
//     // });
//     // test("importance can be changed", async ({ page }) => {
//     //   await page.getByRole("button", { name: "make not important" }).click();
//     //   await expect(page.getByText("make important")).toBeVisible();
//     // });
//     // });

//     describe("and several notes exists", () => {
//       beforeEach(async ({ page }) => {
//         await createNote(page, "first note");
//         await createNote(page, "second note");
//         await createNote(page, "third note");
//       });

//       test("one of those can be made nonImportant", async ({ page }) => {
//         // const otherNoteElement = page.getByText("first note");
//         // await otherNoteElement
//         //   .getByRole("button", { name: "make not important" })
//         //   .click();

//         // await expect(
//         //   otherNoteElement.getByText("make important"),
//         // ).toBeVisible();
//         await page.pause();
//         /* It can also be written without variables */
//         // page
//         //   .getByText("first note")
//         //   .getByRole("button", { name: "make not important" })
//         //   .click();
//         // await expect(
//         //   page.getByText("first note").getByText("make important"),
//         // ).toBeVisible();

//         const otherNoteText = page.getByText("second note");
//         const otherNoteElement = otherNoteText.locator("..");

//         await otherNoteElement
//           .getByRole("button", { name: "make not important" })
//           .click();
//         await expect(
//           otherNoteElement.getByText("make important"),
//         ).toBeVisible();
//       });
//     });
//   });
// });
