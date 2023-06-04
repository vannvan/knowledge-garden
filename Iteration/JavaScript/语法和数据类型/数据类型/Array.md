## 概念
- 本质上，数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。
- JavaScript 使用一个32位整数，保存数组的元素个数。这意味着，数组成员最多只有 4294967295 个（232 - 1）个，也就是说length属性的最大值就是 4294967295
## 主要特征
### 长度与属性的关系
```javascript
// 会增加
fruits.length = 10;
console.log(fruits); // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
console.log(fruits[8]); // undefined

// 会减少
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```
### 稀疏数组
数组可以包含“空槽”，这与用值 undefined 填充的槽不一样。数组迭代方法时，空槽是被跳过的。
空槽可以通过以下方式之一创建：
```javascript
// Array 构造函数：
const a = Array(5); // [ <5 empty items> ]

// 数组字面量中的连续逗号：
const b = [1, 2, , , 5]; // [ 1, 2, <2 empty items>, 5 ]

// 直接给大于 array.length 的索引设置值以形成空槽：
const c = [1, 2];
c[4] = 5; // [ 1, 2, <2 empty items>, 5 ]

// 通过直接设置 .length 拉长一个数组：
const d = [1, 2];
d.length = 5; // [ 1, 2, <3 empty items> ]

// 删除一个元素：
const e = [1, 2, 3, 4, 5];
delete e[2]; // [ 1, 2, <1 empty item>, 4, 5 ]
```
在某些操作中，空槽的行为就像它们被填入了 undefined 那样。
```javascript
const arr = [1, 2, , , 5]; // 创建一个稀疏数组

// 通过索引访问
console.log(arr[2]); // undefined

// For...of
for (const i of arr) {
  console.log(i);
}

// 输出：1 2 undefined undefined 5

// 展开运算
const another = [...arr]; // "another" 为 [ 1, 2, undefined, undefined, 5 ]
```
### 数组也可以存储其它属性
```javascript
const arr = [1, 2, 3];
arr.property = "value";
arr.abc = 'abc'
console.log(arr.property); // "value"
console.log(arr.abc); // "abc"
```
### 类数组对象
一些 JavaScript 对象，如`document.getElementsByTagName() `返回的 `NodeList` 或 `arguments` 等 JavaScript 对象，有与数组相似的行为，但它们并不共享数组的所有方法。`arguments` 对象提供了 `length` 属性，但没有实现如 `forEach()`等数组方法。
可以通过 `Function.prototype.call()` 间接调用它们。
```javascript
function printArguments() {
  Array.prototype.forEach.call(arguments, (item) => {
    console.log(item);
  });
}
printArguments(1,2,3,4) // 1 2 3 4

Array.prototype.forEach.call("hello", (chr) => {
  console.log(chr);  // h e l l o
});
```
## 主要方法
### 空槽的处理方式
在遍历多个元素的方法中，**下面的方法在访问索引之前执行 in 检查，并且不将空槽与 undefined 合并：(操作类型的)**
`**concat()**`**、**`copyWithin()`、`**every()**`**、**`**filter()**`**、**`**flat()**`、`flatMap()`**、**`**forEach()**`**、**`**indexOf()**`**、**`lastIndexOf()`、`**map()**`**、**`**reduce()**`**、**`reduceRight()`、`**reverse()**`**、**`**slice()**`**、**`**some()**`**、**`**sort()**`**、**`**splice()**`
这些方法将空槽视为 undefined：(获取类型的)
`**entries()**`**、**`**fill()**`**、**`**find()**`**、**`**findIndex()**`**、**`**findLast()**`**、**`findLastIndex()`、`group()` 实验性、`groupToMap()` 实验性、`**includes()**`**、**`**join()**`**、**`**keys()**`**、**`toLocaleString()`、`**values()**`
### 复制数组的方法
有些方法不会修改调用该方法的现有数组，而是返回一个新的数组。它们通过首先构造一个新数组，然后填充元素来实现。
复制数组总是浅层次的，基本类型会讲值复制，而引用类型则仅复制了其引用。
对于具有“复制”含义的方法来说，具有两种不同的内部实现逻辑：
`concat()`、`filter()`、`flat()`、`flatMap()`、`map()`、`slice()`、`splice()`(构造返回的已删除元素数组)，对于这些方法来说，它们通过访问`this.constructor[Symbol.species]`来创建新数组。
`toReversed()`、`toSorted()`、`toSpliced()`、`with()`对于这些方法来说，它们则使用`Array`构造函数创建新数组
### 修改数组的方法
| 会修改原数组的方法 | 相应的非修改方法 |
| --- | --- |
| [copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | 没有相应的非修改方法 |
| [fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) | 没有相应的非修改方法 |
| [pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) | [slice(0, -1)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) |
| [push(v1, v2)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) | [concat([v1, v2])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) |
| [reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) | [toReversed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) |
| [shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) | [slice(1)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) |
| [sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | [toSorted()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) |
| [splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) | [toSpliced()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) |
| [unshift(v1, v2)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) | [toSpliced(0, 0, v1, v2)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) |

将改变原数组的方法转换为非修改方法的一种简单方式是使用展开语法或 `slice() `先创建一个副本
```javascript
arr.copyWithin(0, 1, 2); // 改变了 arr
const arr2 = arr.slice().copyWithin(0, 1, 2); // 不改变 arr
const arr3 = [...arr].copyWithin(0, 1, 2); // 不改变 arr
```
### 常用方法
#### flat()
创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中
```javascript
// 常规数组
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 稀疏数组
const array2 = [1, , 3, ["a", , ["d", , "e"]]];
console.log(array2.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
console.log(array2.flat(2)); // [ 1, 3, "a", "d", "e"]

// 非数组
const arrayLike = {
  length: 3,
  0: [1, 2],
  // 嵌套的类数组对象不会被展平
  1: { length: 2, 0: 3, 1: 4 },
  2: 5,
};
console.log(Array.prototype.flat.call(arrayLike));
// [ 1, 2, { '0': 3, '1': 4, length: 2 }, 5 ]
```
#### reduce()
需要注意其在提供初始值和不提供初始值的表现。
与之对应的还有`reduceRight()`方法(从右向左)
提供初始值 `_initialValue_` 通常更安全，正如下面的例子，如果没有提供 _initialValue_，则 reduce 方法会因数组长度的不同（大于 1、等于 1、等于 0）而有不同的表现：
```javascript
const getMax = (a, b) => Math.max(a, b);

// callback is invoked for each element in the array starting at index 0
[1, 100].reduce(getMax, 50); // 100
[    50].reduce(getMax, 10); // 50

// callback is invoked once for element at index 1
[1, 100].reduce(getMax);     // 100

// callback is not invoked
[    50].reduce(getMax);     // 50
[      ].reduce(getMax, 1);  // 1

[      ].reduce(getMax);     // TypeError
```
##### 应用
求和
```javascript
let total = [ 0, 1, 2, 3 ].reduce(
  ( prev, curr ) => prev + curr,
  0
)
```
累加数组对象里的值
```javascript
let initialValue = 0
let sum = [{x: 1}, {x: 2}, {x: 3}].reduce(
    (previousValue, currentValue) => previousValue + currentValue.x
    , initialValue
)

console.log(sum) // logs 6
```
将二维转换为一维
```javascript
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  ( previousValue, currentValue ) => previousValue.concat(currentValue),
  []
)
```
分组
```javascript
let people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

let groupedPeople = groupBy(people, 'age')
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```
去重
```javascript
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let myArrayWithNoDuplicates = myArray.reduce(function (previousValue, currentValue) {
  if (previousValue.indexOf(currentValue) === -1) {
    previousValue.push(currentValue)
  }
  return previousValue
}, [])

console.log(myArrayWithNoDuplicates)
```
⭐️使用 `.reduce()` 替换 `.filter()``.map()`，使用`Array.filter()`和`Array.map()` 会遍历数组两次，而使用具有相同效果的 `Array.reduce()` 只需要遍历一次，这样做更加高效。
```javascript
const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = numbers.reduce((previousValue, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    previousValue.push(doubled);
  }
  return previousValue;
}, []);

console.log(doubledPositiveNumbers); // [12, 4]
```
#### sort()
**就地**对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。
如果想要不改变原数组的排序方法，可以使用`toSorted()`。
需要注意的

- 如果没有提供 compareFn，所有非 undefined 的数组元素都会被转换为`字符串`，并按照 UTF-16 码元顺序比较字符串进行排序。例如“banana”会被排列到“cherry”之前。在数值排序中，9 出现在 80 之前，但因为数字会被转换为字符串，在 Unicode 顺序中“80”排在“9”之前。所有的 undefined 元素都会被排序到数组的末尾。
- sort() 方法保留空槽。如果源数组是[稀疏的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84)，则空槽会被移动到数组的末尾，并始终排在所有 undefined 元素的后面。

使用`map()`改善排序
compareFn 可能会在数组中的每个元素上调用多次。根据 compareFn 的性质，这可能会产生很高的开销。如果 compareFn 执行的工作更多，需要排序的元素更多，使用 map() 进行排序可能更有效率。其思路是遍历数组一次，将用于排序的实际值提取到一个临时数组中，对临时数组进行排序，然后遍历临时数组以获得正确的顺序。
```javascript
// 需要被排序的数组
const data = ["delta", "alpha", "charlie", "bravo"];

// 用于存放位置和排序值的对象数组
const mapped = data.map((v, i) => {
  return { i, value: someSlowOperation(v) };
});

// 按照多个值排序数组
mapped.sort((a, b) => {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  return 0;
});

const result = mapped.map((v) => data[v.i]);
```
#### map()
需要注意的

- 由于 map 创建一个新数组，在没有使用返回的数组的情况下调用它是不恰当的；应该使用 forEach 或 for...of 作为代替。
- 关于以下这道题
```javascript
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]

// parseInt(string, radix) -> map(parseInt(value, index))
/* 第一次迭代 (index 是 0): */ parseInt("1", 0); // 1
/* 第二次迭代 (index 是 1): */ parseInt("2", 1); // NaN
/* 第三次迭代 (index 是 2): */ parseInt("3", 2); // NaN

// 怎么实现预期呢
["1", "2", "3"].map((str) => parseInt(str)); // [1, 2, 3]

// 实现上述目标更简单的方法，同时避免了“骗招”：
["1", "2", "3"].map(Number); // [1, 2, 3]
```
#### Array.from()
从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
Array.from() 绝不会创建稀疏数组。如果 arrayLike 对象缺少一些索引属性，那么这些属性在新数组中将是 undefined。
##### 应用
```javascript
// 从字符串
Array.from("foo");
// [ "f", "o", "o" ]

// 从Set
const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]

// 从Map
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];


// 从NodeList
// 根据 DOM 元素的属性创建一个数组
const images = document.querySelectorAll("img");
const sources = Array.from(images, (image) => image.src);
const insecureSources = sources.filter((link) => link.startsWith("http://"));


// 从arguments
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [ 1, 2, 3 ]
```
箭头函数配合的妙用
```javascript
// 使用箭头函数作为映射函数去操作多个元素
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// 生成一个数字序列。因为数组在每个位置都使用 `undefined` 初始化，下面的 `v` 值将是 `undefined`
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```
#### isArray()
需要注意的是

- 它不检查值的原型链，也不依赖于它所附加的 `Array` 构造函数。对于使用数组字面量语法或 `Array` 构造函数创建的任何值，它都会返回 true。
- 当检测 Array 实例时，`Array.isArray` 优于 `instanceof`，因为`Array.isArray `能跨领域工作
```javascript
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array("a", "b", "c", "d"));
Array.isArray(new Array(3));
// 鲜为人知的事实：其实 Array.prototype 也是一个数组：
Array.isArray(Array.prototype);

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32));
// 这不是一个数组，因为它不是使用数组字面量语法或 Array 构造函数创建的
Array.isArray({ __proto__: Array.prototype });
```
### 特别的方法
#### of()
通过可变数量的参数创建一个新的 Array 实例，而不考虑参数的数量或类型
Array.of() 和 Array() 构造函数之间的区别在于对单个参数的处理：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个 length 为 7 的空数组（这意味着一个由 7 个空槽组成的数组，而不是由 7 个 undefined 组成的数组）。
```javascript
Array.of(7); // [7]
Array(7); // 由 7 个空槽组成的数组

Array.of(1, 2, 3); // [1, 2, 3]
Array(1, 2, 3);    // [1, 2, 3]
```
#### at()⭐️
接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。
```javascript
// 数组及数组元素
const cart = ["apple", "banana", "pear"];

// 一个函数，用于返回给定数组的最后一个元素
function returnLast(arr) {
  return arr.at(-1);
}

// 获取 'cart' 数组的最后一个元素
const item1 = returnLast(cart);
console.log(item1); // 输出：'pear'

// 在 'cart' 数组中添加一个元素
cart.push("orange");
const item2 = returnLast(cart);
console.log(item2); // 输出：'orange'
```




## 资料

- [Array - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.at() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
