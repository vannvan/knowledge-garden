### 过去

```js
let array = [1,2,3];

function sum() {
  this.total = 0;

  arr.forEach(function(item) {
    this.total+= item;  // 糟糕，`this` 是内层函数的 `this`
  })
  return total;
}
```

### 改造

```js
function sum() {
  this.total = 0;
  var self = this;

  arr.forEach(function(item) {
    self.total+= item;  // 这里我们使用 `self`，它能解决问题，但是感觉有点别扭
  })
  return total;
} 
```

### 箭头函数改造

```js
function sum() {
  this.total = 0;

  arr.forEach((item) => {
    this.total+= item;  // 一切安好，`this` 指向外层函数
  })
  return total;
}
```

