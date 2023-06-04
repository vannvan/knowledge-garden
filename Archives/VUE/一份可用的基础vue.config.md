```js
const path = require('path')
const TimeStamp = new Date().getTime()
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  outputDir: 'dist',
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/theme/default.scss')]
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch'),
      config.resolve.alias
        .set('@', resolve('./src'))
        .set('components', resolve('./src/components'))
        .set('views', resolve('src/views'))
        .set('assets', resolve('src/assets'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      },
      sass: {},
      scss: {
        prependData: `@import "./src/theme/default.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  },
  configureWebpack: () => {
    if (!isDev) {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css$/,
            // 超过4kb压缩
            threshold: 4096
          })
        ],
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  pure_funcs: ['console.log']
                }
              }
            })
          ]
        },

        output: {
          filename: `[name].[chunkhash]-${TimeStamp}.js`,
          chunkFilename: `[name].[chunkhash]-${TimeStamp}.js`
        }
      }
    }
  },

  assetsDir: 'static',
  runtimeCompiler: true
}

```

