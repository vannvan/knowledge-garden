### 可以解决的问题

使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

### 语法

> var proxy = new Proxy(target, handler);

proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy({}, {
    get: function(obj, prop) {
        console.log('设置 get 操作')
        return obj[prop];
    },
    set: function(obj, prop, value) {
        console.log('设置 set 操作')
        obj[prop] = value;
    }
});

proxy.time = 35; // 设置 set 操作

console.log(proxy.time); // 设置 get 操作 // 35

```

除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。

```js
// 使用 has 方法隐藏某些属性，不被 in 运算符发现
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy); // false
```

Proxy 实例也可以作为其他对象的原型对象。

```js
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
// 上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
```

### proxy 实现优雅的校验器

```js
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
        }else {
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

