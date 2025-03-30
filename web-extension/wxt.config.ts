import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Omni",
  },
  browser: "firefox",
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
