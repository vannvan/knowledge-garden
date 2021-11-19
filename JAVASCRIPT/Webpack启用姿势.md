### webpack.config.js从0到1

#### 1.铁皮段位

```js
// webpack.config.js
const path = require('path');
module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {
        filename: 'output.js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
    }
}
```

执行命令

> webpack --config build/webpack.config.js

filename的哈希大法

> filename:'[name]'.[hash:8].js

##### 第一个插件配置，html-webpack-plugin

```js
 plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html')
      })
    ]
```

##### 多入口配置

```js
entry: {
    main:path.resolve(__dirname,'../src/main.js'),
    header:path.resolve(__dirname,'../src/header.js')
},
plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'),
        filename:'index.html',
        chunks:['main'] // 与入口文件对应的模块名
      }),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/header.html'),
        filename:'header.html',
        chunks:['header'] // 与入口文件对应的模块名
      }),
    ]
```

##### 清除之前残留文件 clean-webpack-plugin

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
plugins:[new CleanWebpackPlugin()]
```

##### 引入css style-loader css-loader

```js
module:{
		rules: [
			{
				test:/\.css$/,
          		use:['style-loader','css-loader'] // 从右向左解析原则
			}
		]
	}
```

##### 解析less  less less-loader

```js
{
    test:/\.less$/,
    use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
}
```

##### 解析sass sass sass-loader

```js
{
    test:/\.scss$/,
    use:['style-loader','css-loader','sass-loader'] // 从右向左解析原则
}
```

##### 为css添加浏览器前缀  postcss-loader autoprefixer  

postcss生效的两种方式

1，在项目根目录下创建一个`postcss.config.js`文件，配置如下：

```js
module.exports = {
    plugins: [require('autoprefixer')]  // 引用该插件即可了
}
```

2、在webpack.config.js中配置

```js
// webpack.config.js
module.exports = {
    //...省略其他配置
    module:{
        rules:[{
            test:/\.less$/,
            use:['style-loader','css-loader',{
                loader:'postcss-loader',
                options:{
                    plugins:[require('autoprefixer')]
                }
            },'less-loader'] // 从右向左解析原则
        }]
    }
}
```

##### 拆分css  mini-css-extract-plugin

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      //这一块要在后面新增，而不是覆盖以上配置
      {
        test: /\.sass$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
      //
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css",
    })
  ]
}
```

##### 拆分css extract-text-webpack-plugin@next

##### 压缩css

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

plugins:[
      new OptimizeCSSAssetsPlugin(), //压缩css
]
```

##### 打包图片，字体，媒体等 file-loader url-loader

```js
// webpack.config.js
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  }
}

```

##### 用babel转义js文件  babel-loader @babel/preset-env @babel/core

babel-loader 和 babel-core的对应关系

1. `babel-loader` 8.x 对应`babel-core` 7.x
2. `babel-loader` 7.x 对应`babel-core` 6.x

```js
// webpack.config.js
module.exports = {
    // 省略其它配置 ...
    module:{
        rules:[
          {
            test:/\.js$/,
            use:{
              loader:'babel-loader',
              options:{
                presets:['@babel/preset-env']
              }
            },
            exclude:/node_modules/
          },
       ]
    }
}
```

##### 转换新的api 如（promise、Generator、Set、Maps、Proxy等）  @babel/polyfill

```js
// webpack.config.js
const path = require('path')
module.exports = {
    entry: ["@babel/polyfill,path.resolve(__dirname,'../src/index.js')"],    // 入口文件
}
```

#### 2.青铜段位

##### 解析vue文件 vue-loader vue-template-compiler vue-style-loader  vue

> npm i -D vue-loader vue-template-compiler vue-style-loader
> npm i -S vue

##### 热更新 webpack-dev-server

```js
const Webpack = require('webpack')
module.exports = {
  // ...省略其他配置
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```

##### 区分开发环境和生产环境

开发环境主要实现的是热更新，不用压缩代码

生产环境主要实现的是压缩代码，提取css文件，分割代码等

主要用到以下插件

- webpack-merge  合并配置
- copy-webpack-plugin 拷贝静态资源
- optimize-css-assets-wepack-plugin 压缩css
- uglifyjs-webpack-plugin 压缩js

> `webpack mode`设置`production`的时候会自动压缩js代码。原则上不需要引入`uglifyjs-webpack-plugin`进行重复工作。但是`optimize-css-assets-webpack-plugin`压缩css的同时会破坏原有的js压缩，所以这里我们引入`uglifyjs`进行压缩

另外还要用到

- cache-loader  
- thread-loader 加速构建

#### 3.段位提升总结

至此手动配置一个vue初级项目所用到的插件

webpack直属

- webpack
- webpack-cli
- webpack-dev-server   热更新
- webpack-merge 

vue相关

- vue   需要安装在项目dependencies里
- vue-loader 
- vue-template-compiler
- vue-style-loader

css 相关  用sass

- css loader
- style-loader
- sass
- sass-loader
- postcss-loader  
- autoprefixer

js 相关 

- babel-loader
- @babel/core
- @babel/preset-env

压缩、拆分、合并相关

- extract-text-webpack-plugin  拆分多个css
- html-webpack-plugin
- mini-css-extract-plugin   拆分css
- optimize-css-assets-webpack-plugin  压缩css
- uglifyjs-webpack-plugin  压缩js

其他

- thread-loader
- cache-loader
- clean-webpack-plugin   清除残留

#### 4.优化打包速度

##### 缩小文件搜索范围

- `alias`: 当我们代码中出现 `import 'vue'`时， webpack会采用向上递归搜索的方式去`node_modules` 目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(`alias`)的配置。
- `include exclude` 同样配置`include exclude`也可以减少`webpack loader`的搜索转换时间。
- `noParse ` 当我们代码中使用到`import jq from 'jquery'`时，`webpack`会去解析jq这个库是否有依赖其他的包。但是我们对类似`jquery`这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加`noParse`属性,告诉`webpack`不必解析，以此增加打包速度。
- `extensions `webpack`会根据`extensions`定义的后缀查找文件(频率较高的文件类型优先写在前面)

#### 5.扩展

##### 友好的命令行显示 friendly-errors-webpack-plugin

```js
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
new FriendlyErrorsWebpackPlugin()
stats: 'errors-only'  //附加的一项配置
```

### webpack自定义环境变量会遇到的问题

> [理解webpack之process.env.NODE_ENV详解(十八)](https://www.cnblogs.com/tugenhua0707/p/9780621.html)



###  Webpack library 打包方式有 5 种。

变量：作为一个全局变量，通过 `script` 标签来访问（`libraryTarget:'var'`）。

this：通过 `this` 对象访问（`libraryTarget:'this'`）。

window：通过 `window` 对象访问，在浏览器中（`libraryTarget:'window'`）。

UMD：在 AMD 或 CommonJS 的 `require` 之后可访问（`libraryTarget:'umd'`）。

AMD：基于 AMD 规范的打包方式（`libraryTarget:'amd'`）。





## 文章

- [Webpack 命令行参数详解](https://blog.csdn.net/victoryzn/article/details/81872718)
- [编写自定义插件](https://www.ddhigh.com/2020/03/18/webpack-plugin-development.html)

