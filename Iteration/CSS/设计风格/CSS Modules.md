## 是什么
CSS Modules 允许我们像 import 一个 JS Module 一样去 import 一个 CSS Module。每一个 CSS 文件都是一个独立的模块，每一个类名都是该模块所导出对象的一个属性。通过这种方式，便可在使用时明确指定所引用的 CSS 样式。并且，CSS Modules 在打包时会自动将 id 和 class 混淆成全局唯一的 hash 值，从而避免发生命名冲突问题。
## 特性

- 作用域   :global  :local
- 命名  styles.className
- 组合  
- 变量
## 风格样例
```css
<style>
  .card {
    padding: 20px;
  }
  .style__article--ht21N {
    background-color: #fff;
  }
  .style__title--3JCJR {
    font-size: 18px;
  }
</style>

<article class="style__article--ht21N">
  <h2 class="style__title--3JCJR">Hello World</h2>
  <div class="card">Lorem ipsum dolor sit amet.</div>
</article>
```
## 相关插件

- css-loader
- postcss-modules
## vscode插件

- [https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)


## 资料

- [https://www.ruanyifeng.com/blog/2016/06/css_modules.html](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)
