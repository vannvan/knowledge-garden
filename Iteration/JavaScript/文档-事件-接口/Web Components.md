## 概念
- **Custom element（自定义元素）**：一组 JavaScript API，允许定义 custom elements 及其行为，然后在界面中按照定义的规则适用
- **Shadow DOM（影子 DOM）：**封装“影子”DOM树附加到元素(与主文档DOM分开呈现)。具备隔离的能力。
- **HTML template（HTML 模板）：**<template>和<slot>可以编写不在呈现页面中显示的标记模板。
### custom elements
使用`CustomElementRegistry.define()`创建一个组件，接收以下参数

- 符合 [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 标准的字符串，**不能是单个单词，且必须要有短横线。**(如todo-list是合法的，TotoList是不合法的)
- 用于定义元素行为的类
- 可选参数，一个包含 `extends` 属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素。

基本用法
```javascript
customElements.define('word-count', WordCount, { extends: 'p' });
```
### shadow DOM
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683253853039-d4413ff6-03d9-44b5-b6d8-89e6156e3a32.png#averageHue=%23a39b8e&clientId=u59754196-5a70-4&from=paste&height=276&id=ucaf63472&originHeight=509&originWidth=1107&originalType=binary&ratio=2&rotation=0&showTitle=false&size=83101&status=done&style=none&taskId=u34ed7e93-ce9a-4e76-96b0-fb582a51ea7&title=&width=600)
一些关键术语

- Shadow host：一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM 内部的 DOM 树。
- Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- Shadow root: Shadow tree 的根节点。

基本用法
```javascript
let shadow = elementRef.attachShadow({mode: 'open'});
let shadow = elementRef.attachShadow({mode: 'closed'});
```
`open` 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用 [Element.shadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 属性：
```javascript
let myShadowDom = myCustomElem.shadowRoot; // 可以拿到Shadow DOM
```
如果是`closed` 就不能通过`shadowRoot`拿到`Shadow DOM`了，将会返回null
### templates and slots

- 支持命名插槽
```html
<p><slot name="my-text">My default text</slot></p>
```
使用时：
```html
<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```
## 基础使用
### 定义一个todo-list组件
```javascript
//index.js
const template = document.createElement('template')
//在js文件中，我们想要书写html和css就必须要借助innerHTML，在其内部书写我们的样式和结构
template.innerHTML = `
  <style>
    #contain {
      display: flex;
      flex-direction: column;
      color:#f00
    }
    input {
      width: 200px;
    }
  </style>
  <div id="contain">
    <span><slot></slot></span>
    <div>
     <input type="text" id=input>
     <button id="mybutton" data-text1="111111">添加</button>
    </div>
  </div>
`
class MyList extends HTMLElement {
  constructor() {
    //因为我们的组件继承于HTMLElement，所以需要调用super关键字
    super()
    // 获取标签
    const content = template.content.cloneNode(true)
    const mybutton = content.getElementById('mybutton')
    const input = content.getElementById('input')
    const contain = content.getElementById('contain')

    // 获取props
    const arr = this.dataset.arr ? JSON.parse(this.dataset.arr) : []
    //进行事件的监听
    mybutton.addEventListener('click', () => {
      arr.push(input.value)
      const li = document.createElement('li')
      li.innerText = input.value
      contain.appendChild(li)
    })
    // 将数据渲染到页面
    arr.forEach((item) => {
      const li = document.createElement('li')
      li.innerText = item
      contain.appendChild(li)
    })
    //初始化一个影子dom
    this.attachShadow({ mode: 'closed' }).appendChild(content)
  }
}
// 注册组件
window.customElements.define('todo-list', MyList)

```
### 在页面上使用组件
```html
<!DOCTYPE html>
<html lang="en">
  <head>
  <!--   其它元素省略 -->
  </head>
  <!--   注意用defer -->
  <script src="./Button.js" defer></script>
  <style>
    #contain {
      color: green;
      font-weight: bold;
    }
  </style>
  <body>
    <div id="contain">
      <h2>外部样式不冲突</h2>
    </div>
    <h2>组件使用</h2>
    <todo-list id="node">
      <!--原生支持插槽  -->
      <slot>web component</slot>
    </todo-list>

    <script>
      const node = document.getElementById('node')
      node.dataset.arr = JSON.stringify(['吃饭', '睡觉','打豆豆'])
    </script>
  </body>
</html>

```
## 特点
**优点**

- 浏览器原生支持，不用加入任何依赖
- 多种场景适用，天生组件隔离

**缺点**

- 跟主流的框架相比，书写较为复杂，需要开发者自己进行原生 dom 操作
- 若要写成单文件组件，需要采用模板字符串的写法，没有语法高亮，代码提示等
## 腾讯的wujie
### 简介
无界采用[webcomponent](https://developer.mozilla.org/en-US/docs/Web/Web_Components)来实现页面的样式隔离，无界会创建一个`wujie`自定义元素，然后将子应用的完整结构渲染在内部
子应用的实例`instance`在`iframe`内运行，dom在主应用容器下的`webcomponent`内，通过代理 `iframe`的`document`到`webcomponent`，可以实现两者的互联。
将`document`的查询类接口：`getElementsByTagName`、`getElementsByClassName`、`getElementsByName`、`getElementById`、`querySelector`、`querySelectorAll`、`head`、`body`全部代理到`webcomponent`，这样`instance`和`webcomponent`就精准的链接起来。
当子应用发生切换，`iframe`保留下来，子应用的容器可能销毁，但`webcomponent`依然可以选择保留，这样等应用切换回来将`webcomponent`再挂载回容器上，子应用可以获得类似`vue`的`keep-alive`的能力。
## 资料

- [https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)
- [https://www.webcomponents.org/introduction](https://www.webcomponents.org/introduction)
- [https://stenciljs.com/docs/getting-started](https://stenciljs.com/docs/getting-started)  可以使用jsx语法的插件
- [https://wujie-micro.github.io/doc/guide/](https://wujie-micro.github.io/doc/guide/)  腾讯的wujie
- [【第2931期】2023 Web Components 现状](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651262382&idx=1&sn=119f2bc1157d6f17538c0ff0671ffd20&chksm=bd48d42a8a3f5d3cd2721dcebdf4386a59c9ec1b88556aa92d5d7716f15af4b8fe9376493ba9#rd)
- [【第2821期】Web Component入门](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651259938&idx=1&sn=0cf18c4569f09a7a36725bac6ab76137&chksm=bd48dda68a3f54b073a442d153910851a14220d709b98fc7e4715f1f7a9572d03053898de7b4&scene=21#wechat_redirect)
