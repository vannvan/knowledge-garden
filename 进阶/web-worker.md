## 基础

1. 创建 Worker 通过 new 的方式来生成一个实例，参数为 url 地址，该地址必须和其创建者是同源的。

```js
const worker = new Worker('./worker.js'); // 参数是 url，这个 url 必须与创建者同源 
```

2. Worker 的方法   

onmessage 主线程中可以在 Worker 上添加 onmessage 方法，用于监听 Worker 的信息。

```js
const worker = new Worker('./worker.js');
worker.onmessage = function (messageEvent) {
 console.log(messageEvent)
} 
```

onmessageerror 主线程中可以在 Worker 上添加 onmessageerror 方法，用于监听 Worker 的错误信息。

```js
const worker = new Worker('./worker.js');
worker.onmessageerror = function (messageEvent) {
 console.log(messageEvent)
} 
```

postMessage() 主线程通过此方法给 Worker 发送消息，发送参数的格式不限（可以是数组、对象、字符串等），可以根据自己的业务选择。

```js
const worker = new Worker('./worker.js');
worker.postMessage({ type: 'start', payload: { count: 666 } }); // 发送信息给worker
```

terminate() 主线程通过此方法终止 Worker 的运行。

```js
const worker = new Worker('./worker.js');
worker.terminate();
```

3. 通信

Worker 的作用域跟主线程中的 Window 是相互独立的，并且 Worker 中是获取不到 DOM 元素的。所以在 Worker 中你无法使用 Window 变量。取而代之的是可以用 self 来表示全局对象。

```js
// 监听事件，主线程可以通过 postMessage 发送信息过来
self.onmessage = (messageEvent) => {
 const { type, payload } = messageEvent.data;
  switch (type) {
    case 'start':
      // 通过 type 去区分不同的业务逻辑，payload 是传过来的数据
      const result = 0;
      // ....,通过一系列处理之后，把最终的结果发送给主线程
      this.postMessage(result);
      break;
  }
};
```

4. Worker 中引用其他脚本的方式

```js
// Worker.js
importScripts('constant.js');
// 下面就可以获取到 constant.js 中的所有变量了

// constant.js
// 可以在 Worker 中使用
const a = 111;

// 不可以在 Worker 中使用，原因未知
const b = function () {
  console.log('test');
};

// 可以在 Worker 中使用
function c() {
  console.log('test');
}
```





## 文章

- [web worker](https://mp.weixin.qq.com/s/OLUN9mHw3S3oBsfd6SONcw)



