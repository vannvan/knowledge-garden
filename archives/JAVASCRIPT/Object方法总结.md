### create创建一个对象

```js
const obj = Object.create({a:1}, {b: {value: 2}})

第一个参数为对象，对象为函数调用之后返回新对象的原型对象，第二个参数为对象本身的实例方法（默认不能修改,不能枚举）
obj.__proto__.a === 1      // true 

obj.b = 3;
console.log(obj.b)      // 2

//创建一个可写的,可枚举的,可配置的属性p
obj2 = Object.create({}, {
  p: {
    value: 2,       // 属性值
    writable: true,     //  是否可以重写值
    enumerable: true,   //是否可枚举
    configurable: true  //是否可以修改以上几项配置
  }
});

obj2.p = 3;
console.log(obj2.p)     // 3
注意： enumerable 会影响以下
for…in  遍历包括对象原型上属性
Object.keys()   只能遍历自身属性
JSON.stringify  只能序列化自身属性
```

### defineProperty Object.defineProperty(object, prop, descriptor)定义对象属性

```js
添加数据属性
var obj = {};

// 1.添加一个数据属性
Object.defineProperty(obj, "newDataProperty", {
    value: 101,
    writable: true,
    enumerable: true,
    configurable: true
});

obj.newDataProperty    // 101

// 2.修改数据属性
Object.defineProperty(obj, "newDataProperty", {
    writable:false
});

//添加访问器属性
var obj = {};
Object.defineProperty(obj, "newAccessorProperty", {
    set: function (x) {
        this.otherProperty = x;
    },
    get: function () {
        return this.otherProperty;
    },
    enumerable: true,
    configurable: true
});
注意：  1.第一个参数必须为对象
        2.descriptor 不能同时具有 （value 或 writable 特性）（get 或 set 特性）。
        3.configurable 为false 时，不能重新修改装饰器
```

### defineProperties Object.defineProperties(object, {prop1 : descriptor1, prop2 : descriptor2, ...)

```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

### keys 遍历可枚举的属性，只包含对象本身可枚举属性，不包含原型链可枚举属性

```js
let arr = ["a", "b", "c"];
let obj = { foo: "bar", baz: 42 };
let ArrayLike = { 0 : "a", 1 : "b", 2 : "c"};

Object.keys(arr)        // ['0', '1', '2']
Object.keys(obj)        // ["foo","baz"]
Object.keys(ArrayLike)  // ['0', '1', '2']
```

### values 遍历可枚举的属性值，只包含对象本身可枚举属性值，不包含原型链可枚举属性值

```js
let arr = ["a", "b", "c"];
let obj = { foo: "bar", baz: 42 };
let ArrayLike = { 0 : "a", 1 : "b", 2 : "c"};

Object.values(arr)      // ["a", "b", "c"]
Object.values(obj)          // ["bar",42]
Object.values(ArrayLike)    // ["a", "b", "c"]
```

### assign Object.assign( target, source, source1 ) 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）

```js
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2); target // {a:1, b:2, c:3}


特殊情况：
let obj = {a: 1};
Object.assign(obj, undefined) === obj  // true
Object.assign(obj, null) === obj       // true

Object.assign([1, 2, 3], [4, 5])        // [4, 5, 3]

Object.assign方法实行的是浅拷贝，而不是深拷贝。

const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
console.log(obj2.a.b) //2
obj2.a.b = 3
console.log(obj1.a.b) //3
```

### getPrototypeOf 获取指定对象的原型（内部[[Prototype]]属性的值）

```js
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);   // true

注意：Object.getPrototypeOf(Object) 不是 Object.prototype
     Object.getPrototypeOf( Object ) === Function.prototype;  // true
```

### setPrototypeOf 设置一个指定的对象的原型

```js
const obj = {a: 1}, proto = {b:2}

Object.setPrototypeOf(obj, proto)

obj.__proto__ === proto     //true
```

### getOwnPropertyNames 与keys相似，但包含遍历包含不可枚举属性

```js
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});

my_obj.foo = 1;

Object.getOwnPropertyNames(my_obj).sort()   // ["foo", "getFoo"]
```

### getOwnPropertyDescriptor 获取该属性的描述对象

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  { value: 123, writable: true, enumerable: true, configurable: true }
```

### getOwnPropertyDescriptors 返回指定对象所有自身属性（非继承属性）的描述对象

