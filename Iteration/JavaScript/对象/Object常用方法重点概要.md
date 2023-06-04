## 属性
### Object.prototype.constructor
[Object.prototype.constructor - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
Object 实例的 constructor 数据属性返回一个引用，指向创建该实例对象的构造函数。
> 注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。

#### 重点

- 了解除了null原型对象之外，任何对象都会在其 [[Prototype]] 上有一个 constructor 属性；
```javascript
const o1 = {};
o1.constructor === Object; // true

const o2 = new Object();
o2.constructor === Object; // true

const a1 = [];
a1.constructor === Array; // true

const a2 = new Array();
a2.constructor === Array; // true

const n = 3;
n.constructor === Number; // true
```

- 对于引用类型来说 constructor 属性值是可以修改的，但是对于基本类型来说是只读的。
- 我们可以通过未知类型 的“对象”创建与其类型一致的新对象
```javascript
// 比如这里obj类型是未知的
function fn(obj) {
  const newObj = obj.constructor()
  console.log(newObj) 
}

fn([2])
fn({ a: 1 })
// []
// {}
```
## 构造方法
### Object.assgin()
[Object.assign() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
通过复制一个或多个对象来创建一个新的对象
#### 重点

- `Object.assign` 方法只会拷贝源对象 **可枚举的** 和 **自身的** 属性到目标对象；
- `Object.assign()` 不会在 `source` 对象值为 `null` 或 `undefined` 时抛出错误；
- 如果赋值期间出错，例如：如果属性**不可写**，则会抛出 TypeError；
- 假如源对象是一个对象的引用，它仅仅会复制其引用值。
### Object.create()
[Object.create() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
用于创建一个新对象，使用现有的对象来作为新创建对象的原型（`prototype`）
#### 重点

- 特别关注`Object.create(null)`的特殊之处
- 利用`Object.create()`实现类式继承的方法
### Object.entries()
[Object.entries() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in `循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）
#### 重点

- 仅可以返回其**可枚举属性**的键值对的对象。
- 可以通过`new Map(Object.entries(obj))`很容易将`Object`转换为`Map`
### Object.freeze()
[Object.freeze() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了之后“增删改查”均不能操作。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。
#### 重点

- 任何修改尝试都会失败，无论是静默地还是通过抛出`TypeError`异常（最常见但不仅限于`strict mode`）。
- 被冻结的对象是不可变的，在不进行任何加工的情况下使用，它仅仅能实现“**浅冻结**”。
- 直接冻结基本类型的数据是没用的。
### Object.defineProperty()⭐️
[Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false // 不可写
});

object1.property1 = 77  // Throws an error in strict mode

console.log(object1.property1);  // 42
```
#### 重点

- 应当直接在 `Object` 构造器对象上调用此方法，而不是在任意一个 `Object` 类型的实例上调用。
- 在 ES6 中，由于 `Symbol` 类型的特殊性，用 `Symbol` 类型的值来做对象的 `key` 与常规的定义或修改不同，而`Object.defineProperty `是定义 `key` 为 `Symbol` 的属性的方法之一。
- 明确其定义 `configurable`，`enumerable`，`value`，`writable` ，`get`，`set`这几个属性的具体作用
### Object.getPrototypeOf()
[Object.getPrototypeOf() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
返回指定对象的原型（内部`[[Prototype]]`属性的值）
#### 重点

- 在 ES5 中，如果参数不是一个对象类型，将抛出一个[TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)异常，在ES6之后 ，参数会被强制转换为`Object`包装的对象
### Object.setPrototypeOf()
[Object.setPrototypeOf() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
设置一个指定的对象的原型（即，内部 `[[Prototype]]` 属性）到另一个对象或 `null`
#### 重点

- 了解其对于JavaScript引擎来说，直接更改对象的property是一个相对很慢的操作，因此不提倡使用；
- 如果传入参数是不可扩展的，或是一个不可修改原型的对象 ，或者不是对象就会报错；
- 通常，应该使用`Object.setPrototypeOf()` 方法来设置对象的原型。你应该使用使用它，因为 `Object.prototype.__proto__` 访问器已被弃用；
- 是一种实现类继承的方式。
### Object.is()
[Object.is() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
比较两个值是否相同。所有 `NaN` 值都相等（这与`==`和`===`不同）。
#### 重点

- 明确其与`==`和`===`之间的区别，两个`NaN`是相等的，`+0`和`-0`是不相等的，比较过程没有自动类型转换
```javascript
Object.is(NaN, Number.NaN)        // true
Object.is(NaN, 0/0);              // true
Object.is(0, -0);                 // false
Object.is([], []);        // false
```
### Object.getOwnPropertyNames()
[Object.getOwnPropertyNames() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 `Symbol` 值作为名称的属性）组成的数组。
#### 重点

- 要知道它只能拿到**非**`**Symbol**`类型的属性
### Object.getOwnPropertySymbols()
[Object.getOwnPropertySymbols() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
返回一个给定对象自身的所有 `Symbol` 属性的数组。
用在哪里？想一下`for...in`是不能迭代对象的symbol类型的属性的对不对，那么如果需要知道对象的`Symbol`类型的属性怎么办，它就派上用场了。
#### 重点

- 了解它的使用场景
```javascript
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)

// 进一步，我们就能拿到它的值了
obj[objectSymbols[0]] // localSymbol
```
## 实例方法
### Object.prototype.hasOwnProperty()
[Object.prototype.hasOwnProperty() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
#### 重点

- 这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
```javascript
let obj = { a:1 }
'a' in obj // true 
'toString' in obj // true
obj.hasOwnProperty('a') // true 
obj.hasOwnProperty('toString') // false
```

- **JavaScript 并没有保护 hasOwnProperty 这个属性名，因此，当使用了它作为属性名时，就需要使用外部的 hasOwnProperty 获得正确的结果**
```javascript
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，
// 可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```
### Object.prototype.isPrototypeOf()
[Object.prototype.isPrototypeOf() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
用于测试一个对象是否存在于另一个对象的原型链上。
#### 重点

- `isPrototypeOf()` 与 `instanceof` 运算符不同。在表达式 "`object instanceof AFunction`"中，`object` 的原型链是针对 `AFunction.prototype` 进行检查的，而不是针对 `AFunction` 本身。
### Object.prototype.propertyIsEnumerable()
[Object.prototype.propertyIsEnumerable() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
用来检查对象的某个属性是否可以枚举
```javascript
const object1 = {};
const array1 = [];
object1.property1 = 42;
array1[0] = 42;

console.log(object1.propertyIsEnumerable('property1'));
// Expected output: true

console.log(array1.propertyIsEnumerable(0));
// Expected output: true

console.log(array1.propertyIsEnumerable('length'));
// Expected output: false
```
### Object.toString()⭐️
[Object.prototype.toString() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
 方法返回一个表示该对象的字符串。该方法旨在重写（自定义）派生类对象的类型转换的逻辑。
#### 重点

- 了解它在做比较运算时起到的隐式转换的作用
- 了解`Object.prototype.toString.call(a)`的实际运用，用来判断某个变量的类型
- 了解它在检查数据类型时的不可靠性，比如对象自己定义了`Symbol.toStringTag`属性就会导致类型误判
```javascript
let obj = {}
Object.prototype.toString.call(obj) // '[object Object]'

// 假如对象自己定义了Symbol.toStringTag，就会对我们产生干扰
// 当然实际一般不会有人这么做
let obj1 = {}
obj1[Symbol.toStringTag] = 'Array' 
Object.prototype.toString.call(obj1)  // '[object Array]'  我们明明想要的是'[object Object]'啊
```
### Object.prototype.valueOf()⭐️
[Object.prototype.valueOf() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
将 `this` 值转换为一个对象。此方法旨在用于自定义类型转换的逻辑时，重写派生类对象。
#### 重点

- 了解它在做运算时起到的隐式转换的作用
## 资料

- [Object - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
