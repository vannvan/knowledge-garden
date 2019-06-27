

### `_.compact(array)`

创建一个新数组，包含原数组中所有的非假值元素。例如`false`, `null`, `0`, `""`, `undefined`, 和 `NaN` 都是被认为是“假值”。

```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

### `_.concat(array, [values])`

创建一个新数组，将`array`与任何数组 或 值连接在一起。

```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```

### `_.drop(array, [n=1])`

创建一个切片数组，去除`array`前面的`n`个元素。（`n`默认值为1。）

```js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

### `_.fill(array, value, [start=0], [end=array.length])`

使用 `value` 值来填充（替换） `array`，从`start`位置开始, 到`end`位置结束（但不包含`end`位置）。

**Note:** 这个方法会改变 `array`（不是创建新数组）。

```
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
 
_.fill(Array(3), 2);
// => [2, 2, 2]
 
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```

### `_.findIndex(array, [predicate=_.identity], [fromIndex=0])`

该方法类似 [`_.find`](https://www.lodashjs.com/docs/latest#find)，区别是该方法返回第一个通过 `predicate` 判断为真值的元素的索引值（index），而不是元素本身。

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

### `_.head(array)`

获取数组 `array` 的第一个元素。

```js
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined
```

