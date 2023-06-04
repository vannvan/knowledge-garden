## 要点
### 为何？
JavaScript从诞生起就是一门单线程的语言。至于为什么被设计成单线程？因为该语言的作者当时认为它只是在浏览器执行的脚本语言，对它功能性的要求不是很高。早期的网页对JavaScript需求没那么高，都是轻量级的，而且要求写起来的程序一定要简单，而如果涉及成支持多线程的，程序逻辑会造成交互、DOM 操作变得十分复杂。
单线程的缺点是任务执行会阻塞，表现到网页里是：发起数据请求 --> http延迟 --> 等待完成，等待的过程中，其他操作无法执行，导致页面长时间无响应。单线程的缺点是任务执行会阻塞，表现到网页里是：发起数据请求 --> http延迟 --> 等待完成，等待的过程中，其他操作无法执行，导致页面长时间无响应。
因此JavaScript用异步回调去解决这些问题。实现异步回调的特性，其实是基于`Event Loop`(事件循环)
### 前置知识
[V8是如何执行JS代码的](https://www.yuque.com/vannvan/tools/scy9h638ax5c4g32#lVREB)
#### 浏览器的进程

- **浏览器进程**。主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
- **渲染进程**。核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
- **GPU 进程**。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
- **网络进程**。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
- **插件进程**。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。
#### 浏览器的渲染线程
JS引擎是单线程的，但是浏览器是多线程的。现代浏览器的一个 tab ，其中的线程包括但不局限于：JS引擎是单线程的，但是浏览器是多线程的。现代浏览器的一个 tab ，其中的线程包括但不局限于：

- **GUI渲染线程**
   - 负责渲染页面，布局和绘制
   - 页面需要重绘和回流时，该线程就会执行
   - 与js引擎线程互斥，防止渲染结果不可预期
- **JS引擎线程**
   - 负责处理解析和执行javascript脚本程序
   - 只有一个JS引擎线程（单线程）
   - 与GUI渲染线程互斥，防止渲染结果不可预期
- **事件触发线程**
   - 用来控制事件循环（鼠标点击、setTimeout、ajax等）
   - 当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中
- **定时触发器线程**
   - setInterval与setTimeout所在的线程
   - 定时任务并不是由JS引擎计时的，是由定时触发线程来计时的
   - 计时完毕后，通知事件触发线程
- **异步http请求线程**
   - 浏览器有一个单独的线程用于处理AJAX请求
   - 当请求完成时，若有回调函数，通知事件触发线程
#### 内存模型

1. 调用栈
```javascript
function multiply(x, y) {
  return x * y;
}
function printSquare(x) {
  var s = multiply(x, x);
  console.log(s);
}
printSquare(5);
```
以上的一段代码的调用栈的执行过程
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682853994704-83e5b475-902c-4767-b8f2-0bc55e65fdad.png#averageHue=%23f5f5f5&clientId=u2ef73cd7-6189-4&from=paste&height=300&id=ub69c36c3&originHeight=600&originWidth=800&originalType=binary&ratio=2&rotation=0&showTitle=false&size=43651&status=done&style=none&taskId=uc05251f2-85bb-4a59-9f3b-9da3dc43968&title=&width=400)

2. 堆

堆则存放了大量的非结构化数据，譬如程序分配的变量与对象。堆则存放了大量的非结构化数据，譬如程序分配的变量与对象。

3. 任务队列

任务队列包含了一系列待处理的信息与相关联的回调函数。任务队列又分为 **MacroTask Queue** 和 **MicroTask Queue** 两种。
#### "事件循环"叫法的由来
之所以称之为 **事件循环**，是因为它经常按照类似如下的方式来被实现：
```javascript
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```
queue.waitForMessage() 会同步地等待消息到达 (如果当前没有任何消息等待被处理)。
#### 任务队列
所有任务可以分为两种：同步任务和异步任务。同步任务会在主线程上排队执行，而异步任务则不进入主线程，它会进入“任务队列”，只有“任务队列”通知主线程，某个任务可以执行了，该任务才会进入主线程执行。
一个大的异步任务执行机制如下

1. 所有同步任务都会在主线程上执行，形成一个**执行栈；**
2. 主线程之外，还存在一个“任务队列”，只要异步任务有了运行结果，就在“任务队列”之中放置一个事件
3. 一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步

对于浏览器而言，采用如下描述会更好：

1. 调用栈选择最先进入队列的宏任务，通常是`script`整体代码，如果有则执行；
2. 检查是否存在微任务，如果存在则不停的执行，直至清空微任务队列；
3. 浏览器更新渲染，每一次事件循环，浏览器都可能会去更新渲染；
4. 重复以上步骤。
#### 几个线程是怎么配合的?
当代码执行到setTimeout/setInterval时，实际上是**JS引擎线程**通知**定时触发器引擎，**间隔一段时间后，会触发一个回调事件，而**定时触发器线程**在接收到这个消息后，会在等待的时间后，将回调事件放入由**事件触发线程**所管理的**事件队列**中。

当代码执行到XHR/Fetch时，实际上是**JS引擎线程**通知**异步HTTP请求线程**，发送一个网络请求，并制定请求完成后的回调事件，而**异步HTTP请求线程**在接收到这个消息后，会在请求成功后，将回调事件放入由**事件触发线程**所管理的**事件队列**中。

当我们的同步任务执行完，**JS引擎线程**会询问**事件触发线程**，在**事件队列**中询问是否有待执行的回调函数，如果有就会加入到执行栈中交给**JS引擎线程**执行。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682850847965-1959a148-a94b-46fc-a6e9-bd0278f2e406.png#averageHue=%2326231e&clientId=u2ef73cd7-6189-4&from=paste&height=383&id=u07a1d0e6&originHeight=463&originWidth=726&originalType=binary&ratio=2&rotation=0&showTitle=false&size=100020&status=done&style=none&taskId=u73982399-a9d8-47c3-8366-2006a2a3c85&title=&width=600)
### Event Loop的定义
Event Loop（事件循环） 是让 JavaScript 做到既是单线程，又绝对不会阻塞的核心机制，也是 JavaScript 并发模型（Concurrency Model）的基础，是用来协调各种事件、用户交互、脚本执行、UI 渲染、网络请求等的一种机制。Event Loop的作用很简单： 监控**调用栈**和**任务队列**，如果调用栈是空的，它就会取出队列中的第一个"callback函数"，然后将它压入到调用栈中，然后执行它。
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
总的来说，Event Loop 是**实现异步回调的一种机制**而已。
#### 分两种

1. Browsing Context 是指一种用来将Document展现给用户的环境，即**窗口事件循环。**
2. Worker 是指一种独立于UI脚本，可在后台执行脚本的API，即**worker事件循环**
#### 独立
每个“线程”都有自己的Event Loop，所以每个web worker拥有独立的Event Loop，它们都可以独立运行；同源的windows共享一个Event Loop，它们之间能够互相通信。
### 宏任务与微任务
#### 宏任务
我们可以**将每次执行栈执行的代码当作是一个宏任务**（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。
要注意的是，JS引擎线程和GUI渲染线程是互斥的关系，是浏览器为了能够使宏任务和DOM任务能够有序进行，在同一个宏任务内频繁对DOM操作，每次都将结果渲染到页面肯定是不合理的，因此DOM渲染任务会在一个宏任务执行结束后，下一个宏任务开始前进行渲染工作。

| # | 浏览器 | Node |
| --- | --- | --- |
| script整体代码 | ✅ | ❌ |
| DOM操作 | ✅ | ❌ |
| 用户交互 | ✅ | ❌ |
| 网络请求 | ✅ | ❌ |
| I/O | ✅ | ✅ |
| setTimeout | ✅ | ✅ |
| setInterval | ✅ | ✅ |
| setImmediate | ❌ | ✅ |
| requestAnimationFrame | ✅ | ❌ |

##### 示例1
```javascript
document.body.style = 'background:black';
document.body.style = 'background:red';
document.body.style = 'background:blue';
document.body.style = 'background:grey';
```
我们会看到的结果是，页面的背景会在瞬间变成灰色，以上代码属于同一次宏任务，所以全部执行完毕才触发页面渲染，渲染时GUI渲染进程会将所有UI改动优化合并，所以视觉效果上，只会看到页面变成灰色。
##### 示例2
```javascript
document.body.style = 'background:blue';
setTimeout(function(){
    document.body.style = 'background:black'
},0)
```
可以看到，页面先是蓝色，再变成黑色，这是因为上面代码属于**两次宏任务**
##### 示例3
```typescript
setTimeout(() => {
    console.log('setTimeout block')
}, 100)

while (true) {

}

console.log('end here')
```
以上代码什么都不会输出！为什么？
以上代码相当于两个宏任务，整段代码是第一个宏任务，第二个宏任务就是setTImeout传入的函数
```typescript
() => {
    console.log('setTimeout block')
},
```
第一个宏任务执行到`while(true)`时死循环了，所以`end here`走不到也就不会输出。
第二个宏任务也没有机会执行到，因此也不会输出。
##### 示例4
```typescript
const t1 = new Date()
setTimeout(() => {
    const t3 = new Date()
    console.log('setTimeout block')
    console.log('t3 - t1 =', t3 - t1)
}, 100)


let t2 = new Date()

while (t2 - t1 < 200) {
    t2 = new Date()
}

console.log('end here')
```
以上t3 - t1 输出答案是 200，为什么？
首先明确是两个宏任务，整个脚本是第一个宏任务，计时器生成了第二个宏任务，只有当第一个宏任务执行结束后才会执行第二个任务，因此即使定时器时间到了也不会立即执行，那么当第一个宏任务结束后，此时时间已经过去了200ms
#### 微任务
我们已经知道**宏任务**结束后，会执行渲染，然后执行下一个**宏任务**， 而**微任务**可以理解成在当前**宏任务**执行后立即执行的任务。
也就是说，**当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完。**

| # | 浏览器 | Node |
| --- | --- | --- |
| process.nextTick | ❌ | ✅ |
| MutationObserver | ✅ | ❌ |
| Promise.then catch finally | ✅ | ✅ |

##### 示例
##### 示例1
```javascript
document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()=>{
    console.log(2);
    document.body.style = 'background:black'
});
console.log(3);
```
控制台输出 1 3 2 , 是因为 `promise` 对象的 `then` 方法的回调函数是异步执行，所以 2 最后输出
页面的背景色**直接变成黑色**，没有经过蓝色的阶段，是因为，我们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，然后才执行的渲染
##### 示例2
```javascript
setTimeout(() => {
    console.log(1)
    Promise.resolve(3).then(data => console.log(data))
}, 0)

setTimeout(() => {
    console.log(2)
}, 0)

// print : 1 3 2
```
上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有两个宏任务， 其中第一个宏任务执行中，输出 1 ，并且创建了微任务队列，所以在下一个宏任务队列执行前， 先执行微任务，在微任务执行中，输出 3 ，微任务执行后，执行下一次宏任务，执行中输出 2
##### 示例3
#### ![](https://img2018.cnblogs.com/i-beta/1402448/201912/1402448-20191205160502748-1705087452.png#id=cYuRJ&originHeight=504&originWidth=1118&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
**请注意：不管是setTimeout/setInterval和XHR/Fetch代码，在这些代码执行时， 本身是同步任务，而其中的回调函数才是异步任务。**
不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs ，macrotask 称为 task 。下面来看以下代码的执行顺序：
```javascript
//主线程直接执行
console.log('1');
//丢到宏事件队列中
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
//微事件1
process.nextTick(function() {
    console.log('6');
})
//主线程直接执行
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    //微事件2
    console.log('8')
})
//丢到宏事件队列中
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

1. 首先执行js进入第一个宏任务进入主线程, 直接打印console.log('1')
2. 遇到 setTimeout 分发到宏任务Event Queue中
3. 遇到 process.nextTick 丢到微任务Event Queue中
4. 遇到 Promise， new Promise 直接执行 输出 console.log('7');
5. 执行then 被分发到微任务Event Queue中
6. 第一轮宏任务执行结束，开始执行微任务 打印 6,8
7. 第一轮微任务执行完毕，执行第二轮宏事件，执行setTimeout
8. 先执行主线程宏任务，在执行微任务，打印'2,4,3,5'
9. 在执行第二个setTimeout,同理打印 ‘9,11,10,12’
10. 整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12
##### 示例4
```typescript
async function method() {
  await method2();
  console.log(1)
}

function method2() {
  const promise = new Promise((resolve) => resolve());
  return promise;
}

function main() {
  method() // 如果把这里改成await method(),那么输出到顺序就是 1 2
  console.log(2)
}
```
以上先输出2，再输出1
需要明确一点，async 修饰的函数，相当于给当前函数包了一层 Promise。
所以对于
```typescript
function main() {
  method()
  console.log(2)
}
```
相当于
```typescript
function main() {
  new Promise((resolve,reject){ resolve(method())}
  console.log(2)
}
```
所以先执行 resolve(method())，进入method 内部：
接下来是 await 的作用：**遇到 await 会先执行 await 右边的逻辑，执行完之后会暂停到这里。跳出当前函数去执行之前的代码**。
所以 method() 方法中，
```typescript
async function method() {
  await method2();
  console.log(1)
}

function method2() {
  const promise = new Promise((resolve) => resolve());
  return promise;
}
```
先执行了 method2，当 method2 返回了 Promise 后就会暂定执行，跳回 main 函数。
```typescript
function main() {
  new Promise((resolve,reject){ resolve(method())}
  console.log(2)
}
```
main 函数执行完毕后才会再回到 method 方法中。所以先输出 2，后输出 1。

#### 二者关系图例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682854374896-2107a1c9-0d3e-4481-b286-563c7fc4ef7f.png#averageHue=%23fcb165&clientId=u2ef73cd7-6189-4&from=paste&height=181&id=u18432845&originHeight=362&originWidth=760&originalType=binary&ratio=2&rotation=0&showTitle=false&size=13676&status=done&style=none&taskId=u60e0117e-db41-447b-92f8-ecaf773bdc6&title=&width=380)
如图所示，二者互相穿插：MacroTask --> MicroTask Queue --> MacroTask。
**一个Event Loop会有一个或多个 MacroTask Queue，而 Event Loop 仅有一个 MicroTask Queue。**
**当宏任务和当前宏任务产生的微任务全部执行完毕后**，才会执行下一个宏任务。每遇到生成的微任务就放到微任务队列中，当前宏任务代码全部执行后开始执行微任务队列中的任务
#### 综合示例
##### 示例1
```javascript
console.log(1)

setTimeout(() => {
  console.log(2)
}, 0)

console.log(3)
// 1 3 2
```
##### 示例2
```javascript
console.log(1)

setTimeout(() => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
  }, 0)
}, 0)

