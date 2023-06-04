### Set

**基本认知**

> 类数组，但成员值都是唯一的，没有重复的值

> 本身是构造函数，用来生成Set数据结构

#### 特点

> 接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 4]);  //接受数组作为参数
[...set]
// [1, 2, 3, 4]
//还可以接受类数组作为参数
```

> 向Set加入值的时候，不会发生类型转换，所以5和‘5’是不同类型的值，两个对象总是不相等的
>
> `NaN`为特例，在内部认为`NaN`和`NaN`是相等的

```js
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

#### 属性及方法

**属性**

- constructor  构造函数，默认就是Set函数
- size 成员总数

**操作方法**

- add 添加某个值，返回Set结构本身
- delete 删除某个值，返回一个布尔值
- has 返回一个布尔值，表示该值是否为Set成员
- clear 清除所有成员 ，无返回值

**遍历方法**

- keys 返回键名的遍历器
- values 返回键值的遍历器
- entries 返回键值对的遍历器
- forEach 使用回调函数遍历每个成员

#### 实际应用

#### 技巧

> `Array.from`可以j将Set结构转换为数组

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

> 运用Set可以对数组进行去重

```js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

> 并集(Union)，差集(Difference)和交集(Intersect)

```js
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

### WeakSet

#### 特点

> 与Set类似，是不重复值的集合

> 成员只能是对象，不能是其他类型的值

```js
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```

> 其中的对象都是弱引用，垃圾回收机制不会WeakSet对该对象的引用，这种特性可以利用其存放一些临时对象，以及存放跟对象绑定的信息。

> 基于以上特点，WeakSet的成员是不适合引用的，因为它会随即消失，因此规定其不可遍历

#### 属性及方法

```js
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

- add 添加新成员
- delete 清除实例 的指定成员
- has 返回一个布尔值

`PS:再说一遍，WeakSet没有遍历方法`

#### 实际应用

```js
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

