import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/crush\.news/i);
  });

  test("shows featured articles", async ({ page }) => {
    await page.goto("/");
    const articles = page.locator("article");
    await expect(articles.first()).toBeVisible();
    await expect(articles).toHaveCount({ minimum: 3 });
  });

  test("header navigation links are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "crush.news" })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Navegación principal" }).first();
    await expect(nav).toBeVisible();
  });

  test("cookie banner appears on first visit", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Aviso de cookies" });
    await expect(banner).toBeVisible();
  });

  test("cookie banner disappears after accepting", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Aceptar todo" }).click();
    const banner = page.getByRole("dialog", { name: "Aviso de cookies" });
    await expect(banner).not.toBeVisible();
  });

  test("cookie banner disappears after rejecting", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Rechazar" }).click();
    const banner = page.getByRole("dialog", { name: "Aviso de cookies" });
    await expect(banner).not.toBeVisible();
  });

  test("has WebSite JSON-LD in head", async ({ page }) => {
    await page.goto("/");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasWebsite = scripts.some((s) => s.includes('"WebSite"'));
    expect(hasWebsite).toBe(true);
  });

  test("category section links navigate correctly", async ({ page }) => {
    await page.goto("/");
    const catLink = page.getByRole("link", { name: "Tecnología" }).first();
    await catLink.click();
    await expect(page).toHaveURL(/\/tecnologia\//);
  });
});
