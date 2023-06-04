##  Proxy要点
### 语法
```typescript
let proxy = new Proxy(target, handler)
```

- target 要包装的对象，可以是任何东西，包括函数
- handler 代理配置，带有“捕捉器”（“traps”，即拦截操作的方法）的对象。比如 get 捕捉器用于读取target 的属性，set 捕捉器用于写入 target 的属性，等等。

一个基础的打开方式
```typescript
let target = {};
let proxy = new Proxy(target, {}); // 空的 handler 对象

proxy.test = 5; // 写入 proxy 对象 (1)
alert(target.test); // 5，test 属性出现在了 target 中！

alert(proxy.test); // 5，我们也可以从 proxy 对象读取它 (2)

for(let key in proxy) alert(key); // test，迭代也正常工作 (3)
```
此处因为没有捕捉器(即handler)，因此对所有proxy的操作都直接转发给了target。
而如果让handler起到作用，我们先要知道它能捕捉什么。
对于对象的大多数操作，JavaScript 规范中有一个所谓的“内部方法”，它描述了最底层的工作方式。例如 [[Get]]，用于读取属性的内部方法，[[Set]]，用于写入属性的内部方法，等等。这些方法仅在规范中使用，我们不能直接通过方法名调用它们。
以下是handler能够拦截的“内部方法”