```js
Object.getOwnPropertyDescriptors 方法，返回指定对象所有自身属性（非继承属性）的描述对象。

const obj = {
  foo: 123,
  get bar() { return 'abc' }
};
 
console.dir(Object.getOwnPropertyDescriptors(obj))
//   { foo:{ value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//       bar:{ get: [Function: bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } 
//     }


使用场景：
Object.assign() 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型

Object.create() 方法可以实现上面说的这些，配合getPrototypeOf，以及getOwnPropertyDescriptors实现全面浅拷贝

Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
);
```

### entries 分割对象

```js

const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// array like object
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

//  string
Object.entries('abc')   // [['0', 'a'], ['1', 'b'], ['2', 'c']]

Object.entries(100)   // []
```

### is 它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致

```js
Object.is('foo', 'foo')     // true

Object.is({}, {})           // false

不同于 === 之处
+0 === -0                   //true
NaN === NaN                     // false

Object.is(+0, -0)           // false
Object.is(NaN, NaN)         // true

// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

### preventExtensions 让一个对象变的不可扩展，也就是永远不能再添加新的属性&isExtensible 判断一个对象是否可扩展

```js
let empty = {}

Object.isExtensible(empty)    //true
empty.a = 1             //添加成功
//将对象变为不可拓展
Object.preventExtensions(empty)

Object.isExtensible(empty)    //false

empty.b = 2         //静默失败,不抛出错误

empty.a = 5         //修改a属性值为5  修改成功

总结：
     1.preventExtensions 可以让这个对象变的不可扩展，也就是不能再有新的属性。
    2.需要注意的是不可扩展的对象的属性通常仍然可以被删除。
    3.尝试给一个不可扩展对象添加新属性的操作将会失败，不过可能是静默失败，也可能会抛出 TypeError 异常（严格模式）。        
    4.Object.preventExtensions 只能阻止一个对象不能再添加新的自身属性，仍然可以为该对象的原型添加属性。
```

### seal将一个对象密封 isSealed 判断一个对象是否为密封的

```json
密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。

1. 先讲seal 方法：
var o2 = {b: 1}
o2.d = 2    //添加成功
var obj2 = Object.seal(o2);
obj2 === o2         //true  方法返回原对象，栈指针指向同一块内存
Object.isSealed(o2)   // true

o2.b = 111       //修改b属性值成功


o2.f = 222       //静默失败,属性f没有成功添加
delete o2.b      //静默失败,属性b没有成功删除


2. 讲isSealed 方法：
let o = {};
Object.isSealed(o)    //false

// 之后通过Object.preventExtensions方法将空对象设置为不可扩展。
Object.preventExtensions(o);
Object.isSealed(o)    // true

但是如果为非空对象呢？

let o2 = {a: 1}
Object.preventExtensions(o2);
Object.isSealed(o2)    // false

因为属性 a 是可配置的（configurable为true），所以不是密封的对象，修改方法如下：
let o2 = {a: 1}
Object.preventExtensions(o2);
Object.defineProperty(o2, "a", { configurable: false });
Object.isSealed(o2)    //true


总结： 1.密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。
      2.属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。
      3.但属性的值仍然可以修改。
      4.尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError 异常（严格模式）。
```

### freeze 冻结一个对象&isFrozen 判断一个对象是否已经被冻结

```js
冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。

1.先讲freeze 方法：
let o3 = {a: 1}

o3.b = 2      //添加属性b成功
Object.freeze(o3)

Object.isFrozen(o3)    //true 对象已被冻结

o3.a = 2       //修改属性a值失败
o3.c = 5       //添加属性c失败
delete o3.b   //删除属性b失败

2.再讲isfrozen 方法：

let o4 = {a: 1}

o4.b = 2     // 添加属性b成功
Object.priventExtensions(o4)
Object.defineProperties(o4, {
    a: {configurable: false, writable: false},
    b: {configurable: false, writable: false}
})

Object.isFrozen(o4)    //true o4 已经被冻结


总结：
    1.冻结对象的所有自身属性都不可能以任何方式被修改。
    2.任何尝试修改该对象的操作都会失败，可能是静默失败，也可能会抛出异常（严格模式中）。
    3.数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。
    4.如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。
    
    
浅冻结与深冻结：
(function () {
    obj = {
        internal :{}
    };
    Object.freeze(obj);//浅冻结
    obj.internal.a = "aValue";
    console.log(obj.internal.a);//"aValue"

    //想让一个对象变得完全冻结,冻结所有对象中的对象,可以使用下面的函数.
    function deepFreeze(o){
        var prop,propKey;
        Object.freeze(o);//首先冻结第一层对象
        for(propKey in o){
            prop = o[propKey];
            if(!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
                continue;
            }
            deepFreeze(prop);//递归
        }
    }

    deepFreeze(obj);
    obj.internal.b = "bValue";//静默失败
    console.log(obj.internal.b);//undefined
})();
```

### hasOwnProperty

```js
方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

