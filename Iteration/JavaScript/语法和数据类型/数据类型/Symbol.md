## 要点
根据规范，只有两种原始类型可以用作对象属性键：

- 字符串类型
- Symbol 类型

否则，如果使用另一种类型，例如数字，它会被自动转换为字符串。所以 obj[1] 与 obj["1"] 相同，而 obj[true] 与 obj["true"] 相同。
### 基础应用
```javascript
// id 是描述为 "id" 的 symbol
let id = Symbol("id");
```
symbol 保证是唯一的。即使我们创建了许多具有相同描述的 symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。
```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```
**symbol 不会被自动转换为字符串**
```javascript
let id = Symbol("id");
alert(id); // 类型错误：无法将 symbol 值转换为字符串。
// VM145:2 Uncaught TypeError: Cannot convert a Symbol value to a string
//    at <anonymous>:2:1
// (anonymous) @ VM145:2
```
这是一种防止混乱的“语言保护”，因为字符串和 symbol 有本质上的不同，不应该意外地将它们转换成另一个。
如果我们真的想显示一个 symbol，我们需要在它上面调用 .toString()，如下所示：
```javascript
let id = Symbol("id");
alert(id.toString()); // Symbol(id)，现在它有效了
```
或者获取 symbol.description 属性，只显示描述（description）：
```javascript
let id = Symbol("id");
alert(id.description); // id
```
### '隐藏'属性
symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。
例如，如果我们使用的是属于第三方代码的 user 对象，我们想要给它们添加一些标识符。
我们可以给它们使用 symbol 键：
```javascript
let user = { // 属于另一个代码
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // 我们可以使用 symbol 作为键来访问数据
```
……但如果我们处于同样的目的，使用字符串 "id" 而不是用 symbol，那么就会出现冲突：
```javascript
let user = { name: "John" };

// 我们的脚本使用了 "id" 属性。
user.id = "Our id value";

// ……另一个脚本也想将 "id" 用于它的目的……

user.id = "Their id value"
// 砰！无意中被另一个脚本重写了 id！
```
### 对象字面量中的symbol
```javascript
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};
```
### 利用 Symbol 实现方法私有化 ⭐️
```typescript
const doAjax = Symbol('doAjax');
class HTTP {
	[doAjax](options) {
  	//...
  }
}

const http = new HTTP();
console.log(http);// 实例化后，无法访问 doAjax 方法，从而实现方法私有化
```
### 在for...in中会被跳过
```javascript
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name, age（没有 symbol）

// 使用 symbol 任务直接访问
alert("Direct: " + user[id]); // Direct: 123
```
Object.keys(user)也会忽略它们
### 全局symbol
```javascript
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 symbol
alert( id === idAgain ); // true
```
注册表内的 symbol 被称为 **全局 symbol**。如果我们想要一个应用程序范围内的 Symbol，可以在代码中随处访问 —— 这就是它们的用途。
### Symbol.keyfor
```javascript
// 通过 name 获取 symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 symbol 获取 name
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```
### new Symbol❌
```javascript
const sym = new Symbol(); // TypeError
```
这一限制是为了防止开发人员创建一个显式的 Symbol 包装对象，而不是一个新的 symbol 值。这可能会让人感到困扰，因为在通常情况下，可以创建基本数据类型的显式包装对象（例如 new Boolean、new String 和 new Number）。
如果你真的想创建一个 Symbol 包装器对象，你可以使用 Object() 函数：
```javascript
const sym = Symbol("foo");
const symObj = Object(sym);
typeof sym; // "symbol"
typeof symObj; // "object"
```
### 两个应用场景

1. “隐藏”对象属性

如果我们想要向“属于”另一个脚本或者库的对象添加一个属性，我们可以创建一个 symbol 并使用它作为属性的键。symbol 属性不会出现在 for..in 中，因此它不会意外地被与其他属性一起处理。并且，它不会被直接访问，因为另一个脚本没有我们的 symbol。因此，该属性将受到保护，防止被意外使用或重写。

