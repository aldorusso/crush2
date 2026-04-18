import { test, expect } from "@playwright/test";

test.describe("Article page", () => {
  // Navigate to first article from home
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const articleLink = page
      .locator("article")
      .first()
      .getByRole("link")
      .first();
    await articleLink.click();
    await page.waitForURL(/\/.+\/.+\/.+\//);
  });

  test("renders article title as h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("renders hero image with width and height", async ({ page }) => {
    const img = page.locator("figure img").first();
    await expect(img).toBeVisible();
    const width = await img.getAttribute("width");
    const height = await img.getAttribute("height");
    expect(parseInt(width ?? "0")).toBeGreaterThan(0);
    expect(parseInt(height ?? "0")).toBeGreaterThan(0);
  });

  test("has Article JSON-LD schema", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasArticle = scripts.some((s) => s.includes('"Article"'));
    expect(hasArticle).toBe(true);
  });

  test("has BreadcrumbList JSON-LD", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasBreadcrumb = scripts.some((s) => s.includes('"BreadcrumbList"'));
    expect(hasBreadcrumb).toBe(true);
  });

  test("breadcrumbs are visible and link home", async ({ page }) => {
    const homeLink = page.getByRole("link", { name: "Inicio" });
    await expect(homeLink.first()).toBeVisible();
  });

  test("ad slots reserve space (anti-CLS)", async ({ page }) => {
    const adSlots = page.locator(".ad-slot");
    const count = await adSlots.count();
    // At least the in-article slots should be present
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < Math.min(count, 3); i++) {
      const slot = adSlots.nth(i);
      const box = await slot.boundingBox();
      // Each slot must have reserved height (anti-CLS)
      expect(box?.height ?? 0).toBeGreaterThan(0);
    }
  });

  test("related articles section is present", async ({ page }) => {
    const related = page.locator("article");
    await expect(related.first()).toBeVisible();
  });

  test("tags link to tag pages", async ({ page }) => {
    const tagLinks = page.locator('a[href^="/tag/"]');
    const count = await tagLinks.count();
    if (count > 0) {
      await expect(tagLinks.first()).toBeVisible();
    }
  });
});
