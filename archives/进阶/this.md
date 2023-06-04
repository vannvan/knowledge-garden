![](https://user-gold-cdn.xitu.io/2020/4/21/1719d51548402b0f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `this`的绑定在创建执行上下文时确定，`即在运行时决定而不是在定义时决定`

- 大多数情况函数调用的方式决定`this`的值，`this`在执行时无法赋值

- `this`的值为当前执行的环境对象，非严格下总是指向一个对象，严格下可以是任意值

- 全局环境下`this`始终指向`window`，严格模式下函数的调用没有明确调用对象的情况下，函数内部`this`指向`undefined`，非严格下指向`window`

- 箭头函数的`this`永远指向创建当前词法环境时的`this`

- 作为构造函数时，函数中的`this`指向实例对象

- `this`的绑定只受最靠近调用它的成员的引用

- 执行上下文在被执行的时候才会创建，创建执行上下文时才会绑定`this`，所以`this`的指向永远是在执行时确定

[详解](https://juejin.im/post/5e9f0bdce51d4546f5791989#heading-30)

### this 绑定规则

#### 1.默认绑定

```js
function foo() {
    console.log(a);
}
var a = 2;
foo(); // 2
```

在这里this指向全局作用域，因为函数的调用位置实在全局作用域中，像`foo()`这种不带任何修饰的函数引用进行调用时，只能使用默认绑定，这也是最常见的独立函数调用

**对于默认绑定来说，决定`this`指向的不是调用位置是否处于严格模式，而是函数体是否处于严格模式，如果函数体处于严格模式，`this`会指向`undefined`** 

```js
function func() {
  "use strict";//函数体处于严格模式下，this指向undefined
  console.log(this.a);
}

var a = "1891";
(function() {
  func(); //>> 报错
})();
```

```js
function func() {
  console.log(this.a);
}

var a = "1891";
(function() {
  "use strict";
  func(); //>> 1891
  //这里输出 1891 而不是报错，是因为严格模式下，this的指向与func的调用位置无关
})();
```

还有一种默认绑定规则是在`SetTimeout`或`SetInterval`结合使用时。代码示例如下

```js
var num = 0;
class Obj {
    constructor(num){
        this.num = num;
    }
    func(){
        console.log(this.num);
    }
    func1(){
        setTimeout(function () {
            console.log("setTimeout:"+this.num);
        }, 1000)
    }
    func2(){
        setInterval(function () {
            console.log(this.num);
        }, 2000)
    }
}
var obj = new Obj(1);
obj.func();//>> 1　             输出的是obj.num
obj.func1()//>> setTimeout:0　  输出的是window.num
obj.func2()//>> 0 0 0 0 ……　    输出的是window.num
```

```js
let a = 10
const b = 20

function foo () {
  console.log(this.a) //undefined
  console.log(this.b) //undefined
}
foo();
console.log(window.a) //undefined
```

#### 2.隐式绑定

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

当函数调用位置周围有上下文对象时，隐式绑定会把函数中的`this`绑定到这个上下文对象。换句话说，在这里我们在`obj`对象中调用了`foo()`函数，调用位置正好处于`obj`对象中，因此隐式绑定把函数中的`this`绑定到了`obj`对象上。

一连串的函数调用会有函数调用栈，那么函数包含在一连串的对象中时，属于`对象调用链`

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

这里是因为对象属性链中只有第一层在调用位置中起作用，换句话说，函数调用位置只在第一层对象中绑定。`foo()`最开始是在`obj2`被调用的，因此`this`绑定到了`obj2`上，接着`obj2`中的`foo`属性又在`obj1`中调用了，但是此时我们已经不再考虑后面的`this`绑定了，因为`this`的绑定已经终结在了第一层。

**以上示例总结：对象属性引用链中只有最顶层或者说最后一层会影响调用位置**，简单通俗地说，`this`指向最靠近被调用函数的对象，离得远的不是。

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

首先在这里我们创建了一个`bar`全局变量，并且把`obj`中的`foo`属性传递给了它，由于`foo`属性对应一个函数，因此 var bar = obj.foo 相当于把foo`(...)`这个函数传给了`bar`，当我们再调用`bar`时，其实是一个不带任何修饰的函数调用，因此应用了默认绑定，这时隐式绑定就丢失了。

#### 3.显式绑定

我们希望`this`绑定在哪个对象上我们就用方法绑定它，具体可以使用`call()`、`apply()`、`bind()`达到这个效果，需要注意的是一旦我们显式绑定过就无法再绑定了

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

#### 4.new 绑定

```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
```

首先，创建了一个新的对象bar，当使用new来调用`foo(..)`函数时，我们会把bar对象中的this绑定在`foo(...)`函数中，因此这里bar对象中的a指向`foo(..)`函数中的a，所以输出是2。

**使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作**

> 1. 创建（或者说构造）一个全新的对象
> 2. 将构造函数的作用域赋给这个全新的对象（因此`this`就指向了这个新的对象）
> 3. 执行构造函数中的代码（为这个新的对象添加属性和方法等）
> 4. 如果函数没有其他对象，那么返回这个新对象

### 绑定优先级

#### 隐式绑定VS显式绑定

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

#### new绑定VS隐式绑定

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

#### new绑定VS显式绑定

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

### 如何通过规则判断this的指向

#### 函数是否在`new`中被调用的

```js
function func(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  };
}

var obj = new func("coffe"); //this会指向obj
console.log(obj.getName()); //>> coffe
```

#### 函数是否通过`call`、`apply`、`bind`显式指向

如果是的话，**this**指向的是call、apply、bind三个方法的`第一个参数`指定的对象。

```js
var obj1 = {
  name: "coffe"
};
function func() {
  return this.name; //这里的this本来指向window
}
var str = func.call(obj1); //改变了func函数里面this的指向，指向obj1
console.log(str); //>> coffe
```

#### 函数是否被当作某个对象的方法被调用（隐式）

```js
var obj1 = {
  name: "coffe",
  func() {
    return this.name; //指向obj1
  }
};

//这里的obj1.func()，表明func函数被obj1调用，因此func中的this指向obj1
console.log(obj1.func()); //>> coffe
```

#### 若以上都不是使用默认绑定

如果在严格模式下，j就绑定到`undefined`，否则就绑定到全局window/global

### 几个例外的情况

#### 被忽略的this

`null` 或者`undefined`作为`this`指向的对象传入`call`、`apply`或者`bind`，这些值在调用时会被忽略，实际应用的是**默认指向规则**。

```js
function func() {
  console.log(this.a);
}

var a = 1;
func.call(null); //>> 1
                 //this指向了window
```

#### 间接引用

接引用最容易在赋值时发生；间接引用时，调用这个函数会应用**默认指向规则**。

```js
function func() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, func: func };
var p = { a: 4 };
o.func(); //>> 3
(p.func = o.func)(); //>> 2
// 赋值表达式 p.func=o.func 的返回值是目标函数的引用，也就是 func 函数的引用
// 因此调用位置是 func() 而不是 p.func() 或者 o.func()
```

#### 箭头函数

箭头函数不遵守以上四种绑定规则，而是根据**函数定义时的作用域来决定的`this`的指向** 

```js
function func() {
  // 返回一个箭头函数
  return a => {
    //this 继承自 func()
    console.log(this.a);
  };
}
var obj1 = {
  a: 2
};
var obj2 = {
  a: 3
};

var bar = func.call(obj1);
bar.call(obj2); //>> 2         不是 3 ！

// func() 内部创建的箭头函数会捕获调用时 func() 的 this。
// 由于 func() 的 this 绑定到 obj1， bar（引用箭头函数）的 this 也会绑定到 obj1，
// this一旦被确定，就不可更改，所以箭头函数的绑定无法被修改。（new 也不行！）
```

