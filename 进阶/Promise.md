### 基本认知

> 是个对象，对象的状态不受外界影响 `pending`，`fulfilled`,`rejected`

> 一旦状态改变，就不会改变，无法中途取消；

> 如果没有回调函数，内部抛出错误不会反应到外部

> `then`和`catch`都会返回一个新的`Promise`

> `catch`不管被连接到哪里，都能捕获到上层未捕获的错误

> 在`Promise`中返回任意一个非`Promise`的值都会被包裹成`Promise`对象，例如`return 2`会被包裹成`return Promise.resolve(2)`

> `.then`或`.catch`中`return`一个`error`对象并不会抛出错误，所以不会后续的`.catch`捕获

> `.then`或`.catch`的返回值不能是`Promise`本身，否则会造成死循环

> `.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传

> `.then`方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为`catch`是`.then`第二个参数的简便写法。

> `.finally`方法也是返回一个`Promise`，他在`Promise`结束的时候，无论结果为`resolved`还是`rejected`，都会执行里面的回调函数。

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

```js
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})
```

需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

[阮一峰](https://es6.ruanyifeng.com/#docs/promise#Promise-all)

[总结一下Promise.all()和Promise.race()](https://zhuanlan.zhihu.com/p/66119015)

### race

```javascript
const p = Promise.race([p1, p2, p3]);
```

###  all和race总结

- `Promise.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。

- `.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

- `Promise.all().then()`结果中数组的顺序和`Promise.all()`接收到的数组顺序一致。

- `all和race`传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被`then`的第二个参数或者后面的`catch`捕获；但并不会影响数组中其它的异步任务的执行。

### allSettled

该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束



### 和promise关联知识

**event loop它的执行顺序：**

- 一开始整个脚本作为一个宏任务执行
- 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
- 执行浏览器UI线程的渲染工作
- 检查是否有`Web Worker`任务，有则执行
- 执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

**微任务包括：**`MutationObserver`、`Promise.then()或catch()`、`Promise为基础开发的其它技术，比如fetch API`、`V8`的垃圾回收过程、`Node独有的process.nextTick`。

**宏任务包括**：`script` 、`setTimeout`、`setInterval` 、`setImmediate` 、`I/O` 、`UI rendering`。

### 一些例题

[Promise面试题](<https://juejin.im/post/5e58c618e51d4526ed66b5cf>)

```js
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0
console.log('start');
```

![](https://user-gold-cdn.xitu.io/2020/2/28/1708b0d8489e5732?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  })
// "then: success1"   验证结论：状态一经改变就不能再改变
```

```js
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
//"catch: " "error"  
//"then3: " undefined
//  验证结论：catch不管链接到哪里都能捕获到上层未捕获到的错误，then3执行的原因是因为catch也会返回一个promise,但是这个promise 没有返回值，所以是undefined
```

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
//1
// .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
// 第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了透传，将resolve(1) 的值直接传到最后一个then里。
```

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
//'script start'    
//'async1 start'
//'promise1'
//'script end'
// 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应...所以在await之后的内容是不会执行的，也包括async1后面的 .then。
```

上题给await的promise加上返回值

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
//'script start'
//'async1 start'
//'promise1'
//'script end'
//'promise1 resolve'
//'async1 success'
//'async1 end'
```





### 文章

- [45道Promise面试题](https://juejin.im/post/5e58c618e51d4526ed66b5cf)

- [解决map(), forEach()里面使用异步函数，使用await接收无效时](https://www.cnblogs.com/Jennyishere/p/12928654.html)

