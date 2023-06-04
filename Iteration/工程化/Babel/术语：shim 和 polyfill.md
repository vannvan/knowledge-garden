## shim
Shim 指的是在一个旧的环境中模拟出一个新 API ，**而且仅靠旧环境中已有的手段实现**，以便所有的浏览器具有相同的行为。主要特征：

- 该 API 存在于现代浏览器中;
- 浏览器有各自的 API 或 可通过别的 API 实现;
- API 的所有方法都被重新实现；
- 拦截 API 调用，并提供自己的实现；
- 是一个优雅降级。

比如：Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器。
## Polyfill
polyfill 是一段代码(或者插件)，提供了那些**开发者们希望浏览器原生提供支持**的功能。程序库先检查浏览器是否支持某个API，如果不支持则加载对应的 polyfill。主要特征：

- 是一个浏览器 API 的 Shim;
- 与浏览器有关;
- 没有提供新的API，只是在 API 中实现缺少的功能;
- 以只需要引入 polyfill ，它会静静地工作;

shim 的概念要比 polyfill 更大一些，可以将 polyfill 理解为专门兼容浏览器 API 的 shim 。简单的说，如果浏览器X支持标准规定的功能，那么 polyfill 可以让浏览器 Y 的行为与浏览器 X 一样。
## 资料

- [https://www.jianshu.com/p/1785f7f79514](https://www.jianshu.com/p/1785f7f79514)

