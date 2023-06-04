## 是什么
`DocumentFragment`节点代表一个文档的片段，本身就是一个完整的 `DOM` 树形结构。它没有父节点，`parentNode`返回null，但是可以插入任意数量的子节点。它不属于当前文档，操作`DocumentFragment`节点，**要比直接操作 **`**DOM**`** 树快得多。**
它一般用于构建一个 DOM 结构，然后插入当前文档。`document.createDocumentFragment`方法，以及浏览器原生的`DocumentFragment`构造函数，可以创建一个空的`DocumentFragment`节点。然后再使用其他 `DOM` 方法，向其添加子节点。
## 场景
最常用的方法是使用 `DocumentFragment` 创建并组成一个 `DOM` 子树，然后使用 Node 接口方法（如：`appendChild()` 或 `insertBefore()`）将其插入到 `DOM` 中。这种情况下会插入片段的所有子节点，并留下一个空的 `DocumentFragment`。因为所有的节点会被一次插入到文档中，所以仅会发生一个重渲染的操作，而不是每个节点分别被插入到文档中从而发生多次重渲染的操作。

该接口在 Web 组件（Web components）中也非常有用：<template> 元素在其 HTMLTemplateElement.content 属性中包含了一个 DocumentFragment。
## 基础使用
```javascript
// <ul id="list"></ul>
const list = document.querySelector('#list')
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']

const fragment = new DocumentFragment()

fruits.forEach((fruit) => {
  const li = document.createElement('li')
  li.textContent = fruit
  fragment.appendChild(li)
})

list.appendChild(fragment)
```
## 渲染一万条数据不卡住页面
```javascript
setTimeout(() => {
  // 插入十万条数据
  const total = 100000
  // 一次插入 20 条，如果觉得性能不好就减少
  const once = 20
  // 渲染数据总共需要几次
  const loopCount = total / once
  let countOfRender = 0
  let ul = document.querySelector('ul')
  function add() {
    // 优化性能，插入不会造成回流
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < once; i++) {
      const li = document.createElement('li')
      li.innerText = Math.floor(Math.random() * total)
      fragment.appendChild(li)
    }
    ul.appendChild(fragment)
    countOfRender += 1
    loop()
  }
  function loop() {
    if (countOfRender < loopCount) {
      window.requestAnimationFrame(add)
    }
  }
  loop()
}, 0)

```
## 资料

- [https://wangdoc.com/javascript/dom/text](https://wangdoc.com/javascript/dom/text#documentfragment-%E8%8A%82%E7%82%B9)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
