## Set
### 基本认知

1. 类数组，但成员值都是唯一的，没有重复的值
2. 本身是构造函数，用来生成`Set`数据结构
### 特点
> 接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。

```javascript
const set = new Set([1, 2, 3, 4, 4]);  //接受数组作为参数
[...set]
// [1, 2, 3, 4]
//还可以接受类数组作为参数
```
> 向Set加入值的时候，不会发生类型转换，所以5和‘5’是不同类型的值，两个对象总是不相等的
> `NaN`为特例，在内部认为`NaN`和`NaN`是相等的

```javascript
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```
### 属性及方法
**属性**

- `constructor`  构造函数，默认就是Set函数
- `size` 成员总数

**操作方法**

- `add` 添加某个值，返回Set结构本身
- `delete` 删除某个值，返回一个布尔值
- `has` 返回一个布尔值，表示该值是否为Set成员
- `clear` 清除所有成员 ，无返回值

**遍历方法**

- `keys` 返回键名的遍历器，按插入顺序包含给定 Set 中每个元素的值。
- `values` 返回键值的遍历器，按插入顺序包含给定 Set 中每个元素的值。
- `entries` 返回键值对的遍历器
- `forEach` 使用回调函数遍历每个成员
### 主要方法
#### entries()
```typescript
const set1 = new Set();
set1.add(42);
set1.add('forty two');

const iterator1 = set1.entries();

iterator1.next()  //  将会输出以下形式
{
    "value": [42,42],
    "done": false
}

for (const entry of iterator1) {
  console.log(entry);
  // Expected output: Array [42, 42]
  // Expected output: Array ["forty two", "forty two"]
}
```
#### forEach()
```typescript
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}

new Set(['foo', 'bar', undefined]).forEach(logSetElements);

// Expected output: "s[foo] = foo"
// Expected output: "s[bar] = bar"
// Expected output: "s[undefined] = undefined"
```
#### values()/keys()
```typescript
// 它们俩的作用完全一样
const set1 = new Set();
set1.add(42);
set1.add('forty two');

const iterator1 = set1.values();

console.log(iterator1.next().value);
// Expected output: 42

console.log(iterator1.next().value);
// Expected output: "forty two"
```
### 实际应用
#### 技巧
> `Array.from`可以j将Set结构转换为数组

```javascript
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```
> 运用`Set`可以对数组进行去重

```javascript
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
> 并集(Union)，差集(Difference)和交集(Intersect)

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
## WeakSet
### 特点

1. 与`Set`类似，是不重复值的集合
2. 成员只能是对象，不能是其他类型的值
```javascript
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```
> 其中的对象都是弱引用，垃圾回收机制不会`WeakSet`对该对象的引用，这种特性可以利用其存放一些临时对象，以及存放跟对象绑定的信息。

> 基于以上特点，`WeakSet`的成员是不适合引用的，因为它会随即消失，因此规定其不可遍历

### 属性及方法
```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
// a是一个数组。它有两个成员，作为WeakSet的参数，a的成员会自动成为WeakSet的成员
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
// 数组b的成员不是对象，所以会报错
```
**操作方法**

- `add` 添加新成员
- `delete` 清除实例 的指定成员
- `has` 返回一个布尔值

`PS:再说一遍，WeakSet没有遍历方法`
### 实际应用
```javascript
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```
上面代码保证了`Foo`的实例方法，只能再`Foo`的实例上使用，这里使用`WeakSet`的好处是,`foos`对实例的引用b不会被计入内存回收机制，所以删除实例的时候不用考虑`foos`,所以不会导致`内存泄漏`
## 总结
### 两者对比
**相同点：**

1. `Set` 和 `WeakSet` 都用于存储集合类型的数据。 
2. 都可以存储**任意类型**的数据。 
3. 都可以为集合中的每个元素分配唯一的键值。 
4. 都支持 `add`, `delete`, `has`, `clear` 等一系列操作。

**不同点：**

1. `WeakSet` 中的元素必须是**对象类型**，而 `Set` 中可以存储**任意类型**的数据。 
2. `WeakSet` 的元素是弱引用，即当元素对象被垃圾回收后，该元素也自动从 `WeakSet` 中删除。而 `Set` 则不会在没有其他引用时自动删除其元素。 
3. `WeakSet` 没有 `size` 属性，也不支持 `forEach` 方法和 `keys` 方法，因为在垃圾回收发生后，`WeakSet` 中的元素已不可访问。 
4. 在使用 `Set` 时，需要手动删除元素以释放内存，而使用 `WeakSet` 时不需要。
### Set与Array

- set 不可重复；array 可重复
- set 可用来做数组去重

总之，`WeakSet` 是一个特殊的 `Set`，它所存储的元素是弱引用的，这样就允许在不再需要某些对象时自动删除。但需要注意的是，由于元素是弱引用，所以我们不能对 `WeakSet` 的元素感到有保证，因为当垃圾回收器工作时，这些对象可能随时被清除。
在使用场景方面，`Set` 可以用来存储一组唯一的值，如去重操作。`WeakSet` 则通常用于存储对象的引用，例如缓存数据或防止内存泄漏等场景。
## 资料

- [https://zh.javascript.info/map-set](https://zh.javascript.info/map-set)
- [https://zh.javascript.info/weakmap-weakset](https://zh.javascript.info/weakmap-weakset)
