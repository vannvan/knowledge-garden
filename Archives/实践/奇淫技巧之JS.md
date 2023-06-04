### 离开页面发送请求

[原文](https://juejin.cn/post/7017980864441090078#heading-21)

```js
window.addEventListener('unload', logData, false);

function logData() {
  var client = new XMLHttpRequest();
  // 第三个参数表示同步发送
  client.open('POST', '/log', false);
  client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
  client.send(analyticsData);
}
```

