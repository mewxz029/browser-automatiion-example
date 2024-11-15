import {
  expect,
  test,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  });

  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await page.pause();
  await context.close();
  await browser.close();
});

test("complete browser automation challenges", async () => {
  await page.goto("https://browser-automation-challenges-demo.netlify.app/");

  // Start Challenge
  await page.getByText("Start Challenge").click();

  // Challenge 1
  const uuidText = await page.locator("#uuid").innerText();
  await page.getByPlaceholder("Type the UUID here").fill(uuidText);

  // Challenge 2
  const challengeCheckboxes = await page.getByRole("checkbox").all();

  for (const checkbox of challengeCheckboxes) {
    await checkbox.check();
  }

  // Challenge 3
  for (let i = 0; i < 10; i++) {
    await page.getByText("Click me").click();
  }

  const isCompleted = await page.getByText("Challenge Completed!").isVisible();
  expect(isCompleted).toBeTruthy();
});
