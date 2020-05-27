

### [掘金 前端面试总结](https://juejin.im/post/5dafb263f265da5b9b80244d#heading-22)   ❤❤❤❤

#### call bind apply的区别

> call() 和apply()的第一个参数相同，就是指定的对象。这个对象就是该函数的执行上下文。

> call()和apply()的区别就在于，两者之间的参数。

> call()在第一个参数之后的 后续所有参数就是传入该函数的值。

> apply() 只有两个参数，第一个是对象，第二个是数组，这个数组就是该函数的参数。 bind() 方法和前两者不同在于： bind() 方法会返回执行上下文被改变的函数而不会立即执行，而前两者是	直接执行该函数。他的参数和call()相同。

#### **null和undefined的区别？**

null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。

当声明的变量还未被初始化时，变量的默认值为undefined。

null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

undefined表示”缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

null表示”没有对象”，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

#### 怎样看待闭包

个人感觉，简单来说闭包就是在函数里面声明函数，本质上说就是在函数内部和函数外部搭建起一座桥梁，使得子函数可以访问父函数中所有的局部变量，但是反之不可以，这只是闭包的作用之一，另一个作用，则是保护变量不受外界污染，使其一直存在内存中，在工作中我们还是少使用闭包的好，因为闭包太消耗内存，不到万不得已的时候尽量不使用。

#### 你是如何理解原型和原型链的？

把所有的对象共用的属性全部放在堆内存的一个对象（共用属性组成的对象），然后让每一个对象的 __proto__存储这个「共用属性组成的对象」的地址。而这个共用属性就是原型，原型出现的目的就是为了减少不必要的内存消耗。而原型链就是对象通过__proto__向当前实例所属类的原型上查找属性或方法的机制，如果找到Object的原型上还是没有找到想要的属性或者是方法则查找结束，最终会返回undefined

#### 浏览器渲染的主要流程是什么?

将html代码按照深度优先遍历来生成DOM树。 css文件下载完后也会进行渲染，生成相应的CSSOM。 当所有的css文件下载完且所有的CSSOM构建结束后，就会和DOM一起生成Render Tree。 接下来，浏览器就会进入Layout环节，将所有的节点位置计算出来。 最后，通过Painting环节将所有的节点内容呈现到屏幕上

#### 从输入url地址到页面相应都发生了什么？

1、浏览器的地址栏输入URL并按下回下·车。
2、浏览器查找当前URL是否存在缓存，并比较缓存是否过期。
3、DNS解析URL对应的IP。
4、根据IP建立TCP连接（三次握手）。
5、HTTP发起请求。
6、服务器处理请求，浏览器接收HTTP响应。
7、渲染页面，构建DOM树。
8、关闭TCP连接（四次挥手）

#### this指向

全局作用域下的this指向window

如果给元素的事件行为绑定函数，那么函数中的this指向当前被绑定的那个元素

函数中的this，要看函数执行前有没有 . , 有 . 的话，点前面是谁，this就指向谁，如果没有点，指向window

自执行函数中的this永远指向window

定时器中函数的this指向window

构造函数中的this指向当前的实例

call、apply、bind可以改变函数的this指向

箭头函数中没有this，如果输出this，就会输出箭头函数定义时所在的作用域中的this

#### 原型

所有的函数数据类型都天生自带一个prototype属性，该属性的属性值是一个对象 prototype的属性值中天生自带一个constructor属性，其constructor属性值指向当前原型所属的类 所有的对象数据类型，都天生自带一个_proto_属性，该属性的属性值指向当前实例所属类的原型

#### call和原型组合继承（寄生组合j继承）

```js
  function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;
```

#### react生命周期

