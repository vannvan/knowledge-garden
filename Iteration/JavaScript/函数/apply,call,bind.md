## apply
### 描述
apply() 方法调用**一个具有给定 this 值的函数**，以及以**一个数组（或一个**[**类数组对象**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)**）的形式**提供的参数。
> ⚠️虽然这个函数的语法与 [call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 几乎相同，但根本区别在于，call() 接受一个**参数列表**，而 apply() 接受一个**参数的单数组**。
> 当第一个参数为 [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或 [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，可以使用数组[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)实现类似的结果。

### 语法
```javascript
apply(thisArg)
apply(thisArg, argsArray)
```

- **thisArg **

在 func 函数运行时使用的 this 值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，**则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。**

- **argsArray 可选**

**一个数组或者类数组对象**，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或 [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象
### 返回值
调用有指定 **this** 值和参数的函数的结果。
### 应用示例
#### apply和内置函数
```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2
```
#### 示例2
用apply将数组各项添加到另一个数组
```javascript
const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```
#### 示例3
使用apply链接构造器
```javascript
Function.prototype.construct = function (aArgs) {
  let oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```
使用示例
```javascript
function MyConstructor() {
  for (let nProp = 0; nProp < arguments.length; nProp++) {
    this['property' + nProp] = arguments[nProp];
  }
}

let myArray = [4, 'Hello world!', false];
let myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs 'Hello world!'
console.log(myInstance instanceof MyConstructor); // logs 'true'
console.log(myInstance.constructor);              // logs 'MyConstructor'
```
### ⭐️实现apply
```javascript
Function.prototype.myapply = function (context, args) {
  // 不传默认是全局，window
  context = context || window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  args = args ? args : []
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args)
  // 删除，不污染context
  delete context.fn
  // 返回res
  return res
}
```
## call
### 描述
**call()** 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
> **备注：** 该方法的语法和作用与 [apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是 call() 方法接受的是**一个参数列表**，而 apply() 方法接受的是**一个包含多个参数的数组**。

### 语法
```javascript
function.call(thisArg, arg1, arg2, ...)
```

- **thisArg**

可选的。在 _function_ 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

- **arg1, arg2, ...**

指定的参数列表。
### 返回值
使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。
### 应用示例
#### 调用父构造函数 
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);  // {name: 'feta', price: 5, category: 'food'}
var fun = new Toy('robot', 40); // {name: 'robot', price: 40, category: 'toy'}
```
#### 调用匿名函数
```javascript
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' },
]

for (var i = 0; i < animals.length; i++) {
  ;(function (i) {
    this.print = function () {
      console.log('#' + i + ' ' + this.species + ': ' + this.name)
    }
    this.print()
  }).call(animals[i], i)
}
// #0 Lion: King
// #1 Whale: Fail
```
#### 调用函数并指定上下文的this
```javascript
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```
#### 类数组对象借用数组的方法
```javascript
//类数组对象
var arrayLike = {
  0: "OB",
  1: "Koro1",
  length: 2
};

Array.prototype.push.call(arrayLike, "添加数组项1", "添加数组项2");

console.log(arrayLike);
//>> {"0":"OB","1":"Koro1","2":"添加数组项1","3":"添加数组项2","length":4}
```
#### 不指定第一个参数
```javascript
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```
在严格模式下，this的值将会是undefined
```javascript
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined
```
### ⭐️实现call
```javascript
Function.prototype.mycall = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  args = args ? args : []
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args)
  // 删除，不污染context
  delete context.fn
  // 返回res
  return res
}
```
## bind
### 描述
**bind()** 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
### 语法
```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

- **thisArg**

调用绑定函数时作为 this 参数传递给目标函数的值。如果使用[new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。

- **arg1, arg2, ...**

当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
### 返回值
返回一个原函数的拷贝(新函数)，并拥有指定的 **this** 值和初始参数。
### 应用示例
#### 创建绑定函数
bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 **this** 值
JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：
```javascript
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```
#### 偏函数
bind() 的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);

var list2 = leadingThirtysevenList();
// [37]

var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]

var result2 = addThirtySeven(5);
// 37 + 5 = 42

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42，第二个参数被忽略
```
#### 配合setTimeout
在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window（或 global）对象。当类的方法中需要 this 指向类的实例时，你可能**需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。**
```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后，调用 'declare' 方法
```
#### 保存函数参数
一道经典的面试题
```javascript
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) //>> 6 6 6 6 6
    }, i * 1000);
}
```
造成这个现象的原因是等到`setTimeout`异步执行时,i已经变成6了。如果通过bind在内部返回一个函数，形成闭包，那么每次`i`的变更都会被`bind`保存起来
```javascript
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) //>> 1 2 3 4 5
    }.bind(null, i), i * 1000);
}
```
#### 快捷调用
在你想要为一个需要特定的 this 值的函数创建一个捷径（shortcut）的时候，bind() 也很好用。
你可以用 [Array.prototype.slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以简单地这样写：
```javascript
var slice = Array.prototype.slice;
// ...
slice.apply(arguments);
```
用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 [Function.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype) 的 [apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的绑定函数，并且将 Array.prototype 的 [slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法作为 **this** 的值。这意味着我们压根儿用不着上面那个 apply()调用了。
```javascript
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```
#### 解决回调函数this丢失
```javascript
class Page {
    constructor(callBack) {
        this.className = 'Page';
        this.MessageCallBack = callBack; //回调函数
        this.MessageCallBack('发给注册页面的信息'); // 执行PageA的回调函数
    }
}

