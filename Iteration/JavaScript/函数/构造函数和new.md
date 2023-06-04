## 要点
### 构造函数
#### 规则
构造函数在技术上是常规函数。不过有两个约定：

1. 它们的命名以大写字母开头。
2. 它们只能由 "new" 操作符来执行。
```typescript
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");
```
#### new的过程描述⭐️
当一个函数被使用 `new` 操作符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给 `this`。
2. 函数体执行。通常它会修改 `this`，为其添加新的属性。
3. 返回 `this` 的值。

换句话说new User()做的就是类似的事情
```javascript
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```
### 其它方法
#### new function() { … }
如果我们有许多行用于创建单个复杂对象的代码，我们可以将它们封装在一个立即调用的构造函数中，像这样：
```typescript
// 创建一个函数并立即使用 new 调用它
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ……用于用户创建的其他代码
  // 也许是复杂的逻辑和语句
  // 局部变量等
};
```
这个构造函数不能被再次调用，因为它不保存在任何地方，只是被创建和调用。因此，这个技巧**旨在封装构建单个对象的代码**，而无需将来重用。
除了像封装构建单个对象的场景以外，Function构造函数的使用比较少，主要有以下两个原因：

- 每次执行时，都会解析函数主体，并创建一个新的函数对象，所以当在一个循环或频繁执行的函数中调用Function()构造函数效率很低。
- 它不遵循典型的作用域，它将一直作为顶级函数执行。所以在一个函数A内部调用Function()构造函数时，其中的函数体并不能访问到函数A中的局部变量，而只能访问到全局变量。
#### new.target
在一个函数内部，我们可以使用 new.target 属性来检查它是否被使用 new 进行调用了。
```javascript
function User() {
  alert(new.target);
}

// 不带 "new"：
User(); // undefined

// 带 "new"：
new User(); // function User { ... }
```
它可以被用在函数内部，来判断该函数是被通过 new 调用的“构造器模式”，还是没被通过 new 调用的“常规模式”。
可以让new调用和常规调用做同样的工作，但一般不提倡这么做
```javascript
function User(name) {
  if (!new.target) { // 如果你没有通过 new 运行我
    return new User(name); // ……我会给你添加 new
  }

  this.name = name;
}
let john = User("John"); // 将调用重定向到新用户
alert(john.name); // John
```
## 问题
### 实现一个new

- 创建（或者说构造）一个全新的对象；
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
- 执行构造函数中的代码（为这个新对象添加属性、方法等）；
- 如果函数没有返回其他对象，那么返回这个新对象。
```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}


const _new = (...args) => {
  const [fn, ...rest] = args
  const target = Object.create(fn.prototype)
  const res = fn.apply(target, rest)
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res
  }
  return target
}

const _new2 = function () {
  const [self, ...rest] = arguments
  const target = {}
  target.__proto__ = self.prototype
  // const target = Object.create(self.prototype) 上两行和该行等价
  const res = self.apply(target, rest)
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res
  }
  return target
}
```
### 例题2-输出
```javascript
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)
```

- A: Person {firstName: "Lydia", lastName: "Hallie"} and undefined
- B: Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}
- C: Person {firstName: "Lydia", lastName: "Hallie"} and {}
- D:Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError
> #### 答案: A
> 对于 sarah，我们没有使用 new 关键字。当使用 new 时，this 引用我们创建的空对象。当未使用 new 时，this 引用的是**全局对象**（global object）。
> 我们说 this.firstName 等于 "Sarah"，并且 this.lastName 等于 "Smith"。实际上我们做的是，定义了 global.firstName = 'Sarah' 和 global.lastName = 'Smith'。而 sarah 本身是 undefined。


## 资料

- [https://zh.javascript.info/constructor-new](https://zh.javascript.info/constructor-new)
