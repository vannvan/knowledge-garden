### 基本认知

> 是个对象，对象的状态不受外界影响 `pending`，`fulfilled`,`rejected`

> 一旦状态改变，就不会改变，无法中途取消；

> 如果没有回调函数，内部抛出错误不会反应到外部，

### 基本结构

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

### 关键点

生成实例后，可以用`then `方法分别指定`resolved`和`rejectd`的回调函数

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

Promise新建以后会立即执行

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

> 如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

在以上代码中，p1的状态会传递给p2，p1的状态决定了p2的状态，如果p1是pending,那么p2会等待p1的状态改变，如果p1已经完成，p2的回调函数会立即执行

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

以上代码中，p1在3秒后会reject，p2的状态在1秒后改变，由于p2返回的是一个Promise所以自己的状态就无效了，由p1决定p2的状态。

直接调用resolve或者reject并不会终结Promise的执行

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

所以一般来说，resolved应该作为一个返回值，把后续的操作放在then里面，所以应该像如下使用方式:

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

### then

可以链式调用，前一个then的语句的结果会作为参数传递给下一个then

### catch

可以链式调用，前一个catch的语句的错误会作为参数传递给下一个catch

### finally

用于指定不管 Promise 对象最后状态如何，都会执行的操作



`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

### all

```javascript
const p = Promise.all([p1, p2, p3]);
```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个**数组**，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

[阮一峰](https://es6.ruanyifeng.com/#docs/promise#Promise-all)

### race

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

### allSettled

该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束

