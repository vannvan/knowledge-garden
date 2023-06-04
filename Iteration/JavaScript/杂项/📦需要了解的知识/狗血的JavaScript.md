## [] 等于 ![] ⭐️
```javascript
[] == ![]; // -> true
```
抽象相等运算符会将其两端的表达式转换为数字值进行比较，尽管这个例子中，左右两端均被转换为 0，但原因各不相同。数组总是真值（truthy）,因此右值的数组取反后总是为 false，然后在抽象相等比较中被被类型转换为 0。而左值则是另一种情形，空数组没有被转换为布尔值的话，尽管在逻辑上是真值（truthy），但在抽象相等比较中，会被类型转换为数字 0。
实际运算如下：
```javascript
+[] == +![];
0 == +false;
0 == 0;
true;
```
## [] 和 null 是对象⭐️
```javascript
typeof []; // -> 'object'
typeof null; // -> 'object'

// 然而
null instanceof Object; // false
```
根据规范，typeof 操作符返回一个字符串，且必须符合 [Table 37:typeof操作符 返回值](https://262.ecma-international.org/12.0/#table-typeof-operator-results)。对于没有实现 [[Call]] 的 null、普通对象、标准特异对象和非标准特异对象，它返回字符串 "object“。
## true 不等于 ![]，也不等于 []⭐️
```javascript
true == []; // -> false
true == ![]; // -> false

false == []; // -> true
false == ![]; // -> true
```
## true 是 false
```javascript
!!"false" == !!"true"; // -> true
!!"false" === !!"true"; // -> true
```
考虑一下步骤
```javascript
// true 是真值（truthy），并且隐式转换为数字1，而字符串 'true' 会被转换为 NaN。
true == "true"; // -> false
false == "false"; // -> false

// 'false' 不是空字符串，所以它的值是 true
!!"false"; // -> true
!!"true"; // -> true
```
## NaN 不是 NaN
```javascript
NaN === NaN; // -> false
```
规范严格定义了这种行为背后的逻辑：
> 1. 如果 Type(x) 不同于 Type(y)，返回 **false**。
> 2. 如果 Type(x) 数值, 然后
>    1. 如果 x 是 **NaN**，返回 **false**。
>    2. 如果 y 是 **NaN**，返回 **false**。
>    3. ……
> 
— [7.2.14严格模式相等比较](https://www.ecma-international.org/ecma-262/#sec-strict-equality-comparison)

根据 IEEE 对 NaN 的定义：
> 有四种可能的相互排斥的关系：小于、等于、大于和无序。当比较操作中至少一个操作数是 NaN 时，便是无序的关系。换句话说，NaN 对任何事物包括其本身比较都应当是无序关系。

## 奇怪的 Object.is() 和 ===
```javascript
Object.is(NaN, NaN); // -> true
NaN === NaN; // -> false

Object.is(-0, 0); // -> false
-0 === 0; // -> true

Object.is(NaN, 0 / 0); // -> true
NaN === 0 / 0; // -> false
```
## [] 是真值，但不等于 true⭐️
```javascript
!![]       // -> true
[] == true // -> false
```
## null 是假值，但又不等于 false⭐️
```javascript
!!null; // -> false
null == false; // -> false
```
但是，别的被当作假值的却等于 false，如 0 或 ''。
```javascript
0 == false; // -> true
"" == false; // -> true
```
## 最小值大于零
```javascript
Number.MIN_VALUE > 0; // -> true
```
## 数组相加⭐️
```javascript
[1, 2, 3] + [4, 5, 6]; // -> '1,2,34,5,6'
```
过程原理
```javascript
[1, 2, 3] +
  [4, 5, 6][
    // 调用 toString()
    (1, 2, 3)
  ].toString() +
  [4, 5, 6].toString();
// 串联
"1,2,3" + "4,5,6";
// ->
("1,2,34,5,6");
```
## 数组中的尾逗号
假设你想要创建了一个包含 4 个空元素的数组。如下所示，最终只能得到一个包含三个元素的数组，原因在于尾逗号：
```javascript
let a = [, , ,];
a.length; // -> 3
a.toString(); // -> ',,'
```
## 数组的相等性是深水猛兽⭐️
```javascript
[] == ''   // -> true
[] == 0    // -> true
[''] == '' // -> true
[0] == 0   // -> true
[0] == ''  // -> false
[''] == 0  // -> true

[null] == ''      // true
[null] == 0       // true
[undefined] == '' // true
[undefined] == 0  // true

[[]] == 0  // true
[[]] == '' // true

[[[[[[]]]]]] == '' // true
[[[[[[]]]]]] == 0  // true

[[[[[[ null ]]]]]] == 0  // true
[[[[[[ null ]]]]]] == '' // true

[[[[[[ undefined ]]]]]] == 0  // true
[[[[[[ undefined ]]]]]] == '' // true
```
## undefined 和 Number⭐️
```javascript
Number(); // -> 0
Number(undefined); // -> NaN
```
根据规范：

1. 若无参数调用该函数，n 将为 +0。
2. 否则，n 将为？ToNumber(value)。
3. 如果值为 undefined，ToNumber(undefined) 应该返回 NaN。
## parseInt 是一个坏蛋
```javascript
parseInt("f*ck"); // -> NaN
parseInt("f*ck", 16); // -> 15
```
> 这是因为 parseInt 会**持续解析直到它解析到一个不识别的字符**，'f*ck' 中的 f 是 16 进制下的 15。

## true 和 false 的数学运算⭐️
```javascript
true + true; // -> 2
(true + true) * (true + true) - true; // -> 3
```
一元加运算符会尝试将其值转换成数字。它可以转换字符串形式表达的整数和浮点数，以及非字符串值 true、false 和 null。如果它不能解析特定的值，它将转化为 NaN。这意味着我们可以有更简便的方式将 true 转换成 1：
```javascript
+true; // -> 1
```
当你执行加法或乘法时，将会 ToNumber 方法。根据规范，该方法的返回值为：
> 如果参数是 **true**，返回 **1**。如果参数是 **false**，则返回 **+0**。

## 神奇的数字增长
```javascript
999999999999999; // -> 999999999999999
9999999999999999; // -> 10000000000000000

10000000000000000; // -> 10000000000000000
10000000000000000 + 1; // -> 10000000000000000
10000000000000000 + 1.1; // -> 10000000000000002
```
> 这是由 IEEE 754-2008 二进制浮点运算标准引起的。极大的数字会被四舍五入到最近的偶数。

## 三个数字的比较⭐️
```javascript
1 < 2 < 3; // -> true
3 > 2 > 1; // -> false
```
工作原理
```javascript
1 < 2 < 3; // 1 < 2 -> true
true < 3; // true -> 1
1 < 3; // -> true

3 > 2 > 1; // 3 > 2 -> true
true > 1; // true -> 1
1 > 1; // -> false
```
## 字符串不是 String 的实例⭐️
```javascript
"str"; // -> 'str'
typeof "str"; // -> 'string'
"str" instanceof String; // -> false
```
String 构造函数返回一个字符串：
```javascript
typeof String("str"); // -> 'string'
String("str"); // -> 'str'
String("str") == "str"; // -> true
```
再试试 new：
```javascript
new String("str") == "str"; // -> true
typeof new String("str"); // -> 'object'
new String("str"); // -> [String: 'str']
```
## 访问原型 __proto__
我们知道，原始数据（premitives）是没有原型的。但是，如果我们尝试获取原始数据的 __proto__ 属性的值，我们会得到这样的一个结果
```javascript
(1).__proto__.__proto__.__proto__; // -> null

(1).__proto__; // -> [Number: 0]
(1).__proto__.__proto__; // -> {}
(1).__proto__.__proto__.__proto__; // -> null
```
## 阴险的 try..catch
```javascript
(() => {
  try {
    return 2;
  } finally {
    return 3;
  }
})();
// 3
```
## 棘手的箭头函数⭐️
```javascript
let f = () => 10;
f(); // -> 10

let f = () => {};
f(); // -> undefined
```
这是因为花括号是箭头函数语法的一部分，所以 f 会返回 undefined。不过要从箭头函数明确返回 {} 对象也是有可能的，这时你需要用括号把返回值括起来。
```javascript
let f = () => ({});
f(); // -> {}
```
## 棘手的返回⭐️
```javascript
(function() {
  return
  {
    b: 10;
  }
})(); // -> undefined
```
return 和返回的表达式必须在同一行:
```javascript
(function() {
  return {
    b: 10
  };
})(); // -> { b: 10 }
```
这是因为一个叫自动分号插入的概念，它会在大部分换行处插入分号。第一个例子里，return 语句和对象字面量中间被插入了一个分号。所以函数返回 undefined，其后的对象字面量永远不会被求值。
## Number.toFixed() 显示不同的数字
```javascript
(0.7875).toFixed(3);
// Firefox: -> 0.787
// Chrome: -> 0.787
// IE11: -> 0.788
(0.7876).toFixed(3);
// Firefox: -> 0.788
// Chrome: -> 0.788
// IE11: -> 0.788
```
尽管你的第一直觉可能是 IE11 是正确的而 Firefox/Chrome 错了，事实是 Firefox/Chrome 更直接地遵循数字运算的标准（IEEE-754 Floating Point），而 IE11 经常违反它们（可能）去努力得出更清晰的结果。
浮点数在计算机内部不是以一系列十进制数字的形式存储的，而是通过一个可以产生一点点通常会被 toString 或者其他调用取整的不准确性的更复杂的方法，但它实际上在内部会被表示。
## min 大于 max
```javascript
Math.min() > Math.max(); // -> true
Math.min() < Math.max(); // -> false
```
这是一个简单的例子。我们一步一步来：
```javascript
Math.min(); // -> Infinity
Math.max(); // -> -Infinity
Infinity > -Infinity; // -> true
```
为什么是这样呢？其实 Math.max() 并不会返回最大的正数，即 Number.MAX_VALUE。
Math.max 接受两个参数，将它们转换到数字，比较之后返回最大的那个。若没有传入参数，结果将是 -∞。若参数中存在 NaN，则返回 NaN。
反过来，当 Math.min 没有传入参数，会返回 ∞。
## Array.prototype.sort() 的默认行为⭐️
```javascript
[ 10, 1, 3 ].sort() // -> [ 1, 10, 3 ]
```
默认的排序算法基于将给定元素转换为字符串，然后比较它们的 UTF-16 序列中的值。
## {}{} 是 undefined
```javascript
{}{}; // -> undefined
{}{}{}; // -> undefined
{}{}{}{}; // -> undefined
{foo: 'bar'}{}; // -> 'bar'
{}{foo: 'bar'}; // -> 'bar'
{}{foo: 'bar'}{}; // -> 'bar'
{a: 'b'}{c:' d'}{}; // -> 'd'
{a: 'b', c: 'd'}{}; // > SyntaxError: Unexpected token ':'
({}{}); // > SyntaxError: Unexpected token '{'
```
解析到 {} 会返回 undefined，而解析 {foo: 'bar'}{}时，表达式 {foo: 'bar'} 返回 'bar'。
{} 有两重含义：表示对象，或表示代码块。例如，在 () => {} 中的 {} 表示代码块。所以我们必须加上括号：() => ({}) 才能让它正确地返回一个对象。
因此，我们现在将 {foo: 'bar'} 当作代码块使用，则可以在终端中这样写：
```javascript
if (true) {
  foo: "bar";
} // -> 'bar'
```
## arguments 绑定
```javascript
function a(x) {
  arguments[0] = "hello";
  console.log(x);
}

a(); // > undefined
a(1); // > "hello"
```
arguments 是一个类数组对象，包含了所有传入当前函数的参数。当没有传入参数时，该对象中就不存在 x 属性，也就无法覆盖。
## 没有尽头的计时⭐️
```javascript
setTimeout(() => console.log("called"), Infinity); // -> <timeoutId>
// > 'called'
```
结果是，它会**立即运行**，并没有等待无限长的时间。
通常运行时内部会将延时存储为一个 32 位的有符号整数，而上述代码会导致运行时在解析延时参数时发生整数溢出，从而使函数立即执行而不等待。
## setTimeout 对象
如果我们给 setTimeout 的回调函数参数传非函数值会发生什么？
```javascript
setTimeout(123, 100); // -> <timeoutId> 
// > 'called'
```
没问题
```javascript
setTimeout('{a: 1}', 100); // -> <timeoutId>
// > 'called'
```
```javascript
setTimeout({a: 1}, 100); // -> <timeoutId> 
> 'Uncaught SyntaxError: Unexpected identifier  
```
这种错误很容易发生，尤其是当你有个函数返回一个对象，但是你忘了将其传进函数，直接就在这里调用了！不过，如果 content-policy 设置为 self 会怎么样呢？
```javascript
setTimeout(123, 100); // -> <timeoutId>
// > console.error("[Report Only] Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'report-sample' 'self' ")
// [仅报告] 拒绝将字符串当作JavaScript求值，因为内容安全策略（CSP，Content Security Policy）指令被设置为 "script-src 'report-sample' 'self'"，在该指令模式下不允许 'unsafe-eval' 的脚本源。
```
## 点点运算符
现在尝试把一个数字转换到字符串：
```javascript
27.toString() // > Uncaught SyntaxError: Invalid or unexpected token
// 未捕获的语法错误：非法或非预期的词元（token）
```
```javascript
27..toString(); // -> '27'
27 .toString() // 空格也可以
```
这是文法的限制。
. 运算符存在歧义，它既可以当属性访问符，也可以是小数点，这取决于它在代码中的位置。
规范中定义了 . 运算符仅在特定的位置使用时会被当作小数点，这个定义写在 ECMAScript 的数字字面量语法一节中。
所以，当你想要在数字后加属性访问器的点号时，应当加上括号，或再加上一个点，以使该表达式合法。
## 用空格分割（split）字符串
```javascript
"".split(""); // -> []
// 但是……
"".split(" "); // -> [""]
```
这是预期行为。它会在输入的字符串中遍历，一旦发现分隔符，就在此处分割。但若你传入的是空字符串，它找不到分隔符，因此返回该字符串。
规范引用如下：
> 它会从左向右搜索字符串，并根据 separator（分隔符）决定子字符串的分割位置；分割位置的字符仅用于分割，不会包含在返回的数组中。


## 资料

- [https://github.com/denysdovhan/wtfjs/](https://github.com/denysdovhan/wtfjs/blob/master/README-zh-cn.md#%E4%B8%89%E4%B8%AA%E6%95%B0%E5%AD%97%E7%9A%84%E6%AF%94%E8%BE%83)
