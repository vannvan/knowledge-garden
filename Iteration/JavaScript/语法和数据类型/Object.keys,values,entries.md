## 要点
### 使用
```javascript
let user = {
  name: "John",
  age: 30
};
```

- Object.keys(user) = ["name", "age"]
- Object.values(user) = ["John", 30]
- Object.entries(user) = [ ["name","John"], ["age",30] ]
```javascript
for(let [k,v] of Object.entries(user)) {
    console.log(k,v)
}
// name John
// age 30
```
### 特例
**Object.keys/values/entries 会忽略 symbol 属性**
> 就像 for..in 循环一样，这些方法会忽略使用 Symbol(...) 作为键的属性。
> 通常这很方便。但是，如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 [Object.getOwnPropertySymbols](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)，它会返回一个只包含 Symbol 类型的键的数组。另外，还有一种方法 [Reflect.ownKeys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)，它会返回 **所有** 键。

```javascript
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```

## 资料

- [https://zh.javascript.info/keys-values-entries](https://zh.javascript.info/keys-values-entries)
