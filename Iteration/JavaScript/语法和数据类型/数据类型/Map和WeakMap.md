## Map
### 基本认知
JavaScript的对象，本质上是键值对的集合（Hash结构），但是传统上只能使用字符当作键，所以有很大的限制，为了解决这个问题，`ES6`提供了Map数据结构。类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以当作键。
### 特点
如果对同一个键进行多次赋值，后面的值会覆盖前面的值
```javascript
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"
```
> 读取一个未知的值返回`undefined`

> 只有对同一对象的引用，Map才认为是同一个键

```javascript
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```
上面的`set`和`get`方法，表面是针对同一个键，但实际上是两个不同的数组实例，内存地址不一样，所以被认为是两个不同的键
> 同样的值的两个实例，也会被Map认为是两个键

```javascript
const map = new Map()
const k1 = ['a']
const k2 = ['a']
map,set(k1,111).set(k2,222)
map,get(k1) // 111
map.get(k2) // 222
```
综上所述，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就会被认为键不一样。这样就解决了同名属性碰撞的问题。
> 如果Map的键是一个简单类型的值，只要两个值严格相等就被视为同一个键， 0和-0是同一个键，布尔`true`和字符串`true`是两个不同的键，`null`和`undefined`是两个不同的键。
>  特例：`NaN`虽然不严格等于自身，但Map认为是同一个键

### 属性和方法
**操作方法**

- size 成员的个数
- set 设置键名`key`和对应的值`value`， 返回整个Map结构，可采用链式写法
- get 读取`key`对应的值，找不到返回`undefined`
- has 返回一个布尔值
- delete 删除某个键 返回布尔值
- clear 清除所有成员 没有返回值

**遍历方法**  **Map的遍历顺序就是插入的顺序**

- keys 返回键名
- values 返回键值
- entries 返回所有成员
- forEach 遍历所有成员
### 主要方法
#### entries()
```typescript
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.entries();

console.log(iterator1.next().value); // ["0", "foo"]

console.log(iterator1.next().value); // [1, "bar"]
```
#### keys()
```typescript
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.keys();

console.log(iterator1.next().value);  // '0'

console.log(iterator1.next().value); // '1'
```
#### values()
```typescript
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.values();

console.log(iterator1.next().value); // 'foo'

console.log(iterator1.next().value); // 'bar'
```
### 实际应用

- Map转为数组
```javascript
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

- 数组转为Map
```javascript
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
```javascript
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
```javascript
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

- Map转为JSON
```javascript
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
```javascript
//键名都是字符串的情况
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```
## WeakMap
### 基本认知
**WeakMap** 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
**与Map的区别**

- 只接受对象作为键名（`null`除外），不接受其他类型
- 键名所指的对象，不计入垃圾回收机制
```javascript
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
```
现在，如果我们在 `weakMap` 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和`map`）中自动清除。
```javascript
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```
PS：一个简单的场景，需要再指定的`DOM`上进行添加数据，数据可以采用`WeakMap`结构，当`DOM` 被删除时，对应的数据也会被自动删除
`WeakMap`的专用场景就是，一些临时需要的对象，它在将来会消失，不必手动清除，防止造成内存泄漏
### 方法

- set
- get
- has
- delete
### 实际应用

1. 缓存计算结果
```javascript
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
应用
```javascript
let obj = { name: "kakuqo", age: 30 };
console.log(countOwnKeys(obj));
// [2, 'computed']
console.log(countOwnKeys(obj));
// [2, 'cached']
obj = null; // 当对象不在使用时，设置为null
```
### 实现clear
```javascript
class ClearableWeakMap {
  constructor(init) {
    this._wm = new WeakMap(init);
  }
  clear() {
    this._wm = new WeakMap();
  }
  delete(k) {
    return this._wm.delete(k);
  }
  get(k) {
    return this._wm.get(k);
  }
  has(k) {
    return this._wm.has(k);
  }
  set(k, v) {
    this._wm.set(k, v);
    return this;
  }
}
```
## 总结
### 两者对比
**相同点：**

1. 都是内存映射的数据结构
2. 都是键值对的集合

**不同点：**

1. `Map`可以使用任何类型作为键，包括字符串，数字，对象等；而`WeakMap`只能使用**对象**作为键。 
2. 在Map中，添加键值对不会影响该键所引用的对象的垃圾回收；而`WeakMap`中，如果键所引用的对象没有其他引用，它将被垃圾回收。 
3. `Map`具有`size`属性和一些特定的方法，如`forEach()`，`keys()`，`values()`和`entries()`。`WeakMap`没有这些方法，因为它不允许直接访问键。 
4. 在`Map`中，迭代顺序与添加顺序相同。`WeakMap`没有特定的迭代顺序，因为它不保证键仍然存在。
### Map与Object

- Object 的键只能是 字符串 or Symbol；Map 可以是任意类型
- Map 可以通过 size 获取元素个数，Object 得遍历
- Map 是有序的；Object 是无序的
- **Map 可迭代**；Object 只能遍历，或通过 Object.entries/values/keys 迭代

总之，`Map`和`WeakMap`是两种不同的数据结构，可以根据具体的情况来选择使用哪种结构。如果需要对键进行循环遍历，或者需要保留键的引用，可以使用`Map`。如果需要快速释放不需要的键引用，并且不需要对键进行循环遍历，可以使用`WeakMap`。
## 资料

- [https://zh.javascript.info/map-set](https://zh.javascript.info/map-set)
- [https://zh.javascript.info/weakmap-weakset](https://zh.javascript.info/weakmap-weakset)
- [WeakMap - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
