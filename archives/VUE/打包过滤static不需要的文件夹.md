假设我们在开发环境下使用了mock，但为了防止生产环境打包时将mock的静态资源一同处理，可更改prod.conf.js,如下：

```js
const devMode = process.env.NODE_ENV === 'development';

new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../static'),
        to: devMode ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory,
        ignore: devMode ? '' : 'mock/**/*'
    }
])
```

