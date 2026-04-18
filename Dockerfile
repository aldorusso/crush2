FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable pnpm

# ── Install all deps (including dev) for build ─────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build client + server ──────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ── Lean production image ──────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Install only production runtime deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
# Content dir is read from fs at runtime
COPY --from=builder /app/content ./content

EXPOSE 3000
CMD ["node", "server/entry.express.js"]
