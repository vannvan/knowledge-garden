## 基础要点
Generator其实就是一个函数，只不过是一个特殊的函数。Generator 的特别之处在于它可以中途停止。
### 语法
要创建一个 generator，我们需要一个特殊的语法结构：function*，即所谓的 “generator function”。
它看起来像这样：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```
generator 函数与常规函数的行为不同。在此类函数被调用时，它不会运行其代码。而是返回一个被称为 “generator object” 的特殊对象，来管理执行流程。
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" 创建了一个 "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
```
一个 generator 的主要方法就是 next()。当被调用时（译注：指 next() 方法），它会恢复上图所示的运行，执行直到最近的 yield <value> 语句（value 可以被省略，默认为 undefined）。然后函数执行暂停，并将产出的（yielded）值返回到外部代码。
next() 的结果始终是一个具有两个属性的对象：

- value: 产出的（yielded）的值。
- done: 如果 generator 函数已执行完成则为 true，否则为 false。

例如，我们可以创建一个 generator 并获取其第一个产出的（yielded）值：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
```
截至目前，我们只获得了第一个值，现在函数执行处在第二行：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682258922863-21e8210b-7e67-4140-b1c6-c9402ca8a501.png#averageHue=%23fcf8f6&clientId=ud71df51b-8959-4&from=paste&height=136&id=ud94b8a03&originHeight=155&originWidth=684&originalType=binary&ratio=2&rotation=0&showTitle=false&size=11384&status=done&style=none&taskId=u66828424-3fa2-4b84-b977-0b725930f00&title=&width=600)
再次调用 generator.next()。代码恢复执行并返回下一个 yield 的值：
```javascript
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682258963724-adb1bdd6-f0c1-4527-b6ce-6724bcf64457.png#averageHue=%23fcf7f5&clientId=ud71df51b-8959-4&from=paste&height=144&id=ue9db54b2&originHeight=159&originWidth=664&originalType=binary&ratio=2&rotation=0&showTitle=false&size=11350&status=done&style=none&taskId=u02610056-5bfd-40c6-9845-845b47f6b8f&title=&width=600)
如果我们第三次调用 generator.next()，代码将会执行到 return 语句，此时就完成这个函数的执行：
```javascript
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}

```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682258998983-b4f2b29e-f87a-495f-8f54-da7e4d4ac914.png#averageHue=%23fcf9f7&clientId=ud71df51b-8959-4&from=paste&height=127&id=ue321f3c5&originHeight=164&originWidth=772&originalType=binary&ratio=2&rotation=0&showTitle=false&size=11273&status=done&style=none&taskId=u56b3cdb2-f0e5-4e1d-9bad-261846de119&title=&width=600)
现在 generator 执行完成。我们通过 done:true 可以看出来这一点，并且将 value:3 处理为最终结果。
再对 generator.next() 进行新的调用不再有任何意义。如果我们这样做，它将返回相同的对象：{done: true}。
> **function* f(…) 或 function *f(…)？**
> 这两种语法都是对的。
> 但是通常更倾向于第一种语法，因为星号 * 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此 * 应该和 function 关键字紧贴一起。