2. JavaScript 使用了许多系统 symbol，这些 symbol 可以作为 Symbol.* 访问。我们可以使用它们来改变一些内建行为。
## 主要属性
### ⭐️Symbol.iterator
#### 用法1-自定义迭代器
```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]; // [1, 2, 3]


// 或者
class Foo {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}

const someObj = {
  *[Symbol.iterator]() {
    yield "a";
    yield "b";
  },
};

console.log(...new Foo()); // 1, 2, 3
console.log(...someObj); // 'a', 'b'

```
#### 用法2-更高级的迭代
```javascript
let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,

      async next() { // (2)

        // 注意：我们可以在 async next 内部使用 "await"
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    console.log(value); // 1,2,3,4,5
  }

})()
```
### Symbol.replace
这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。`String.prototype.replace() `方法会调用此方法。也就是说从技术上我们可以通过这个方法改变字符串`replace()`方法的行为
```javascript
class Replace1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return `s/${string}/${this.value}/g`;
  }
}

console.log('foo'.replace(new Replace1('bar')));
```
### Symbol.search
指定了一个搜索方法，这个方法接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标，这个方法由以下的方法来调用 `String.prototype.search()`。
```javascript
class caseInsensitiveSearch {
  constructor(value) {
    this.value = value.toLowerCase();
  }
  [Symbol.search](string) {
    return string.toLowerCase().indexOf(this.value);
  }
}

console.log('foobar'.search(new caseInsensitiveSearch('BaR'))); // 3
```
### Symbol.split
指向 一个正则表达式的索引处分割字符串的方法。这个方法通过 `String.prototype.split()` 调用。
```javascript
class Split1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    const index = string.indexOf(this.value);
    return `${this.value}${string.substr(0, index)}/${string.substr(index + this.value.length)}`;
  }
}

console.log('foobar'.split(new Split1('foo'))); // "foo/bar"
```
### Symbol.hasInstance
用于判断某对象是否为某构造器的实例。因此你可以用它自定义 `instanceof` 操作符在某个类上的行为。意味可能对于一个对象来说，从技术上来讲可以改变`instanceof`的预期结果。
```javascript
class Array1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof Array1); // true
```
### ⭐️Symbol.toPrimitive
其指定了一种接受首选类型并返回对象原始值的表示的方法。它被所有的`强类型转换制算法`优先调用。
```javascript
const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 42;
    }
    return null;
  }
};

console.log(+object1); // 42
```
在 `Symbol.toPrimitive` 属性（用作函数值）的帮助下，对象可以转换为一个原始值。该函数被调用时，会被传递一个字符串参数 `hint`，表示要转换到的原始值的**预期类型**。`hint` 参数的取值是 "`number`"、"`string`" 和 "`default`" 中的任意一个。
### Symbol.toStringTag
用于创建对象的默认字符串描述。它由 `Object.prototype.toString()` 方法内部访问。
```javascript
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return 'Validator';
  }
}

console.log(Object.prototype.toString.call(new ValidatorClass()));  // "[object Validator]"
```
## 主要方法
### Symbol.prototype.toString()
```javascript
Symbol("foo") + "bar";  // TypeError: Can't convert symbol to string
Symbol("foo").toString() + "bar"  // "Symbol(foo)bar"，就相当于下面的：
Object(Symbol("foo")).toString() + "bar"  // "Symbol(foo)bar"
```
## 总结
### 怎样描述它？
`Symbol`可以理解为一种唯一且不可修改的数据类型，用于表示对象属性的唯一标识符。每一个`Symbol`值都是唯一的，即使它们的描述相同，因此`Symbol`值可以用作对象属性的键，以确保对象属性的唯一性。
与其他基本数据类型不同，`**Symbol**`**值没有字面量表示法，需要使用**`**Symbol**`**函数来创建**。可以通过调用`Symbol`函数的静态方法来获取全局共享的`Symbol`值，也可以使用`Symbol`函数的构造器在局部范围内创建symbol值。
`Symbol`值在闭包和模块化编程中有很好的应用，可以防止对对象属性的非授权修改。
### 特征

1. 任何通过`Symbol()`函数创建的`Symbol`值都是不相同的，即使传递了相同的字符串。
2. 不能使用`new`操作符
3. 不能参与类型运算
4. 可以使用同一个Symbol值
### 核心要点

1. 当它存在于可迭代对象中时，它是个例外，是不能被`for...in`迭代的，同时Object.keys也会忽略，因此它也是实现对象深拷贝方法中需要考虑的一个特殊数据类型
2. JavaScript的对象属性名称只允许`Symbol`类型的值和字符串
## 资料

- [https://zh.javascript.info/symbol](https://zh.javascript.info/symbol)
- [https://zh.javascript.info/object-toprimitive](https://zh.javascript.info/object-toprimitive)
- [Symbol - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol#%E6%96%B9%E6%B3%95)
