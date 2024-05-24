import { defineConfig } from 'vite';
//@ts-ignore
import path from 'path';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
// import mkcert from 'vite-plugin-mkcert';
// import { visualizer } from 'rollup-plugin-visualizer';

//@ts-ignore
const resolve = url => path.resolve(__dirname, url);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve('./src/components'),
      '@server': resolve('./src/server'),
      '@core': resolve('./src/pages/editor/core'),
      '@options': resolve('./src/pages/editor/components/options/components'),
      '@plugins': resolve('./src/pages/editor/plugins'),
      '@pages': resolve('./src/pages'),
      '@language': resolve('./src/language'),
      '@hooks': resolve('./src/hooks'),
      '@theme': resolve('./src/theme'),
      '@layout': resolve('./src/layout'),
      '@stores': resolve('./src/stores'),
      '@utils': resolve('./src/utils'),
      '@config': resolve('./src/config'),
      '@less': resolve('./src/less'),
      '@images': resolve('./src/assets/images'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 省略扩展名
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
      },
    }),
    vitePluginImp({
      libList: [
        {
          libName: '@icon-park/react',
          libDirectory: 'es/icons',
          camel2DashComponentName: false,
        },
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
        },
        // {
        //   libName: '@douyinfe/semi-ui',
        // },
      ],
    }),
  ],
  define: {
    'process.env': process.env,
  },
  // 入口
  publicDir: '/sdk',
  build: {
    emptyOutDir: false,
    outDir: 'dist-sdk', // 指定输出目录
    lib: {
      //@ts-ignore
      entry: path.resolve(__dirname, 'src/pages/editor/core/coresdk.tsx'),
      name: 'CoreSDK', // 暴露的全局变量
      fileName: format => `coresdk.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: 'coresdk.[name].[ext]',
      },
    },
  },
  base: '/', // 公共基础路径
});