| 内部方法 | Handler 方法 | 何时触发 |
| --- | --- | --- |
| [[Get]] | get | 读取属性 |
| [[Set]] | set | 写入属性 |
| [[HasProperty]] | has | in 操作符 |
| [[Delete]] | deleteProperty | delete 操作符 |
| [[Call]] | apply | 函数调用 |
| [[Construct]] | construct | new 操作符 |
| [[GetPrototypeOf]] | getPrototypeOf | [Object.getPrototypeOf](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| [[SetPrototypeOf]] | setPrototypeOf | [Object.setPrototypeOf](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| [[IsExtensible]] | isExtensible | [Object.isExtensible](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| [[PreventExtensions]] | preventExtensions | [Object.preventExtensions](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| [[DefineOwnProperty]] | defineProperty | [Object.defineProperty](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
, [Object.defineProperties](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| [[GetOwnProperty]] | getOwnPropertyDescriptor | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), for..in,Object.keys/values/entries |
| [[OwnPropertyKeys]] | ownKeys | [Object.getOwnPropertyNames](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), for..in,Object.keys/values/entries |

### 示例
#### 带有get的捕捉器
要拦截读取操作，handler应该有get(target,property,receiver)方法
```typescript
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 默认值
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0（没有这个数组项）
```
调整一下更符合在实际场景中它起到的作用
```typescript
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop] + 1;
    } else {
      return 0; // 默认值
    }
  }
});
numbers[1] // 2 此时就是经过proxy处理“改写”完的对应索引位置的值
```
另外一个示例
```typescript
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // 拦截读取属性操作
    if (phrase in target) { //如果词典中有该短语
      return target[phrase]; // 返回其翻译
    } else {
      // 否则返回未翻译的短语
      return phrase;
    }
  }
});

// 在词典中查找任意短语！
// 最坏的情况也只是它们没有被翻译。
alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy（没有被翻译）
```
#### 使用set捕捉进行验证
要拦截set操作，也应当有set(target, property, value, receiver)方法
```typescript
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 拦截写入属性操作
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 添加成功
numbers.push(2); // 添加成功

numbers.push("test"); // Uncaught TypeError: 'set' on proxy: trap returned falsish for property '2'
 
```
请注意：数组的内建方法依然有效！值被使用 push 方法添加到数组。当值被添加到数组后，数组的 length 属性会自动增加。我们的代理对象 proxy 不会破坏任何东西。
#### 使用ownKeys和getOwnPropertyDescriptor进行迭代
Object.keys，for..in 循环和大多数其他遍历对象属性的方法都使用内部方法 [[OwnPropertyKeys]]（由 ownKeys 捕捉器拦截) 来获取属性列表。
这些方法在细节上有所不同：

- Object.getOwnPropertyNames(obj) 返回非 symbol 键。
- Object.getOwnPropertySymbols(obj) 返回 symbol 键。
- Object.keys/values() 返回带有 enumerable 标志的非 symbol 键/值
- for..in 循环遍历所有带有 enumerable 标志的非 symbol 键，以及原型对象的键。

以下示例中，使用oenKeys捕捉器拦截for...in对user的遍历，并跳过以下划线开头的属性
```typescript
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" 过滤掉了 _password
for(let key in user) alert(key); // name，然后是 age

// 对这些方法的效果相同：
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```
尽管如此，但如果我们返回对象中不存在的键，Object.keys 并不会列出这些键：
```typescript
let user = { };

user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <empty>
```
为什么？原因很简单：Object.keys 仅返回带有 enumerable 标志的属性。为了检查它，该方法会对每个属性调用内部方法 [[GetOwnProperty]] 来获取 [它的描述符（descriptor）](https://zh.javascript.info/property-descriptors)。在这里，由于没有属性，其描述符为空，没有 enumerable 标志，因此它被略过。
那么既然我们也可以拦截[[GetOwnProperty]] 去进行截胡从而改变Object.keys的行为，那么就来通过getOwnPropertyDescriptor试一下这个操作
```typescript
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // 一旦要获取属性列表就会被调用
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // 被每个属性调用
    return {
      enumerable: true,
      configurable: true
      /* ...其他标志，可能是 "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```
#### 具有deleteProperty和其他捕捉器的受保护属性
有一个普遍约定，以下划线开头的属性和方法是内部的，一般禁止读写和删除操作，那么我们要实现这一限制，即可以通过改写对象对应操作的行为来达到目。
以下示例同时实现对“读”，“写”，“删除”，“迭代”的拦截
```typescript
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*) 
  },
  set(target, prop, val) { // 拦截属性写入
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // 拦截属性删除
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // 拦截读取属性列表
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" 不允许读取 _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" 不允许写入 _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" 不允许删除 _password
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" 将 _password 过滤出去
for(let key in user) alert(key); // name
```
第12行我们对通过对象方法访问的情况进行了特殊处理，即让它可以对除了直接get之外的操作可以被访问
```javascript
user = {
  // ...
  checkPassword(value) {
    //对象方法必须能读取 _password
    return value === this._password;
  }
}
```
#### 带有has捕捉器的in range
has 捕捉器会拦截 in 调用。
以下示例来检查一个数字是否在range内
```javascript
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

alert(5 in range); // true
alert(50 in range); // false
```
#### 包装函数 apply
apply(target, thisArg, args) 捕捉器能使代理以函数的方式被调用
```javascript
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 1 (*) proxy 将“获取 length”的操作转发给目标对象

sayHi("John"); // Hello, John!（3 秒后）
```
### Proxy的局限性
注意以下示例均首先强调Proxy无法“直接代理”，而通过技术手段其实也可以实现代理，因此它距离“万能”只是差了一小步。
#### 部分内建对象的内建插槽无法直接代理
许多内建对象，例如 **Map，Set，Date，Promise** 等，都使用了所谓的“内部插槽”。(Array没有内部插槽，因此代理数组不会有以下类似问题)
它们类似于属性，但仅限于内部使用，仅用于规范目的。例如，Map 将项目（item）存储在 [[MapData]] 中。内建方法可以直接访问它们，而不通过 [[Get]]/[[Set]] 内部方法。所以 Proxy 无法拦截它们。
例如：
```javascript
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // TypeError: Method Map.prototype.set called on incompatible receiver #<Map>
```
当然也不是完全不可能，可以曲折的实现以上功能
```javascript
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1（工作了！）
```
现在它正常工作了，因为 get 捕捉器将函数属性（例如 map.set）绑定到了目标对象（map）本身。
与前面的示例不同，proxy.set(...) 内部 this 的值并不是 proxy，而是原始的 map。因此，当set 捕捉器的内部实现尝试访问 this.[[MapData]] 内部插槽时，它会成功。
#### 私有字段无法直接代理
```javascript
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

alert(user.getName()); // Error
```
原因是私有字段是通过内部插槽实现的。JavaScript 在访问它们时不使用 [[Get]]/[[Set]]。
同样，我们也可以采取非常规手段实现代理，但该方案的缺点是它将原始对象暴露给该方法了，因此实际场景应评估是否划算
```javascript
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```
#### **Proxy 无法拦截严格相等性检查 ===**
Proxy 可以拦截许多操作符，例如 new（使用 construct），in（使用 has），delete（使用 deleteProperty）等。
但是没有办法拦截对于对象的严格相等性检查。一个对象只严格等于其自身，没有其他值。
因此，比较对象是否相等的所有操作和内建类都会区分对象和代理。这里没有透明的替代品
## Reflect要点
### 基础认识
Reflect 是一个内建对象，可简化 Proxy 的创建。Reflect对象本身并不是一个构造函数，而是直接提供静态函数以供调用
以下是执行相同操作和 Reflect 调用的示例：

| 操作 | Reflect 调用 | 内部方法 |
| --- | --- | --- |
| obj[prop] | Reflect.get(obj, prop) | [[Get]] |
| obj[prop] = value | Reflect.set(obj, prop, value) | [[Set]] |
| delete obj[prop] | Reflect.deleteProperty(obj, prop) | [[Delete]] |
| new F(value) | Reflect.construct(F, value) | [[Construct]] |
| … | … | … |

**对于每个可被 Proxy 捕获的内部方法，在 Reflect 中都有一个对应的方法，其名称和参数与 Proxy 捕捉器相同。**
所以，我们可以使用 Reflect 来将操作转发给原始对象。
```javascript
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // 显示 "GET name"
user.name = "Pete"; // 显示 "SET name=Pete"
```
### 示例
```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [8.75]) // 8
 
// 新写法
Reflect.apply(Math.floor, undefined, [20.5]) // 20
```
#### 改变this指向
如果第一个参数不是对象， Reflect.get 方法会报错。
```javascript
var obj = {
    name: 'houfee',
    age: 24,
    get func() {
        return this.name + this.age
    }
}
var obj2 = {
    name: 'houyue',
    age: 14,
}
console.log(Reflect.get(obj, 'name')) // houfee
console.log(Reflect.get(obj, 'age')) //
console.log(Reflect.get(obj, 'func', obj2)) // houyue14

```
#### Reflect.set(target, name, value, receiver)
```javascript
var obj = {
    name: 'houfee',
    set func(value) {
        return this.name = value
    }
}
var obj2 = {
    name: 'zhangsan'
}
console.log(Reflect.set(obj, 'func', 'houyue', obj2)) // true
console.log(obj) // {name: "houfee"}
console.log(obj2) // {name: "houyue"}
```
#### **Proxy** 和 **Reflect** 配合使用
注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了 receiver ，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。
```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
```
上面代码中， Proxy.set 拦截里面使用了 Reflect.set ，而且传入了 receiver ，导致触发 Proxy.defineProperty 拦截。这是因为 Proxy.set 的receiver 参数总是指向当前的 Proxy 实例（即上例的 obj ），而 Reflect.set 一旦传入 receiver ，就会将属性赋值到 receiver 上面（即 obj ），导致触发 defineProperty 拦截。如果 Reflect.set 没有传入 receiver ，那么就不会触发 defineProperty 拦截。
```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
```
如果第一个参数不是对象，Reflect.set会报错。
```javascript
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
```
## this问题
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
```javascript
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```
上面代码中，一旦proxy代理target，target.m()内部的this就是指向proxy，而不是target。所以，虽然proxy没有做任何拦截，target.m()和proxy.m()返回不一样的结果。
## 关于Vue.js@3版本
Vue3版本的一个大的改动就是将Object.defineProperty替换成了proxy，那么是基于什么样的原因呢？
首先分析Object.defineProperty的缺点

- 深度监听需要一次性递归
- 无法监听新增属性/删除属性,因此Vue特意定制了Vue.set,Vue.delete来处理增删操作，属于是很例外的操作
- 无法监听原生数组，需要特殊处理，Vue对原生数组的方法都进行了重写才让开发者能感觉数组是在被“双向绑定”

而Proxy则天生具备以上特性，当然它也不是万能的，下面讲它的局限性
## 综合应用
### Vue@3深度监听基础原理
```javascript
function reactive(target = {}) {
  // 不是对象、数组直接返回
  if (typeof target !== 'object' || target == null) {
    return target
  }

  const proxyConfig = {
    get(target, key, receiver) {
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key)
      }
      const result = Reflect.get(target, key, receiver)
      /* 深度监听修改1
        return result
        
      */
      /*
        性能提升：在get时去递归，去深度监听
        而 defineProperty 是开始时就递归完成
      */
      return reactive(result)
    },
    set(target, key, val, receiver) {
      if (val === target[key]) {
        return true
      }

      /* 可监听到新增的key */
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        // 已有的可以
      } else {
        // 新增的key
        console.log('新增的key')
      }

      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      return result
    },
    deleteProperty(target, key) {
      const result = Relect.deleteProperty(target, key)
      console.log('delete property', key)
      return result
    },
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConfig)
  return observed
}

// 测试数据
const data = {
  name: 'zwx',
  age: '25',
  info: {
    city: 'beijing',
    a: {
      b: {
        c: 1,
      },
    },
  },
}

let newdata = reactive(data)
newdata.info.city // get info 不是 get city
newdata.info.a // b 和之后还没加入响应式

newdata.info.a.b.zzz = 88
```
### 实现观察者模式
```javascript
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```
上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。
下面代码中采用observable返回一个原始对象的proxy代理，拦截原始对象的操作，从而触发充当观察者的各个函数。
```javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```
### 实现校验器
```javascript
const formData = {
   name: 'xuxi',
   age: 120,
   label: ['react', 'vue', 'node', 'javascript']
 }
 // 校验器
 const validators = {
   name(v) {
     // 检验name是否为字符串并且长度是否大于3
     return typeof v === 'string' && v.length > 3
   },
   age(v) {
     // 检验age是否为数值
     return typeof v === 'number'
   },
   label(v) {
     // 检验label是否为数组并且长度是否大于0
     return Array.isArray(v) && v.length > 0
   }
 }
 // 代理校验对象
 function proxyValidator(target, validator) {
  return new Proxy(target, {
    set(target, propKey, value, receiver) {
      if(target.hasOwnProperty(propKey)) {
        let valid = validator[propKey]
        if(!!valid(value)) {
          return Reflect.set(target, propKey, value, receiver) //这里可以针对验证通过的值再做其他操作
        } else {
          // 一些其他错误业务...
          // throw Error(`值验证错误${propKey}:${value}`)
          console.log(`值验证错误${propKey}:${value}`)
        }
      }
    }
  })
 }
let formObj = proxyValidator(formData, validators)
formObj.name = 333;   // Uncaught Error: 值验证错误name:f
formObj.age = 'ddd'   // Uncaught Error: 值验证错误age:f
```
## 资料

- [https://zh.javascript.info/proxy](https://zh.javascript.info/proxy)
- [简单通俗的理解Vue3.0中的Proxy - 掘金](https://juejin.cn/post/6844904088119853063#heading-3)
- [https://es6.ruanyifeng.com/#docs/reflect](https://es6.ruanyifeng.com/#docs/reflect)
- [https://github.dev/umijs/qiankun/tree/master/umijs/qiankun/src/sandbox/proxySandbox.ts](https://github.dev/umijs/qiankun/tree/master/umijs/qiankun/src/sandbox/proxySandbox.ts) 了解一下qiankun的操作
