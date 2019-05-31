webpack版本：4.17.1 （比较新的版本）

webpack.config.js

```
var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var webpack = require('webpack')

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: 'MyComponent',
        libraryTarget: 'umd'
    },
    devtool: '#eval-source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue']
    },
    mode: 'production',
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        "env": {
                            "test": {
                                "plugins": ["istanbul"]
                            }
                        }
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
```

## webpack配置文件详解

### 入口文件

```
    entry: {
        'index': './src/index.js'
    },
```

入口文件配置比较简单，关键在于入口文件的内容。

index.js

```
export {default as MButton}  from './MButton.vue'
```

入口文件的意思就是将`MButton.vue`文件中的默认导出值，重命名为MButton然后再导出。

（对于export语法不理解的同学，推荐查看[阮一峰的es6相关教程](http://es6.ruanyifeng.com/#docs/module#export-%E5%91%BD%E4%BB%A4)）

### 输出配置

```
    output: {
        path: path.resolve(__dirname, './dist'), //输出目录
        filename: '[name].js', //输出文件名
        library: 'MyComponent', //输出的全局变量名称
        libraryTarget: 'umd'，//输出规范为umd
    },
```

前两行配置不解释，解释下后两行

- `library: 'MyComponent'`

  `MyCompoent`是一个全局变量名称（你自定义），当用户直接通过script标签引用你的组件的时候，这个将作为你的组件的命名空间，你的组件的内容会挂载到该全局变量上面，作为它的一个属性,类似于你使用jquery的时候，会有一个全局的`$`或`jquery`供你引用。

- `libraryTarget: 'umd'，`

  使用**umd**（通用模块规范）打包你的模块。umd兼容amd以及cmd模式，并且会导出一个全局变量。这样使打包后的模块可以使用各种规范引用，增强模块的通用性。

  引用webpack官网的解释：

  > `libraryTarget: 'umd'` - This exposes your library under all the module definitions, allowing it to work with CommonJS, AMD and as global variable. Take a look at the [UMD Repository](https://github.com/umdjs/umd) to learn more.
  >
  > 这么设置可以让你的库适应所有的模块标准，允许别人通过CommonJS、AMD和全局变量的形式去使用它。

  具体什么是umd、amd、cmd大家自行百度吧。

### 模式

```
mode: 'production'
```

webpack4 新增的配置参数，意为webpack将认为该打包是为了生产环境，会将一些默认配置设置为生产环境所需要的，例如默认进行代码压缩。

### rules

这里是重点，有三个规则

1. 使用babel处理js，这样你就可以在vue单文件组件中的`script`标签内放心使用es6语法

   ```
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                "env": {
                    "test": {
                        "plugins": ["istanbul"]
                    }
                }
            }
        }
    },
   ```

2. 使用vue-loader处理.vue文件。在webpack中每一种文件的处理都需要对应的loader，就像css需要css-loader，js文件需要babel-loader，vue文件也不例外。其实vue-loader就是将你写的单文件组件内的三个标签，转化为原生的js，具体原理查看[官方文档](https://vue-loader.vuejs.org/)。

   ```
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
    },
   ```

3. 使用css-loader处理和vue-style-loader处理单文件组件内`style`便签内的css样式

   ```
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]
    }
   ```

### 使用vue-loader插件

官方说必须使用VueLoaderPlugin配合vue-loader使用，具体为什么我也不清楚。

```
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
```

这就是所有的webpack配置，其实还是挺简单的。

------

# 2. 发布到npm上

## 修改你的`package.json`文件

```
   {
      ...
      
         "name": "vue-component-demo",//你的组件的名字
         "version": "0.0.1",//当前版本号
         "description": "vue component demo",//描述
         "main": "dist/index.js",//入口文件
         
         ...
   }
```

- 入口参数`"main": "dist/index.js"`，指向的就是我们之前打包好的文件。

  这样当用户向下面这样引入你的组件的时候，打包工具就会直接去`"main": "dist/index.js"`找文件。

  ```
  import {button} from 'vue-component-demo'
  ```

- `name`参数不能和npm上已有的组件名相同，否则发布的时候会报错，如果不幸有人用了这个组件名，你就需要修改一下，再重复这个流程重新发布就好了。

## 登录npm（需要提前注册一个npm账号）

```
   /vue-component-demo (master)
   $ npm adduser
   Username: 
   Password:
   Email: (this IS public) 
```

## 发布组件

```
   /vue-component-demo (master)
   $ npm publish
```

至此，你的组件就已经发布到npm上了，别人就可以通过npm 安装你的组件，然后使用。

```
   npm install vue-component-demo
```

## 更新组件

以上是我们发布的第一个版本，如果之后你有修复组件中的bug，或者增强了组件的功能，你就要更新组件，更新组件也很简单。

- 更新package.json中的`version`参数，不能和之前的版本号重复，否则发布不成功。
- 再执行一次`npm publish`

作者：朱小维

链接：https://www.jianshu.com/p/4058c7c7f742

来源：简书