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


## vue arrow按钮点击旋转，用在伸缩类型组件中

```scss

//arrow旋转
    .arrow-rotate-back {
      transition: all .5s;
    }
    
    .arrow-rotate {
      transform: rotate(180deg);
      transition: all .5s;
    }
```

```vue
   <img src="@/assets/images/temperature/arrow-up1.png" :class="[item.expand?'arrow-rotate':'arrow-rotate-back']">
```

