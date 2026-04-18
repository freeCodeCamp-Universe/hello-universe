import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        config: resolve(__dirname, "config.html"),
        template: resolve(__dirname, "about.html"),
      },
    },
  },
});
