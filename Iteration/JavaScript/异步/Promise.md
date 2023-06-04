## 基础要点
### 解决的问题

- 解决回调地狱
- 它的状态一旦改变，无论何时查询，都能得到这个状态。这意味着，无论何时为 Promise 实例添加回调函数，该函数都能正确执行(分场景，也可以理解为缺点)
### 特性
#### 状态

- `pending` (等待态)
- `fulfilled` (完成态)
- `rejected` (拒绝态)
#### 终值与拒因

- 终值：指的是 `promise` 被解决时传递给解决回调的值
- 拒因：拒绝原因，指在 `promise` 被拒绝时传递给异常回调的拒绝原因
#### 状态/终值/拒因的关系

- `pending` 可以迁移至 `fulfilled` 或 `rejected`
- `fulfilled` 不能迁移至其他状态，必须拥有一个不可变的终值
- `rejected` 不能迁移至其他状态，必须拥有一个不可变的据因
### 构造器的理解
#### 语法
Promise 对象的构造器（constructor）语法如下：
```javascript
let promise = new Promise(function(resolve, reject) {
  // executor（生产者代码）
});
```
传递给 `new Promise`的函数被称为 `**executor**`。当 `new Promise` 被创建，`executor` 会自动运行。它包含最终应产出结果的生产者代码
由 `new Promise` 构造器返回的 `promise` 对象具有以下内部属性：

- state —— 最初是 "pending"，然后在 `resolve` 被调用时变为 "`fulfilled`"，或者在 `reject` 被调用时变为 "`rejected`"。
- result —— 最初是 undefined，然后在 `resolve(value)` 被调用时变为 `value`，或者在` reject(error)` 被调用时变为 `error`。
#### **四个要点**
##### 只能有一个结果或一个 error
`executor` 只能调用一个 `resolve` 或一个 `reject`。任何状态的更改都是最终的。
所有其他的再对 `resolve` 和 `reject` 的调用都会被忽略：
```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 被忽略
  setTimeout(() => resolve("…")); // 被忽略
});
```
##### **以 Error 对象 reject**
如果什么东西出了问题，`executor` 应该调用 `reject`。这可以使用任何类型的参数来完成（就像 `resolve` 一样）。但建议使用 `Error` 对象（或继承自 `Error` 的对象）。
##### **resolve/reject 可以立即进行**
实际上，`executor` 通常是异步执行某些操作，并在一段时间后调用 `resolve/reject`，但这不是必须的。我们还可以立即调用 `resolve` 或 `reject`，就像这样：
```javascript
let promise = new Promise(function(resolve, reject) {
  // 不花时间去做这项工作
  resolve(123); // 立即给出结果：123
});
```
##### state 和 result 都是内部的
`Promise` 对象的 `state` 和 `result` 属性都是内部的。我们无法直接访问它们。但我们可以对它们使用` .then/.catch/.finally` 方法。我们在下面对这些方法进行了描述。
#### then,catch
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject 运行 .then 中的第二个函数
promise.then(
  result => alert(result), // 不运行
  error => alert(error) // 1 秒后显示 "Error: Whoops!"
);
```
如果我们只对成功完成的情况感兴趣，那么我们可以只为`.then`提供一个函数参数：
```javascript
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // 1 秒后显示 "done!"
```
如果我们只对 `error` 感兴趣，那么我们可以使用 `null` 作为第一个参数：`.then(null, errorHandlingFunction)`。或者我们也可以使用 `.catch(errorHandlingFunction)`，其实是一样的：
```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) 与 promise.then(null, f) 一样
promise.catch(alert); // 1 秒后显示 "Error: Whoops!"
```
#### finally
调用 `.finally(f)` 类似于 `.then(f, f)`，因为当` promise settled` 时`f`就会执行：无论 `promise` 被 `resolve` 还是 `reject`。

- finally 处理程序没有得到前一个处理程序的结果（它没有参数）。而这个结果被传递给了下一个合适的处理程序。
- 如果 finally 处理程序返回了一些内容，那么这些内容会被忽略。
- 当 finally 抛出 error 时，执行将转到最近的 error 的处理程序。
### ⭐️错误处理
#### catch
```javascript
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
```
通常情况下，这样的 `.catch `根本不会被触发。但是如果上述任意一个 `promise rejected`（网络问题或者无效的 `json` 或其他），`.catch` 就会捕获它。
再看一个例子
```javascript
Promise.resolve()
    .then(() => {
        console.log(1);
        return new Error('error!!!');
    })
    .then((res) => {
        console.log(2);
        console.log('then: ', res);
    })
    .catch((err) => {
        console.log(3);
        console.log('catch: ', err);
    });
