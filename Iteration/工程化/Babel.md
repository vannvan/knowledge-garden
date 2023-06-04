## 基本认知
> 让过时的/不够先进的浏览器使用新技术

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的功能（通过引入第三方 polyfill 模块，例如 [core-js](https://github.com/zloirock/core-js)）
- 源码转换（codemods）
```javascript
// Babel 接收到的输入是： ES2015 箭头函数
[1, 2, 3].map(n => n + 1);

// Babel 输出： ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
  return n + 1;
});
```
### 三个阶段
babel 总共分为三个阶段：解析，转换，生成。
babel 本身不具有任何转化功能，它把转化的功能都分解到一个个 plugin 里面。因此当我们不配置任何插件时，经过 babel 的代码和输入是相同的。
### 插件总共分为两种
#### 语法插件
当我们添加 语法插件 之后，在解析这一步就使得 babel 能够解析更多的语法。
举个简单的例子，当我们定义或者调用方法时，最后一个参数之后是不允许增加逗号的，如 callFoo(param1, param2,) 就是非法的。如果源码是这种写法，经过 babel 之后就会提示语法错误。
但最近的 JS 提案中已经允许了这种新的写法(让代码 diff 更加清晰)。为了避免 babel 报错，就需要增加语法插件 babel-plugin-syntax-trailing-function-commas
#### 转译插件
比如箭头函数 (a) => a 就会转化为 function (a) {return a}。完成这个工作的插件叫做 babel-plugin-transform-es2015-arrow-functions。
## 配置文件
Babel 有两种并行的配置文件方式，可以一起使用，也可以单独使用。

- 项目范围的配置
   - babel.config.* 文件，可用如下不同扩展名： .json, .js, .cjs, .mjs。
- 相对文件的配置
   - .babelrc.* 文件，可用如下不同扩展名： .json, .js, .cjs, .mjs。
   - 不带扩展名的 .babelrc。
   - 带有 "babel" 属性的 package.json 文件。
### preset
比如 es2015 是一套规范，包含大概十几二十个转译插件。如果每次要开发者一个个添加并安装，配置文件很长不说，npm install 的时间也会很长，更不谈我们可能还要同时使用其他规范呢。
为了解决这个问题，babel 还提供了一组插件的集合。因为常用，所以不必重复定义 & 安装。(单点和套餐的差别，套餐省下了巨多的时间和配置的精力)
preset 分为以下几种：目前包括 env, react, flow, minify 等

- [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) for compiling ES2015+ syntax
- [@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript) for [TypeScript](https://www.typescriptlang.org/)
- [@babel/preset-react](https://babeljs.io/docs/babel-preset-react) for [React](https://reactjs.org/)
- [@babel/preset-flow](https://babeljs.io/docs/babel-preset-flow) for [Flow](https://flow.org/)
```javascript
{
  "presets": ["babel-preset-myPreset", "@babel/preset-env"]
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685354092428-7a2de75d-fd47-46c2-956c-b639d2fdb5ff.png#averageHue=%23d7dbd9&clientId=uf13a102e-6afc-4&from=paste&height=212&id=ucd11190b&originHeight=423&originWidth=900&originalType=binary&ratio=2&rotation=0&showTitle=false&size=258649&status=done&style=none&taskId=uc3f9f2b1-f3cf-45c2-8131-14b573c33b5&title=&width=450)

## 资料

- [https://babeljs.io/docs/](https://babeljs.io/docs/)
- [Babel · The compiler for next generation JavaScript](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=MYewdgzgLgBGCuBbARgUwE4RgXhgbQFYAaGANhICYSBmEgdgF0BuAKBdElkQEMAPHGAFluUABYA6Hr3HcADrIA2ATwAUCBQpIIUGCAEomQA&debug=false&forceAllTransforms=true&modules=amd&shippedProposals=true&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.21.4&externalPlugins=&assumptions=%7B%7D)  babel在线编辑查看编译后效果
- [前端 polyfill 解析](https://segmentfault.com/a/1190000039743608?utm_source=tag-newest)
- [一口（很长的）气了解 babel](https://zhuanlan.zhihu.com/p/43249121)  ⭐️⭐️
- [21 分钟精通前端 Polyfill 方案](https://zhuanlan.zhihu.com/p/27777995)  ⭐️
- [前端基础建设与架构06 core-js 及垫片理念：设计一个“最完美”的 Polyfill 方案](https://blog.csdn.net/fegus/article/details/126826113)
- [前端架构设计第四课 Babel构建公共库实战_babel 构建三方包](https://bgmbk.blog.csdn.net/article/details/124857782)
- [Babel 系列【基础篇】](https://mp.weixin.qq.com/s/GcozDbrrFmVqt0fjtjqn8g)
