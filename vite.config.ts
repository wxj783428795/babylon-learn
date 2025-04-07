import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    external: ["@babylonjs/inspector"], // 将@babylonjs/inspector标记为外部依赖
    // noExternal: true, // 完全禁用SSR
  },
});