```
以上的`catch`同样不会触发，`new Error`不会被当成失败，但是如果使用`throw`抛出一个`Error`，就会触发`catch`
#### ⭐️未处理的 rejection
```javascript
new Promise(function() {
  noSuchFunction(); // 这里出现 error（没有这个函数）
})
  .then(() => {
    // 一个或多个成功的 promise 处理程序
  }); // 尾端没有 .catch！
```
如果出现 `error`，`promise` 的状态将变为 `rejected`，然后执行应该跳转至最近的 `rejection` 处理程序。但上面这个例子中并没有这样的处理程序。因此 `error` 会“卡住”。没有代码来处理它。
JavaScript 引擎会跟踪此类 `rejection`，在这种情况下会生成一个全局的 `error`。如果你运行上面这个代码，你可以在控制台中看到。
在浏览器中，我们可以使用 `unhandledrejection` 事件来捕获这类 `error`：
```javascript
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] —— 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! —— 未处理的 error 对象
});

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```
如果出现了一个 `error`，并且在这没有 `.catch`，那么 `unhandledrejection` 处理程序就会被触发，并获取具有 `error` 相关信息的 `event` 对象，所以我们就能做一些后续处理了。
## API
### Promise.all
假设我们希望并行执行多个 `promise`，并等待所有 `promise` 都准备就绪。
例如，**并行下载几个 URL**，并等到所有内容都下载完毕后再对它们进行处理。
用法示例
```javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
```
**请注意，结果数组中元素的顺序与其在源 **`**promise**`** 中的顺序相同。**即使第一个 `promise` 花费了最长的时间才 `resolve`，但它仍是结果数组中的第一个。
**如果任意一个 promise 被 reject，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error。**
**例如**
```javascript
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```
这里的第二个 `promise` 在两秒后 reject。这立即导致了 `Promise.all`的 `reject`，因此 `.catch` 执行了：被 `reject` 的 `error` 成为了整个 `Promise.all` 的结果。
> **⚠️如果出现 error，其他 promise 将被忽略**
> 如果其中一个 promise 被 reject，Promise.all 就会立即被 reject，完全忽略列表中其他的 promise。它们的结果也被忽略。
> 例如，像上面那个例子，如果有多个同时进行的 fetch 调用，其中一个失败，其他的 fetch 操作仍然会继续执行，但是 Promise.all 将不会再关心（watch）它们。它们可能会 settle，但是它们的结果将被忽略。
> Promise.all 没有采取任何措施来取消它们，因为 promise 中没有“取消”的概念

**另外，Promise.all(iterable) 允许在 iterable 中使用非 promise 的“常规”值**
```javascript
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```
### Promise.allSettled
如果**任意的** `promise reject`，则 `Promise.all` 整个将会 `reject`。当我们需要 **所有** 结果都成功时，它对这种“**全有或全无**”的情况很有用：
```javascript
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 方法需要所有 fetch 的数据

