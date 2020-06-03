###  定义

每个函数都包含两个非继承而来的方法：`call()`方法和`apply()`方法。

 `call`和`apply`可以用来**重新定义函数的执行环境**，也就是`this`的指向；`call`和`apply`都是为了改变某个函数运行时的`context`，即上下文而存在的，换句话说，就是为了改变函数体内部`this`的指向。

每个函数都包含两个非继承而来的方法：`call()`方法和`apply()`方法。

 `call`和`apply`可以用来**重新定义函数的执行环境**，也就是`this`的指向；`call`和`apply`都是为了改变某个函数运行时的`context`，即上下文而存在的，换句话说，就是为了改变函数体内部`this`的指向。

### call()

调用一个对象的方法，**用另一个对象替换当前对象**，可以继承另外一个对象的属性，它的语法是：

```js
func.call(thisArg, param1, param2, ...)//func是个函数
```

- `thisArg`：这个对象将代替`Function`类里`this`对象
- `params`：一串参数列表

**说明**：`call`方法可以用来代替另一个对象调用一个方法，`call`方法可以将一个函数的对象上下文从初始的上下文改变为`obj`指定的新对象，如果没有提供`obj`参数，那么Global对象被用于`obj`。

### apply()

和`call()`方法一样，只是参数列表不同，语法：

```
func.apply(thisArg, [param1,param2,...])
```

- `thisArg：这个对象将代替`Function`类里`this`对象
- `argArray`：这个是数组，它将作为参数传给`Function`

### 关于`thisArg`

- `func`的`this`指向`thisArg`对象
- 非严格模式下，若`thisArg`指定为`null`,`undefined`,则`func`的`this`指向window
- 严格模式下，`func`的`this`为`undefined`
- 值为原始值的`this`会指向该原始值的自动包装对象

### 相同点

`call()`和`apply()`方法的相同点就是这两个方法的作用是一样的。都是在特定的作用域中调用函数，等于设置函数体内`this`对象的值，以**扩充函数赖以运行的作用域**。

一般来说，`this`总是指向调用某个方法的对象，但是使用`call()`和`apply()`方法时，就会改变`this`的指向，看个例子：

eg1:

```js
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

console.log(add.call(sub, 2, 1));//3
```

eg2:

```js
function People(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    People.call(this, name, age);
    this.grade = grade;
}

var student = new Student('小明', 21, '大三');
console.log(student.name + student.age + student.grade);//小明21大三
```

### 总结

`call` 和 `apply` 的作用，完全一样，***唯一的区别就是在参数上面。***
`call` 接收的参数不固定，第一个参数是函数体内 `this` 的指向，第二个参数以下是依次传入的参数。
apply接收两个参数，第一个参数也是函数体内 `this` 的指向。第二个参数是一个集合对象（数组或者类数组）

### 再来一个更简单易懂的例子

eg1:

```js
var name  = '小王',age = 17;
var obj = {
    name:"小张",
    objAge:this.age,
    myFun:function(fm,t) {
       	console.log(this.name + '年龄' + this.age)
    }
}
obj.objAge;  // 17
obj.myFun()  // 小张年龄 undefined
```

eg2:

```js
var name = '小李',
function show() {
    console.log(this.name)
}
show() //小李
```

比较一下这两者 this 的差别，第一个打印里面的 this 指向 obj，第二个全局声明的 shows() 函数 this 是 window ；

call，apply，bind都是用来重定义this的指向的，以下面的实例为例就是让 *myfun* 的 *this* 指向 *db* 

```js
var name  = '小王',age = 17;
var obj = {
    name:"小张",
    objAge:this.age,
    myFun:function(fm,t) {
        console.log(this.name + "年龄" + this.age + "来自" + fm + "去往" + t)
    }
}
var db = {
    name:"德玛",
    age:99
}
obj.myFun.call(db,'成都','上海')；　　　　 // 德玛 年龄 99  来自 成都去往上海
obj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海  
obj.myFun.bind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.bind(db,['成都','上海'])();　　 // 德玛 年龄 99  来自 成都, 上海去往 undefined
```

### bind()

```js
func.bind(thisArg, param1, param2, ...)
```

**call/apply与bind的区别**

**执行：**

- call/apply改变了函数的`this`的指向并马上**执行该函数**；
- bind则是返回改变了`this`指向后的函数，**不执行该函数**。

**返回值：**

- call/apply 返回`func`的执行结果；
- bind返回`func`的拷贝，并指定了`func`的`this`指向，保存了`func`的参数

### call() apply() bind()的核心理念：借用方法

A对象有个方法，B对象因为某种原因也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？

当然是借用 A 对象的方法更便捷，既达到了目的，又节省了内存。

### 应用场景

#### 判断数据类型

`Object.prototype.toString`

```js
function isType(data, type) {
  const typeObj = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Function]": "function",
    "[object Date]": "date", // Object.prototype.toString.call(new Date())
    "[object RegExp]": "regExp",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object HTMLDivElement]": "dom", // document.querySelector('#app')
    "[object WeakMap]": "weakMap",
    "[object Window]": "window", // Object.prototype.toString.call(window)
    "[object Error]": "error", // new Error('1')
    "[object Arguments]": "arguments"
  };

  let name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || "未知类型"; // 匹配数据类型
  return typeName === type; // 判断该数据类型是否为传入的类型
}

