### react配置路径别名

> npm i customize-cra  react-app-rewired -D

在根目录新建config-overrides.js、内容参考

```js
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src/')
  }),
  // antd按需加载
  // fixBabelImports('import', {
  //   libraryName: 'antd',
  //   libraryDirectory: 'es',
  //   style: 'css'
  // })
)
```

### 暴露配置

> ```bash
> yarn run eject
> ```

在config/webpack.config.js中搜索`alias`,然后添加一些常用的别名配置，例如：

```js
//config/webpack.config.js

alias: {
    'react-native': 'react-native-web',
    '@pages':path.resolve(__dirname,'../src/pages'),   //页面组件目录
    '@assets':path.resolve(__dirname,'../src/assets'),    //静态资源=目录
}

```

