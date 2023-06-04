## setTimeout的特征
1. 浏览器会将 setTimeout 或 setInterval 的五层或更多层嵌套调用（调用五次之后）的最小延时限制在 4ms。这是历史遗留问题。
2. 所有的调度方法都不能 **保证** 确切的延时。
3. setTimeout函数是异步执行的。当代码执行到setTimeout时，它会被添加到任务队列中，而**不会立即执行**。 
4. 如果给定的延迟时间为0或负数，那么回调函数会尽快被添加到任务队列中，并在**当前任务执行完成后**立即执行(换句话说它的第二个参数斤表示最少延迟时间，而非确切的时间)。 
5.  setTimeout函数只会执行一次，即使在回调函数内部再次调用setTimeout函数。 
6.  如果页面被隐藏或处于后台状态，setTimeout函数可能会被延迟执行。 
## setInterval的特征

1. setInterval函数接收两个参数：一个函数以及两次调用之间的时间间隔（单位是毫秒）。
2. 可以使用一个变量存储setInterval函数的返回值。这个返回值是一个唯一的ID，可以用于取消定时器。
3. 每个ID对应一个单独的定时器，所以可以同时运行多个计时器。
4. setInterval函数的计时器不随着页面刷新而重新启动，必须手动取消它们。
5. 要取消计时器，通常使用clearInterval函数，传入先前创建的定时器的ID。
## 影响“误差”的因素
浏览器内的计时器可能由于许多原因而变慢：

- CPU 过载。
- 浏览器页签处于后台模式。
- 笔记本电脑用的是省电模式。
## setTimeout(f,0)的应用
可以调整事件的发生顺序。比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，想让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)。
```javascript
// HTML 代码如下
// <input type="button" id="myButton" value="click">

var input = document.getElementById('myButton');

input.onclick = function A() {
  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};

document.body.onclick = function C() {
  input.value += ' body'
};
```
上面代码在点击按钮后，先触发回调函数`A`，然后触发函数`C`。函数A中，`setTimeout`将函数`B`推迟到下一轮事件循环执行，这样就起到了，先触发父元素的回调函数`C`的目的了。
另一个应用是，用户自定义的回调函数，通常在浏览器的默认动作之前触发。比如，用户在输入框输入文本，`keypress`事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。
```javascript
// HTML 代码如下
// <input type="text" id="input-box">

document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
}
```
调整为以下方式，就能达到我们的目的
```javascript
document.getElementById('input-box').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
```
由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行。
```javascript
var div = document.getElementsByTagName('div')[0];

// 写法一
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二
var timer;
var i=0x100000;

function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
```
上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器“堵塞”，因为 JavaScript 执行速度远高于 DOM，会造成大量 DOM 操作“堆积”，而写法二就不会，这就是`setTimeout(f, 0)`的好处。
另一个使用这种技巧的例子是代码高亮的处理。如果代码块很大，一次性处理，可能会对性能造成很大的压力，那么将其分成一个个小块，一次处理一块，比如写成`setTimeout(highlightNext, 50)`的样子，性能压力就会减轻
## 一个冷知识
setTimeout并不是ECMAScript规范下的，而是由宿主提供的应用层接口。setTimeout将隐含地受到许多宿主限制条件的影响，例如采用何种时间片调度，或者时钟管理机制，又或者是否是在多核的、多CPU的环境下等。
## 问题
### setTimeout(f, 0)
```javascript
setTimeout(function () {
  console.log(1);
}, 0);
console.log(2);
// 2
// 1
```
`setTimeout(f, 0`)这种写法的目的是，尽可能早地执行`f`，但是并不能保证立刻就执行`f`。
实际上，setTimeout(f, 0)不会真的在0毫秒之后运行，不同的浏览器有不同的实现。以 Edge 浏览器为例，会等到4毫秒之后运行。如果电脑正在使用电池供电，会等到16毫秒之后运行；如果网页不在当前 Tab 页，会推迟到1000毫秒（1秒）之后运行。这样是为了节省系统资源。
### alert 会显示什么？
```javascript
let i = 0;

setTimeout(() => alert(i), 100); // ?

// 假设这段代码的运行时间 >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}
```
任何 `setTimeout` 都只会在当前代码执行完毕之后才会执行。
所以 i 的取值为：100000000。
### 下面代码依次打印的值
```javascript
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) //>> 6 6 6 6 6
    }, i * 1000);
}
```
换成let 之后
```javascript
for (let i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) //>> 1 2 3 4 5 
    }, i * 1000);
}
```
或者换成闭包
```javascript
for (var i = 1; i <= 5; i++) {
  (function(j) {//包了一层IIFE形式的函数，这个函数是闭包
    setTimeout(function test() {//函数体内的j引用了外层匿名函数的参数j
      console.log(j); //>> 1 2 3 4 5
    }, j * 1000);
  })(i);
}
```
### 防抖函数 debounce
基本原理：维护一个定时器，将很多个相同的操作合并成一个。规定在delay后触发函数，如果在此之前触发函数，则取消之前的计时重新计时，**只有最后一次操作能被触发。**
```javascript
const debounce = function(fn, wait) {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```
### 节流函数 throttle
基本原理：判断是否达到一定的时间来触发事件。**某个时间段内只能触发一次函数**。
```javascript
const throttle = function(fn, wait) {
    let flag = true
    return (...args) => {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this, args)
            flag = true
        }, wait)
    }
}
```
## 资料

- [https://zh.javascript.info/settimeout-setinterval](https://zh.javascript.info/settimeout-setinterval)
- [https://wangdoc.com/javascript/async/timer](https://wangdoc.com/javascript/async/timer)
- [JS—节流与防抖](https://blog.csdn.net/weixin_45709829/article/details/123910592)
