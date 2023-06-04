## 示例1
求和实现以下效果
```javascript
const sum = (a, b, c, d) => {
  return a + b + c + d
}
const fn = curry(sum)

const res = fn(1)(2)(3)(4) // 10
```

1. 首先考虑一个柯里化函数的调用方式
```javascript
const curry = (fn) => {
  //
}

const sum = (a, b, c, d) => {
  return a + b + c + d
}

const fn = curry(sum)

const res = fn(1)(2)(3)(4)
```
也就是说，对于`res`所调用`fn`而言，`fn`本身是个函数，所以`fn(1)`可以执行，`fn(1)`的返回值是个函数才能有`fn(1)(2)`，依次类推...
因此可见`curry`函数需要返回一个函数，因此进一步考虑函数应为如下形态：
```javascript
const curry = (fn) => {
  const next = (...args) => {
  
  }
  return next
}
```

2. 再进一步，考虑1，2，3，4的传入方式，对于curry函数来讲，它就要具备缓存每次传入参数的能力，从而才能在满足参数参数数量的条件下去执行原函数。
```javascript
const curry = (fn) => {
  let params = []
  const next = (...args) => {
    params = [...params, ...args]
    // 当参数还不足之前不能执行
    if (params.length < fn.length) {
      return next
    } else {
      return fn.apply(fn, params)
      // return fn(...params) 一样
    }
  }
  return next
}

const sum = (a, b, c, d) => {
  return a + b + c + d
}
const fn = curry(sum)

const res = fn(1)(2)(3)(4)

console.log(res) // 10
```
## 示例2
实现延迟执行
```javascript
sum(1)(2)(3);   //未真正执行求和运算
sum(4);         //未真正执行求和运算
sum();   //执行求和
```

1. 继续上一例题的思路，为了满足该示例的条件，传入参数就将结果缓存，不传就计算最终结果
```javascript
const curry = (func) => {
  let params = []
  const next = (...args) => {
    if (args.length == 0) {
      // todo1
    } else {
      // todo2
    }
  }
  return next
}

let add = function (...args) {
  return args.reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}
```

2. 先考虑`todo2`位置，它的目的是要将当前传入参数缓存，同时不进行实际的计算，那么就应该每次来参数把参数`push`进`params`缓存，同时将`next`返回

其次考虑todo1位置，当不传入参数时，要执行最后的计算了，因此完善后有以下形式：
```javascript
const curry = (func) => {
  let params = []
  const next = (...args) => {
    if (args.length == 0) {
      // return func.apply(func, params) 一样的效果
      return func(...params)
    } else {
      params.push(...args)
      return next
    }
  }
  return next
}
let add = function (...args) {
  return args.reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}

const sum = curry(add)

sum(1)(2)(2)
sum(4)
console.log(sum())  // 10
```



## 资料

- [https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.3.2#1.-fu-yong-can-shu](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.3.2#1.-fu-yong-can-shu)
