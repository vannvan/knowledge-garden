- number排序

```js
    // const sortNumbers = (...numbers) => numbers.sort();   排序
```

-	数组去重思路

```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4

const set = new Set([1, 2, 3, 4, 4]);
[...set]
//[1,2,3,4]

[...new Set('ababbc')].join('')
// "abc"
```

