//vite.config.js (or) vite.config.ts

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vitePluginPg from './vite-plugin-pg.js'

// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginPg({
      dirs: {
        src: './src',
        pages: './pages',
      },
      output: {
        outDir: 'dist', // default is 'dist'
        cssDir: './', // could be './css', relative to outDir (default is 'dist')
        cssFilename: 'tailwind.css',
        cssWpFilename: 'tailwind_for_wp_editor.css',
        jsDir: './js', // Relative to outDir (default is 'dist')
        imgDir: './images', // Relative to outDir (default is 'dist')
      },
      // lib: process.env.LIB, // passed via package.json script commands
      // wp: process.env.WP, // passed via package.json script commands
      pagesWithEntries: [
        {
          page: './index.html',
          entry: './src/main.js',
        },
        // {
        //   page: './pages/blog.html',
        //   entry: './src/main.js',
        // },
      ],
    }),
  ],

  base: './',

  build: {
    minify: false,
    cssMinify: false,
    // Vite uses Rollup under the hold, so rollup options & plugins can be used for advanced usage
    rollupOptions: {
      plugins: [
        /*visualizer()*/
      ],
    },
  },

  resolve: {
    alias: {
      /* Must be either an object, or an array of { find, replacement, customResolver } pairs. */
      /* Refer to: https://vitejs.dev/config/shared-options.html#resolve-alias */
      /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  //...
})