class PageA {
    constructor() {
        this.className = 'PageA';
        //问题在下面这句
        this.pageClass = new Page(this.handleMessage);//注册页面 传递回调函数 
    }

    // 与页面通信回调
    handleMessage(msg) {
        console.log('处理通信', this.className, msg); // 'Page' this指向错误
    }
}

new PageA();
```
丢失是因为传递过去的this.handleMessage是函数内存地址，没有附带上下文对象，也就是说该函数this.handleMessage没有绑定它的this指向。
采用bind绑定this指向
```javascript
this.pageClass = new Page(this.handleMessage.bind(this));
//绑定回调函数的this指向
```
另外箭头函数也可以解决
```javascript
this.pageClass = new Page(() => this.handleMessage());
//箭头函数绑定this指向
```
### ⭐️实现bind
```javascript
Function.prototype.mybind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // 把this存到fn，这里的this是调用的函数
  let fn = this
  return function newFn (...fnArgs) {
    let res
    // 要考虑新函数是不是会当作构造函数
    if (this instanceof newFn) {
      // 如果是构造函数则调用new 并且合并参数args，fnArgs
      res = new fn(...args, ...fnArgs)
    } else {
      // 当作普通函数调用 也可以用上面定义的_call
      res = fn.call(context, ...args, ...fnArgs)
    }
    return res
  }
}
```
## ⭐️总结
### 语法总结
```javascript
func.call(thisArg, param1, param2, ...)//func是个函数

func.apply(thisArg, [param1,param2,...])

func.bind(thisArg, param1, param2, ...)
```
### 特征
每个函数都包含两个非继承而来的方法：call()方法和apply()方法。因此请注意只有函数才有这些方法(包括bind)。
`call`和`apply`可以用来**重新定义函数的执行环境**，也就是this的指向；call和apply都是为了改变某个函数运行时的context，即上下文而存在的，换句话说，就是为了改变函数体内部this的指向。
### 关于thisArg

- `func`的`this`指向`thisArg`对象  
- 非严格模式下，若`thisArg`指定为`null`,`undefined`,则`func`的`this`指向window
- 严格模式下，`func`的`this`为`undefined`
- 值为原始值的`this`会指向该原始值的自动包装对象
### call和apply的相同点
`call`和`apply`方法的相同点就是这两个方法的作用是一样的。都是在特定的作用域中调用函数，等于设置函数体内this对象的值，以**扩充函数赖以运行的作用域**。
一般来说，this总是指向调用某个方法的对象，但是使用`call`和`apply`方法时，就会改变this的指向
### call/apply/bind的区别
**执行：**

- `call`/`apply`改变了函数的`this`的指向并**立即执行该函数**；
- `bind`则是返回改变了`this`指向后的函数，**不执行该函数，会返回一个新的函数**。

**返回值：**

- `call`/`apply` 返回`func`的执行结果；
- `bind`返回`func`的拷贝，并指定了`func`的`this`指向，保存了`func`的参数

**另外：**
`call`和`bind`的接收的参数相同，第一个参数表示将要改变的函数执行主体，第二个参数开始到最后一个参数表示函数接收的参数；
`apply`的第一个参数与`call`和`bind`相同，但第二个参数时数组，如果第二个参数不是有效数组或`arguments`对象就会报错。
### call,apply,bind的核心理念-借用方法
A对象有个方法，B对象因为某种原因也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？
当然是借用 A 对象的方法更便捷，既达到了目的，又节省了内存。
### call和apply应该用哪个？

- **参数数量/顺序确定就用call，参数数量/顺序不确定的话就用apply**。
- 考虑可读性：参数数量不多就用call，参数数量比较多的话，把参数整合成数组，使用apply。
- 参数集合已经是一个数组的情况，用apply，比如上文的获取数组最大值/最小值。
## 资料

- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [【详解】如何手写实现call、apply、bind_手写apply_码上游的博客-CSDN博客](https://blog.csdn.net/pakerder/article/details/127121988)
- [壹.2.4 深入理解 call、apply、bind - 前端内参](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.4#6.-bind-de-ying-yong-chang-jing)
