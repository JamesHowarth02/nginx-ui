import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { defineConfig, loadEnv } from 'vite'
import vitePluginBuildId from 'vite-plugin-build-id'
import Inspect from 'vite-plugin-inspect'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue',
        '.less',
      ],
    },
    plugins: [
      vue(),
      vueJsx(),
      vitePluginBuildId(),
      svgLoader(),
      UnoCSS(),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })],
        directoryAsNamespace: true,
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            '@/gettext': [
              '$gettext',
              '$pgettext',
              '$ngettext',
              '$npgettext',
            ],
          },
          {
            '@/language': ['T'],
          },
        ],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: '.eslint-auto-import.mjs',
        },
      }),
      DefineOptions(),
      Inspect(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'border-radius-base': '5px',
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: Number.parseInt(env.VITE_PORT) || 3002,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:9001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          advancedChunks: {
            groups: [
              // Code editors
              { name: 'ace-editor', test: /ace-builds/ },

              // Vue ecosystem
              { name: 'vue-vendor', test: /[\\/]node_modules[\\/](vue|@vue|vue-router|pinia)[\\/]/ },

              // Ant Design Vue
              { name: 'antdv', test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/ },

              // Chart libraries
              { name: 'charts', test: /[\\/]node_modules[\\/](echarts|@antv|chart\.js)[\\/]/ },

              // Utility libraries
              { name: 'utils', test: /[\\/]node_modules[\\/](lodash|dayjs|moment|axios)[\\/]/ },

              // UI utilities
              { name: 'ui-utils', test: /[\\/]node_modules[\\/](@vueuse|vue-demi)[\\/]/ },
            ],
          },
        },
      },
    },
  }
})