setTimeout(() => {
  console.log(4)
}, 0)

console.log(5)
// 1 5 2 4 3
```
1，输出1，将2 push进回调队列
2，将4 push进回调队列
3，输出 5
4，清空了执行栈，读取输出2，发现有3，将3 push进回调队列
5，清空了执行栈，读取输出4 
6，清空了执行栈，读取输出3
##### 示例3
```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
})
var p = new Promise((resolve, reject) => {
  console.log(3)
  resolve('成功')
})
p.then(() => {
  console.log(4)
})
console.log(5)
// 1 3 5 4 2
```

1. 输出1
2. 将p push进队列，输出3
3. 输出5
4. 清空执行栈，发现有p的then，输出4
5. 清空执行栈，输出3
##### 示例4
```javascript
document.body.style.backgroundColor = 'orange';
console.log(1);
setTimeout(()=> { // setTimeout1
  document.body.style.backgroundColor = 'green';
  console.log(2);
}, 100);
Promise.resolve(3).then(num => { // Promise.then1
  document.body.style.backgroundColor = 'purple';
  console.log(num);
});
console.log(4);
```
```bash
// 宏任务 setTimeout
// 微任务 Promise.then
/**
* 过程:
*  设置 body.bgColor = 'orange'; -> 没渲染
*  打印1
*  (把 setTimeout 执行，把回调放进 宏任务队列)
*  同步执行 Promise.resolve(3) 把 then 回调放进 微任务队列
*  打印4
*  同步任务执行栈代码执行完毕
*  先清空微任务队列, 执行 Promise.then
*    设置 body.bgColor = 'purple'; -> 没渲染
*    打印 3
*  GUI渲染, 把 body.bgColor 渲染成了 purple
*  取宏任务队列中 setTimeout cb ，等到 100ms 以后放进JS引擎执行栈中执行
*    设置 body.bgColor = 'green' -> 没渲染
*    打印 2
*  同步代码执行栈中已经没有任务了
*  微任务也没任务了
*  再GUI渲染
*    把 body.bgColor = 'green' -> 此时渲染了
* /
```
## 问题
### 为什么JS是单线程的
首先是历史原因，在创建 javascript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好。
其次是因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。
而且，如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。
### 为什么 GUI 渲染线程与 JS 引擎线程互斥
这是由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面(即 JS线程和UI线程同时运行)， 那么渲染线程前后获得的元素就可能不一致了。
因此，为了防止渲染出现不可预期的结果，浏览器设定 GUI渲染线程和JS引擎线程为互斥关系， 当JS引擎线程执行时GUI渲染线程会被挂起，GUI更新则会被保存在一个队列中等待JS引擎线程空闲时立即被执行。
### Event Loop会阻塞吗？
JavaScript 的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它永不阻塞。
由于历史原因有一些例外，如 `alert` 或者同步 `XHR`，但应该尽量避免使用它们。
### 微任务比宏任务早？
当一段`script`脚本首次执行时，便会创建一个全局上下文，其中包括了宏任务队列和微任务队列。当遇到宏任务时，会将其加入到宏任务队列中；遇到微任务时会将其加入到微任务队列中(在同一个宏任务中，微任务会优先执行)。当该宏任务执行完毕后 -> 便会开始执行微任务队列中的所有任务，直到微任务队列为空 -> 当微任务队列为空后，就会检查是否**有新的宏任务**需要执行，再重复上面的过程。
因此，微任务比宏任务执行早的原因在于，微任务是在当前宏任务执行完毕后立即开始执行的，而宏任务则需要在宏任务队列中等待。
这种机制可以保证微任务在主线程被阻塞的情况下仍能够得到及时执行，并且可以保证微任务的执行优先级高于微任务。
同时可以得出结论，虽然它们都属于“任务”，但是根本区别还是在于**执行时机和优先级**的不同。
### 和DOM渲染的关系
在浏览器中，DOM渲染是在主线程中执行的。当浏览器遇到需要渲染的节点，会将节点添加到渲染队列中，Event Loop在每次执行完一段代码后，都回去检查渲染队列中是否有新的节点需要渲染。
## 总结：理解Event Loop的脉络
**一句话描述它**
Event Loop是一种**任务调度机制**，它以同步的方式执行代码，但对于异步函数，它会将这些函数挂起，等待异步操作完成后再将其放入任务队列。
**进一步，为什么需要这样的机制呢？**
主要原因是因为JS是单线程的。如果完全按照单线程的思路去完成页面上的操作，那显然是不合理的，全部任务排在一个队列里就会带来很多问题，而JS又不能是多线程，其中一个原因：比如在同一时刻同时操作DOM，那么用户看到的效果就不可预期了，因此需要设计一种基于单线程的任务机制。
**再进一步，知道了为什么存在，那么在保持其单线程的前提下，怎样确保任务有序执行呢？**
我们知道对于JS而言，所有任务分为同步任务和异步任务。同步任务会在主线程上排队执行，而异步任务则不进入主线程，它会进入“任务队列”，只有“任务队列”通知主线程，某个任务可以执行了，该任务才会进入主线程执行。
在任务队列中，Event Loop会循环地等待并取出任务，将其加入到调用栈中，执行完后再将结果返回给调用方。 
**任务队列又是如何划分的，它们之间具体如何配合？**
任务队列分为两类：**宏任务和微任务。**
宏任务包括setTimeout、setInterval等，而微任务包括Promise、MutationObserver等。当所有的宏任务执行完毕后，Event Loop会开始执行所有的微任务。因此，微任务的优先级比宏任务高。 
当Event Loop监听到任务队列中有任务时，它会按照以下顺序执行：

1. 执行当前宏任务中的同步任务； 
2. 执行当前宏任务中的微任务-> 当执行完所有微任务后，如有必要会渲染页面
3. 执行下一个宏任务中的同步任务，直到任务队列为空。如此循环

**另外补充**
对于每一个标签页而言，其各自窗口的Document事件循环是独立的，对同源协议下的WebWorker所产生的worker事件循环是共享的。
### Vue.$nextTick原理
优先级：

1. Promise（微任务）
2. MutationObserver（微任务）
3. setImmediate（宏任务）
4. setTimeout（宏任务）
## 资料

- [壹.2.8 Event Loop - 前端内参](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.8)
- [微任务、宏任务与Event-Loop - 掘金](https://juejin.cn/post/6844903657264136200)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机 · Issue #5 · aooy/blog](https://github.com/aooy/blog/issues/5)
- [JavaScript 运行机制详解：再谈Event Loop - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [图解搞懂JavaScript引擎Event Loop - 掘金](https://juejin.cn/post/6844903553031634952#heading-6)
- [「前端进阶」从多线程到Event Loop全面梳理 - 掘金](https://juejin.cn/post/6844903919789801486#heading-8)  ⭐️
- [面试必问之 JS 事件循环(Event Loop)，看这一篇足够-字节](https://zhuanlan.zhihu.com/p/580956436)  ⭐️
- [js宏任务和微任务执行顺序详解](https://windliang.wang/2023/04/08/js%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E8%AF%A6%E8%A7%A3/#more)
- [https://www.yuque.com/baofengyuqianxi/vi4wte/hie6id](https://www.yuque.com/baofengyuqianxi/vi4wte/hie6id#O6PD1)
- [浏览器的Tasks、microtasks、 queues 和 schedules](https://github.com/sisterAn/blog/issues/21) ⭐️
