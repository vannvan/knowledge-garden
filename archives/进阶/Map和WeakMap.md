### Map

**基本认知**

JavaScript的对象，本质上是键值对的集合（Hash结构），但是传统上只能使用字符当作键，所以有很大的限制，为了解决这个问题，`ES6`提供了Map数据结构。类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以当作键。

#### 特点

> 如果d对同一个键进行多次赋值，后面的值会覆盖前面的值

```js
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"
```

> 读取一个未知的值返回`undefined`

> 只有对同一对象的引用，Map才认为是同一个键

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

上面的`set`和`get`方法，表面是针对同一个键，但实际上是两个不同的数组实例，内存地址不一样，所以被认为是两个不同的键

> 同样的值的两个实例，也会被Map认为是两个键

```js
const map = new Map()
const k1 = ['a']
const k2 = ['a']
map,set(k1,111).set(k2,222)
map,get(k1) // 111
map.get(k2) // 222
```

综上所述，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就会被认为键不一样。这样就解决了同名属性碰撞的问题。

>如果Map的键是一个简单类型的值，只要两个值严格相等就被视为同一个键， 0和-0是同一个键，布尔`true`和字符串`true`是两个不同的键，`null`和`undefined`是两个不同的键。
>
>特例：`NaN`虽然不严格等于自身，但Map认为是同一个键

#### 属性和方法

**操作方法**

- size 成员的个数
- set 设置键名`key`和对应的值`value`， 返回整个Map结构，可采用链式写法
- get 读取`key`对应的值，找不到返回`undefined`
- has 返回一个布尔值
- delete 删除某个键 返回布尔值
- clear 清除所有成员 没有返回值

**遍历方法**  Map的遍历顺序就是插入的顺序

- keys 返回键名
- values 返回键值
- entries 返回所有成员
- forEach 遍历所有成员

#### 实际应用

- Map转为数组

```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

- 数组转为Map

```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

- Map转为对象

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {  //注意这里
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

- 对象转为Map

```js
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

- Map转为JSON

```js
// 键为字符串的情况
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'


//键不为字符串的情况
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

- JSON转为Map	

```js
//键名都是字符串的情况
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

### WeakMap

**与Map的区别**

> 只接受对象作为键名（`null`除外），不接受其他类型

> 键名所指的对象，不计入垃圾回收机制

PS:一个简单的场景，需要再指定的DOM上进行添加数据，数据可以采用WeakMap结构，当DOM 被删除时，对应的数据也会被自动删除

WeakMap的专用场景就是，一些临时需要的对象，它在将来会消失，不必手动清除，防止造成内存泄漏

#### 语法

- set
- get 
- has
- delete 

#### 实际应用

1.缓存计算结果

```js
const cache = new WeakMap();

function countOwnKeys(obj) {
  if (cache.has(obj)) {
    return [cache.get(obj), 'cached'];
  } else {
    const count = Object.keys(obj).length;
    cache.set(obj, count);
    return [count, 'computed'];
  }
}
```

```js
let obj = { name: "kakuqo", age: 30 };
console.log(countOwnKeys(obj));
// [2, 'computed']
console.log(countOwnKeys(obj));
// [2, 'cached']
obj = null; // 当对象不在使用时，设置为null
```



