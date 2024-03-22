import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
    },
    minify: false,
    rollupOptions:{
      output:{
        assetFileNames: "[name].js",
        chunkFileNames: '[name].js'
      }
    }
  },
});