### 可迭代
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1，然后是 2
}
```
for..of 写法是不是看起来比 .next().value 优雅多了？
……但是请注意：上面这个例子会先显示 1，然后是 2，然后就没了。它不会显示 3！
这是因为当 done: true 时，for..of 循环会忽略最后一个 value。因此，如果我们想要通过 for..of 循环显示所有的结果，我们必须使用 yield 返回它们：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1，然后是 2，然后是 3
}
```
因为 generator 是可迭代的，我们可以使用 iterator 的所有相关功能，例如：spread 语法 ...：
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```
在上面这段代码中，...generateSequence() 将可迭代的 generator 对象转换为了一个数组，因此可以解构。。
### 组合
generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。
例如，我们有一个生成数字序列的函数：
```javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```
现在，我们想重用它来生成一个更复杂的序列：

- 首先是数字 0..9（字符代码为 48…57），
- 接下来是大写字母 A..Z（字符代码为 65…90）
- 接下来是小写字母 a...z（字符代码为 97…122）
```javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```
### yiled是一条双向路
它不仅可以向外返回结果，而且还可以将外部的值传递到 generator 内。
调用 generator.next(arg)，我们就能将参数 arg 传递到 generator 内部。这个 arg 参数会变成 yield 的结果。
```javascript
function* gen() {
  // 向外部代码传递一个问题并等待答案
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield 返回的 value

generator.next(4); // --> 将结果传递到 generator 中
```

1. 第一次调用 generator.next() 应该是不带参数的（如果带参数，那么该参数会被忽略）。它开始执行并返回第一个 yield "2 + 2 = ?" 的结果。此时，generator 执行暂停，而停留在 (*) 行上。
2. 然后，正如上面图片中显示的那样，yield 的结果进入调用代码中的 question 变量。
3. 在 generator.next(4)，generator 恢复执行，并获得了 4 作为结果：let result = 4。

与常规函数不同，generator 和调用 generator 的代码可以通过在 next/yield 中传递值来交换结果。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682259524288-36baf729-5482-4fd0-aa1b-3c14ef6f78bf.png#averageHue=%23fbf6f4&clientId=ub5be76e5-83ff-4&from=paste&height=308&id=u75ac2172&originHeight=333&originWidth=648&originalType=binary&ratio=2&rotation=0&showTitle=false&size=24142&status=done&style=none&taskId=ua25876b5-9913-4518-8622-e7690c3bf2a&title=&width=600)
### genetator.throw
要向 yield 传递一个 error，我们应该调用 generator.throw(err)。在这种情况下，err 将被抛到对应的 yield 所在的那一行。
```javascript
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // 显示这个 error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)
```
在 (2) 行引入到 generator 的 error 导致了在 (1) 行中的 yield 出现了一个异常。在上面这个例子中，try..catch 捕获并显示了这个 error。
如果我们没有捕获它，那么就会像其他的异常一样，它将从 generator “掉出”到调用代码中。
调用代码的当前行是 generator.throw 所在的那一行，标记为 (2)。所以我们可以在这里捕获它，就像这样：
```javascript
function* generate() {
  let result = yield "2 + 2 = ?"; // 这行出现 error
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // 显示这个 error
}
```
如果我们没有在那里捕获这个 error，那么，通常，它会掉入外部调用代码（如果有），如果在外部也没有被捕获，则会杀死脚本。
### genetator.return
generator.return(value) 完成 generator 的执行并返回给定的 value。
```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
```
如果我们在已完成的 generator 上再次使用 generator.return()，它将再次返回该值
通常我们不使用它，因为大多数时候我们想要获取所有的返回值，但是当我们想要在特定条件下停止 generator 时它会很有用。
## 异步迭代
当值是以异步的形式出现时，例如在 setTimeout 或者另一种延迟之后，就需要异步迭代。
最常见的场景是，对象需要发送一个网络请求以传递下一个值，稍后我们将看到一个它的真实示例。
### 异步generator
```javascript
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // 哇，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 alert 之间有延迟）
  }

})();
```
### 实际的例子
例如，GitHub 允许使用相同的分页提交（paginated fashion）的方式找回 commit：

- 我们应该以 https://api.github.com/repos/<repo>/commits 格式创建进行 fetch 的网络请求。
- 它返回一个包含 30 条 commit 的 JSON，并在返回的 Link header 中提供了指向下一页的链接。
- 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。

对于我们的代码，我们希望有一种更简单的获取 commit 的方式。
因此，其用法将如下所示：
```javascript
for await (let commit of fetchCommits("username/repository")) {
  // 处理 commit
}
```
通过异步 generator，我们可以轻松实现上面所描述的函数，如下所示：
```javascript
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github 需要任意的 user-agent header
    });

    const body = await response.json(); // (2) 响应的是 JSON（array of commits）

    // (3) 前往下一页的 URL 在 header 中，提取它
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) 一个接一个地 yield commit，直到最后一页
      yield commit;
    }
  }
}
```
在 Web 开发中，我们经常会遇到数据流，它们分段流动（flows chunk-by-chunk）。例如，下载或上传大文件。
我们可以使用异步 generator 来处理此类数据。值得注意的是，在一些环境，例如浏览器环境下，还有另一个被称为 Streams 的 API，它提供了特殊的接口来处理此类数据流，转换数据并将数据从一个数据流传递到另一个数据流（例如，从一个地方下载并立即发送到其他地方）。
## Dva的应用
一个典型的 `effects` 打开方式
```javascript
app.model({
  namespace: 'todo',
  state: [],
  reducers: {
    add(state, { payload: todo }) {
      // 保存数据到 state
      return [...state, todo];
    },
  },
  effects: {
    *save({ payload: todo }, { put, call }) {
      // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
      yield call(saveTodoToServer, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'load' });
        }
      });
    },
  },
});
```
## 总结
### 注意事项

1. 并不能使用`new`关键字，会抛出`TypeError`异常
2. `yield`表达式会延迟执行，它只有在调用`next()`函数时才会执行，因此起到了延迟执行的效果
3. `yield`表达式只能在`Generator()`函数中调用，非`Generator()`函数抛出`SyntaxError`异常
4. `Generator()`中的`this`是无效的，通过以下方法使用`this`
```javascript
function* testGenerator() {
    this.name = 'kingx';
    yield 'hello';
    yield 'world';
}
// 使用call()函数改变执行主体为testGenerator的prototype属性
let t = testGenerator.call(testGenerator.prototype);
t.next();
console.log(t.name);  // kingx
```

5. 不提倡`Generator()`函数嵌套使用
## 资料

- [https://zh.javascript.info/generators](https://zh.javascript.info/generators)
- [JavaScript 中的 Generator 有什么用？](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247497274&idx=1&sn=1d1eb44efece94e60b409dbfa73fc927&chksm=c2e10311f5968a073d20e79d7ac8b096f8d9ae54892af2ee379860081ccd36e4fb183b31b6a3&token=236307061&lang=zh_CN#rd)
- [https://dvajs.com/api/#app-start-selector](https://dvajs.com/api/#app-start-selector)
