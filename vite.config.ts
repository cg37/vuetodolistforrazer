import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: "./",
  build: {
    outDir: "dist", // 输出目录
    assetsDir: "./", // 静态资源目录
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html") // 确保正确解析路径
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3031
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
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
