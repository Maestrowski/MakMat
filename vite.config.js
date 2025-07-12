import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && screenGraphPlugin()],
  publicDir: "./static",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
}));

// Vite automatically loads .env, .env.local, etc. No extra config needed for env variables.
