/* eslint-disable */
/* prettier-disable */
/* @ts-nocheck */

import path from 'path'
import { normalizePath } from 'vite'

export default function vitePluginPg(customOptions) {
  return {
    name: 'custom-vite-plugin',
    config: (config, { command, mode }) => {
      customOptions.command = command
      customOptions.configRoot = process.cwd()
      if (
        customOptions.command === 'build' &&
        customOptions.pagesWithEntries?.length
      ) {
        customOptions.lib = process.env.LIB
        customOptions.wp = process.env.WP
        if (!customOptions.output) {
          customOptions.output = {}
        }

        if (!config.build) {
          config.build = {}
        }

        if (config.build.outDir && customOptions.output.outDir) {
          console.log(
            `Pinegrow: Vite config parameter build.outDir was overridden with customOptions.output.outDir (${customOptions.output.outDir}).`,
          )
        }

        customOptions.output.outDir = customOptions.output.outDir || 'dist'
        config.build.outDir = customOptions.output.outDir

        customOptions.output.cssDir = customOptions.output.cssDir || './css'
        customOptions.output.cssFilename =
          customOptions.output.cssFilename || 'style.css'

        if (!customOptions.output.cssDir.endsWith('/')) {
          customOptions.output.cssDir = `${customOptions.output.cssDir}/`
        }
        if (customOptions.output.cssDir.startsWith('.')) {
          customOptions.output.cssDir = customOptions.output.cssDir.substring(1)
        }
        if (customOptions.output.cssDir.startsWith('/')) {
          customOptions.output.cssDir = customOptions.output.cssDir.substring(1)
        }
        customOptions.output.cssPath = `${customOptions.output.cssDir}${customOptions.output.cssFilename}`

        customOptions.output.cssWpFilename =
          customOptions.output.cssWpFilename || 'style.wp.css'
        customOptions.output.cssWpPath = `${customOptions.output.cssDir}${customOptions.output.cssWpFilename}`

        customOptions.output.jsDir = customOptions.output.jsDir || './js'
        if (!customOptions.output.jsDir.endsWith('/')) {
          customOptions.output.jsDir = `${customOptions.output.jsDir}/`
        }
        if (customOptions.output.jsDir.startsWith('.')) {
          customOptions.output.jsDir = customOptions.output.jsDir.substring(1)
        }
        if (customOptions.output.jsDir.startsWith('/')) {
          customOptions.output.jsDir = customOptions.output.jsDir.substring(1)
        }

        customOptions.output.imgDir = customOptions.output.imgDir || './images'
        if (!customOptions.output.imgDir.endsWith('/')) {
          customOptions.output.imgDir = `${customOptions.output.imgDir}/`
        }
        if (customOptions.output.imgDir.startsWith('.')) {
          customOptions.output.imgDir = customOptions.output.imgDir.substring(1)
        }
        if (customOptions.output.imgDir.startsWith('/')) {
          customOptions.output.imgDir = customOptions.output.imgDir.substring(1)
        }

        if (customOptions.lib) {
          // IMPORTANT: Set to false; otherwise, Pinegrow watchers will cease tracking changes to the individual CSS outputs, preventing automatic style updates to the HTML pages.
          if (config.build.emptyOutDir) {
            console.log(
              `Pinegrow: Vite config parameter build.emptyOutDir was overridden to false, for environment variable LIB=true.`,
            )
          }
          config.build.emptyOutDir = false

          // https://vitejs.dev/config/build-options.html#build-lib
          if (!config.build.lib) {
            config.build.lib = {}
            console.log(
              `Pinegrow: Enabled Vite library mode, for environment variable LIB=true${
                customOptions.wp ? ', WP=true' : ''
              }.`,
            )
          }

          config.build.lib.name = config.build.lib.name || 'MyPgLib'

          // can be ['es', 'cjs', 'umd', 'iife'],
          // defaults to ['es', 'umd'] for single entry
          // defaults to ['es', 'cjs'] for multiple entries
          config.build.lib.formats = config.build.lib.formats || ['cjs']

          if (!config.build.lib.entry) {
            // entry file that has es modules & the tailwind.css that contains the tailwind directives
            // entry: './src/main.js',
            // // Can specify multiple entries. Note: When multiple entries are used, remove 'umd' and 'iife' from output formats below
            // entry: {
            // 	main: './src/main.js',
            // 	another: './src/another.js'
            // },

            config.build.lib.entry = {}

            customOptions.pagesWithEntries
              .filter(({ entry }) => entry)
              .forEach((pageWithEntry) => {
                const { page, entry } = pageWithEntry

                const filePath = path.resolve(customOptions.configRoot, entry)
                const fileName = path.basename(filePath)
                const fileExtn = path.extname(filePath)
                const entryAlias = fileName.substring(
                  0,
                  fileName.lastIndexOf(fileExtn),
                )
                config.build.lib.entry[entryAlias] = entry
                pageWithEntry.entryAlias = entryAlias

                const srcPath = customOptions.dirs?.src
                  ? path.resolve(
                      customOptions.configRoot,
                      customOptions.dirs.src,
                    )
                  : customOptions.configRoot

                pageWithEntry.entryLibDir = path.dirname(
                  path.relative(srcPath, filePath),
                )
                const entryLib = path.relative(
                  '.',
                  `${pageWithEntry.entryLibDir}${path.sep}${entryAlias}.js`,
                )
                pageWithEntry.entryLib = entryLib
              })
          }

          if (!config.build.lib.fileName) {
            // fileName: '[name]',
            // fileName: (format, entryAlias) => `${entryAlias}.${format}.js`,
            // fileName: (format, entryAlias) => `${entryAlias}.js`,
            config.build.lib.fileName = (format, entryAlias) => {
              const pageWithEntry = customOptions.pagesWithEntries.find(
                (pageWithEntry) => pageWithEntry.entryAlias === entryAlias,
              )
              if (pageWithEntry) {
                return `${customOptions.output.jsDir}${pageWithEntry.entryLib}`
              }
              return `${entryAlias}.${format}.js`
            }
          }

          // Vite uses Rollup under the hold, so rollup options & plugins can be used for advanced usage
          if (!config.build.rollupOptions) {
            config.build.rollupOptions = {}
          }

          if (!config.build.rollupOptions.output) {
            config.build.rollupOptions.output = {
              // Just a simple function to get the css file generated as style.css under dist/css folder. And all the images under dist/img folder.
              assetFileNames: (assetInfo) => {
                let extType = assetInfo.name.split('.').at(1)
                if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                  extType = 'img'
                }
                if (extType === 'css') {
                  if (customOptions.wp) {
                    return customOptions.output.cssWpPath
                  } else {
                    return customOptions.output.cssPath
                  }
                } else if (extType === 'img') {
                  return `${customOptions.output.imgDir}[name]-[hash][extname]`
                }
              },
            }
          }
        } else {
          console.log(
            `Pinegrow: Vite build enabled for multiple pages specified by the pagesWithEntries parameter.`,
          )

          config.build.emptyOutDir = config.build.emptyOutDir || true

          if (!config.build.rollupOptions) {
            config.build.rollupOptions = {}
          }

          if (config.build.rollupOptions.input) {
            console.log(
              `Pinegrow: Vite config parameter build.rollupOptions.input was overridden with the pages specified by the pagesWithEntries parameter.`,
            )
          }

          const _input = {}
          customOptions.pagesWithEntries.forEach((pageWithEntry) => {
            const { page } = pageWithEntry

            // TODO: add root as per docs - https://vitejs.dev/guide/build.html#multi-page-app
            const filePath = path.resolve(customOptions.configRoot, page)
            const fileName = path.basename(filePath)
            const fileExtn = path.extname(filePath)
            const pageAlias = fileName.substring(
              0,
              fileName.lastIndexOf(fileExtn),
            )
            _input[pageAlias] = filePath
            pageWithEntry.pageAlias = pageAlias
          })

          config.build.rollupOptions.input = _input
        }
      }
    },

    transform: (code, id, options) => {
      const localFile = path.normalize(id)

      if (
        customOptions.command === 'build' &&
        customOptions.pagesWithEntries?.length
      ) {
        if (!customOptions.lib) {
          customOptions.pagesWithEntries.forEach((pageWithEntry) => {
            const { page } = pageWithEntry
            const pagePath = path.resolve(customOptions.configRoot, page)
            pageWithEntry.pagePath = pagePath
            pageWithEntry.entryPath = path.resolve(
              customOptions.configRoot,
              pageWithEntry.entry,
            )
          })

          const page = customOptions.pagesWithEntries.find(
            ({ pagePath }) => pagePath === localFile,
          )
          if (page) {
            // https://stackoverflow.com/a/50828436

            let pgiaRe = new RegExp(
              `<script(.*?)src="(.*?)${customOptions.output.outDir}\/pgia\/(.*?)><\/script>`,
              'g',
            )
            code = code.replace(
              pgiaRe,
              `<script src="/pgia/lib/pgia.js"></script>`,
            )

            let entryRe = new RegExp(
              `<script(.*?)src="(.*?)${customOptions.output.outDir}\/(.*?)><\/script>`,
              'g',
            )
            const assetRel = normalizePath(
              path.relative(path.dirname(localFile), page.entryPath),
            )
            code = code.replace(
              entryRe,
              `<script type="module" src="${assetRel}"></script>`,
            )

            // code = code.replace(
            // 	/<script(.*?)src="dist\/main.js"(.*?)><\/script>/,
            // 	`<script type="module" src="src/main.js"></script>`
            // )

            entryRe = new RegExp(
              `<link(.*?)href="(.*?)${customOptions.output.outDir}(.*?)${customOptions.output.cssPath}"(.*?)/>`,
              'g',
            )
            code = code.replace(entryRe, '')

            entryRe = new RegExp(
              `<link(.*?)href="(.*?)${customOptions.output.outDir}(.*?)${customOptions.output.cssWpPath}"(.*?)/>`,
              'g',
            )
            code = code.replace(entryRe, '')
          }
        }
      }
      return { code }
    },
  }
}
