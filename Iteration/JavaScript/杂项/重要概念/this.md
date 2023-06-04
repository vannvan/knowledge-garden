## 要点
### 方法中的this
```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  }

};

user.sayHi(); // John
```
在这里 user.sayHi() 执行过程中，this 的值是 user。
技术上讲，也可以在不使用 this 的情况下，通过外部变量名来引用它：
```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // "user" 替代 "this"
  }

};
```
但这样操作是不可靠的，如果我们决定将user复制给另外一个变量，例如admin = user，并赋值另外的值给user，那么它可能访问到错误的对象
```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // 导致错误
  }

};

let admin = user;
user = null; // 重写让其更明显

admin.sayHi(); // TypeError: Cannot read property 'name' of null
```
而如果我们采用this.name，代码就能正常运行
### 严格模式
```javascript
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```
以上代码在严格模式下this的值为undefined，而在非严格模式下this会是全剧对象
### this不受限制
在 JavaScript 中，this 关键字与其他大多数编程语言中的不同。JavaScript 中的 this 可以用于任何函数，即使它不是对象的方法。
**this 的值是在代码运行时计算出来的，它取决于代码上下文。**
### 箭头函数没有自己的this
箭头函数有些特别：它们没有自己的 this。如果我们在这样的函数中引用 this，this 值取决于外部“正常的”函数。
```javascript
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);  // Ilya
    arrow();
  }
};

user.sayHi(); // Ilya
```
可以用babel理解箭头函数
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682433277814-b4481469-7fec-42e2-8d07-258785791c9a.png#averageHue=%23fdfdfd&clientId=u49afa054-a976-4&from=paste&height=107&id=u72f54a1b&originHeight=197&originWidth=1637&originalType=binary&ratio=2&rotation=0&showTitle=false&size=26234&status=done&style=none&taskId=u360f8fda-d805-402d-91ab-32dd41d3a98&title=&width=892.5)
### this的指向规则
#### 默认指向
```javascript
function func() {
    console.log( this.a ); // this指向全局对象
}
var a = 2;
func(); //>> 2
```
对于**默认指向**来说，决定this指向对象的并不是**调用位置**是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this会指向undefined，否则this会指向全局对象。
```javascript
function func() {
  "use strict";//函数体处于严格模式下，this指向undefined
  console.log(this.a);
}

var a = "1891";
(function() {
  func(); //>> 报错
})();
```
```javascript
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
#### 隐式指向
函数体内this的指向由调用位置的调用者决定。**如果调用者调用的函数，为某以个对象的方法，那么该函数在被调用时，其内部的this指向该对象**。
```javascript
function func() {
  console.log(this.a);
}
var obj = {
  a: 2,
  func: func
};
obj.func(); //>> 2
// 找到调用位置，由 obj 对象来调用函数func，
// 此时可以说函数func被调用时，obj 对象“拥有”或者“包含”func函数，
// 所以此时的 this 指向调用 func 函数的 obj 对象。
```
**对象属性引用链中只有最顶层或者说最后一层会影响调用位置**，也就是说this指向最终调用函数的对象。这句话可能说得比较拗口，其实简单通俗地说，this指向最靠近被调用函数的对象，离得远的不是。举例来说：
```javascript
function func() {
  console.log(this.a);
}

var obj2 = {
  a: "1891",
  func: func
};

var obj1 = {
  a: "coffe",
  obj2: obj2
};

//此时的 this 指向 obj2 对象，因为obj2离得近！
obj1.obj2.func(); //>> 1891
```
隐式丢失：
```javascript
function func() {
    console.log( this.a );
}

var obj = {
    a: "coffe1891",
    func: func
};

var bar = obj.func; // 间接引用,见本文【壹.2.3.6】。此时bar和obj.func其实
                    // 都指向内存中的函数func本身。
var a = "oops, global"; // a 是全局对象window的属性，也是全局变量
bar(); //>> oops, global

// 虽然 bar 是 obj.func 的一个引用，但是实际上，它引用的是func函数本身，
// 因此此时的 bar() 其实是一个不带任何定语的独立函数调用，应用【默认指向】规则,
// 因此函数体内的this指向window，this.a指向window的属性a（全局变量a）
```
#### 显式指向
JavaScript内置对象Function的三个原型方法call()、apply()和bind()，它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时让this指向这个对象。
```javascript
var a = "makai";

function func() {
    console.log( this.a );
}
var obj = {
    a:"coffe1891"
};

