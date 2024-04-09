import { defineConfig } from "vite";
//@ts-ignore
import path from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";

//@ts-ignore
const resolve = (url) => path.resolve(__dirname, url);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": resolve("./src/components"),
      "@server": resolve("./src/server"),
      "@pages": resolve("./src/pages"),
      "@language": resolve("./src/language"),
      "@hooks": resolve("./src/hooks"),
      "@theme": resolve("./src/theme"),
      "@layout": resolve("./src/layout"),
      "@stores": resolve("./src/stores"),
      "@utils": resolve("./src/utils"),
      "@config": resolve("./src/config"),
      "@less": resolve("./src/less"),
      "@images": resolve("./src/assets/images"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 省略扩展名
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    vitePluginImp({
      libList: [
        {
          libName: "@icon-park/react",
          libDirectory: "es/icons",
          camel2DashComponentName: false,
        },
        {
          libName: "lodash",
          libDirectory: "",
          camel2DashComponentName: false,
        },
        // {
        //   libName: '@douyinfe/semi-ui',
        // },
      ],
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:5]",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 javascript
        javascriptEnabled: true,
      },
    },
  },
  // 入口
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "editorAssets/js/[name]-[hash].js",
        entryFileNames: "editorAssets/js/[name]-[hash].js",
        assetFileNames: "editorAssets/[ext]/[name]-[hash].[ext]",
      },
      input: {
        main: resolve("index.html"),
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  base: "/", // 公共基础路径
  server: {
    host: "0.0.0.0",
    port: 3004,
    proxy: {
      // 微信二维码扫描
      "/cgi-bin": {
        target: "https://video.h5ds.com",
        changeOrigin: true,
      },
      "/api": {
        target: "https://video.h5ds.com",
        changeOrigin: true,
      },
      "/fonts": {
        target: "https://cdn.h5ds.com/assets",
        changeOrigin: true,
      },
      "/video": {
        target: "https://cdn.h5ds.com",
        changeOrigin: true,
      },
    },
  },
});
