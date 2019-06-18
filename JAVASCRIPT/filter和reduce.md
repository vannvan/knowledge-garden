#### filter(数组方法)

- 只传一个参数，表示Array的某个元素

```js
//例如，在一个Array中，删掉偶数，只保留奇数，可以这么写：
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]

//把一个Array中的空字符串删掉，可以这么写：
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
arr; // ['A', 'B', 'C']
```

- 多个参数，第一个参数表示Array的某个元素，回调函数还可接收另外两个参数，表示元素位置和数组本身

```js
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});

//利用filter，可以巧妙地去除Array的重复元素：

'use strict';
var r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
alert(r.toString());
//去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了。
```

#### reduce

reduce回调函数接收四个参数

​	prev: 第一项的值或者上一次叠加的结果值
​	cur: 当前会参与叠加的项
​	index： 当前值的索引
​	arr: 数组本身

eg1:求和

```js
var result = [
    {
        subject: 'math',
        score: 88
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];

// 求该同学的总成绩
// 
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
```

eg2:字符串中每个字母出现的次数

```js
var arrString = 'abcdaabc';
arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})
```

#### filter and reduce 过滤数组对象

```js
const reducedFilter = (data, keys, fn) =>data.filter(fn).map(el =>keys.reduce((acc, key) => {acc[key] =el[key];return acc;}, {}));
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

let a = reducedFilter(data, ['id', 'name'], item => item.age > 24); 
// [{ id: 2, name: 'mike'}]
```