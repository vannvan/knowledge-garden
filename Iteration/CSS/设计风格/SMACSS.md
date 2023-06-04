## 是什么
SMACSS 表示的是可扩展和模块化 CSS（Scalable and Modular Architecture for CSS）。Jonathan Snook 在其同名的书中提出了这一思想。SMACSS 的基本理念是可扩展和模块化，并给出了在大型项目中管理和组织 CSS 文件的一些原则。SMACSS 把 CSS 样式规则分成若干个不同的类别：

- 基础规则是直接作用于元素的，因此不需要前缀。
- 布局的前缀是 l- 或 layout-，例如 .l-table、.layout-grid 等。
- 模块的前缀是 m- 或模块自身的命名，例如 .m-nav、.card、.field 等。
- 状态的前缀是 is-，例如 .is-active、.is-current 等。
- 主题的前缀是 theme-，例如 .theme-light、.theme-dark 等。

对于不同类别的 CSS 样式，SMACSS 有不同的命名规则。基础类别中样式一般使用元素类型选择器，用来规范元素的初始样式。布局类别中的样式一般使用“l-”作为前缀。状态类别中的样式一般使用“is-”作为前缀。而对于不同的模块，则使用模块的名称作为前缀。
## 风格样例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685431747286-c22b9afe-f79f-413b-be64-afe0f0b55477.png#averageHue=%23ffffff&clientId=ua10cac27-5d0a-4&from=paste&height=382&id=u79e69a79&originHeight=763&originWidth=1720&originalType=binary&ratio=2&rotation=0&showTitle=false&size=51896&status=done&style=none&taskId=u831997e7-1bee-4949-ac22-6decf61bf0c&title=&width=860)






## 资料

- [https://www.toptal.com/css/smacss-scalable-modular-architecture-css](https://www.toptal.com/css/smacss-scalable-modular-architecture-css)
