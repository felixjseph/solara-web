import { expect, test } from "@playwright/test";

test("homepage has working anchors, direct contact links, and no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Reliable solar");
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(page.locator('a[href*="facebook.com"]').first()).toBeVisible();

  await page.getByRole("link", { name: "Explore Solar Solutions" }).click();
  await expect(page).toHaveURL(/#solutions$/);
  await expect(page.locator("#solutions")).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasOverflow).toBe(false);
});

test("FAQ can be operated from the keyboard", async ({ page }) => {
  await page.goto("/#faq");
  const summary = page.locator("#faq summary").nth(1);
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");
});

test("assessment form reports errors and preserves data when email delivery is unavailable", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: /request my free assessment/i }).click();
  await expect(page.getByText(/check the highlighted fields/i)).toBeVisible();

  await page.getByLabel(/Full name/).fill("Ana Santos");
  await page.getByLabel(/Mobile number/).fill("+63 917 123 4567");
  await page.getByLabel(/Cebu city or municipality/).fill("Cebu City");
  await page.getByLabel(/Property type/).selectOption("Residential");
  await page.getByLabel(/Average monthly electricity bill/).selectOption("₱5,000–₱15,000");
  await page.getByLabel(/Preferred contact method/).selectOption("Call");
  await page.getByLabel(/I agree that Solara/).check();
  await page.getByRole("button", { name: /request my free assessment/i }).click();

  await expect(page.getByText("Request not sent")).toBeVisible();
  await expect(page.getByLabel(/Full name/)).toHaveValue("Ana Santos");
  await expect(page.getByText(/call, email, or message Solara/i)).toBeVisible();
});

test("privacy route is linked and complete", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1, name: "Privacy notice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Information collected" })).toBeVisible();
  await expect(page.getByRole("link", { name: /return to the assessment form/i })).toHaveAttribute("href", "/#contact");
});
