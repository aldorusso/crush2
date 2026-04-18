import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodeServerAdapter } from "@builder.io/qwik-city/adapters/node-server/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => ({
  plugins: [
    tailwindcss(),
    qwikCity(),
    qwikVite(),
    tsconfigPaths({ root: "../.." }),
    nodeServerAdapter({ name: "express" }),
  ],
  build: {
    ssr: true,
    outDir: "server",
    rollupOptions: {
      input: ["src/entry.express.tsx", "src/entry.ssr.tsx"],
    },
  },
  ssr: {
    target: "node",
    format: "esm",
  },
}));
