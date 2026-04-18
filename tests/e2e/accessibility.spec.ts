import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21aa"];

// Helper: run axe and return violations with helpful output
async function checkA11y(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(AXE_TAGS)
    // Exclude ad slot placeholders — they're dev-only and have no user-facing content
    .exclude(".ad-slot-inner")
    .analyze();
  return results.violations;
}

test.describe("Accessibility — WCAG 2.1 AA", () => {
  test("home page has no violations", async ({ page }) => {
    await page.goto("/");
    // Dismiss cookie banner so it doesn't interfere
    await page.getByRole("button", { name: "Rechazar" }).click();
    const violations = await checkA11y(page);
    expect(
      violations,
      `Violations:\n${violations.map((v) => `${v.id}: ${v.description}\n  → ${v.nodes.map((n) => n.html).join("\n  → ")}`).join("\n\n")}`,
    ).toEqual([]);
  });

  test("article page has no violations", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Rechazar" }).click();
    const articleLink = page
      .locator("article")
      .first()
      .getByRole("link")
      .first();
    await articleLink.click();
    await page.waitForURL(/\/.+\/.+\/.+\//);
    const violations = await checkA11y(page);
    expect(
      violations,
      `Violations:\n${violations.map((v) => `${v.id}: ${v.description}`).join("\n")}`,
    ).toEqual([]);
  });

  test("legal page has no violations", async ({ page }) => {
    await page.goto("/legal/sobre-nosotros/");
    const violations = await checkA11y(page);
    expect(
      violations,
      `Violations:\n${violations.map((v) => `${v.id}: ${v.description}`).join("\n")}`,
    ).toEqual([]);
  });

  test("skip link is present and functional", async ({ page }) => {
    await page.goto("/");
    // Focus skip link with Tab
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skipLink).toBeFocused();
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img:not([alt])");
    await expect(images).toHaveCount(0);
  });
});
