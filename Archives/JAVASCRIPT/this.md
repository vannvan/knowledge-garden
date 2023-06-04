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

### this 绑定规则

1.默认绑定

```js
function foo() {
    console.log(a);
}
var a = 2;
foo(); // 2
```

在这里this指向全局作用域，因为函数的调用位置实在全局作用域中，像foo()这种不带任何修饰的函数引用进行调用时，只能使用默认绑定，这也是最常见的d独立函数调用

2.隐式绑定

隐式绑定是当调用位置周围含有上下文对象时需要考虑的

```js
function foo() {
    console.log(this.a);
}
var obj = {
    a:2,
    foo: foo
}
obj.foo(); // 2
```

当函数调用位置周围有上下文对象时，隐式绑定会把函数中的thisb绑定到这个上下文对象。换句话说，在这里我们在obj对象中调用了foo()函数，调用位置正好处于obj对象中，因此隐式绑定把函数中的this绑定到了obj对象上。

一连串的函数调用会有函数调用栈，那么函数包含在一连串的对象中时，属于对象调用链

```js
function foo() {
    console.log(this.a);
};
var obj2 = {
    a: 1,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 1 
```

这里是因为对象属性链中只有第一层在调用位置中起作用，换句话说，函数调用位置只在第一层对象中绑定。foo()最开始是在obj2被调用的，因此this绑定到了obj2上，接着obj2中的foo属性又在obj1中调用了，但是此时我们已经不再考虑h后面的this绑定了，因为this的绑定已经终结在了第一层。

ps:隐式丢失含义 实例

```js
function foo() {
    console.log(this.a);
};
var obj = {
    a: 1,
    foo: foo
};
var bar = obj.foo; //传递了函数，隐式绑定丢失了

var a = 'hello';

bar(); // 'hello' 
```

首先在这里我们创建了一个bar全局变量，并且把obj中的foo属性传递给了它，由于foo属性对应一个函数，因此 var bar = obj.foo 相当于把foo(...)这个函数传给了bar，当我们再调用bar时，其实是一个不带任何修饰的函数调用，因此应用了默认绑定，这时隐式绑定就丢失了。

3.显式绑定

我们希望this绑定在哪个对象上我们就用方法绑定它，具体可以使用call()、apply()、bind()达到这个效果，需要注意的是一旦我们显式绑定过就无法再绑定了

```js
var obj1 = {
  a:1,
  say1: function() {
    console.log(this.a)  //obj2没有call之前 this是指向obj1的
  }
}

var obj2 = {
  a:2,
  say2:function() {
    obj1.say.call(this)   //call之后obj1的this指向了obj2
  }
}

obj2.say2() // 2
obj1.say1()  //1
```

4.new 绑定

```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
```

首先，创建了一个新的对象bar，当使用new来调用`foo(..)`函数时，我们会把bar对象中的this绑定在`foo(...)`函数中，因此这里bar对象中的a指向`foo(..)`函数中的a，所以输出是2。

### 绑定优先级

- 隐式绑定VS显式绑定

```js
function foo() {
    console.log(this.a);
}
var obj1 = {
    a: 2,
    foo: foo
}
var obj2 = {
    a: 3,
    foo: foo
}
obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3   显示绑定
obj2.foo.call(obj1); // 2   显示绑定
```

从上面这个例子我们可以看出显示绑定的优先级要高于隐式绑定，因为在隐式绑定之后我仍可以用显式绑定。

- new绑定VS隐式绑定

```js
function foo(something) {
    this.a = something;
}
var obj1 = { 
    foo: foo
}
var obj2 = {}

obj1.foo(2);
console.log(obj1.a);    // 2
    
var bar = new obj1.foo(4);  
console.log(obj1.a); // 2
console.log(bar.a); // 4 
```

从上面这个例子我们可以看出new绑定的优先级要高于隐式绑定，因为在隐式绑定之后我仍可以用new绑定。

- new绑定VS显式绑定

```js
function foo(something) {
    this.a = something;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);    // 2
    
var baz = new bar(3);  
console.log(obj1.a); // 2 ??
console.log(baz.a); // 3
```

当我们创建baz时，实际上是创建了一个新对象，新对象的this指向函数调用的this，因此虽然前面`bar(..)`被硬绑定到了obj1上，但是new绑定修改了`bar(..)`中的this，该this最终指向`foo(..)`函数，所以obj1中的a并没有被修改，同时在baz中创建了一个新的属性。从上面这个例子我们可以看出new绑定的优先级要高于显式绑定，因为在显式绑定之后我仍可以用new绑定。



### 文章

[解决js类定义里面绑定事件this指向问题](https://blog.csdn.net/iamlujingtao/article/details/104647356)
