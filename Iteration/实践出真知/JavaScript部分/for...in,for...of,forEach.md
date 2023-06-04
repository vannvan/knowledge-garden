## for...in 
`for...in` 用于遍历对象的**所有可枚举属性**，包括继承的可枚举属性。此迭代语句可用于数组字符串或普通对象，但不能用于 `Map` 或 `Set` 对象。
```javascript
for (let prop in ['a', 'b', 'c'])
  console.log(prop);            // 0, 1, 2 (array indexes)

for (let prop in 'str')
  console.log(prop);            // 0, 1, 2 (string indexes)

for (let prop in {a: 1, b: 2, c: 3})
  console.log(prop);            // a, b, c (object property names)

for (let prop in new Set(['a', 'b', 'a', 'd']))
  console.log(prop);            // undefined (no enumerable properties)
```
## for...of
`for...of` 用于**迭代可迭代对象**，迭代它们的值而不是它们的属性。此迭代语句可用于数组、字符串、 `Map` 或 `Set` 对象，但不能用于普通对象。
```javascript
for (let val of ['a', 'b', 'c'])
  console.log(val);            // a, b, c (array values)

for (let val of 'str')
  console.log(val);            // s, t, r (string characters)

for (let val of {a: 1, b: 2, c: 3})
  console.log(prop);           // TypeError (not iterable)

for (let val of new Set(['a', 'b', 'a', 'd']))
  console.log(val);            // a, b, d (Set values)
```
## forEach
`forEach()`是 `Array` 原型的一个方法，它允许你**迭代数组的元素**。虽然 `forEach()` 只对数组进行迭代，但它可以在迭代时访问每个元素的值和索引
```javascript
['a', 'b', 'c'].forEach(
  val => console.log(val)     // a, b, c (array values)
);

['a', 'b', 'c'].forEach(
  (val, i) => console.log(i)  // 0, 1, 2 (array indexes)
);
```


