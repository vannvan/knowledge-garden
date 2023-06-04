## 要点
### 什么是class
`class`的本质还是一个函数，只不过是函数的另一种写法，这种写法可以让对象的原型属性和函数更加清晰。
```typescript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// 佐证：User 是一个函数
alert(typeof User); // function
```
class User {...} 构造实际上做了如下的事儿：

1. 创建一个名为 `User` 的函数，该函数成为类声明的结果。该函数的代码来自于 `constructor` 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如 `User.prototype` 中的 `sayHi`。

当 new User 对象被创建后，当我们调用其方法时，它会从原型中获取对应的方法，我们可以将 class User 声明的结果解释为：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682251544337-a6810da5-5c93-471a-a14f-ec00d35c6584.png#averageHue=%23f9f3ed&clientId=ued19d6b0-ca1b-4&from=paste&height=120&id=u21f4ff44&originHeight=114&originWidth=572&originalType=binary&ratio=2&rotation=0&showTitle=false&size=13240&status=done&style=none&taskId=udae86d84-444b-4d6b-8202-aa5b072b2ad&title=&width=600)
```typescript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class 是一个函数
alert(typeof User); // function

// ...或者，更确切地说，是 constructor 方法
alert(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
alert(User.prototype.sayHi); // sayHi 方法的代码

// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```
### 不仅仅是语法糖
```typescript
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
  this.name = name;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function() {
  alert(this.name);
};

// 用法：
let user = new User("John");
user.sayHi();
```
这个定义的结果与使用类得到的结果基本相同。因此，这确实是将 `class` 视为一种定义构造器及其原型方法的语法糖的理由。
#### ⭐️纯函数与class之间的差异

1. 首先，通过 class 创建的函数具有特殊的内部属性标记 `[[IsClassConstructor]]: true`。因此，它与手动创建并不完全相同。编程语言会在许多地方检查该属性。例如，与普通函数不同，必须使用 new 来调用它：
```typescript
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

2. 类方法不可枚举。 类定义将 "`prototype`" 中的所有方法的 `enumerable` 标志设置为 false。
3. 类总是使用` use strict`。 在类构造中的所有代码都将自动进入严格模式。
### 类表达式
就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等。
```typescript
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```
类似于命名函数表达式（Named Function Expressions），类表达式可能也应该有一个名字。
如果类表达式有名字，那么该名字仅在类内部可见：
```typescript
// “命名类表达式（Named Class Expression）”
// (规范中没有这样的术语，但是它和命名函数表达式类似)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass 这个名字仅在类内部可见
  }
};

new User().sayHi(); // 正常运行，显示 MyClass 中定义的内容

