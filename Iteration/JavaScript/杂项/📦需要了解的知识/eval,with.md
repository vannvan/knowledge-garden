## eval
### 特点
调用 eval(code) 会运行代码字符串，并返回最后一条语句的结果。

- 在现代 JavaScript 编程中，很少使用它，通常也不需要使用它。
- 可以访问外部局部变量。这被认为是一个不好的编程习惯。
- 要在全局作用域中 eval 代码，可以使用 window.eval(code) 进行替代。
- 通过eval()定义的任何变量和函数都不会被提升。
- 此外，如果你的代码需要从外部作用域获取数据，请使用 new Function，并将数据作为参数传递给函数。
- **eval() 通常比其他替代方法更慢，因为它必须调用 JS 解释器，而许多其他结构则可被现代 JS 引擎进行优化。**

在严格模式下，在eval()内部创建的变量和函数无法被外部访问
```javascript
"use strict";
eval = "hi";   // 导致错误
```
### 基础使用
```javascript
console.log(eval('2 + 2'));
// expected output: 4
console.log(eval(new String('2 + 2')));
// expected output: 2 + 2
console.log(eval('2 + 2') === eval('4'));
// expected output: true
console.log(eval('2 + 2') === eval(new String('2 + 2')));
// expected output: false
```
```javascript
// 使用eval的糟糕代码:
function looseJsonParse(obj){
    return eval("(" + obj + ")");
}
console.log(looseJsonParse(
   "{a:(4-1), b:function(){}, c:new Date()}"
))
// 不用eval的更好的代码:
function looseJsonParse(obj){
    return Function('"use strict";return (' + obj + ')')();
}
console.log(looseJsonParse(
   "{a:(4-1), b:function(){}, c:new Date()}"
))
```
### qiankun就用到了eval
qiankun 一共有 3 种沙箱：

- SnapshotSandbox：记录 `window` 对象，每次 `unmount` 都要和微应用的环境进行 `Diff`
- LegacySandbox：在微应用修改 `window.xxx` 时直接记录 `Diff`，将其用于环境恢复
- ProxySandbox：为每个微应用分配一个 `fakeWindow`，当微应用操作 `window` 时，其实是在 `fakeWindow` 上操作

要和这些沙箱结合起来使用，`qiankun` 会把要执行的 JS 包裹在立即执行函数中，通过绑定上下文和传参的方式来改变 `this` 和 `window` 的值，让它们指向 `window.proxy` 沙箱对象，最后再用 `eval` 来执行这个函数。
## with
### 概念
with语句的用途是将代码作用域设置为特定的对象，其语法是：
```javascript
with (expression) statement;
```
使用with语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利，如下面的例子所示：
```javascript
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;
```
上面代码中的每一行都用到了location对象。如果使用with语句，就可以少写一些代码：
```javascript
with(location) {
  let qs = search.substring(1);
  let hostName = hostname;
  let url = href;
}
```
这里，with语句用于连接location对象。这意味着在这个语句内部，每个变量首先会被认为是一个局部变量。如果没有找到该局部变量，则会搜索location对象，看它是否有一个同名的属性。如果有，则该变量会被求值为location对象的属性。
### 要点

- 由于with语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用with语句。
- 严格模式不允许使用with语句，否则会抛出错误。
### Vue中的with
```javascript
function render () {
  with (this) {
    return _c('div',{on:{"click":change}},[_c('span',[_v(_s(number))]),_v(" "),_c('span',     [_v(_s(name))])])
  }
}
```
因为with 的作用域和模板的作用域正好契合，可以极大地简化模板编译过程。而with的代码量很少，把作用域的处理交给JS引擎来做也更可靠。用 webpack + vue 的时候，最终生成的代码是没有 with 的。
## 总结
非必要情况下它们俩都不推荐使用
## 资料

- [https://zh.javascript.info/eval](https://zh.javascript.info/eval)
- [Qiankun原理详解JS沙箱是如何做隔离](https://www.jb51.net/article/264077.htm)
- [js-eval()](https://www.zhihu.com/tardis/bd/art/391365411)