```
`Promise.allSettled` **等待所有的 **`**promise**`** 都被 **`**settle**`，无论结果如何。结果数组具有：

- {status:"fulfilled", value:result} 对于成功的响应，
- {status:"rejected", reason:error} 对于 error。

例如，我们想要获取（fetch）多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。
```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```
以上的结果将会是
```javascript
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```
如果浏览器不支持` Promise.allSettled`，很容易进行 polyfill：
```javascript
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```
### Promise.race
与 `Promise.all `类似，但**只等待第一个 settled 的 promise 并获取其结果（或 error）**。
例如，以下的结果将是1
```javascript
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```
### Promise.any
与 `Promise.race`类似，区别在于 `Promise.any` **只等待第一个 fulfilled 的 promise**，并将这个 `fulfilled` 的 `promise` 返回。如果给出的 `promise` 都 `rejected`，那么返回的 promise 会带有 [AggregateError](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) —— 一个特殊的 error 对象，在其 `errors` 属性中存储着所有 `promise error`。
例如，以下的结果将会是1
```javascript
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```
以下是一个所有 `promise` 都失败的例子：
```javascript
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```
### Promise.resolve/reject
在现代的代码中，很少需要使用`Promise.resolve`和`Promise.reject`方法，因为`async/await`语法使它们变得有些过时了。
#### resolve
```javascript
let p = Promise.resolve(x)
// 等价于
let p = new Promise((resolve)=>{
    resolve(x)
})
```
当一个函数被期望返回一个 `promise` 时，这个方法用于兼容性。（这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 `x`，但是期望返回的是一个 `promise`，所以可以使用 `Promise.resolve(x)` 将 `x` “封装”进 `promise`，以满足期望返回一个 `promise` 的这个需求。）
例如，下面的 `loadCached` 函数获取（fetch）一个 URL 并记住其内容。以便将来对使用相同 URL 的调用，它能立即从缓存中获取先前的内容，但使用 `Promise.resolve` 创建了一个该内容的 `promise`，所以返回的值始终是一个 `promise`。
```javascript
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```
我们可以使用 `loadCached(url).then(…)`，因为该函数保证了会返回一个 `promise`。我们就可以放心地在 `loadCached` 后面使用 .then。这就是 (*) 行中 `Promise.resolve` 的目的。
#### reject
`Promise.reject(error)` 用 `error` 创建一个 `rejected` 的 `promise`。实际上，这个方法几乎从未被使用过。
```javascript
let p = Promise.reject(x)
// 等价于
let p = new Promise((resolve,reject)=>{
    reject(x)
})
```
## Promise链解析
```javascript
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```
运行流程如下：

1. 初始 promise 在 1 秒后 resolve (*)，
2. 然后 .then 处理程序被调用 (**)，它又创建了一个新的 promise（以 2 作为值 resolve）。
3. 下一个 then (***) 得到了前一个 then 的值，对该值进行处理（*2）并将其传递给下一个处理程序。
4. ……依此类推。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682258451685-46082cc9-0a74-41c8-a6d2-e5e9dab7bc5d.png#averageHue=%23fdfaf7&clientId=u7f641c3d-5102-4&from=paste&height=614&id=u14540b4a&originHeight=358&originWidth=350&originalType=binary&ratio=2&rotation=0&showTitle=false&size=10423&status=done&style=none&taskId=ud1c0ecd1-a53b-4f54-b887-25e314b0246&title=&width=600)
**新手常犯的一个经典错误：从技术上讲，我们也可以将多个 .then 添加到一个 promise 上。但这并不是 promise 链（chaining）。**
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```
我们在这里所做的只是一个 promise 的几个处理程序。它们不会相互传递 result；相反，它们之间彼此独立运行处理任务。
## ![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682258486411-31d663af-377e-4a6e-ad21-9980c9008726.png#averageHue=%23fdfaf8&clientId=u7f641c3d-5102-4&from=paste&height=151&id=u7ec6161b&originHeight=174&originWidth=693&originalType=binary&ratio=2&rotation=0&showTitle=false&size=8391&status=done&style=none&taskId=u51be71c4-361f-454b-a1fa-7e95a002691&title=&width=600)
Promisification
对于一个简单的转换来说 “Promisification” 是一个长单词。它指将一个接受回调的函数转换为一个返回 promise 的函数。
在实际开发中，我们可能需要 promise 化很多函数，所以使用一个 helper（辅助函数）很有意义。
我们将其称为 promisify(f)：它接受一个需要被 promise 化的函数 f，并返回一个包装（wrapper）函数。
```javascript
function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function） (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调 (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
    });
  };
}

// 用法：
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```
但是如果原始的 f 期望一个带有更多参数的回调 callback(err, res1, res2, ...)，该怎么办呢？
我们可以继续改进我们的辅助函数。让我们写一个更高阶版本的 promisify。

