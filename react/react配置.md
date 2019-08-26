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

