# crush.news

Medio de comunicación digital hispanohablante. Stack: Qwik + TypeScript + Tailwind CSS.

## Quick start

```bash
pnpm install
pnpm dev
```

## Scripts

| Comando              | Descripción                  |
| -------------------- | ---------------------------- |
| `pnpm dev`           | Servidor de desarrollo (SSR) |
| `pnpm build`         | Build de producción          |
| `pnpm preview`       | Preview del build            |
| `pnpm lint`          | ESLint                       |
| `pnpm typecheck`     | TypeScript sin emitir        |
| `pnpm test`          | Vitest (una vez)             |
| `pnpm test:watch`    | Vitest en modo watch         |
| `pnpm test:coverage` | Cobertura de tests           |
| `pnpm test:e2e`      | Playwright E2E               |
| `pnpm fmt`           | Prettier                     |

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

## Fases de construcción

Ver el CLAUDE.md del proyecto para el plan completo por fases.