- 当它被以 promisify(f) 的形式调用时，它应该以与上面那个版本的实现的工作方式类似。
- 当它被以 promisify(f, true) 的形式调用时，它应该返回以回调函数数组为结果 resolve 的 promise。这就是具有很多个参数的回调的结果。
```javascript
// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // 我们自定义的 f 的回调
        if (err) {
          reject(err);
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// 用法：
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```
## then()用法解析
对比一下四种写法的差异
```javascript
// 写法一
f1().then(function () {
  return f2();  // f2是f1执行的结果，返回f2，因此返回的是f1执行的结果
});

// 写法二
f1().then(function () {
  f2();  // 返回的是undefined
});

// 写法三
f1().then(f2());  // 返回的是f2执行的结果

// 写法四
f1().then(f2);  // f2拿到的f1执行的结果，因此会返回f1执行的结果
```
## PromiseA+规范(部分)
### 状态
一个 `Promise` 的当前状态必须为以下三种状态中的一种：**等待态（Pending）**、**执行态（Fulfilled）**和**拒绝态（Rejected）**。
### Then 方法
一个 `promise` 必须提供一个 then 方法以访问其当前值、终值和据因。
`promise` 的 `then` 方法接受两个参数：
```javascript
promise.then(onFulfilled, onRejected)
```
#### 参数可选
`onFulfilled` 和 `onRejected` 都是可选参数。

- 如果 `onFulfilled` **不是函数，其必须被忽略(对应下面题目3)**
- 如果 `onRejected` **不是函数，其必须被忽略**
#### onFulfilled 特性
如果 `onFulfilled` 是函数：

- 当 `promise` 执行结束后其必须被调用，其第一个参数为 `promise` 的终值
- 在 `promise` 执行结束前其不可被调用
- 其调用次数不可超过一次
#### onRejected 特性
如果 `onRejected` 是函数：

