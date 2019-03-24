#ES6扩展运算符的妙用

多亏了ES6和像Babel这样的转换器，书写JavaScript代码已经变得难以想象的有活力，从新的语法到可以自定义解析的JSX。我是展开运算符的一位铁粉，三个点`...`将会改变你使用JS完成任务的方式。以下是我在JS中最喜欢的展开运算符的用法！

## 不使用Apply的函数调用

我们经常使用`Function.prototype.apply`，传递一个数组作为参数，使用数组中存放的一组参数调用一个函数。

```javascript
function doStuff (x, y, z) { }
var args = [0, 1, 2];

// 调用函数，传递args参数
doStuff.apply(null, args);
```

采用展开用算符我们能够在避免使用`apply`的同时，轻易的调用函数。只需在数组前加上展开运算符即可。

```javascript
doStuff(...args);
```

这段代码变得更短，更清晰，并且不需要使用多余的`null`!

## 合并数组

已经有[好多种合并数组的方法](https://link.jianshu.com?t=https://davidwalsh.name/combining-js-arrays)，但是展开运算符带来了一种全新的方式。

```javascript
arr1.push(...arr2) // 将arr2 追加到数组的末尾
arr1.unshift(...arr2) // 将arr2 追加到数组的开头
```

如果你想要整合两个数组，并且想把某个数组放在另一个数组的任意特定位置上，你可以这么做：

```javascript
var arr1 = ['two', 'three'];
var arr2 = ['one', ...arr1, 'four', 'five'];

// ["one", "two", "three", "four", "five"]
```

这是一种比其他方式更短的语句！

## 拷贝数组

得到一份数组的拷贝是很常见的任务，过去我们使用[Array.prototype.slice](https://link.jianshu.com?t=https://davidwalsh.name/javascript-clone-array)来做，但现在我们可以使用展开运算符：

```javascript
var arr = [1,2,3];
var arr2 = [...arr]; // 和arr.slice()差不多
arr2.push(4)
```

记住：数组中的对象依然是引用值，所以不是任何东西都“拷贝”过去了。

## 将`arguments`或者`NodeList`转换为Array

像拷贝数组一样，我们常常使用`Array.Prototype.slice`来将`NodeList`和`arguments`这种类数组对象转换为真正的数组。但是现在我们能够用展开运算符轻易的实现这项任务：

```javascript
[...document.querySelectorAll('div')]
```

使用此法，你甚至可以像数组一样获取参数。

```javascript
var myFn = function(...args) {
// ...
}
```

别忘了你也能用`Array.from`达成相同的目的！

## 使用`Math`函数

当然了，展开运算符将数组“展开”成为不同的参数，所以任何可接收任意数量的参数的函数，都能够使用展开运算符来传参。

```
let numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
```

`Math`对象的一系列的方法，正是展开运算符作为唯一参数传递给函数的完美例子。

## 解构的乐趣

解构是一项很棒的实践方法，我在自己的React项目中以及Node.js 程序中大量的使用到它。你能够使用解构和展开运算符将信息解压到你想要的变量中去：

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

剩余的属性被分配到了展开运算符之后的z变量中。

ES6不仅仅使JS变得更高效，也使其更有趣。现代浏览器都已支持ES6的新语句，所以如果你还没有花时间好好把玩一番的话，那你一定要试一下。如果你不想考虑太多的环境问题实验一下的话，确保你已查看了我的这篇文章 [Getting Started with ES6](https://link.jianshu.com?t=https://davidwalsh.name/es2015-babel)。无论如何，展开运算符，是你应该知道的一种在JS中超有用的功能！

 

 

 

 

 