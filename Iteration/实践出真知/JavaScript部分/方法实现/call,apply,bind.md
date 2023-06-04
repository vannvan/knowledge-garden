## call
### 过程分析

- 接收两个参数，第一个位`this`的指向，第二个参数为`arguments`
- step1 确认`this`和`args`的有效性，并进行适配
- step2 给`context`上临时挂一个方法，这个方法指向this
- step3 执行这个方法，并携带上面处理过的参数，拿到返回值
- step4 删除`context`上的临时方法
- step5 返回结果
### 代码实现
```javascript
Function.prototype.mycall = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  args = args ? args : []
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args)
  // 删除，不污染context
  delete context.fn
  // 返回res
  return res
}
```
### 用例
```javascript
function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

const obj = {
  name: 'bob',
}

fn.call(obj, 1, 2, 3)
// bob 1 2 3
```
## apply
### 过程分析

- 接收两个参数，第一个是`this`的指向，应该是个对象，不传就是`window`，第二个为数组
- step1 确认`this`和`args`的有效性，并进行适配
- step2 给`context`临时挂一个方法，这个方法指向`this`
- step3 执行这个方法，并携带上面处理过的参数，拿到返回值
- step4 删除`context`上的临时方法
- step5 返回结果
### 代码实现
```javascript
Function.prototype.myapply = function (context, args) {
  // 不传默认是全局，window
  context = context || window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  args = args ? args : []
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args)
  // 删除，不污染context
  delete context.fn
  // 返回res
  return res
}
```
### 用例
```javascript
function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

const obj = {
  name: 'bob',
}

fn.apply(obj, [1, 2, 3])
```
## bind
### 过程分析

- 接收两个参数，第一个参数为`this`的指向，第二个参数位`arguments`，注意`bind`返回的是改变了`this`指向的函数，因此`return` 应该是返回一个函数
- 确认传入的`this`的指向
- 要明确，对于`bind`方法来讲，它具备传递“**两次参数**”的能力，如下：
```javascript
function fn(name, age) {
  console.log(this.name, name, age)  // bob smith 9
}

let info = {
  name: 'bob',
}

let f = fn.bind(info) // 1.这里传入的是将要bind的对象的参数
f('smith', '9') // 2. 这里调用bind返回的函数还能传递参数
```

- 注意第二个参数需要合并，`args`表示调用`bind`时携带的参数，`fnArgs`表示调用`bind`方法返回的函数传入的参数
- 由于返回的是一个函数，函数有两种打开方式 a. 直接使用，如`fn(a)`；b. `new fn(a)`，因此应针对两种情况做不同的处理
### 代码实现
```javascript
Function.prototype.mybind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // 把this存到fn，这里的this是调用的函数
  let fn = this
  return function newFn(...fnArgs) {
    let res
    // 要考虑新函数是不是会当作构造函数
    if (this instanceof newFn) {
      // 如果是构造函数则调用new 并且合并参数args，fnArgs
      res = new fn(...args, ...fnArgs)
    } else {
      // 当作普通函数调用 也可以用上面定义的_call
      res = fn.call(context, ...args, ...fnArgs)
    }
    return res
  }
}


```
### 用例
```javascript
function fn(a, b, c, d) {
  console.log(this.name)
  console.log(a, b, c, d)
}
fn.prototype.other = '哈哈哈哈哈哈哈'
let obj = { name: 'hello' }
let bindFn = fn.mybind(obj, 1, 2, 3)
bindFn('二次传参')
// hello  调用时的this只想传入的obj，所以this.name是hello
// 1 2 3 二次传参
// undefined -> this.name

let bindFn2 = fn.mybind(obj, 1, 2, 3)
let instance = new bindFn2('二次传参')
console.log(instance.constructor === fn)
console.log(instance.other)
// undefined -> 调用时的this指向构造函数bindFn2(也就是mybind返回的函数)，而构造函数自己没有name
// 1 2 3 二次传参
// true
// 哈哈哈哈哈哈哈 此时对于bindFn2来说也继承了fn原型上的方法
```
### 再分析
如果我们采用如下方式：
```javascript
Function.prototype.mybind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // 把this存到fn，这里的this是调用的函数
  let fn = this
  return function newFn(...fnArgs) {
    let res
    res = fn.call(context, ...args, ...fnArgs)
    return res
  }
}

function fn(a, b, c, d) {
  console.log(a, b, c, d)
}
let obj = { name: 'hello' }

let bindFn = fn.mybind(obj, 1, 2, 3)
let instance = new bindFn('二次传参')
console.log('instance', instance.constructor == fn)
// 1 2 3 二次传参 调用时的this指向了obj
// instance false  <- 注意这里
```
可以看到`instance.constructor` 不等于 `fn`，调用时的`this`指向了原来`obj`的`this`，而我们知道对象的`constructor`应该是它对应的构造函数才对，因此应该在`mybind`内部对`this`的指向针对这种调用方式进行区分，通过`this instanceof newFn`判断当前方法是不是通过`new`调用的。
### 另一种实现
```javascript
Function.prototype.mybind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // 把this存到fn，这里的this是调用的函数
  let fn = this
  function newFn(...fnArgs) {
    // 是不是通过new调用的
    const isNew = this instanceof newFn
    const thisArg = isNew ? this : Object(context)
    // 用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
    return fn.call(thisArg, ...args, ...fnArgs)
  }
  newFn.prototype = Object.create(fn.prototype)
  return newFn
}


const obj = {
  name: 'bob',
}

function fn(a, b, c) {
  console.log(a, b, c)
}
fn.prototype.say = (word) => {
  console.log(word)
}

const fn1 = fn.mybind(obj)

fn1('a', 'b', 'c')
// a b c

const Fn2 = fn.mybind(obj, 1, 2, 3)

let ins = new Fn2()

ins.say('hello world')
// 1 2 3
// hello world
```
## 资料

- [任务3：bind的实现原理_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1qq4y1E7kW/?spm_id_from=333.337.search-card.all.click&vd_source=0adeb8df87a4a56a8783c57e92e5777b)
- [前端手写并理解面试常考 code 的思路和运行过程](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247514556&idx=1&sn=09a6298a799618e22ca217ba266e087c&chksm=f992bf6dcee5367bba189af72bb398f1baf41d3f48179ead5a66f419b64bd559b585afad7db6#rd)