- 当 `promise` 被拒绝执行后其必须被调用，其第一个参数为 `promise` 的据因
- 在 `promise` 被拒绝执行前其不可被调用
- 其调用次数不可超过一次
#### 调用时机
`onFulfilled` 和 `onRejected` 只有在[执行环境](http://es5.github.io/#x10.3)堆栈仅包含**平台代码**时才可被调用 
#### 调用要求
`onFulfilled` 和 `onRejected` 必须被作为函数调用（即没有 `this` 值）
#### 多次调用
`then` 方法可以被同一个 `promise` 调用多次

- 当 `promise` 成功执行时，所有 `onFulfilled` 需按照其注册顺序依次回调
- 当 `promise` 被拒绝执行时，所有的 `onRejected` 需按照其注册顺序依次回调
#### 返回⭐️
`then` 方法必须返回一个 `promise` 对象
```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```

- 如果 `onFulfilled` 或者 `onRejected` 返回一个值 `x` ，则运行下面的 `Promise` 解决过程：`[[Resolve]](promise2, x)`
- 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e` ，则 `promise2` 必须拒绝执行，并返回拒因 e
- 如果 `onFulfilled` 不是函数且 `promise1` 成功执行， `promise2` 必须成功执行并返回相同的值
- 如果 `onRejected` 不是函数且 `promise1` 拒绝执行， `promise2` 必须拒绝执行并返回相同的据因

理解上面的“**返回**”部分非常重要，即：**不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。**
### Promise 解决过程
`Promise` 解决过程 是一个抽象的操作，其需输入一个 `promise` 和一个值，我们表示为` [[Resolve]](promise, x)`，如果 `x` 有 `then` 方法且看上去像一个 `Promise` ，解决程序即尝试使 `promise` 接受 `x` 的状态；否则其用 `x` 的值来执行 `promise` 。
这种 `thenable` 的特性使得 `Promise` 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 `then` 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。
运行 `[[Resolve]](promise, x)` 需遵循以下步骤：

1. `x` 与 `promise` 相等

如果 `promise` 和 `x` 指向同一对象，以 `TypeError` 为据因拒绝执行 `promise`

2. `x` 为 `Promise`，则使 `promise` 接受 `x` 的状态 
- 如果 `x` 处于等待态， `promise` 需保持为等待态直至 `x` 被执行或拒绝
- 如果`x` 处于执行态，用相同的值执行 `promise`
- 如果 `x`处于拒绝态，用相同的据因拒绝 `promise`
3. `x` 为对象或函数，比较复杂，这里不展开，见下面【Promise A+ 规范】
## 总结
### 对Promise的理解
`Promise`是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。
所谓 `Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise`是一个对象，从它可以获取异步操作的消息。`Promise` 提供统一的API，各种异步操作都可以用同样的方法进行处理。

1. 三个状态：`Pending`，`Resolved`，`Rejected`
2. 两个过程：`pending` -> `fulfilled` ->: `Resolved` ; `pending` -> `rejected` : `Rejected`
3. 两个特点：
- 状态不受外部影响，任何其它操作都无法改变处于`pending`，`fulfilled`，`rejected`的状态
- 一旦状态改变就不会再变，`promise`对象的状态改变，只有两种可能：从 `pending` 变为`fulfilled`，从`pending` 变为 `rejected`。这时就称为 `resolved`（已定型）
4. 四个缺点：
- 无法中途取消`Promise`(看场景，这一特性说是优点和缺点都说得过去)
- 如果不设置回调函数，`Promise`内部抛出的错误不会反映到外部
- 当处于`pending`状态是，无法得知目前进展到哪个阶段(是刚刚开始还是即将完成)
- 阅读代码也不是一眼可以看懂，你只会看到一堆`then`，必须自己在`then`的回调函数里面理清逻辑。
### then和catch
当`Promise`实例的状态变为成功（`fulfilled`）时，`then`方法被调用，接收一个参数（成功回调函数），并返回一个新的Promise实例。这个实例的状态依赖于成功回调函数的执行结果，如果成功回调函数中返回了一个值，则该`Promise`实例的状态变为成功，并将这个值传递给下一个`then`方法中的回调函数，如果成功回调函数中抛出了一个异常，则状态变为失败，进入`catch`
当`catch`被调用后(它接收一个表示失败的回调函数)，同样会像`then`一样讲结果传递给下一个then方法的回调函数。
`then`和`catch`方法的执行结果将决定返回的新`Promise`实例的状态，从而影响整个`Promise`实例的状态变化。
### 方法总结
Promise 类有 6 种静态方法：

1. Promise.all(promises) —— 等待**所有** promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。
2. Promise.allSettled(promises)（ES2020 新增方法）—— **等待所有 promise 都 settle 时**，并以包含以下内容的对象数组的形式返回它们的结果：
- status: "fulfilled" 或 "rejected"
- value（如果 fulfilled）或 reason（如果 rejected）。
3. Promise.race(promises) —— 等**待第一个 settle 的 promise**，并将其 result/error 作为结果返回。
4. Promise.any(promises)（ES2021 新增方法）—— **等待第一个 fulfilled 的 promise**，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 [AggregateError](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) 错误类型的 error 实例。
5. Promise.resolve(value) —— 使用给定 value 创建一个 resolved 的 promise。
6. Promise.reject(error) —— 使用给定 error 创建一个 rejected 的 promise。
### all和race对比
**相同点：**
都接受一个`Promise`数组作为参数
**不同点：**
all：当所有Promise都成功执行时返回一个包含所有Promise结果的数组，或者当其中一个Promise失败时返回该Promise的失败原因。
race：并且当其中一个Promise成功或失败时，就返回这个Promise的结果。它在其中一个Promise解决或拒绝时都会执行回调函数，而不像Promise.all那样在所有Promise解决后才执行回调函数
### 需要留意的

- 注意区分在同一段任务中 Promise和同步代码的执行顺序是否是可控的
- 重点理解“状态一经确定就不会再改变”
```javascript
const promise2 = new Promise((resolve, reject) => {
    resolve('success1');  // 只会对外输出这里
    reject('error');
    resolve('success2');
});

promise2
    .then((res) => {
        console.log('then: ', res);
    })
    .catch((err) => {
        console.log('catch: ', err);
    });
```

- 在`then`中返回一个异常，注意这个异常是否属于`throw`类似的逻辑，否则就不会被`catch`
- then中接受的不是一个函数怎么处理
```javascript
Promise.resolve(1)  // 最终只会输出1
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log);
```

- 有两种方法可以处理rejected状态
```javascript
Promise.resolve()
    .then(function success (res) {
        throw new Error('error');
    }, function fail1 (e) {
        console.error('fail1: ', e);
    })
    .catch(function fail2 (e) {
        console.error('fail2: ', e);
    });
