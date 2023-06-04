## 获取DOM元素
| document.getElementById(id) | 通过id获取dom |
| --- | --- |
| document.getElementsByTagName(tagName) | 通过标签名获取dom |
| document.getElementsByClassName(class) | 通过class获取dom |
| document.getElementsByName(name) | 通过标签的属性name获取dom |
| document.querySelector(选择器) | 通过选择器获取dom |
| document.querySelectorAll(选择器) | 通过选择器获取dom |

## 操作DOM元素
| 方法 | 描述 |
| --- | --- |
| createElement | 创建一个标签节点 |
| createTextNode | 创建一个文本节点 |
| cloneNode(deep) | 复制一个节点，连同属性与值都复制，deep为true时，连同后代节点一起复制，不传或者传false，则只复制当前节点 |
| createDocumentFragment | 创建一个文档碎片节点 |
| appendChild | 追加子元素 |
| insertBefore | 将元素插入前面 |
| removeChild | 删除子元素 |
| replaceChild | 替换子元素 |
| getAttribute | 获取节点的属性 |
| createAttribute | 创建属性 |
| setAttribute | 设置节点属性 |
| romoveAttribute | 删除节点属性 |
| element.attributes | 将属性生成类数组对象 |

## DOM的类型有哪几种？

- 元素节点              Node.ELEMENT_NODE(1)
- 属性节点              Node.ATTRIBUTE_NODE(2)
- 文本节点              Node.TEXT_NODE(3)
- CDATA节点             Node.CDATA_SECTION_NODE(4)
- 实体引用名称节点       Node.ENTRY_REFERENCE_NODE(5)
- 实体名称节点          Node.ENTITY_NODE(6)
- 处理指令节点          Node.PROCESSING_INSTRUCTION_NODE(7)
- 注释节点              Node.COMMENT_NODE(8)
- 文档节点              Node.DOCUMENT_NODE(9)
- 文档类型节点          Node.DOCUMENT_TYPE_NODE(10)
- 文档片段节点          Node.DOCUMENT_FRAGMENT_NODE(11)
- DTD声明节点            Node.NOTATION_NODE(12)
## JS中元素视图的各个尺寸？
| 属性 | 说明 |
| --- | --- |
| offsetLeft | 获取当前元素到定位父节点的left方向的距离 |
| offsetTop | 获取当前元素到定位父节点的top方向的距离 |
| offsetWidth | 获取当前元素 width + **左右padding + 左右border-width** |
| offsetHeight | 获取当前元素 height + **上下padding + 上下border-width** |
| clientWidth | 获取当前元素 width + 左右padding |
| clientHeight | 获取当前元素 height + 上下padding |
| scrollWidth | **当前元素内容真实的宽度**，内容不超出盒子宽度时为盒子的clientWidth |
| scrollHeight | **当前元素内容真实的高度**，内容不超出盒子高度时为盒子的clientHeight |

## Window视图的各个尺寸？
| 属性 | 说明 |
| --- | --- |
| innerWidth | innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏） |
| innerHeight | innerWidth 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏） |

## Document文档视图的各个尺寸？
| 属性 | 说明 |
| --- | --- |
| document.documentElement.clientWidth | 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.clientHeight | 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.offsetHeight | 获取整个文档的高度（包含body的margin） |
| document.body.offsetHeight | 获取整个文档的高度（不包含body的margin） |
| document.documentElement.scrollTop | 返回文档的滚动top方向的距离（当窗口发生滚动时值改变） |
| document.documentElement.scrollLeft | 返回文档的滚动left方向的距离（当窗口发生滚动时值改变） |



