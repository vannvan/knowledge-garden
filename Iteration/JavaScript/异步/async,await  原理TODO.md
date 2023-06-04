## 要点
### async
#### 语法
```javascript
async function f() {
  return 1;
}
```
在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。
例如
```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
```
我们也可以显式地返回一个 promise，结果是一样的：
```javascript
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```
### await
#### 语法
```javascript
// 只在 async 函数内工作
let value = await promise;
```
#### await 接受 “thenables”
像 promise.then 那样，await 允许我们使用 thenable 对象（那些具有可调用的 then 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 .then，那么就可以对它们使用 await。
这有一个用于演示的 Thenable 类，下面的 await 接受了该类的实例：
```javascript
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```
如果 await 接收了一个非 promise 的但是提供了 .then 方法的对象，它就会调用这个 .then 方法，并将内建的函数 resolve 和 reject 作为参数传入（就像它对待一个常规的 Promise executor 时一样）。然后 await 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 (*) 行），然后使用得到的结果继续执行后续任务。
### Error处理
在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 await 抛出（throw）一个 error 之前会有一个延时。
```javascript
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```
如果有 error 发生，执行控制权马上就会被移交至 catch 块。我们也可以用 try 包装多行 await 代码：
```javascript
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
```
如果我们没有 try..catch，那么由异步函数 f() 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 .catch 来处理这个 error：
```javascript
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() 变成了一个 rejected 的 promise
f().catch(alert); // TypeError: failed to fetch // (*)
```
## 总结
### 理解
**如何产生的？**
async/await 其实是 Generator + Promise 的语法糖，它能实现的效果都能用then 链来实现，它是为优化 then 链而开发出来的。
从字面上来看，async 是“异步”的简写，await 则为等待，所以很好理解async用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。当然语法上强制规定 await 只能出现在asnyc 函数中。
**它的优势？**
单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了。
对于多个层层嵌套存在链式调用关系的异步方法，采用async/await能够使代码更清晰(更整齐)。
**它的劣势？**
await会阻塞代码，滥用await会导致性能问题，也许之后的异步代码并不依赖于前者，但依然需要等待前者完成，导致代码失去了并发性。
### 和Promise的关系
async/await是在Promise基础上的一种更加优雅的异步编程方式，它是ES7(ES2017)中的一部分。
使用async/await可以更容易地编写使用Promise解决异步编程的代码。async/await是一种语法糖——它能够让代码看起来更加简洁和易读。 
实际上，async/await本质上是基于Promise实现的，async函数返回一个Promise对象。在函数体内部，可以通过await关键字等待一个Promise对象的状态变化（resolve或reject），从而实现异步操作的同步化编程。
### 对比Promise
虽然它们在实现效果上是一致的，同时都摆脱了回调地狱，但Promise的then的链式调用也会带来额外的阅读负担。同时Promise调试体验很差，由于没有代码块，不能在一个返回表达式的箭头函数中设置断点，如果在⼀个.then 代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then代码块，因为调试器只能跟踪同步代码的每⼀步。
## 资料

- [https://zh.javascript.info/async-await](https://zh.javascript.info/async-await)
- [7张图，20分钟搞定async/await原理！别拖了！](https://mp.weixin.qq.com/s/RFK0QWeE-jXRUJUR0KDpSA)
