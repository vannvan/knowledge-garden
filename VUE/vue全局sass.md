### 安装sass-resources-loader

> npm install --save-dev sass-resources-loader

### 修改sass配置

在 `build` 文件夹下找到 `util.js` 修改sass编译器loader的配置

```js
// 全局文件引入 当然只想编译一个文件的话可以省去这个函数
function resolveResource(name) {
  return path.resolve(__dirname, '../static/style/' + name);
}
function generateSassResourceLoader() {
  var loaders = [
    cssLoader,
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
        resources: [resolveResource('common.scss')]  
      }
    }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```

### 修改sass配置的调用为 generateSassResourceLoader()

```js
return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    // vue-cli默认sass配置
    // sass: generateLoaders('sass', { indentedSyntax: true }), 
    // scss: generateLoaders('sass'),
    // 新引入的sass-resources-loader
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
！
```

