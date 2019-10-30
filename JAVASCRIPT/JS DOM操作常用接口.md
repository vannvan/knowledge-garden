## document方法

### 创建型API

创建型api主要包括`createElement`，`createTextNode`，`cloneNode`和`createDocumentFragment`四个方法，需要注意下面几点：

- 它们创建的节点只是一个孤立的节点，要通过`appendChild`添加到文档中
- `cloneNode`要注意如果被复制的节点是否包含子节点以及事件绑定等问题
- 使用`createDocumentFragment`来解决添加大量节点时的性能问题

### 页面修改型API

修改页面内容的api主要包括：`appendChild`，`insertBefore`，`removeChild`，`replaceChild`。修改页面内容的api主要包括：`appendChild`，`insertBefore`，`removeChild`，`replaceChild`。要注意几个特点：

- 不管是新增还是替换节点，如果新增或替换的节点是原本存在页面上的，则其原来位置的节点将被移除，也就是说同一个节点不能存在于页面的多个位置
- 节点本身绑定的事件会不会消失，会一直保留着。

### 节点查询型API

- document.getElementById
- document.getElementsByTagName
- document.getElementsByName
- document.getElementsByClassName
- document.querySelector和document.querySelectorAll:通过css选择器来查找元素，注意选择器要符合CSS选择器的规则,使用的深度优先搜索来获取元素

### 节点关系型API

1.父关系型api

- parentNode：Element的父节点可能是Element，Document或DocumentFragment。
- parentElement：与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null

2.兄弟关系型api

- previousSibling：节点的前一个节点，如果该节点是第一个节点，则为null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
- previousElementSibling：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。
- nextSibling：节点的后一个节点，如果该节点是最后一个节点，则为null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。
- nextElementSibling：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。

3.子关系型api

- childNodes：返回一个即时的NodeList，表示元素的子节点列表，子节点可能会包含文本节点，注释节点等。
- children：一个即时的HTMLCollection，子节点都是Element，IE9以下浏览器不支持。
- firstNode：第一个子节点
- lastNode：最后一个子节点
- hasChildNodes方法：可以用来判断是否包含子节点。

### 元素属性型API

- setAttribute：根据名称和值修改元素的特性eg:element.setAttribute(name, value);
- getAttribute返回指定的特性名相应的特性值，如果不存在，则返回null或空字符串.

### 元素样式型API

window.getComutedStyle是用来获取应用到元素后的样式，假设某个元素并未设置高度，而是通过其内容将其高度撑开，这时候要获取它的高度，就要用到getComutedStyle，用法如下：

```js
var style = window.getComputedStyle(element[, pseudoElt]);
```

element是要获取的元素，pseudoElt指定一个伪元素进行匹配。
 返回的style是一个CSSStyleDeclaration对象。
 通过style可以访问到元素计算后的样式
 clientRect是一个DOMRect对象，包含left，top，right，bottom，它是相对于可视窗口的距离，滚动位置发生改变时，它们的值是会发生变化的。除了IE9以下浏览器，还包含元素的height和width等数据.

## Element属性及方法

### element属性

- `Element.id`属性返回指定元素的`id`属性，该属性可读写。
- `Element.tagName`属性返回指定元素的大写标签名
-  `Element.title`属性用来读写当前元素的 HTML 属性`title` 
-  `Element.attributes`属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点
-  `Element.className`属性用来读写当前元素节点的`class`属性。
-  `Element.classList`返回一个伪数组，成员是当前元素节点的每个`class`。
-  `Element.innerHTML`属性返回一个字符串，等同于该元素包含的所有 HTML 代码。
-  `Element.clientHeight`属性返回一个整数值，表示元素节点的 CSS 高度
-  `Element.clientWidth`属性返回元素节点的 CSS 宽度，同样只对块级元素
-  `Element.scrollHeight`属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。
-  `Element.scrollWidth`属性表示当前元素的总宽度（单位像素），其他地方都与`scrollHeight`属性类似。
-  `Element.children`属性返回一个类似数组的对象（`HTMLCollection`实例），包括当前元素节点的所有子元素。
-  `Element.childElementCount`属性返回当前元素节点包含的子元素节点的个数，与`Element.children.length`的值相同。

### element方法

###   `getAttribute()`读取某个属性的值

-  `getAttributeNames()`返回当前元素的所有属性名
-  `setAttribute()`写入属性值
-  `hasAttribute()`某个属性是否存在
-  `hasAttributes()`当前元素是否有属性
-  `removeAttribute()`删除属性
-  `Element.querySelector`接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。
-  `Element.querySelectorAll`接受 CSS 选择器作为参数，返回一个`NodeList`实例，包含所有匹配的子元素。
-  `Element.remove`方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。
-  `Element.getBoundingClientRect`方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息
-  `Element.addEventListener()`：添加事件的回调函数
-  `Element.removeEventListener()`：移除事件监听函数
-  `Element.dispatchEvent()`：触发事件