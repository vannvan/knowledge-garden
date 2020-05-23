### new 操作符 + Object 创建对象

```js
var person = new Object();
    person.name = "lisi";
    person.age = 21;
    person.family = ["lida","lier","wangwu"];
    person.say = function(){
        alert(this.name);
    }
```

### 字面量创建对象

```js
var person ={
        name: "lisi",
        age: 21,
        family: ["lida","lier","wangwu"],
        say: function(){
            alert(this.name);
        }
    };
```

💛以上两种方法在使用同一接口创建多个对象时，会产生大量重复代码，为了解决此问题，工厂模式被开发。

### 工厂模式

```js
function createPerson(name,age,family) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.family = family;
    o.say = function(){
        alert(this.name);
    }
    return o;
}

var person1 =  createPerson("lisi",21,["lida","lier","wangwu"]);   //instanceof无法判断它是谁的实例，只能判断他是对象，构造函数都可以判断出
var person2 =  createPerson("wangwu",18,["lida","lier","lisi"]);
console.log(person1 instanceof Object);                           //true
```

工厂模式解决了重复实例化多个对象的问题，但没有解决对象识别的问题（但是工厂模式却无从识别对象的类型，因为全部都是Object，不像Date、Array等，本例中，得到的都是o对象，对象的类型都是Object，因此出现了构造函数模式）。

### 构造函数模式

```js
function Person(name,age,family) {
    this.name = name;
    this.age = age;
    this.family = family;
    this.say = function(){
        alert(this.name);
    }
}
var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
var person2 = new Person("lisi",21,["lida","lier","lisi"]);
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof Person); //true
console.log(person1.constructor);      //constructor 属性返回对创建此对象的数组、函数的引用
```

**对比工厂模式有以下不同之处：**

1、没有显式地创建对象

2、直接将属性和方法赋给了 this 对象

3、没有 return 语句

**以此方法调用构造函数步骤：**

1、创建一个新对象

2、将构造函数的作用域赋给新对象（将this指向这个新对象）

3、执行构造函数代码（为这个新对象添加属性）

4、返回新对象 ( 指针赋给变量person ？？？ )

可以看出，构造函数知道自己从哪里来（通过 instanceof 可以看出其既是Object的实例，又是Person的实例）

构造函数也有其缺陷，每个实例都包含不同的Function实例（ 构造函数内的方法在做同一件事，但是实例化后却产生了不同的对象，方法是函数 ，函数也是对象）

### 原型模式

```js
function Person() {}

Person.prototype.name = "lisi";
Person.prototype.age = 21;
Person.prototype.family = ["lida","lier","wangwu"];
Person.prototype.say = function(){
    alert(this.name);
};
console.log(Person.prototype);   //Object{name: 'lisi', age: 21, family: Array[3]}

var person1 = new Person();        //创建一个实例person1
console.log(person1.name);        //lisi

var person2 = new Person();        //创建实例person2
person2.name = "wangwu";
person2.family = ["lida","lier","lisi"];
console.log(person2);            //Person {name: "wangwu", family: Array[3]}
// console.log(person2.prototype.name);         //报错
console.log(person2.age);              //21
```

原型模式的好处是所有对象实例共享它的属性和方法（即所谓的共有属性），此外还可以如代码第16,17行那样设置实例自己的属性（方法）（即所谓的私有属性），可以覆盖原型对象上的同名属性（方法）。

### **混合模式（构造函数模式+原型模式）**

```js
function Person(name,age,family){
    this.name = name;
    this.age = age;
    this.family = family;
}

Person.prototype = {
    constructor: Person,  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
    say: function(){
        alert(this.name);
    }
}

var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
console.log(person1);
var person2 = new Person("wangwu",21,["lida","lier","lisi"]);
console.log(person2);
```

可以看出，混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存。

### 拓展

[动态原型模式、寄生构造函数模式、稳妥构造函数模式创建自定义类型](https://www.cnblogs.com/GreenLeaves/p/5848810.html)

