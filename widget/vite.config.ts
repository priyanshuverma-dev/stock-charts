import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "bundle.js",
        chunkFileNames: "bundle.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "bundle.css";
          }
          return "[name].[ext]";
        },
      },
    },
    // Make sure to generate a single file with CSS included in JS
    cssCodeSplit: false,
  },
});