alert(MyClass); // error，MyClass 在外部不可见
```
动态创建一个类
```typescript
function makeClass(phrase) {
  // 声明一个类并返回它
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// 创建一个新的类
let User = makeClass("Hello");

new User().sayHi(); // Hello
```
### 提升
函数声明和类声明之间的一个重要区别在于,** 函数声明会提升，类声明不会**。
你首先需要声明你的类，然后再访问它，否则类似以下的代码将抛出 ReferenceError
```javascript
// 这里不能这样使用类，因为还没有声明
// noob = new Runoob("这里会报错")
// 报错
 
class Runoob {
  constructor(name) {
    this.sitename = name;
  }
}
 
// 这里可以使用类了
let noob = new Runoob("hello")
```
### Getters/setters
```typescript
class User {

  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
console.log(user.name); // John

user = new User(""); // Name is too short.
```
### 计算属性名称
```typescript
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi();
```
### 私有属性
这是一个最近添加到 JavaScript 的特性。 JavaScript 引擎不支持（或部分支持），需要 `polyfills`。
```typescript
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

// 不能从类的外部访问类的私有属性和方法
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
```
与受保护的字段不同，私有字段由语言本身强制执行。
但是如果我们继承自 CoffeeMachine，那么我们将无法直接访问 #waterAmount。我们需要依靠 waterAmount getter/setter：
```typescript
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}
```
### 受保护的属性
```typescript
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加水
coffeeMachine.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10
```
### 私有方法实现 ⭐️
```typescript
const eat = Symbol();
class Person {
	constructor(name = 'zhangsna', age = 18) {
    // 实例化的属性配置： 私有属性
  	this.name = name;
    this.age = age;
  }
  // 公有属性
  say() {
  	console.log(`My name is ${this.name}, age is ${this.age}`);
  }
  [eat]() {
    console.log('I can eat')
  }
}

console.log(new Person().say());
console.log(new Person().eat());
console.log(new Person()[eat]()); // 可以这样访问
```
### 只读属性
要做到这一点，**我们只需要设置 **`**getter**`**，而不设置 **`**setter**`**：**
```typescript
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // 功率是：100W

coffeeMachine.power = 25; // Error（没有 setter）
```
### static
#### 方法
```typescript
class User {
  static staticMethod() {
    console.log(this === User)
  }
}

User.staticMethod() // true

const u = new User()
// 不能通过实例化后的对象调用静态方法
u.staticMethod() // u.staticMethod is not a function 
```
#### 属性
```typescript
class User {
  static name = 'bob'
  static staticMethod() {
    console.log(this === User)
  }
}

console.log(User.name) // bob
User.staticMethod() // true

const u = new User()
console.log(u.name) // undefined
```
### super可以指向原型对象 ⭐️
```typescript
var proto = {
	y: 20,
  z: 40
}
var obj = {
	x: 10,
  foo(){
  	console.log(super.y);
  }
}
Object.setPrototypeOf(obj, proto);
obj.foo();
```
### 自执行的class, 必须通过new来执行class ⭐️
```typescript
var Person = class {
	say(){
  	console.log('say')
  }
}();

Person.say(); // 会报错


// 以下方式可以
var Person = new class {
	say(){
  	console.log('say')
  }
}();

Person.say();
```
### 类检查instanceof
`instanceof` 操作符用于检查一个对象是否属于某个特定的 `class`。同时，它还考虑了继承。
在许多情况下，可能都需要进行此类检查。例如，它可以被用来构建一个 **多态性（polymorphic）** 的函数，该函数根据参数的类型对参数进行不同的处理。
语法：
```javascript
obj instanceof Class
```
如果 `obj` 隶属于 `Class` 类（或 `Class` 类的衍生类），则返回 true。
```javascript
class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit class 的对象吗？
alert( rabbit instanceof Rabbit ); // true
```
和构造函数一起使用
```javascript
// 这里是构造函数，而不是 class
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true
```
与诸如 `Array` 之类的内建 `class` 一起使用：
```javascript
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```
**有一点需要留意，arr 同时还隶属于 Object 类。因为从原型上来讲，**`**Array**`** 是继承自 **`**Object**`** 的**。
通常，`instanceof` 在检查中会将原型链考虑在内。此外，我们还可以在静态方法 `Symbol.hasInstance` 中设置自定义逻辑。
obj instanceof Class 算法的执行过程大致如下：

1. 如果这儿有静态方法 Symbol.hasInstance，那就直接调用这个方法：
```javascript
// 设置 instanceOf 检查
// 并假设具有 canEat 属性的都是 animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };

alert(obj instanceof Animal); // true：Animal[Symbol.hasInstance](obj) 被调用
```

2. 大多数 `class` 没有 `Symbol.hasInstance`。在这种情况下，标准的逻辑是：使用 obj instanceOf Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一。
```javascript
obj.__proto__ === Class.prototype?  // 这一步就能返回结果
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
// 如果任意一个的答案为 true，则返回 true
// 否则，如果我们已经检查到了原型链的尾端，则返回 false
```
在继承中，匹配到第二步
```javascript
class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
alert(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype（无匹配）
// rabbit.__proto__.__proto__ === Animal.prototype（匹配！）
```
### 装饰器 ⭐️
为对象添加新的功能，而不改变原有的结构和功能
解决痛点：

- 类只能单继承，不同一个子类同时继承多个父类
- 装饰器可以变相解决这个问题，在不改变原类和使用继承的情况下，动态地扩展对象功能
#### 装饰类
```javascript
@testable
class Person {
	constructor(name='lisi', age='19'){
  	this.name = name;
    this.age = age;
  }
  say(){
  	console.log('hello world')
  }
  eat(){
  	console.log('eat')
  }
}
var person = new Person();

function testable(target){
	console.log('target', target)
}

// target [Function: Person]
```
#### 装饰属性 ⭐️
```javascript
class Person{
	constructor(name='lisi', age='19'){
  	this.name = name;
    this.age = age;
  }
  @readOnly
  say(){
  	console.log('hello world')
  }
  eat(){
  	console.log('eat')
  }
}
function readOnly(target, name, descriptor){
	console.log(target, name, descriptor)
  descriptor.writable = false
}

var person = new Person()
person.say()

// hello world
```
### mixin模式
_Mixin_ —— 是一个通用的面向对象编程术语：一个包含其他类的方法的类。
一些其它编程语言允许多重继承。JavaScript 不支持多重继承，但是可以通过将方法拷贝到原型中来实现 mixin。
#### 简单示例
```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// 用法：
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了
new User("Dude").sayHi(); // Hello Dude!
```
### 扩展内建类
#### 简单示例
```typescript
// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```
### 类继承
#### extends关键字
```typescript
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```
例如，要查找 rabbit.run 方法，JavaScript 引擎会进行如下检查（如图所示从下到上）：

1. 查找对象 rabbit（没有 run）。
2. 查找它的原型，即 Rabbit.prototype（有 hide，但没有 run）。
3. 查找它的原型，即（由于 extends）Animal.prototype，在这儿找到了 run 方法。
#### 重写方法
如果我们在 Rabbit 中指定了我们自己的方法，例如 stop()，那么将会使用它：
```javascript
class Rabbit extends Animal {
  stop() {
    // ……现在这个将会被用作 rabbit.stop()
    // 而不是来自于 class Animal 的 stop()
  }
}
```
然而通常，我们不希望完全替换父类的方法，而是希望在父类方法的基础上进行调整或扩展其功能。
Class 为此提供了 "super" 关键字。

- 执行 super.method(...) 来调用一个父类方法。
- 执行 super(...) 来调用一个父类 constructor（只能在我们的 constructor 中）。
```javascript
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // 调用父类的 stop
    this.hide(); // 然后 hide
  }
}
```
#### 重写constructor
根据 [规范](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation)，如果一个类扩展了另一个类并且没有 constructor，那么将生成下面这样的“空” constructor：
```javascript
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}
```
**继承类的 constructor 必须调用 super(...)，并且一定要在使用 this 之前调用。**
```javascript
class Rabbit extends Animal {
  
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

  // ...
}
```
## 总结

1. 对于`class`语法而言，要注意它与普通构造函数之间的差异，普通构造函数实例化不具备` [[IsClassConstructor]]`内部属性。
2. 当JS脚本使用到`class`语法时，总是自动进入到严格模式。
3. 类的方法是**不可枚举**的，它将所有方法的`enumerable`标志设置为了false，构造函数是可以的。
4. 带下划线 `_` 的方法为受保护的属性，外部操作不会引起它的变化
5. 一般约定带井号 `#` 的属性为私有属性，外部访问该属性会报错
6. 假如我们需要对外部提供一个只读的属性，那么在`class`内部只需要对一个属性设置`getter`而不设置`setter`方法，那么它对于外部就只读了
7.  `instanceof` 操作符用于检查一个对象是否属于某个特定的`class`
8. 想要扩展一个类：`class Child extends Parent：`

这意味着 `Child.prototype.__proto__ `将是 `Parent.prototype`，所以方法会被继承。

9. 重写一个 `constructor`：

在使用 this 之前，我们必须在 `Child` 的 `constructor` 中将父 `constructor` 调用为` super()`。

10. 重写一个方法：

我们可以在一个 `Child` 方法中使用 `super.method()` 来调用 `Parent` 方法。

11. 内部：
   - 方法在内部的 `[[HomeObject]] `属性中记住了它们的类/对象。这就是 `super` 如何解析父方法的。
   - 因此，将一个带有 `super` 的方法从一个对象复制到另一个对象是不安全的。

## 资料

- [https://zh.javascript.info/class](https://zh.javascript.info/class)
- [https://zh.javascript.info/extend-natives](https://zh.javascript.info/extend-natives)
- [https://zh.javascript.info/class-inheritance](https://zh.javascript.info/class-inheritance)
