## 打包文件以时间戳定义版本号

webpack.prod.conf.js

```js
const  Version = new Date().getTime();  //用时间戳区分版本号
filename: utils.assetsPath('js/[name].[chunkhash].' + Version + '.js'),
chunkFilename: utils.assetsPath('js/[id].[chunkhash].' + Version + '.js')
```

## 禁用生产环境中的console

webpack.prod.conf.js找到 UglifyJsPlugin ({  })，改为如下

```js
compress: {
          warnings: false,
          drop_console: true,//console
          pure_funcs: ['console.log']//移除console
        }
```

