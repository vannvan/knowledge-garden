##  定义

每个函数都包含两个非继承而来的方法：`call()`方法和`apply()`方法。

 `call`和`apply`可以用来**重新定义函数的执行环境**，也就是`this`的指向；`call`和`apply`都是为了改变某个函数运行时的`context`，即上下文而存在的，换句话说，就是为了改变函数体内部`this`的指向。

每个函数都包含两个非继承而来的方法：`call()`方法和`apply()`方法。

 `call`和`apply`可以用来**重新定义函数的执行环境**，也就是`this`的指向；`call`和`apply`都是为了改变某个函数运行时的`context`，即上下文而存在的，换句话说，就是为了改变函数体内部`this`的指向。

### call()

调用一个对象的方法，**用另一个对象替换当前对象**，可以继承另外一个对象的属性，它的语法是：

```js
Function.call(obj[, param1[, param2[, [,...paramN]]]]);
```

- `obj`：这个对象将代替`Function`类里`this`对象
- `params`：一串参数列表

**说明**：`call`方法可以用来代替另一个对象调用一个方法，`call`方法可以将一个函数的对象上下文从初始的上下文改变为`obj`指定的新对象，如果没有提供`obj`参数，那么Global对象被用于`obj`。

### apply()

和`call()`方法一样，只是参数列表不同，语法：

```
Function.apply(obj[, argArray]);
```

- `obj`：这个对象将代替`Function`类里`this`对象
- `argArray`：这个是数组，它将作为参数传给`Function`

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

