## 语法
```javascript
target instanceof constructor
```
上面的代码表示的是构造函数constructor()的prototype属性是否出现在target对象的原型链中，说得通俗一点就是，target对象是不是构造函数constructor()的实例。
## 特征
### 返回布尔值
instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
```javascript
var v = new Vehicle();
v instanceof Vehicle // true
```
上面代码中，对象v是构造函数Vehicle的实例，所以返回true。
instanceof运算符的**左边是实例对象，右边是构造函数**。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的。
```javascript
v instanceof Vehicle
// 等同于
Vehicle.prototype.isPrototypeOf(v)
```
### 检查整个原型链
由于instanceof**检查整个原型链**，因此同一个实例对象，可能会对多个构造函数都返回true。
```javascript
var d = new Date();
d instanceof Date // true
d instanceof Object // true
```
由于任意对象（除了null）都是Object的实例，所以instanceof运算符可以判断一个值是否为非null的对象。
```javascript
var obj = { foo: 123 };
obj instanceof Object // true

null instanceof Object // false
```
### 只适用于对象
注意，instanceof运算符只能用于对象，不适用原始类型的值。
```javascript
var s = 'hello';
s instanceof String // false
```
此外，对于undefined和null，instanceof运算符总是返回false。
```javascript
undefined instanceof Object // false
null instanceof Object // false
```
## 复杂用法
```javascript
Object instanceof Object;  //true
Function instanceof Function;  //true
Number instanceof Number;  //false
String instanceof String;  //false
Function instanceof Object;  //true
Foo instanceof Function;  //true
Foo instanceof Foo;  //false
```
## 实现原理
```javascript
/**
 * instanceof 运算符实现原理
 * @param L 表示左表达式
 * @param R 表示右表达式
 * @returns {boolean}
 */
function instance_of(L, R) {
   var O = R.prototype; // 取 R 的显示原型
   L = L.__proto__; // 取 L 的隐式原型
   while (true) {
       if (L === null)
           return false;
       if (O === L) // 这里是重点：当 O 严格等于 L 时，返回“true”
           return true;
       L = L.__proto__;  // 如果不相等则重新取L的隐式原型
   }
}
```
## 应用
### 当构造函数忘记加new时
利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
```javascript
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```
### 父类判断
```javascript
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();

// 判断对象o是否为C()构造函数的一个实例
o instanceof C; // true

// 对象o是否为D()构造函数的一个实例
o instanceof D; // false，因为D.prototype属性不在o的原型链上

// 判断对象o是否为Object()函数的一个实例
o instanceof Object; // true，因为Object.prototype属性在o的原型链上


D.prototype = new C(); // 继承

// 通过D生成一个新实例
var o2 = new D();

// 判断实例o2是否为D()构造函数的一个实例
o2 instanceof D; // true

// 判断实例o2是否为C()构造函数的一个实例
o2 instanceof C; // true，因为通过继承关系，C.prototype出现在o2的原型链上
```
## 小结

- 左边是实例，右边是构造函数
- 检查的是整个原型链
- 可以用它检查非`null`对象
- 不适用于暗示类型的值，检查原始类型全都是`false`
