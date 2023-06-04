### Array.prototype.includes

```js
//比indexOf更直接的获取元素是否存在的方法
let arr = ['react', 'angular', 'vue']

console.log(arr.indexOf('react'))  //0

console.log(arr.includes('react')) //true

console.log(arr.indexOf('jquery'))  //-1

console.log(arr.includes('jquery'))  //false
```

###  Object.values/Object.entries

`Object.values`和 `Object.entries`是在ES2017规格中，它和`Object.keys`类似，返回数组类型，其序号和`Object.keys`序号对应。

[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

### 字符填充函数padStart 和 padEnd

```js
console.log('react'.padStart(10).length)         // "       react" is 10
console.log('backbone'.padStart(10).length)         // "  backbone" is 10

//它对于财务方面非常有用：
console.log('0.00'.padStart(20))            
console.log('10,000.00'.padStart(20))    
console.log('250,000.00'.padStart(20))    
      0.00
 10,000.00
250,000.00
//第二个参数，让我们放一些其他的填充字符替代空字符串，一个字符串填充：
console.log('react'.padStart(10, '_'))         // "_____react"
console.log('backbone'.padStart(10, '*'))         // "**backbone"

console.log('react'.padEnd(10, ':-)'))         // "react:-):-" is 10
console.log('backbone'.padEnd(10, '*'))         // "backbone**" is 10
```

