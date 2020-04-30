- WebSocket是一种在单个TCP连接上进行全双工通信的协议，即连接双方可以同时实时收发数据，它可以在用户的浏览器和服务器之间打开双工、双向通讯会话。

- WebSocket API提供全局方法`WebSocket(url[, protocols])`创建实例,参数1 对方绝对url其url以`ws://`或者`wss://(加密)`开头，参数2 protocols是单协议或者包含协议的字符串数组

```js
// 必须传入绝对URL，可以是任何网站
const s = new WebSocket('ws://www.baidu.com') 
s.readyState    // 0 建立连接 1 已经建立 2 正在关闭 3 连接已关闭或者没有链接成功
s.send('hello') // 发送的数据必须是纯文本
s.onopen = function () {}
s.onerror = function () {}
s.onmessage = function (event) {
  // 当接收到消息时
  console.log(event.data) // 数据是纯字符
}
s.close()   // 关闭连接
s.onclose = function (event) {
  /*
    * event.wasClean 是否明确的关闭 
    * event.code 服务器返回的数值状态码
    * event.reason 字符串，服务器返回的消息
    */
}
```

10个属性 

- binaryType 返回websocket连接所传输二进制数据的类型（blob, arraybuffer）
- bufferedAmount 只读 返回已经被send()方法放入队列中但还没有被发送到网络中的数据的字节数。一旦队列中的所有数据被发送至网络，则该属性值将被重置为0。但是，若在发送过程中连接被关闭，则属性值不会重置为0。
- extensions 只读 返回服务器选择的扩展名。这当前只是空字符串或连接协商的扩展列表
- onclose 用于指定连接失败后的回调函数
- onmessage 用于指定当从服务器接受到信息时的回调函数
- onopen 用于指定连接成功后的回调函数
- protocol 只读 服务器选择的下属协议
- readyState 只读 当前的链接状态，共4个 
  - 0 建立连接
  - 1 已经连接
  - 2 正在关闭
  - 3 连接已经关闭或者没有连接成功
- url 只读 WebSocket 的绝对路径

2个方法

- close(code, reason) 数字状态码 可选 默认 1005和一个可选的类可读的字符串，它解释了连接关闭的原因。
- send(data) 向服务器发送数据（ArrayBuffer，Blob等）