func.call(obj); //>> coffe1891
// 在调用 func 时强制把它的 this 绑定到 obj 上
```
另外，使用bind可以修正SetTimeout和SetInterval的this指向
```javascript
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
        }.bind(this), 1000);//bind
    }
    func2(){
        setInterval(function () {
            console.log(this.num);
        }.bind(this), 2000);//bind
    }
}
var obj = new Obj(1);
obj.func();//>> 1　             输出的是obj.num
obj.func1()//>> setTimeout:1　  输出的是obj.num
obj.func2()//>> 1 1 1 1 ……　    输出的是obj.num
```
#### new操作符指向
在JavaScript 中，**构造函数**只是一些**使用new操作符时被调用的函数**。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能算是一种特殊的类型（class），它们**只是被new操作符调用的普通函数而已**。
使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

- 创建（或者说构造）一个全新的对象；
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
- 执行构造函数中的代码（为这个新对象添加属性、方法等）；
- 如果函数没有返回其他对象，那么返回这个新对象。
```javascript
function func(a) {
    this.a = a;
}
var bar = new func("coffe1891");
console.log(bar.a); //>> coffe1891
// 使用new 来调用func(..)时，我们会构造一个新对象并把它绑定到func(..)调用中的this上
```
### 如何判读this的指向

1. 是否在new中被调用
2. 函数是否通过call，apply，bind显式指向
3. 函数是否被当作某个对象的方法而调用(隐式指向)
4. 如果以上都不是，那就是默认绑定
### 例外情况梳理
#### 被忽略的this
```javascript
function func() {
  console.log(this.a);
}

var a = 2;
func.call(null); //>> 2
                 //this指向了window
```
#### 隐式指向之隐式丢失
**隐式丢失最容易在赋值时发生**；隐式丢失发生时，调用这个函数会应用**默认指向规则**
```javascript
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
箭头函数不遵守this的四种指向规则，而是**根据函数定义时的作用域来决定 this 的指向**。何谓“定义时的作用域”？就是你定义这个箭头函数的时候，该箭头函数在哪个函数里，那么箭头函数体内的this就是它父函数的this。
```javascript
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
## 使用注意点
### 避免多层this
由于this的指向是不确定的，所以切勿在函数中包含多层的this。
```javascript
var o = {
  f1: function () {
    console.log(this);  // 指向o
    var f2 = function () {
      console.log(this); // 指向全局
    }();
  }
}

o.f1()
```
按照正常的业务逻辑，我们的初心肯定不是让this指向global(极少数情况下我们在全局挂了某些方法除外)，因此上面的写法无疑会出现意料之外的效果，虽然我们也可以间接的再通过“that”或其它方法解决这个问题，但不提倡，代码既要让机器明白也要让人明白。
### 避免数组处理方法中使用this
数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。
```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    // let that = this 
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
      // console.log(that.v + ' ' + item);
    });
  }
}

o.f()
```
上面代码中，forEach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。
解决这个问题的一种方法，就是前面提到的，使用中间变量固定this
### 避免在回调函数中使用this
```javascript
var o = new Object();
o.f = function () {
  console.log(this === o);
}

// jQuery 的写法
$('#button').on('click', o.f);
```
上面代码中，点击按钮以后，控制台会显示false。原因是此时this不再指向o对象，而是指向按钮的 DOM 对象，因为f方法是在按钮对象的环境中被调用的。这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。
## 总结
### 描述
`this` 是执行上下文中的一个**属性**，它指向最后一次调用这个方法的对象。在实际开发中，`this` 的指向可以通过以下几种情况判断。

- 默认绑定(非严格模式下 this 指向全局对象，严格模式下函数内的 this 指向undefined)
- 隐式绑定(当函数引用有上下文对象时, 如 obj.foo()的调用方式, foo 内的 this 指向 obj)
- 显示绑定(通过 call 或者 apply 方法直接指定 this 的绑定对象, 如foo.call(obj))
- new 构造函数绑定，this 指向新生成的对象
- 箭头函数，this 指向的是定义该函数时，外层环境中的 this，**箭头函数的 this 在定义时就决定了，不能改变**
### 特点

1. `this` 的值是在代码运行时计算出来的，它取决于代码上下文。
2. 箭头函数没有`this`
## 问题
### 在对象字面量中使用 "this"
```javascript
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // 结果是什么？
```
答案是会报错 Error: Cannot read property 'name' of undefined
这是因为设置 this 的规则不考虑对象定义。只有调用那一刻才重要。
这里 makeUser() 中的 this 的值是 undefined，因为它是被作为函数调用的，而不是通过点符号被作为方法调用。
this 的值是对于整个函数的，代码段和对象字面量对它都没有影响。
所以 ref: this 实际上取的是当前函数的 this。
### 题目2
```javascript
'use strict';
var a = 10; // var定义的a变量挂载到window对象上
function foo() {
  console.log('this1', this); // undefined
  console.log(window.a); // 10
  console.log(this.a); //  报错，Uncaught TypeError: Cannot read properties of undefined (reading 'a')
}
console.log('this2', this); // window
foo();
```
### 题目3
```javascript
let a = 10;
const b = 20;
function foo() {
  console.log(this.a); // undefined
  console.log(this.b); // undefined
}
foo();
console.log(window.a); // undefined
```
### 题目4
```javascript
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a); // 2
  },
  foo2: function () {
    setTimeout(function () {
      console.log(this); // window
      console.log(this.a); // 3
    }, 0);
  }
};
var a = 3;

obj2.foo1();
obj2.foo2();
```


## 资料

- [https://zh.javascript.info/object-methods](https://zh.javascript.info/object-methods)
- [https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.3#yi-.2.3.4-this-de-zhi-xiang-gui-ze](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.3#yi-.2.3.4-this-de-zhi-xiang-gui-ze)
- [https://wangdoc.com/javascript/oop/this](https://wangdoc.com/javascript/oop/this)
