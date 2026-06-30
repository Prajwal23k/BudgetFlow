import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // Tailwind plugin removed — it injected preflight CSS (border: 0 solid)
    // on every element which caused white borders across the entire app.
    // All components use inline styles so Tailwind utilities are not needed.
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});