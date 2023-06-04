### 一题 [Promise 链式调用顺序](<https://juejin.im/post/5dabf847e51d4524d674881c>)

```js
new Promise((resolve, reject) => {
  console.log("log: 外部promise");
  resolve();
})
  .then(() => {
    console.log("log: 外部第一个then");
    new Promise((resolve, reject) => {
      console.log("log: 内部promise");
      resolve();
    })
      .then(() => {
        console.log("log: 内部第一个then");
      })
      .then(() => {
        console.log("log: 内部第二个then");
      });
  })
  .then(() => {
    console.log("log: 外部第二个then");
  });
  
// log: 外部promise
// log: 外部第一个then
// log: 内部promise
// log: 内部第一个then
// log: 外部第二个then
// log: 内部第二个then
```

`promise 的 then/catch 方法执行后会也返回一个 promise`