let o = {a: 1 }

o.hasOwnProperty('a')   //true
o.hasOwnProperty('b')   //false   对象自身没有属性b
o.hasOwnProperty('toString');  //false  不能检测对象原型链上的属性


如何遍历一个对象的所有自身属性，例子：
var buz = {
    fog: 'stack'
};

for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
       console.log("this is fog (" + name + ") for sure. Value: " + buz[name]);
    }
    else {
       console.log(name); // toString or something else
    }
}
```

### isPrototypeOf

```js
isPrototypeOf方法用于测试一个对象是否存在于另一个对象的原型链上

function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

### propertyIsEnumerable指定的属性是否可枚举

```js
obj.propertyIsEnumerable(prop)   prop为被测试的属性名

1. 一般情况下
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';

o.propertyIsEnumerable('prop');   //  返回 true
a.propertyIsEnumerable(0);        // 返回 true


2. 浏览器内置对象
var a = ['is enumerable'];

a.propertyIsEnumerable(0);          // 返回 true
a.propertyIsEnumerable('length');   // 返回 false

Math.propertyIsEnumerable('random');   // 返回 false
this.propertyIsEnumerable('Math');     // 返回 false

3. 自身属性和继承属性
（原型链上propertyIsEnumerable不被考虑）

var fn = function(){
    this.prop = '123';
}

fn.prototype = { prototypeProp: true}

var o = new fn()

o.propertyIsEnumerable('prop')               // true
o.propertyIsEnumerable('prototypeProp')   // false
```

### caller 返回当前函数的调用者

```js
function test(){
    if(test.caller == null){
        alert("JavaScript顶层作用域调用了test()函数");
    }else{
        alert( test.caller + "函数调用了test()函数");
    }
};
test(); // JavaScript顶层作用域调用了test()函数


function callTest(){
    test();
}
callTest(); // function callTest(){ test(); }函数调用了test()函数



function callTest2(){
    // setTimeout()或setInterval()中定时执行的函数也属于顶层作用域调用
    setTimeout(test, 5000); // JavaScript顶层作用域调用了test()函数
}
callTest2();
```

### valueOf 需要返回对象的原始值

```json
备注：js对象中的valueOf()方法和toString()方法非常类似，但是，当需要返回对象的原始值而非字符串的时候才调用它，尤其是转换为数字的时候。如果在需要使用原始值的上下文中使用了对象，JavaScript就会自动调用valueOf()方法。

const o = {a: 1, valueOf: function(){ return 123123 } }
Number(o)    //123123

// 给大家出一个题
const o2 = {
    x: 1,
    valueOf: function(){
        return this.x++
    }
}

if(o2 == 1 && o2 == 2 && o2 == 3){
    console.log('down')
    console.log(o2.x)
}else{
    console.log('faild')
}

// Array：返回数组对象本身
var array = ["CodePlayer", true, 12, -5];
array.valueOf() === array;   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
date.valueOf()     // 1376838719230

// Number：返回数字值
var num =  15.26540;
num.valueOf()     // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
bool.valueOf() === bool    // true
// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
newBool.valueOf() == newBool     // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
newBool.valueOf() === newBool     // false

// Function：返回函数本身
function foo(){ 
}
foo.valueOf() === foo      // true
var foo2 =  new Function("x", "y", "return x + y;");
foo2.valueOf() === foo2    // true

// Object：返回对象本身
var obj = {name: "张三", age: 18};
obj.valueOf() === obj        // true

// String：返回字符串值
var str = "http://www.365mini.com";
str.valueOf() === str       // true
// new一个字符串对象
var str2 = new String("http://www.365mini.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
str2.valueOf() === str2      // false
```

### getOwnPropertySymbols在给定对象自身上找到的所有 Symbol 属性的数组。

```js
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```

### toString toLocalString

```js
toString 方法不做过多介绍
区别：
当被转化的值是个时间对象时，toLocaleString会将转化的结果以本地表示。

(new Date).toString(); //"Mon Nov 06 2017 13:02:46 GMT+0800 (China Standard Time)"

(new Date).toLocaleString();  //"2017/11/6 下午1:03:12"

另外当被转化的值是个时间戳时，toLocaleString会把时间戳每三位添加一个逗号，代码如下。

(Date.parse(new Date())).toLocaleString() //"1,509,944,637,000"

(Date.parse(new Date())).toString() //"1509944643000"
```

