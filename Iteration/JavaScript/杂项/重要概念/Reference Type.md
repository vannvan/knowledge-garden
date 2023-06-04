## 什么情况
一个动态执行的方法调用可能会丢失 this。
```javascript
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // 正常运行

// 现在让我们基于 name 来选择调用 user.hi 或 user.bye
(user.name == "John" ? user.hi : user.bye)(); // Error!
```
在最后一行有个在 user.hi 和 user.bye 中做选择的条件（三元）运算符。当前情形下的结果是 user.hi，理想的情况我们认为它会执行user.hi()，但实际情况非也！为什么呢，因为在该调用中this变成了undefined。又为什么呢？？
接着深入了解一下obj.method()调用运行的本质
### Reference Type解读
对于obj.method()调用实际上是完成以下两个操作

- 首先，点"."取了obj.method的值
- 接着 () 执行了它

那么，this 的信息是怎么从第一部分传递到第二部分的呢？
如果我们将这些操作放在不同的行，this 必定是会丢失的：
```javascript
let user = {
  name: "John",
  hi() { alert(this.name); }
};

// 把获取方法和调用方法拆成两行
let hi = user.hi;
hi(); // 报错了，因为 this 的值是 undefined
```
这里 hi = user.hi 把函数赋值给了一个变量，接下来在最后一行它是完全独立的，所以这里没有 this。
**为确保 user.hi() 调用正常运行，JavaScript 玩了个小把戏 —— 点 '.' 返回的不是一个函数，而是一个特殊的 **[Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type)** 的值。**
Reference Type 是 ECMA 中的一个“规范类型”。我们不能直接使用它，但它被用在 JavaScript 语言内部。
Reference Type 的值是一个**三个值的组合 (base, name, strict)，**其中：

- base 是对象。
- name 是属性名。
- strict 在 use strict 模式下为 true。

对属性user.hi访问的结果不是一个函数，而是一个Reference Type的值，对于use.hi，在严格模式下是
```javascript
// Reference Type 的值
(user, "hi", true)
```
当 () 被在Reference Type上调用时，它们会接收到关于对象和对象的方法的完整信息，然后可以设置正确的 this（在此处 =user）。
Reference Type 是一个特殊的“中间人”内部类型，目的是从 . 传递信息给 () 调用。
**任何例如赋值 hi = user.hi 等其他的操作，都会将 Reference Type 作为一个整体丢弃掉，而会取 user.hi（一个函数）的值并继续传递。所以任何后续操作都“丢失”了 this。**
因此，this 的值仅在函数直接被通过点符号 obj.method() 或方括号 obj['method']() 语法（此处它们作用相同）调用时才被正确传递。还有很多种解决这个问题的方式，比如bind()
### 示例
```javascript
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

1. 是一个很常规的调用，没问题
2. 前面的括号没有改变执行的顺序，点符号总是先执行
3. 点之前有个等号，阻碍了正常的执行顺序，相当于
```javascript
method = obj.go
method()  // 那不完犊子嘛，没有this了
```

4. 和3同样，| | 也阻碍了正常的调用顺序

⚠️因此谨记：除了方法调用之外的任何操作（如赋值 = 或 ||），都会把它转换为一个**不包含允许设置 this 信息**的普通值。

## 资料

- [https://zh.javascript.info/reference-type](https://zh.javascript.info/reference-type)