// fail2: Error: error
```
虽然这两种方法都能处理Promise状态变为rejected时的回调，但是then()函数的第二个函数却不能捕获第一个函数中抛出的异常，而catch()函数却能捕获到第一个函数中抛出的异常。s
## 一个Promise库
[http://bluebirdjs.com/](http://bluebirdjs.com/)
以下是它的介绍：

- 务实而非理论--当有冲突时，蓝鸟总是选择务实的路线，而不是理论上优雅的路线
- 功能齐全而不臃肿
- 易于调试--选择实用主义而不是理论上的优雅的一个主要结果，在这个程度上，这是Bluebird在Promise库中所独有的属性。
- 规范兼容- Bluebird可以作为原生promise的直接替代品，以实现即时性能提升。
## 问题
### 红绿灯
3秒之后亮一次红灯，再过2秒亮一次绿灯，再过1秒亮一次黄灯，用promise实现多次交替亮灯的效果
```javascript
function light(color,second){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      console.log(color);
      resolve();
    },second * 1000);
  });
}

//[{color:xx,second:xx}]
function orderLights(list){
  let promise = Promise.resolve();
  list.forEach(item => {
    promise = promise.then(function(){
      return light(item.color,item.second);
    });
  });
  promise.then(function(){
    return orderLights(list);
  })
}

orderLights([{
  color:'red',
  second:3,
},{
  color:'green',
  second:3,
},{
  color:'yellow',
  second:3,
}]);
```
### 题目1
Promise的创建，会立即执行
```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
// 1 2 4 3
```
### 题目2
状态一经改变就无法再改变
```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
// success1
```
### 题目3
```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// 1

// 等价于，就比较清晰了，同时then 方法只能接受函数类型的参数，非函数类型的参数都会忽略
new Promise((resolve)=> resolve(1))
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```
### 题目4
```javascript
new Promise((resolve,reject)=>{
    console.log(3);
    let p = new Promise((resolve, reject)=>{
        console.log(7);
        setTimeout(()=>{
           console.log(5);
           resolve(6); 
        },0)
        resolve(1);
    });
    resolve(2);
    p.then((arg)=>{
        console.log(arg);
    });

}).then((arg)=>{
    console.log(arg);
});
console.log(4);
// 3 7 4 1 2 5
```

1. Promise的创建，会立即执行 

对于`new Promise`整体，它会立即执行，则输出3，对于`p`也会立即执行，则继续输出7，此时两个`Promise`都进入pending状态，紧接着输出4

2. Promise内部是同步任务，因此`p`的`then`会优先执行，输出1，紧接着就是`new Promise`的`then`，输出2，再接下来是`setTimeout`，输出5，而对于`resolve(6)`，它作为`p`的`then`的返回值，提前已经被`resolve(1)`截胡了，因此不会执行。
## 资料

- [https://zh.javascript.info/promise-error-handling](https://zh.javascript.info/promise-error-handling)
- [https://wangdoc.com/javascript/async/promise](https://wangdoc.com/javascript/async/promise#then-%E7%94%A8%E6%B3%95%E8%BE%A8%E6%9E%90)
- [http://liubin.org/promises-book/#introduction](http://liubin.org/promises-book/#introduction)
- [Promise A+ 规范](http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/)
- [「ES6系列」彻底弄懂Promise - 掘金](https://juejin.cn/post/6844903869407985672)
- [【你不知道的promise】设计一个支持并发的前端接口缓存](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247514702&idx=2&sn=29b7552cc5750f630618f667c60cf91d&chksm=f992bc9fcee5358948062ca9627c3aaa44fd59b98998cf5f76d37e9cb6a0f3ed6c2e75a137a3#rd)