三个状态：Mounting(已插入真实的DOM）
	  Updating(正在被重新渲染)
	  Unmounting(已移除真实的DOM)
componentDIdMount 在第一次渲染后调用，只在客服端。之后组件已经生成对应的DOM结构，
componentDidUpdate 在组件完成更新后立即调用，在出初始化是不会调用

#### react父子组件传值

父组件通过props 给子组件传递数据，子组件则是通过调用父组件传给它的函数给父组件传递数据。

#### http和https

https：是以安全为目标的HTTP通道，简单讲是HTTP的安全版本，通过SSL加密
http：超文本传输协议。是一个客服端和服务器端请求和应答的标准（tcp）,使浏览器更加高效，使网络传输减少

#### 浏览器渲染原理及流程

流程：解析html以及构建dom树 -> 构建render树 ->  布局render树 -> 绘制render树
概念：1.构建DOM树： 渲染引擎解析HTML文档，首先将标签转换成DOM树中的DOM node(包括js生成的标签)生成内容树
      2.构建渲染树： 解析对应的css样式文件信息（包括js生成的样式和外部的css）
      3.布局渲染树：从根节点递归调用，计算每一个元素的大小，位置等。给出每个节点所在的屏幕的精准位置
      4.绘制渲染树：遍历渲染树，使用UI后端层来绘制每一个节点

重绘：当盒子的位置、大小以及其他属性，例如颜色、字体大小等到确定下来之后，浏览器便把这些颜色都按照各自的特性绘制一遍，将内容呈现在页面上
	触发重绘的条件：改变元素外观属性。如：color，background-color等
	重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观
注意：table及其内部元素需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多发时间，要尽量避免使用table布局

重排（重构/回流/reflow）： 当渲染书中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建，这就是回流。
	每个页面都需要一次回流，就是页面第一次渲染的时候

重排一定会影响重绘，但是重绘不一定会影响重排

#### JS为什么是单线程而不是多线程

- 单线程是指 JavaScript 在执行的时候，有且只有一个主线程来处理所有的任务。
- 目的是为了实现与浏览器交互。
- 我们设想一下，如果 JavaScript 是多线程的，现在我们在浏览器中同时操作一个 DOM，一个线程要求浏览器在这个 DOM 中添加节点，而另一个线程却要求浏览器删掉这个 DOM 节点，那这个时候浏览器就会很郁闷，他不知道应该以哪个线程为准。所以为了避免此类现象的发生，降低复杂度，JavaScript 选择只用一个主线程来执行代码，以此来保证程序执行的一致性。

#### requestAnimationFrame

> 专门用来做动画，不卡顿，用法和setTimeout一样。对 rAF 的阐述 MDN 资料

定时器一直是 js 动画的核心技术，但它们不够精准，因为定时器时间参数是指将执行代码放入 UI 线程队列中等待的时间，如果前面有其他任务队列执行时间过长，则会导致动画延迟，效果不精确等问题。

所以处理动画循环的关键是知道延迟多长时间合适：时间要足够短，才能让动画看起来比较柔滑平顺，避免多余性能损耗；时间要足够长，才能让浏览器准备好变化渲染。这个时候 rAF 就出现了，采用系统时间间隔(大多浏览器刷新频率是 60Hz，相当于 1000ms/60≈16.6ms)，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制。并且 rAF 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成

#### CSS重绘与回流/重排

会触发重绘或回流/重排的操作
- 添加、删除元素(回流+重绘)
- 隐藏元素，display:none(回流+重绘)，visibility:hidden(只重绘，不回流)
- 移动元素，如改变top、left或移动元素到另外1个父元素中(重绘+回流)
- 改变浏览器大小(回流+重绘)
- 改变浏览器的字体大小(回流+重绘)
- 改变元素的padding、border、margin(回流+重绘)
- 改变浏览器的字体颜色（只重绘，不回流）
- 改变元素的背景颜色（只重绘，不回流）

优化：
- 用transform 代替 top，left ，margin-top， margin-left... 这些位移属性
- opacity 加上 transform: translateZ/3d  这个属性之后便不会发生回流和重绘了
- 不要使用 js 代码对dom 元素设置多条样式，选择用一个 className 代替之。
- 如果确实需要用 js 对 dom 设置多条样式那么可以将这个dom 先隐藏，然后再对其设置
- 不要使用table 布局，因为table 的每一个行甚至每一个单元格的样式更新都会导致整个table 重新布局
- 对于频繁变化的元素应该为其加一个 transform 属性，对于视频使用video 标签

#### 盒模型

- 盒模型：内容(content)、填充(padding)、边界(margin)、 边框(border)
- 类型： IE 盒子模型、标准 W3C 盒子模型；
- 两种盒模型的主要区别是:标准盒模型的宽高是值内容宽高(content) 
- 而IE盒模型的宽高是指content+padding+border。
- 设置盒模型的方式是：设置box-sizing box-sizing:content-box  标准盒模型， box-sizing:border-box IE盒模型

#### proxy 对比 defineProperty

- Proxy 的优势如下：
    - Proxy 可以直接监听对象而非属性；
    - Proxy 可以直接监听数组的变化；
    - Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
    - Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
    - Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

- Object.defineProperty 的优势如下：
    - 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

#### react 生命周期

- componentWillMount:在渲染之前执行，用于根组件中的 App 级配置。
- componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
- componentWillReceiveProps：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
- shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
- componentWillUpdate：在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行。
- componentDidUpdate：它主要用于更新DOM以响应props或state更改。
- componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。

### [前端高频面试题整理](https://juejin.im/post/5eb250f3f265da7bf6742594)

#### BFC

BFC（Block Formatting Context）`块级格式化上下文`，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

`BFC 形成条件：`	

1、浮动元素，float 除 none 以外的值；

2、定位元素，position（absolute，fixed）；

3、display 为以下其中之一的值 inline-block，table-cell，table-caption；

4、overflow 除了 visible 以外的值（hidden，auto，scroll）；

`BFC 特性：`

1.内部的 Box 会在垂直方向上一个接一个的放置；

2.垂直方向上的距离由margin 决定；（解决外边距重叠问题） // 因为默认情况垂直方向两个容器都有margin的情况下，容器间的实际距离会以大的为准

3.bfc 的区域不会与 float 的元素区域重叠；（防止浮动文字环绕）

4.计算 bfc 的高度时，浮动元素也参与计算；（清除浮动）

5.bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素；

#### **手写EventEmitter(发布订阅模式--简单版)**

```js
      // 手写发布订阅模式 EventEmitter
      class EventEmitter {
        constructor() {
          this.events = {};
        }
        // 实现订阅
        on(type, callBack) {
          if (!this.events) this.events = Object.create(null);

          if (!this.events[type]) {
            this.events[type] = [callBack];
          } else {
            this.events[type].push(callBack);
          }
        }
        // 删除订阅
        off(type, callBack) {
          if (!this.events[type]) return;
          this.events[type] = this.events[type].filter(item => {
            return item !== callBack;
          });
        }
        // 只执行一次订阅事件
        once(type, callBack) {
          function fn() {
            callBack();
            this.off(type, fn);
          }
          this.on(type, fn);
        }
        // 触发事件
        emit(type, ...rest) {
          this.events[type] &&
            this.events[type].forEach(fn => fn.apply(this, rest));
        }
      }
// 使用如下
      const event = new EventEmitter();

      const handle = (...rest) => {
        console.log(rest);
      };

      event.on("click", handle);

      event.emit("click", 1, 2, 3, 4);

      event.off("click", handle);

      event.emit("click", 1, 2);

      event.once("dbClick", () => {
        console.log(123456);
      });
      event.emit("dbClick");
      event.emit("dbClick");
```

#### **new运算符原理**

> 1、创建一个空对象

> 2、让空对象的__proto__（IE没有该属性）成员指向了构造函数的prototype成员对象

> 3、使用apply调用构造器函数，属性和方法被添加到 this 引用的对象中

> 4、如果构造函数中没有返回其它对象，那么返回 this，即创建的这个的新对象，否则，返回构造函数中返回的对象

```js
function _new(func) {
    // 第一步 创建新对象
    let obj= {}; 
    // 第二步 空对象的_proto_指向了构造函数的prototype成员对象
    obj.__proto__ = func.prototype;//
    // 一二步合并就相当于 let obj=Object.create(func.prototype)

    // 第三步 使用apply调用构造器函数，属性和方法被添加到 this 引用的对象中
    let result = func.apply(obj);
    if (result && (typeof (result) == "object" || typeof (result) == "function")) {
    // 如果构造函数执行的结果返回的是一个对象，那么返回这个对象
        return result;
    }
    // 如果构造函数返回的不是一个对象，返回创建的新对象
    return obj;
}
```

#### **JS同步任务和异步任务**

![](https://user-gold-cdn.xitu.io/2020/1/2/16f65820ae994e39?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。如果前一个任务耗时很长，后一个任务就不得不一直等着。JavaScript语言的设计者意识到这个问题，将所有任务分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）

- 同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

- 异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

##### **任务队列（消息队列）**

![](https://user-gold-cdn.xitu.io/2020/1/2/16f658e6fab89441?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

任务队列中存着的是异步任务，这些异步任务一定要等到执行栈清空后才会执行。

异步任务，会先到事件列表中注册函数。如果事件列表中的事件触发了，会将这个函数移入到任务队列中（DOM操作对应DOM事件，资源加载操作对应加载事件，定时器操作可以看做对应一个“时间到了”的事件）

##### **宏任务与微任务**

![](https://user-gold-cdn.xitu.io/2020/1/2/16f65a5b91838425?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

macro-task(宏任务)：包括整体代码script，setTimeout，setInterval， setImmediate, I/O, UI rendering

micro-task(微任务)：Promise，process.nextTick，MutationObserver

微任务意义：

> 减少更新时的渲染次数 因为根据HTML标准，会在宏任务执行结束之后，在下一个宏任务开始执行之前，UI都会重新渲染。如果在microtask中就完成数据更新，当 macro-task结束就可以得到最新的UI了。如果新建一个 macro-task来做数据更新的话，那么渲染会执行两次

##### **Event Loop(事件循环)**

![](https://user-gold-cdn.xitu.io/2020/1/2/16f65ad8abbe108a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

整体的script(作为第一个宏任务)开始执行的时候，会把所有代码分为两部分：“同步任务”、“异步任务”；

同步任务会直接进入主线程依次执行；

异步任务会再分为宏任务和微任务；

宏任务进入到Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；

微任务也会进入到另一个Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；

当主线程内的任务执行完毕，主线程为空时，会检查微任务的Event Queue，如果有任务，就全部执行，如果没有就执行下一个宏任务；

上述过程会不断重复，这就是Event Loop事件循环；

##### **一图总结（事件循环、执行栈、任务队列、宏任务、微任务）**

![](https://user-gold-cdn.xitu.io/2020/1/2/16f65abdb73a1e5f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##### 经典面试题

```js
console.log(1);

setTimeout(()=>{
    console.log(2);   
    new Promise((resolve,reject)=>{
    console.log(3);
    resolve()
}).then(res=>{
    console.log(4); 
})
})

new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    console.log(5); 
}).then(res=>{
    console.log(6);
    
})

new Promise((resolve,reject)=>{
    console.log(7);
    resolve()
}).then(res=>{
    console.log(8); 
}).then(res=>{
    console.log(9);
    
})

setTimeout(()=>{
    console.log(10);   
    new Promise((resolve,reject)=>{
    console.log(11);
    resolve()
}).then(res=>{
    console.log(12); 
})
})

console.log(13);
// 1 7 13 5 8 6 9 2 3 4 10 11 12
```

#### get和post区别

GET请求会被浏览器主动cache，而POST不会，除非手动设置

GET把请求的参数放在url上，即HTTP协议头上 post把参数放在HTTP的包体内

GET 方式传输的数据量非常小，一般限制在 2 KB 左右，但是执行效率却比 Post 方法好；而 Post方式传递的数据量相对较大，它是等待服务器来读取数据，不过也有字节限制（实际上IIS4中最大量为80KB，IIS5中为100KB）这是为了避免对服务器用大量数据进行恶意攻击

GET请求只能进行url编码，而POST支持多种编码方式

GET产生的URL地址可以加入书签，而POST不可以

GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留

GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

#### http状态码

状态码：由3位数字组成，第一个数字定义了响应的类别

1xx：指示信息，表示请求已接收，继续处理

2xx：成功，表示请求已被成功接受，处理。

3xx：重定向
4xx：客户端错误

```
400 Bad Request：客户端请求有语法错误，服务器无法理解。
401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用。
403 Forbidden：服务器收到请求，但是拒绝提供服务
404 Not Found：请求资源不存在。比如，输入了错误的url
415 Unsupported media type：不支持的媒体类型
```

5xx：服务器端错误，服务器未能实现合法的请求。

```js
500 Internal Server Error：服务器发生不可预期的错误。
503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常，
```

#### cookies

一小段文本信息，伴随着用户请求在 Web 服务器和浏览器之间传递,Cookie 包含每次用户访问站点时 Web 应用程序都可以读取的信息。

- 为什么用cookies

HTTP协议是无状态的，对于同一个浏览器发送的多个请求，服务器无法知道是否来自同一浏览器，需要额外的数据维护会话。

session 是一个抽象概念，开发者为了实现中断和继续等操作，将 user agent 和 server 之间一对一的交互，抽象为“会话”，进而衍生出“会话状态”，也就是 session 的概念。

cookie保存在客户端，session保存在服务器端，Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；

**cookies的优点**

1. 数据的持久性
2. 不需要任何服务器资源
3. 可配置到期规则
4. 简单，基于文本的轻量级结构
5. 通过加密和SSL，减少cookies被破解的可能性
6. 只在cookies中存放非敏感信息，即使被盗也不存在重大损失

**缺点**

1. 长度有限制  `IE6`或低版本最多20个cookies,`IE7`和之后最多可以有50个。fireFox最多50个，`Chrome`和`Safari`没有做硬性限制 ，每个cookies不超过4kb，否则会被截掉
2. 潜在的安全风险，Cookies可能会被拦截，篡改，
3. 用户可以配置为禁用
4. 有些状态不可能保存在客户端

#### 同源策略

同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键安全机制。

什么是源：协议、域名与端口。这三者任何一个不一样的话，就算是跨域

什么是限制：不是一个源的文档，没有权限去操作另一个源的文档

```html
Cookie、LocalStorage 和 IndexDB无法读取。
Dom无法获得
Ajax请求不能发送
```

##### 前后端通信方式

1. Ajax 支持同源通信
2. WebSocket 不受同源策略影响
3. CORS 既支持同源通信也支持跨域通信

**跨域通信的几种方式**

1.JSONP(只支持GET请求)

通过 *script* 标签的异步加载来实现的。利用script标签不受同源策略的限制，天然可以跨域的特性。

```js
<script>
var script = document.createElement('script');
script.type = 'text/javascript';

script.src = 'https://api.asilu.com/geo/&callback=jsonp';//这个是获取当前经纬度的接口
document.head.appendChild(script);//创建并添加script标签到<head>下

// 回调执行函数
function jsonp(res) {
    console.log(res);//打印jsonp返回的信息
}
</script>
```

2.Hash

url的#后面的内容就叫Hash。Hash的改变，页面不会刷新。

```js
// 在A中伪代码如下：
var B = document.getElementsByTagName('iframe');
B.src = B.src + '#' + 'data';

// 在B中的伪代码如下
window.onhashchange = function () {
  var data = window.location.hash;
};
```

3.postMessage

H5中新增的postMessage()方法，可以用来做跨域通信

```js
// 在A窗口中操作如下：向B窗口发送数据
    Bwindow.postMessage('data', 'http://B.com'); //这里强调的是B窗口里的window对象

// 在窗口B中监听 message 事件
    Awindow.addEventListener('message', function (event) {   //这里强调的是A窗口里的window对象
        console.log(event.origin);  //获取 ：A窗口url
        console.log(event.source);  //获取：A window对象
        console.log(event.data);    //获取传过来的数据
    }, false);
```

4.WebSocket

WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现

```js
var ws = new WebSocket('wss://echo.websocket.org');
ws.onopen = function (evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};
ws.onmessage = function (evt) {
  console.log('Received Message: ', evt.data);
  ws.close();
};
ws.onclose = function (evt) {
  console.log('Connection closed.');
};
```

5.CORS(现代浏览器普遍跨域解决方案)

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信

#### 前端安全

##### **XSS攻击(跨站脚本攻击)**

英文全称：Cross Site Script，XSS攻击，通常指黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击

###### XSS分类

- 反射型 XSS

原理： 反射型XSS，也叫非持久型XSS，是指发生请求时，XSS代码出现在请求URL中，作为参数提交到服务器，服务器解析并响应。响应结果中包含XSS代码，最后浏览器解析并执行

实现： 攻击者通过给用户发送带有恶意脚本代码参数的URL，当URL地址被打开时，特有的恶意代码参数被HTML解析、执行。

- 存储型XSS

原理： 一般是攻击者输入的恶意代码“存储”在服务器端，主要是将XSS代码发送到服务器（不管是数据库、内存还是文件系统等。），只要受害者浏览包含此恶意代码的页面就会执行恶意代码。

实现： 存储型 XSS 一般出现在网站留言、评论、博客日志等交互处。 例如：黑客提交了一条包含XSS代码的留言到数据库。当目标用户查询留言时，那些留言的内容会从服务器解析之后加载出来。浏览器发现有XSS代码，就当做正常的HTML和JS解析执行。XSS攻击就发生了

###### 防御

```js
HttpOnly
浏览器禁止页面的Javascript访问带有HttpOnly属性的cookie。（实质解决的是：XSS后的cookie劫持攻击）如今已成为一种“标准”的做法

输入检查（XSS Filter）
让一些基于特殊字符的攻击失效。（常见的Web漏洞如XSS、SQLInjection等，都要求攻击者构造一些特殊字符）

输出检查
在变量输出到HTML页面时，使用编码或转义的方式来防御XSS攻击
```

##### **CSRF(跨站请求伪造)**

CSRF就是利用你所在网站的登录的状态，以你的名义向网站发送恶意请求。CSRF能做的事情包括利用你的身份发邮件、发短信、进行交易转账等，盗取你的账号，甚至购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全

###### 原理图

![](https://user-gold-cdn.xitu.io/2020/1/2/16f65563b5b437e6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

###### 关键点

1. 用户登录受信任网站A，并且在本地生成Cookie
2. 在不登出网站A的情况下，访问危险网站B

###### **CSRF的防御**

增加token 在请求中放入攻击者所不能伪造的信息，并且该信总不存在于cookie之中。鉴于此，系统开发人员可以在HTTP请求中以参数的形式加入一个随机产生的token，并在服务端进行token校验，如果请求中没有token或者token内容不正确，则认为是CSRF攻击而拒绝该请求

通过Referer识别 根据HTTP协议，在HTTP头中有一个字段叫Referer，它记录了该HTTP请求的来源地址。在通常情况下，访问一个安全受限的页面的请求都来自于同一个网站

网站重要操作增加验证码 CSRF攻击过程中，用户在不知情的情况下构造了网络请求，添加验证码后，强制用户必须与应用进行交互



#### 一次完整的HTTP事务流程

（1）域名解析

（2）发起TCP的三次握手

（3）建立TCP连接后发起http请求

（4）服务器响应http请求，浏览器得到HTML代码

（5）浏览器解析HTML代码，并请求HTML代码中的资源

（6）浏览器对页面进行渲染呈现给用户

（7）连接结束

#### 渲染机制

##### 浏览器基本渲染流程

1. 解析HTML，生成DOM树（DOM）
2. 解析CSS，生成CSSOM树（CSSOM）
3. 将DOM和CSSOM合并，生成渲染树（Render-Tree）
4. 计算渲染树的布局（Layout）
5. 将布局渲染到屏幕上（Paint）

##### 几个关键概念

- *CSS阻塞渲染*：由于CSSOM负责存储渲染信息，浏览器就必须保证在合成渲染树之前，CSSOM是完备的，这种完备是指所有的CSS（内联、内部和外部）都已经下载完，并解析完，只有CSSOM和DOM的解析完全结束，浏览器才会进入下一步的渲染。CSS阻塞渲染意味着，在CSSOM完备前，页面将一直处理白屏状态，这就是为什么样式放在head中，仅仅是为了更快的解析CSS，保证更快的首次渲染。

- *JS阻塞页面*：JS可以操作DOM来修改DOM结构，可以操作CSSOM来修改节点样式，这就导致了浏览器在解析HTML时，一旦碰到script，就会立即停止HTML的解析，也阻塞了其后的CSS解析，整个解析进程必须等待JS的执行完成才能够继续。从性能角度上讲，将script放在页面底部，也就合情合理了

- *重排（Reflow）*：DOM结构中的各个元素都有自己的盒子（模型），这些都需要浏览器根据各种样式来计算并根据计算结果将元素放到它该出现的位置，这个过程称之为reflow

`触发重排（reflow）`

- 1、当增加、删除、修改DOM节点时，会导致reflow或repaint
- 2、当移动DOM的位置，或是插入动画的时候
- 3、当修改CSS样式的时候
- 4、当Resize窗口的时候，或是滚动的时候
- 5、当修改网页的默认字体时

- *重绘（Repaint）*：当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，浏览器便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，这个过程称之为repaint。

`触发重绘（Repaint）`

- 1、DOM改动
- 2、CSS改动

`最小化重绘和重排`

 1.一次性修改样式：减少内联样式使用 样式合并写法

 2.批量修改DOM：使用文档片段创建一个子树，然后再拷贝到文档中（document.fragment） 

 3.缓存布局信息

#### **渲染树（render tree）和DOM树的关系？**

（1）在DOM树构建的同时，浏览器会构建渲染树。（为了提高用户体验，浏览器并不会等到所有HTML文档加载完成之后才建立渲染树并渲染，而是会在从`网络层`获取html文档的同时把已经接收到的局部内容先渲染出来）

（2）DOM树完全和html标签一一对应，而渲染树会忽略不需要渲染的元素（如head，样式为display:none的元素等）

（3）渲染树中每一个节点都存储着对应的CSS属性

#### 性能优化

![](https://user-gold-cdn.xitu.io/2020/1/3/16f6a1876886d74e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 前端错误监控以及上报

前端错误分类：

- 即时运行错误：代码错误
- 资源加载错误
- 对于跨域的代码运行错误会显示 Script error. 对于这种情况我们需要给 script 标签添加 crossorigin 属性，并且服务器添加Access-Control-Allow-Origin

即时运行错误捕获 （1）try ....catch （2) window.onerror 或者 window.addEventListener 记住事件捕获阶段获得，不是冒泡阶段

资源加载错误 （1）object.onerror，如img.onerror （2）performance.getEntries （getEntries api返回一个资源加载完成数组，假设为img，再查询页面中一共有多少个img，二者的差就是没有加载上的资源） （3）Error事件捕获

错误如何上报

（1）ajax

（2）image的src上报

> (new Image()).src = '错误上报的请求地址'

一般来说，大厂都是采用利用image对象的方式上报错误的；使用图片发送get请求，上报信息，由于浏览器对图片有缓存，同样的请求，图片只会发送一次，避免重复上报

### Vue.js相关

#### 对MVVM的理解

 **Model**代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。

 **View** 代表UI 组件，它负责将数据模型转化成UI 展现出来。

**ViewModel** 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。 

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。**ViewModel** 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

![](https://user-gold-cdn.xitu.io/2020/4/26/171b427caaf5499a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### V-model的原理是什么/Vue实现数据双向绑定的原理

Vue的双向数据绑定是由数据劫持结合发布者订阅者实现的。 数据劫持是通过Object.defineProperty()来劫持对象数据的setter和getter操作。 在数据变动时作你想做的事

原理 ：通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化--->视图更新 ，在初始化vue实例时，遍历data这个对象，给每一个键值对利用Object.definedProperty对data的键值对新增get和set方法，利用了事件监听DOM的机制，让视图去改变数据

#### 生命周期的理解

beforeCreate阶段：vue实例的挂载元素el和数据对象data都是undefined，还没有初始化。

created阶段：vue实例的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有

beforeMount阶段：vue实例的el和data都初始化了，但是挂载之前为虚拟的dom节点

mounted阶段：vue实例挂载到真实DOM上，就可以通过DOM获取DOM节点

beforeUpdate阶段：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器

updated阶段：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新，避免在这个钩子函数中操作数据，防止死循环

beforeDestroy阶段：实例销毁前调用，实例还可以用，this能获取到实例，常用于销毁定时器，解绑事件

destroyed阶段：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁

源码中关于生命周期的全流程：

![](https://user-gold-cdn.xitu.io/2020/5/7/171ed22550a6f694?imageslim)

#### VUE和REACT有什么区别

> react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流；

> vue的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。

=>  相同点：
	1.数据驱动页面，提供响应式的试图组件
	2.都有virtual DOM,组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范
	3.数据流动单向，都支持服务器的渲染SSR
	4.都有支持native的方法，react有React native， vue有wexx
=>  不同点：
	1.数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的
	2.数据渲染：大规模的数据渲染，react更快
	3.使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目
	4.开发风格：react推荐做法jsx + inline style把html和css都写在js了
		                 vue是采用webpack + vue-loader单文件组件格式，html, js, css同一个文件

#### diff算法

- 把树形结构按照层级分解，只比较同级元素,在 diff 比较的过程中，循环从两边向中间收拢。
- 给列表结构的每个单元添加key属性，方便比较。在实际代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个标记
- 在深度优先遍历的时候，每遍历到一个节点就把该节点和新的树进行对比。如果有差异的话就记录到一个对象里面
  Vritual DOM 算法主要实现上面步骤的三个函数：element， diff， patch。然后就可以实际的进行使用
- react只会匹配相同的class的component（这里的class指的是组件的名字）
  合并操作，条用component的setState方法的时候，React将其标记为dirty.到每一个时间循环借宿，React检查所有标记dirty的component重新绘制
- 选择性子树渲染。可以重写shouldComponentUpdate提高diff的性能	

#### methods computed watch 的区别

- computed--适用于重新计算比较费时不用重复数据计算的环境。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。如果一个数据依赖于其他数据，那么把这个数据设计为computed
- watch--像是一个 data 的数据监听回调，当依赖的 data 的数据变化，执行回调，在方法中会传入 newVal 和 oldVal。可以提供输入值无效，提供中间值 特场景。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。如果你需要在某个数据变化时做一些事情，使用watch.
- method-- 跟前面的都不一样，我们通常在这里面写入方法，只要调用就会重新执行一次

#### computed的实现过程

计算属性`computed`的本质是 `computed Watcher`，其具有缓存。

![](https://user-gold-cdn.xitu.io/2020/4/26/171b427cae665aef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 为什么data是函数

> 如果data是一个函数的话，这样每复用一次组件，就会返回一份新的data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份data，就会造成一个变了全都会变的结果。

```js
// data
data() {
  return {
    message: "子组件",
    childName:this.name
  }
}

// new Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
```

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

引申问题：在 `new Vue` 实例里，`data` 可以直接是一个对象

```js
new Vue({
  data: {
    msg: 'hello jack-cool'
  },
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
```

组件中的`data`是一个函数的原因在于：同一个组件被复用多次，会创建多个实例。这些实例用的是同一个构造函数，如果 `data` 是一个对象的话。那么所有组件都共享了同一个对象。为了保证组件的数据独立性要求每个组件必须通过 `data` 函数返回一个对象作为组件的状态。

而 `new Vue` 的实例，是不会被复用的，因此不存在引用对象的问题。

#### v-show 与 v-if 有什么区别？

**v-if** 是**真正**的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show** 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

#### 在哪个生命周期内调用异步请求？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

#### 对keep-alive的理解

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

#### Vue.js组件通信方式

- **props / $emit .sync适用 父子组件通信**

- **ref 与 $parent / $children 适用 父子组件通信**

- **EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信**

- **$attrs/$listeners 适用于 隔代组件通信**

- **provide / inject 适用于 隔代组件通信**

- **Vuex 适用于 父子、隔代、兄弟组件通信**

- ###  自定义$dispatch，$broadcast方法，实现隔代通信

#### Vue.js 的SSR

SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

##### **服务端渲染的优点：**

- 更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
- 更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

#####  **服务端渲染的缺点：**

- 更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
- 更多的服务器负载：在 Node.js  中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

#### vue-router 中常用的 hash 和 history 路由模式实现原理

###### hash

hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；

- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；

- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；

- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

###### **history 模式的实现原理**

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

特性

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；

- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；

- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）

#### Vue 框架怎么实现对象和数组的监听？

通过 Object.defineProperty() 对数据进行劫持，但是  Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，Vue具体通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。

监听数组变化流程图：

![](https://user-gold-cdn.xitu.io/2020/4/26/171b427cac7f66ba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### Proxy 与 Object.defineProperty 优劣对比

**Proxy 的优势如下:**

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**Object.defineProperty 的优势如下:**

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

#### Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？

```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式  
    target.splice(key, 1, val)
    return val
  }
  // key 已经存在，直接修改属性值  
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

基本原理：

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；

- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

#### 虚拟 DOM 实现原理？

虚拟 DOM 的实现原理主要包括以下 3 部分：

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

#### Vue 中的 key 有什么作用？

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和  oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。

所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

#### Vue.js项目的优化

###### **代码层面的优化**

- v-if 和 v-show 区分使用场景

- computed 和 watch  区分使用场景

- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

- 长列表性能优化

- 事件的销毁

- 图片资源懒加载

- 路由懒加载

- 第三方插件的按需引入

- 优化无限列表性能

- 服务端渲染 SSR or 预渲染

###### **Webpack 层面的优化**

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

###### **基础的 Web 技术的优化**

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

#### Vue.js3.0 特性

##### （1）**监测机制的改变**

3.0 将带来基于代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪。这消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：

- 只能监测属性，不能监测对象
- 检测属性的添加和删除；
- 检测数组索引和长度的变更；
- 支持 Map、Set、WeakMap 和 WeakSet。

新的 observer 还提供了以下特性：

- 用于创建 observable 的公开 API。这为中小规模场景提供了简单轻量级的跨组件状态管理解决方案。
- 默认采用惰性观察。在 2.x 中，不管反应式数据有多大，都会在启动时被观察到。如果你的数据集很大，这可能会在应用启动时带来明显的开销。在 3.x 中，只观察用于渲染应用程序最初可见部分的数据。
- 更精确的变更通知。在 2.x 中，通过 Vue.set 强制添加新属性将导致依赖于该对象的 watcher 收到变更通知。在 3.x 中，只有依赖于特定属性的 watcher 才会收到通知。
- 不可变的 observable：我们可以创建值的“不可变”版本（即使是嵌套属性），除非系统在内部暂时将其“解禁”。这个机制可用于冻结 prop 传递或 Vuex 状态树以外的变化。
- 更好的调试功能：我们可以使用新的 renderTracked 和 renderTriggered 钩子精确地跟踪组件在什么时候以及为什么重新渲染。

##### （2）模板

3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。

##### （3）**对象式的组件声明方式**

- 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。

- 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。

- 基于 treeshaking 优化，提供了更多的内置功能。


#### Vuex和单纯的全局对象有什么区别？

Vuex和全局对象主要有两大区别：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

### [面试题集合](https://juejin.im/post/5eb55ceb6fb9a0436748297d)

#### 描述一下EventLoop的执行过程

- 一开始整个脚本作为一个宏任务执行

- 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列

- 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完

- 执行浏览器UI线程的渲染工作

- 检查是否有`Web Worker`任务，有则执行

- 执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

#### 冒泡和捕获的过程

冒泡指的是：当给某个目标元素绑定了事件之后，这个事件会依次在它的父级元素中被触发(当然前提是这个父级元素也有这个同名称的事件，比如子元素和父元素都绑定了`click`事件就触发父元素的`click`)。

捕获则是从上层向下层传递，与冒泡相反。

```html
<!-- 会依次执行 button li ul -->
<ul onclick="alert('ul')">
  <li onclick="alert('li')">
    <button onclick="alert('button')">点击</button>
  </li>
</ul>
<script>
  window.addEventListener('click', function (e) {
    alert('window')
  })
  document.addEventListener('click', function (e) {
    alert('document')
  })
</script>

//冒泡结果：button > li > ul > document > window
//捕获结果：window > document > ul > li > button
```

以下事件不冒泡：

- `onblur`
- `onfocus`
- `onmouseenter`
- `onmouseleave`

#### 手写new

```js
function myNew (fn, ...args) {
  let instance = Object.create(fn.prototype);
  let result = fn.call(instance, ...args)
  return typeof result === 'object' ? result : instance;
}
```

#### typeof 和instanceof的区别

`typeof`表示是对某个变量类型的检测，基本数据类型除了`null`都能正常的显示为对应的类型，引用类型除了函数会显示为`'function'`，其它都显示为`object`。

而`instanceof`它主要是**用于检测某个构造函数的原型对象在不在某个对象的原型链上**。

#### **为什么浏览器会禁止跨域？**

**简答**：

首先，跨域只存在于浏览器端，因为我们知道浏览器的形态是很开放的，所以我们需要对它有所限制。

其次，同源策略主要是为了保证用户信息的安全，可分为两种：`Ajax`同源策略和`DOM`同源策略。

`Ajax`同源策略主要是使得不同源的页面不能获取`cookie`且不能发起`Ajax`请求，这样在一定层度上防止了`CSRF`攻击。

`DOM`同源策略也一样，它限制了不同源页面不能获取`DOM`，这样可以防止一些恶意网站在自己的网站中利用`iframe`嵌入正规的网站并迷惑用户，以此来达到窃取用户信息。

#### meta标签把http换成https

```html
<meta http-equiv ="Content-Security-Policy" content="upgrade-insecure-requests">
```

#### script为什么阻塞页面？

JS属于单线程，当我们在加载`script`标签内容的时候，渲染线程会被暂停，因为`script`标签里可能会操作`DOM`的，所以如果你加载`script`标签又同时渲染页面肯定就冲突了，因此说渲染线程(`GUI`)和js引擎线程互斥。

#### 对设计模式的理解

是什么？为什么？怎么做？

设计模式是一种编程的最佳实践，主要分为三大类：创建型，结构型和行为型。设计模式的出现是为了帮助程序员学习更好的编程技巧，以及交流时，使用特定的名称表示某种写法。，然后对三种类型分别介绍

#### **渐进增强和优雅降级**

渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

#### 伪类和伪元素的区别

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。虽然它和普通的css类相似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

#### z-index 的层级

![](https://user-gold-cdn.xitu.io/2019/8/30/16ce245b90085292?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### webpack

#### 原理简述，个人理解

- 核心概念

  javascript的`模块打包工具`.通过分析模块之间的依赖，最终将所有的模块打包成y一份或者多份代码包，供`HTML`使用。实质上，Webpack仅仅提供了`打包功能`和一套`文件处理机制`,然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。因此webpack具有高度的可拓展性。

  - Entry  入口文件，webpack会从该文件进行分析与编译
  - OutPut 出口路径，打包后c创建bundler的文件路径以及文件名
  - Module 在webpack中任何文件都可以作为一个模块，会根据配置不同的Loader进行加载和打包
  - Chunk 代码块，可根据配置合并成一个或多个代码块，以便按需加载，提高性能
  - Loader 模块加载器，进行各种类型的加载与转换
  - Plugin 拓展组件 可以通过Webpack相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改

- 工作流程 - 加载，编译，输出
  - 读取配置文件，按命令`初始化`配置参数，创建compiler对象
  - 调用插件的apply方法挂载插件监听，然后从入口文件开始执行编译
  - 按文件类型，调用相应的loader对模块进行编译，并在合适的时机点触发对应的事件，调用 Plugin 执行，最后再根据模块 **依赖查找** 到所依赖的模块，递归执行第三步
  - 将编译后的所有代码包装成一个个代码块 (Chuck)， 并按依赖和配置确定 **输出内容**。这个步骤，仍然可以通过 Plugin 进行文件的修改;
  - 最后，根据 Output 把文件内容一一写入到指定的文件夹中，完成整个过程；

 

### 综合

#### Restful

风格指南

- 协议： https
- 域名：应该尽量API部署在专用域名下
- 版本：应该将版本号放在URL 
- 路径：每个网址代表一种资源，所以网址中应该只包含名词，而不能包含动词
- HTTP动词：

> - GET（SELECT）：从服务器取出资源（一项或多项）。
> - POST（CREATE）：在服务器新建一个资源。
> - PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
> - PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
> - DELETE（DELETE）：从服务器删除资源。

- 过滤信息：以下列举常见的参数

> - ?limit=10：指定返回记录的数量
> - ?offset=10：指定返回记录的开始位置。
> - ?page=2&per_page=100：指定第几页，以及每页的记录数。
> - ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
> - ?animal_type_id=1：指定筛选条件

- 状态码：
- 错误处理：如果返回状态是4XX,就应该向用户返回出错信息
- 返回结果： 

> - GET /collection：返回资源对象的列表（数组）
> - GET /collection/resource：返回单个资源对象
> - POST /collection：返回新生成的资源对象
> - PUT /collection/resource：返回完整的资源对象
> - PATCH /collection/resource：返回完整的资源对象
> - DELETE /collection/resource：返回一个空文档

- OAuth2.0的身份认证
- 返回数据格式尽量采取JSON

  1）在Restful之前的操作：

>  http://127.0.0.1/user/query   GET  根据用户id查询用户数据
>  http://127.0.0.1/user/save    POST 新增用户
>  http://127.0.0.1/user/update POST 修改用户信息
>  http://127.0.0.1/user/delete  GET/POST 删除用户信息

2) RestFul用法

>   http://127.0.0.1/user  GET  根据用户id查询用户数据
>   http://127.0.0.1/user  POST 新增用户
>   http://127.0.0.1/user  PUT 修改用户信息
>   http://127.0.0.1/user  DELETE 删除用户信息

#### MVC和MVVM

#####  MVC

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png)

> 1. View 传送指令到 Controller
> 2. Controller 完成业务逻辑后，要求 Model 改变状态
> 3. Model 将新的数据发送到 View，用户得到反馈

所有通信都是单向的，接收用户指令既可以通过view->controller ，也可以直接通过controller接收指令

##### 与MVC有关的MVP	

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png)

> 1. 各部分之间的通信都是双向的
> 2. View和Model不发生联系，都是通过Presenter传递
> 3. View非常薄，不部署任何业务逻辑，称为`被动视图`,没有任何主动性，而Presenter非常厚，所有逻辑都部署在那里

##### MVVM

MVVM模式将Presenter改名为ViewModel.基本上与MVP完全一致

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)

唯一的区别是，它采用双向绑定：View变动，自动反映在ViewModel,反之亦然