import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);
// Static assets live in ../dist relative to the compiled server/
const DIST = join(__dir, "..", "dist");
const PORT = parseInt(process.env["PORT"] ?? "3000", 10);

const app = express();

// ── Security headers ───────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  // HSTS — only when request comes in over HTTPS (behind a reverse proxy)
  const proto = (req.headers["x-forwarded-proto"] as string | undefined) ?? "";
  if (proto === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  // CSP — unsafe-inline required for Qwik resumability scripts.
  // Ad domains pre-listed; activate when AdSense is approved (Phase 9).
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      [
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "https://pagead2.googlesyndication.com",
        "https://partner.googleadservices.com",
        "https://www.googletagservices.com",
        "https://googleads.g.doubleclick.net",
        "https://adservice.google.com",
      ].join(" "),
      "style-src 'self' 'unsafe-inline'",
      "img-src * data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );
  next();
});

// ── Static assets ──────────────────────────────────────────────────────────
// Hashed build assets — immutable, 1 year
app.use(
  "/build",
  express.static(join(DIST, "build"), {
    immutable: true,
    maxAge: "1y",
  }),
);
// Other public files — 1 hour
app.use(express.static(DIST, { maxAge: "1h" }));

// ── QwikCity SSR ──────────────────────────────────────────────────────────
const { router, notFound, staticFile } = createQwikCity({ render, qwikCityPlan });
// Static assets served by QwikCity (public folder etc.)
app.use(staticFile);
// SSR routing
app.use(router);
// 404 fallback
app.use(notFound);

app.listen(PORT, () => {
  console.log(`crush.news listening on http://localhost:${PORT}`);
});
