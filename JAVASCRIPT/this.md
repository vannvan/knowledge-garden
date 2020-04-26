![](https://user-gold-cdn.xitu.io/2020/4/21/1719d51548402b0f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- this的绑定在创建执行上下文时确定

- 大多数情况函数调用的方式决定this的值，this在执行时无法赋值

- this的值为当前执行的环境对象，非严格下总是指向一个对象，严格下可以是任意值

- 全局环境下this始终指向window，严格模式下函数的调用没有明确调用对象的情况下，函数内部this指向undefined，非严格下指向window

- 箭头函数的this永远指向创建当前词法环境时的this

- 作为构造函数时，函数中的this指向实例对象

- this的绑定只受最靠近调用它的成员的引用

- 执行上下文在被执行的时候才会创建，创建执行上下文时才会绑定this，所以this的指向永远是在执行时确定


[详解](https://juejin.im/post/5e9f0bdce51d4546f5791989#heading-30)