console.log(
  isType({}, "object"), //>> true
  isType([], "array"), //>> true
  isType(new Date(), "object"), //>> false
  isType(new Date(), "date") //>> true
);
```

#### 类数组对象借用数组的方法

因为类数组不是真正的数组，所以没有数组类型上自带的一些方法，所以我们要去借用数组的方法

```js
//类数组对象
var arrayLike = {
  0: "OB",
  1: "Koro1",
  length: 2
};

Array.prototype.push.call(arrayLike, "添加数组项1", "添加数组项2");

console.log(arrayLike);
//>> {"0":"OB","1":"Koro1","2":"添加数组项1","3":"添加数组项2","length":4}
```

#### apply获取最大值和最小值

apply 直接传递数组做要传递方法的参数，也省一步展开数组，  比如`Math.max`、`Math.min`来获取数组中的最大值或最小值

```js
const arr = [15, 6, 12, 13, 16];

const max = Math.max.apply(Math, arr); // 16

const min = Math.min.apply(Math, arr); // 6
```

#### 继承

```js
// 父类
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']; // 复杂类型

}

supFather.prototype.sayName = function (age) {
    console.log(this.name, 'age');
};

// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}

// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正constructor指向到继承的那个函数上
}

inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, 'foo');
};

// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub("OBKoro1", 24);
const instance2 = new sub("小明", 18);
instance1.colors.push('black')

console.log(instance1);
//>> {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2);
//>> {"name":"小明","colors":["red","blue","green"],"age":18}
```

### bind的应用场景

#### 保存函数参数

一道经典的面试题

```js
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) //>> 6 6 6 6 6
    }, i * 1000);
}
```

造成这个现象的原因是等到`setTimeout`异步执行时,i已经变成6了。如果通过bind在内部返回一个函数，形成闭包，那么每次`i`的变更都会被`bind`保存起来

```js
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) //>> 1 2 3 4 5
    }.bind(null, i), i * 1000);
}
```

#### 回调函数`this`丢失问题

[参见](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.4#6-bind-de-ying-yong-chang-jing)

### 手写实现这三个方法

**实现思路**

- 首先需要设置一个参数`thisArg`,也就是`this`的指向
- 将`thisArg`封装为一个Object
- 通过为`thisArg`创建一个临时方法，这样`thisArg`就可以调用该临时方法的对象了，会将该临时方法的`this`隐式的指向到`thisArg`上
- 执行`thisArg`的临时方法，并传递参数
- 删除临时方法，返回方法的执行结果

```js
Function.prototype.myCall = function(thisArg,...arr) {
  //1.判断函数的合法性
  if(thisArg === null || thisArg === undefined) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }
  //2.搞定this的指向
  const specialMethod = Symbol("anything"); //创建一个不重复的常量
  thisArg[specialMethod] = this 
  let result = thisArg[specialMethod](...arr)

  //3.删除临时方法
  delete thisArg[specialMethod]
  return result
}
```

```js
Function.prototype.myApply = function(thisArg) {
    if (thisArg === null || thisArg === undefined) {
        thisArg = window;
    } else {
        thisArg = Object(thisArg);
    }
    const specialMethod = Symbol("anything");
    thisArg[specialMethod] = this;
    let args = arguments[1] //这里严谨一点的话还需要判断四不四类数组
    if (args) {
        result = thisArg.[specialMethod](...args)
    } else {
        result = thisArg.[specialMethod]()
    }
    delete thisArg[specialMethod]
    return result
}
```

**实现bind**

- 拷贝调用函数 
  - 调用函数，用一个临时变量存储它
  - 只用`Object.create`复制调用函数的propertype给`funcForBind`
- 返回拷贝的函数`funcForBind`
- 调用拷贝的函数`funcForBind`
  - `new`调用判断，通过`instanceof`判断是否通过`new`调用，来决定绑定`context`
  - 通过`call`绑定`this`，传递参数
  - 返回调用函数的执行结果

```js
/**
 * 用原生JavaScript实现bind
 */
Function.prototype.myBind = function(objThis, ...params) {
  const thisFn = this;//存储调用函数，以及上方的params(函数参数)
  //对返回的函数 secondParams 二次传参
  let funcForBind = function(...secondParams) {
    //检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
    const isNew = this instanceof funcForBind;

    //new调用就绑定到this上,否则就绑定到传入的objThis上
    const thisArg = isNew ? this : Object(objThis);

    //用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
    return thisFn.call(thisArg, ...params, ...secondParams);
  };

  //复制调用函数的prototype给funcForBind
  funcForBind.prototype = Object.create(thisFn.prototype);
  return funcForBind;//返回拷贝的函数
};
```

二次传参(secondParams)是说什么?

```js
let func = function(p,secondParams){//其实测试用的func其参数可以是任意多个
    console.log(p.name);
    console.log(this.name);
    console.log(secondParams);
}
let obj={
    name:"1891"
}
func.myBind(obj,{name:"coffe"})("二次传参");
//>> coffe
//>> 1891
//>> 二次传参
```

