## 是什么
ACSS 表示的是原子化 CSS（Atomic CSS），是 Yahoo 提出来的一种独特的 CSS 代码组织方式，应用在 Yahoo 首页和其他产品中。ACSS 的独特性在于它的理念与一般开发人员的理解有很大的不同，并挑战了传统意义上编写 CSS 的最佳实践，也就是关注点分离原则。ACSS 认为关注点分离原则会导致冗余、繁琐和难以维护的 CSS 代码。
ACSS 的原则是把 CSS 样式打散成尽可能小的部分，每个 CSS 类只对应一条样式规则，从而达到最大化的可复用性。比如 CSS 类 M(10px)所对应的样式规则是 margin: 10px。在应用 CSS 样式时，只需要在把所需要的原子化 CSS 类名添加到 DOM 元素上即可。ACSS 提供了 Atomizer 工具来生成最终的 CSS 样式文件。
在 HTML 页面中，按照 ACSS 的命名方式添加所需要的原子化 CSS 类名，再使用 Atomizer 工具来解析 HTML 页面并生成对应的 CSS 文件。使用 ACSS 的多媒体对象示例:
ACSS 的好处在于所生成的 CSS 文件只包含必须的内容，而且冗余很少，可以减少 CSS 文件的尺寸，提高性能。另外 CSS 类所对应的样式规则是不变的，这使得在不同的项目和组件之间共享 CSS 变得很容易。比如在使用传统的方式时，同样是名称为 header 的 CSS 类，其所实际表示的样式规则在不同的项目中可能完全不同。而在 ACSS 里面，名称为 M(10px)的 CSS 类所表示的样式规则永远都是 margin: 10px。ACSS 可能的缺点在于它与大多数开发人员所理解的最佳实践差异很大，可能不容易被接受。
## 风格样例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685431347995-31cdd1f8-b678-4c66-8e0b-a62003f48737.png#averageHue=%23fcfbfa&clientId=ua401187c-0fe9-4&from=paste&height=469&id=ud545ca13&originHeight=938&originWidth=2952&originalType=binary&ratio=2&rotation=0&showTitle=false&size=595576&status=done&style=none&taskId=u29c63962-09ef-40cb-a591-acc15532151&title=&width=1476)



## 资料

- [CSS 代码组织和管理规范BEM，OOCSS，SMACSS，ACSS](https://codeleading.com/article/76724160987/)
