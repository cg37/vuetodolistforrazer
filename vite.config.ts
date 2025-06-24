import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), svgLoader()],
  server: {
    host: "0.0.0.0",
    port: 3031
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    extensions: [".js", ".ts", ".vue", ".json"] // 支持的文件扩展名
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin"
        ]
      }
    }
  }
});
