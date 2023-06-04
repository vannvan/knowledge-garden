## 要点
### 没有块级作用域
用 var 声明的变量，不是函数作用域就是全局作用域。它们在代码块外也是可见的（也就是说，**var 声明的变量只有函数作用域和全局作用域，没有块级作用域**）。
```javascript
if (true) {
  var test = true; // 使用 "var" 而不是 "let"
}

alert(test); // true，变量在 if 结束后仍存在
```
如果一个代码块位于函数内部，那么 var 声明的变量的作用域将为函数作用域：
```javascript
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 能正常工作
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```
### 允许重复声明
```javascript
var user = "Pete";

var user = "John"; // 这个 "var" 无效（因为变量已经声明过了）
// ……不会触发错误

alert(user); // John
```
### 变量提升
“var” 声明的变量，可以在其声明语句前被使用
当函数开始的时候，就会处理 var 声明（脚本启动对应全局变量）。
换言之，var 声明的变量会在函数开头被定义，与它在代码中定义的位置无关（这里不考虑定义在嵌套函数中的情况）。
```javascript
function sayHi() {
  phrase = "Hello";

  alert(phrase);

  var phrase;
}
sayHi();
```
从技术上来讲，它和下面的情况是一样的
```javascript
function sayHi() {
  var phrase;

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```
### **声明会被提升，但是赋值不会**
```javascript
function sayHi() {
  alert(phrase);

  var phrase = "Hello";
}

sayHi();
```
var phrase = "Hello" 这行代码包含两个行为：

1. 使用 var 声明变量
2. 使用 = 给变量赋值。
### 变量提升带来的问题

1. 变量容易在不被察觉的情况下被覆盖掉
```javascript
var myname = "bob"
function showName(){
  console.log(myname);
  if(0){
    var myname = "smith"
  }
  console.log(myname);
}
showName()
```

2. 本该销毁的变量没被销毁
```javascript
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i); 
}
foo()
```
以上最终打印的结果是 7 ，这同样也是由变量提升而导致的，在创建执行上下文阶段，变量 i 就已经被提升了，所以当 for 循环结束之后，变量 i 并没有被销毁。
## 总结

1. let 和 var 主要有两个区别
- var 声明的变量没有块级作用域，它们仅在当前函数内可见，或者全局可见（如果变量是在函数外声明的）。
- var 变量声明在函数开头就会被处理（脚本启动对应全局变量）。
2. var 带来的“变量提升”效果只会提升声明，而不会提升赋值
3. var 声明的变量是可以重复声明的
## 资料

- [https://zh.javascript.info/var](https://zh.javascript.info/var)
