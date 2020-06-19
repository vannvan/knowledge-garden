

###### 代码层面的优化

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景  computed有缓存，数据变化时才会触发
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if   v-for比v-if优先级高，每次遍历
- 合理的使用keep-alive
- 长列表性能优化  懒加载，
- 事件的销毁  addEventListener的 touchmove等事件的销毁
- 图片资源懒加载  懒加载  vue-lazyload 
- 路由懒加载  *resolve*->require
- 第三方插件的按需引入  需要babel-plugin-component 配置`.babelrc`文件
- 优化无限列表性能  `vue-cirtual-scroll-list`和`vue-cirtual-scroller`
- 服务端渲染 SSR or 预渲染   next.js
- 细分各类组件  
- Object.freeze() 冻结不需要监听的数据

###### **Webpack 层面的优化**

- Webpack 对图片进行压缩  image-webpack-loader

- 减少 ES6 转为 ES5 的冗余代码 

- 提取公共代码  **CommonsChunkPlugin**

- 模板预编译    vue-template-loader

- 提取组件的 CSS  extract-text-webpack-plugin

- 优化 SourceMap  屏蔽

- 构建结果输出分析

- Vue 项目的编译优化

- 缩小文件的搜索范围  

  1.通过cacheDirectory开启缓存

  2.优化resolve.modules的配置  

  ```js
  // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
  modules: [path.resolve(__dirname,'node_modules')]
  ```

  3.优化resolve.alias配置

  4.优化resolve.extensions的配置

- 使用HappyPack多进程解析和处理文件

- 使用paralleUglifyPlugin多进程压缩代码文件

###### **基础的 Web 技术的优化**

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