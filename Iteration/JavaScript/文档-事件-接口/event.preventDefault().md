# 要点
## 是什么
event.preventDefault() 方法阻止元素发生默认的行为。
## 用法

- 当点击提交按钮时阻止对表单的提交
- 阻止以下 URL 的链接，目前很多网站对于外部连接都会采用这种手段改变a标签的默认行为，进行对外链的内部验证，防止用户被引导去了不明网站
```javascript
<script>
$(document).ready(function(){
  $("a").click(function(event){
    event.preventDefault(); // 点击将不会跳转
  });
});
</script>
<a href="http://w3cschool.cc/">Go to W3Cschool.cc</a>
```
## 浏览器的默认行为
例如：

- 点击一个链接 —— 触发导航（navigation）到该 URL。
- 点击表单的提交按钮 —— 触发提交到服务器的行为。
- 在 <input type="checkbox"> 上的 click —— 选中/取消选中的 input。
- 在文本上按下鼠标按钮并移动 —— 选中文本。
### 场景举例
#### 场景1
考虑一个网站菜单，如下所示：
```javascript
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```
菜单项是通过使用 HTML 链接 <a> 实现的，而不是使用按钮 <button>。这样做有几个原因，例如：

- 许多人喜欢使用“右键单击” —— “在一个新窗口打开链接”。如果我们使用 <button> 或 <span>，这个效果就无法实现。
- 搜索引擎在建立索引时遵循 <a href="..."> 链接。

所以我们在标记（markup）中使用了 <a>。但通常我们打算处理 JavaScript 中的点击。因此，我们应该阻止浏览器默认行为。
```javascript
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;
  // event.preventDefault(); // 点击将不会跳转，下面不使用return的话在这里处理也可以

  let href = event.target.getAttribute('href');
  alert( href ); // ...可以从服务器加载，UI 生成等

  return false; // 阻止浏览器行为（不前往访问 URL）
};
```
如果我们省略 return false，那么在我们的代码执行完毕后，浏览器将执行它的“默认行为” —— 导航至在 href 中的 URL。
#### 场景2
阻止浏览器默认右键行为
```javascript
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```
#### 场景3
链接询问用户是否真的要离开。如果用户不想离开，那就不离开。
```javascript
contents.onclick = function(event) {

  function handleLink(href) {
    let isLeaving = confirm(`Leave for ${href}?`);
    if (!isLeaving) return false;
  }

  let target = event.target.closest('a');

  if (target && contents.contains(target)) {
    return handleLink(target.getAttribute('href'));
  }
};
```
## 总结
如果我们只想通过 JavaScript 来处理事件，那么所有默认行为都是可以被阻止的。
**想要阻止默认行为 —— 可以使用 event.preventDefault() 或 return false。第二个方法只适用于通过 on<event> 分配的处理程序。**
addEventListener 的 passive: true 选项告诉浏览器该行为不会被阻止。这对于某些移动端的事件（像 touchstart 和 touchmove）很有用，用以告诉浏览器在滚动之前不应等待所有处理程序完成。
如果默认行为被阻止，event.defaultPrevented 的值会变成 true，否则为 false。
> ⚠️不要滥用
> 从技术上来说，通过阻止默认行为并添加 JavaScript，我们可以自定义任何元素的行为。例如，我们可以使链接 <a> 像按钮一样工作，而按钮 <button> 也可以像链接那样工作（重定向到另一个 URL 等）。
> 但我们通常应该保留 HTML 元素的语义。例如 <a> 应该表现为导航（navigation），而不是按钮。
> 除了“只是一件好事”之外，这还会使你的 HTML 具有更好的可访问性。


## 资料

- [https://zh.javascript.info/default-browser-action](https://zh.javascript.info/default-browser-action)
