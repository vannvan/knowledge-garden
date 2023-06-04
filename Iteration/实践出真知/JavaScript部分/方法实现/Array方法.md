## map实现
1. 首先考虑map方法的使用方式如下：
```javascript
const arr = ['a', 'b', 'c', 'd']

arr.mmap((item, index,arr,thisArg) => {
  console.log(item, index)
})
```
对于传入参数来说，其实就是一个回调函数
```javascript
(item, index,arr,thisArg) => {
  console.log(item)
  console.log(index)
}
```

- item 表示当前项
- index 表示当前索引
- arr 其实就是数组本身，那么因此要注意，**不能用箭头函数实现**
- thisArg 执行回调函数时的`this`值

同时考虑`mmap`需要返回一个“新数组”，因此它返回的是回调函数执行的结果集，因此实现如下：
```javascript
Array.prototype.mmap = function (fn) {
  let ans = []
  for (let i = 0; i < this.length; i++) {
    ans.push(fn(this[i], i, this))
  }

  return ans
}
```

2. 进一步考虑，按照规定`map`迭代数组时遇到空槽需要绕过，而以上方法遇到空槽拿到的是`undefined`，因此进一步改进如下：
```javascript
Array.prototype.mmap = function (fn) {
  let ans = []
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue // 遇到空槽绕过
    ans.push(fn(this[i], i, this))
  }

  return ans
}
```

3. 实际应还要补充更多的容错条件，比如当`fn`不是函数时，`this`不是数组时，需要抛出错误...
## filter实现
考虑对于filter方法和map类似，而数据能够存在于结果集的条件是回调函数成立，因此实现如下：
```javascript
Array.prototype.mfilter = function (fn) {
  let ans = []
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue
    fn(this[i], i, this) && ans.push(this[i])
  }
  return ans
}


let res = arr.mfilter((item) => item !== 'a')

console.log(res) // [ 'b', 'c', 'd' ]
```
## reduce实现
先看一下`reduce`的基础使用
```javascript
const nums = [1, 2, 3, 4, 5]
nums.reduce((prev, curr) => {
  return prev + curr
}, 0)
```

1. 两个参数，第一个参数为回调函数，第二个参数为迭代的初始值(可选)，如果没有执行就是原数组的第一项
```javascript
Array.prototype.mreduce = function (fn, init) {
  let result = init === undefined ? this[0] : init

  for (let i = init === undefined ? 1 : 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue
    result = fn(result, this[i], i, this)
  }

  return result
}

let ans = nums.mreduce((prev, curr) => {
  return prev + curr
},0) // 15

let ans2 = nums.mreduce((prev, curr) => {
  return prev + curr
}, 2) // 17
```
## 更加标准的map
参照[https://es5.github.io/#x15.4.4.19](https://es5.github.io/#x15.4.4.19) 规范的过程实现
```javascript
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
```


## 资料

- [polyfill之javascript函数的兼容写法——Array篇 - 三寸蜡笔 - 博客园](https://www.cnblogs.com/cheemon/p/6027746.html)
