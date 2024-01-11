import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'

export default (env, argv) => {
  const framework = argv.framework || env.framework || 'standard-vue'
  const mode = argv.mode || env.mode || 'production'

  try {
    return {
      // 1. mode - development or production
      mode: argv.mode || env.mode || 'production',

      // 2. source-map
      get devtool() {
        return this.mode === 'development' ? 'source-map' : false
      },

      optimization: {
        minimize: false,
      },

      // 3. entry
      // entry: './src/index.js', // default
      entry: {
        plugin: { import: './src/plugin.js', filename: '[name].cjs' },
      },
      // entry: {
      //   plugin: {
      //     import: './src/plugin.js',
      //     filename: 'frameworks-lite-for-pinegrow.cjs',
      //   },
      // },

      // 4. output
      // output: {
      //   clean: true, // clears the dist folder before re-building it
      //   path: path.resolve(__dirname, '../dist'), // default
      //   filename: '[name].js', // default
      //   // library: { type: 'commonjs' },
      // },
      output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/frameworks-lite-for-pinegrow/',
        // filename: '[name].js',
        libraryTarget: 'umd',
        clean: true,
      },

      // 5. target
      // https://webpack.js.org/configuration/target/#string
      // target nwjs throws __dirname undefined error during hmr
      // target: "nwjs",
      // target node doesn't enable hmr
      target: 'node',

      node: {
        __dirname: true,
      },

      // 6. plugins
      // plugins: [],
      get plugins() {
        return [
          new CopyPlugin({
            patterns: [
              { from: './src/templates', to: 'templates' },
              // { from: '../docs/dist', to: 'docs' },
            ],
          }),
          new webpack.DefinePlugin({
            __DEVMODE__: !!(mode === 'development'),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            // __FRAMEWORKS__: JSON.stringify(fetchDirectives('./data')),
          }),
        ]
      },

      // 7. resolve.alias / resolve.fallback
      // https://stackoverflow.com/a/66306663/9185953
      // resolve: {
      // 	alias: {
      // 		vue: path.resolve('./node_modules/vue'),
      // 	},
      // 	fallback: {
      // 		path: false,
      // 		fs: false,
      // 		https: false,
      // 		assert: false,
      // 		util: false,
      // 		stream: false,
      // 		zlib: false,
      // 		crypto: false,
      // 		os: false,
      // 		tty: false,
      // 		constants: false,
      // 		child_process: false,
      // 		net: false,
      // 		tls: false,
      // 	},
      // },

      // 8. externals
      // https://github.com/websockets/ws/issues/1126#issuecomment-631605589
      externals: {
        // bufferutil & utf-8-validate are required for the old socket.io client & remotedev
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
        fsevents: 'require("fsevents")',
      },
      // https://github.com/websockets/ws/issues/1126#issuecomment-741575715
      // https://lifesaver.codes/answer/compile-with-warnings
      // externals: [nodeExternals()],

      // 9. devServer
      devServer: {
        port: 8888,
        // liveReload: false,
        // hot: false,
        // Only hmr, no page refresh (which will refresh the whole Pinegrow app)
        hot: 'only',
        client: {
          overlay: {
            warnings: false,
            errors: true,
          },
        },
      },

      // 10. module.rules
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  ['@babel/plugin-proposal-class-properties', { loose: false }],
                  // ['@babel/plugin-transform-arrow-functions', { 'spec': true }],
                  ['@babel/transform-runtime'],
                ],
                assumptions: {
                  setPublicClassFields: false,
                },
              },
            },
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'ifdef-loader',
              options: {
                // Unused in addonManager
                __DEV_SERVER__: true, // framework !== 'pg',
              },
            },
          },
          {
            // test: /\.s[ac]ss$/i,
            test: /\.(sa|sc|c)ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
          {
            test: /\.svg/,
            type: 'asset/inline',
          },
          {
            test: /\.(png|jpg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
    }
  } catch (err) {
    console.log(err)
  }
}
