### 不会改变原来数组的有：
#### concat()---连接两个或更多的数组，并返回结果。

```js
// 0.0.2/concat.js
const arr = [1, 2, 3, 4];
const arr1 = ['pr', 'is', 'a', 'boy'];
const arr2 = [5, 6, 7];

console.log(arr.concat(arr1, arr2).concat(8, 9)); // [1, 2, 3, 4, 'pr', 'is', 'a', 'boy', 5, 6, 7, 8, 9 ]
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]

```

#### every()---检测数组元素的每个元素是否都符合条件。

```js
// 0.0.2/every.js
const arr = [1, 2, 3, 4];

console.log(arr.every(i => i > 2)); // false
console.log(arr.every(i => i > 0)); // true
console.log([].every(i => i === 'pr')); // true
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

#### some()---检测数组元素中是否有元素符合指定条件。

```js
// 0.0.2/some.js
const arr = [1, 2, 3, 4];

console.log(arr.some(i => i > 4)); // false
console.log(arr.some(i => i > 0)); // true
console.log([].some(i => i === 'pr')); // false
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

#### filter()---检测数组元素，并返回符合条件所有元素的数组。

```js
// 0.0.2/filter.js
const arr = [1, 2, 3, 4];

console.log(arr.filter(i => i > 2)); // [3, 4]
console.log([].filter(i => i === 'pr')); // []
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

#### indexOf()---搜索数组中的元素，并返回它所在的位置。

#### join()---把数组的所有元素放入一个字符串。

```js
// 0.0.2/join.js
const arr = ['pr', 'is', 18];

console.log(arr.join(' ')); // pr is 18
console.log('=>');
console.log(arr); // [ 'pr', 'is', 18 ]
```

#### toString()---把数组转换为字符串，并返回结果。
#### lastIndexOf()---返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

#### map()---通过指定函数处理数组的每个元素，并返回处理后的数组。

```js
// 0.0.2/map.js
const arr = [1, 2, 3, 4];

console.log(arr.map(i => i * 10 - 5)); // [ 5, 15, 25, 35 ]
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4 ]
```

#### slice()---选取数组的的一部分，并返回一个新数组。

```js
// 0.0.2/slice.js
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr.slice(1, 5)); // [ 1, 2, 3, 4 ]
console.log('=>');
console.log(arr); // [ 0,1,2,3,4,5,6,7,8,9 ]
```

#### valueOf()---返回数组对象的原始值。


### 会改变原来数组的有：
#### pop()---删除数组的最后一个元素并返回删除的元素。

```js
// 0.0.2/pop.js
const arr = [1, 2, 3, 4];
const arr1 = [];

console.log(arr.pop()); // 4
console.log(arr1.pop()); // undefined
console.log('=>');
console.log(arr); // [ 1, 2, 3 ]
console.log(arr1); // []

```

#### push()---向数组的末尾添加一个或更多元素，并返回新的长度。

```js
// 0.0.2/push.js
const arr = [1, 2, 3, 4];

console.log(arr.push(5)); // 5
console.log(arr.push([1, 2])); // 6
console.log('=>');
console.log(arr); // [ 1, 2, 3, 4, 5, [ 1, 2 ] ]
```

#### shift()---删除并返回数组的第一个元素。

```js
// 0.0.2/shift.js
const arr = [1, 2, 3, 4];

console.log(arr.shift()); // 1
console.log('=>');
console.log(arr); // [ 2, 3, 4 ]
```

#### unshift()---向数组的开头添加一个或更多元素，并返回新的长度。

```js
// 0.0.2/unshift.js
const arr = [1, 2, 3, 4];

console.log(arr.unshift(5, 6)); // 6
console.log(arr.unshift([1, 2])); // 7
console.log('=>');
console.log(arr); // [ [ 1, 2 ], 5, 6, 1, 2, 3, 4 ]
```

#### reverse()---反转数组的元素顺序。

```js
// 0.0.2/reverse.js
const arr = [1, 2, 3, 4];
const hello = 'hello';
const helloArray = hello.split('');

console.log(helloArray.reverse().join('')); // olleh
console.log(arr.reverse()); // [ 4, 3, 2, 1 ]
console.log('=>');
console.log(arr); // [ 4, 3, 2, 1 ]
console.log(helloArray); // [ 'o', 'l', 'l', 'e', 'h' ]
```

#### sort()---对数组的元素进行排序。

```js
// 0.0.2/sort.js
const arr = [1, 2, 3, 4, 10, 12, 22];

console.log(arr.sort()); // [ 1, 10, 12, 2, 22, 3, 4];
console.log('=>');
console.log(arr); // [ 1, 10, 12, 2, 22, 3, 4];
```

#### splice()---用于插入、删除或替换数组的元素。

```js
// 0.0.2/splice.js
const arr = [1, 2, 3, 4];

console.log(arr.splice(1, 2, 10, 12)); // [ 2, 3 ]
console.log('=>');
console.log(arr); // [ 1, 10, 12, 4 ]
```

