

### JS的6个"假"值

> `null`  `false`  `undefined`  `0`  `''(空字符串)`  `NaN`

### typeof的结果

```js
typeof(null) //"object"
typeof(undefined) //"undefined"
typeof(NaN) //"number"
typeof(0) // "number"
typeof('aaa') //"string"
typeof(function fn(){}) //"function"
typeof(false) //"boolean"
typeof({}) //"object"
typeof(new Date()) //"object"
typeof(new String('a')) //"object"
```

### number排序

```js
const sortNumbers = (...numbers) => numbers.sort();   //排序,只适合正数
[1,2,3,4].sort((a, b) => a - b); // [1, 2,3,4],默认是升序
[1,2,3,4].sort((a, b) => b - a); // [4,3,2,1] 降序
```

###  一维数组去重思路

```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
-----------------------------------
const set = new Set([1, 2, 3, 4, 4]);
[...set]
//[1,2,3,4]
-----------------------------------
[...new Set('ababbc')].join('')
-----------------------------------
// 数组去重
[...new Set(arr)]
-----------------------------------
let arr = [1, 2, 2, 3, 4, 5, 5, 6];
let newArr =Array.from(new Set(arr)) 
console.log(newArr)
// "abc"
```

### 数组对象去重

```js
const uniqueElementsBy = (arr, fn) =>arr.reduce((acc, v) => {if (!acc.some(x => fn(v, x))) acc.push(v);return acc;}, []);

uniqueElementsBy([{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}, {id: 1, name: 'Jhon'}], (a, b) => a.id == b.id)
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]
```

### 生成连续数组

```js
//有起始
function generateArray (start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start)
}
//有最大值
[...new Array(10).keys()]    //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Array.from({length:10},(item, index)=> index+1)  //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 删除数组一个元素

```js
const deleteFromArr = (arr, item) => {
  let index = arr.indexOf(item);
  return index !== -1 && arr.splice(index, 1);
};
deleteFromArr(arr, n);
```

### 根据条件删除数组元素

```js
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
dropElements([1, 2, 3, 4], n => n >= 3); // [3,4]
```

### 删除数组指定值（改变原数组）

使用 `Array.filter()` 和 `Array.includes()` 来剔除指定的值。使用 `Array.length = 0` 将数组中的长度重置为零，并且通过 `Array.push()` 只使用 pulled 值重新填充数组。

```js
const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray, 'a', 'c'); // myArray = [ 'b', 'b' ]
```

### 获取日期组合

创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合

```js
// 创建过去七天的数组
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
```

### 生成随机ID，随机字符串

substring() 的第二个参数控制取多少位 (最多可取13位)

```js
// 生成长度为11的随机字母数字字符串
    Math.random().toString(36).substring(2);
// hg7znok52x
```

### 生成指定范围随机数

```js
/**
 * @param { number } min 
 * @param { number } max 
 */
export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

### 获取URL的查询参数

```js
?foo=bar&baz=bing => {foo: bar, baz: bing}
// 获取URL的查询参数
q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
```

### 本地时间

```js
// 创建本地时间
<body onload="setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,19))"></body>
```

### 返回当前24小时制时间的字符串

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // "08:38:00"
console.log(getColonTimeFromDate(new Date()).replace(/:/g,'-'))    // 10-12-13   替换：为 -
```

### 数组混淆

随机更改数组元素顺序，混淆数组

```js
// 随机更改数组元素顺序，混淆数组
(arr) => arr.slice().sort(() => Math.random() - 0.5)
/* 
let a = (arr) => arr.slice().sort(() => Math.random() - 0.5)
let b = a([1,2,3,4,5])
console.log(b)
*/
```

### 数组清空

```js
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]
```

### 解构交换赋值

```js
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

### 数组解构赋值

```js
var arr = ['bob',29,'student']

const [name,age,type] = arr 

// name => bob
```

### 解构赋值综合

```js
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
//对象解构
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
//结构别名
const obj = {
  name: 'bob',
  age: 22
}
const { name: userName, age: userAge } = obj;
console.log(userName, userAge); // bob 22
// Stage 4（已完成）提案中的特性
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
//传给函数的参数
const person = {
  name: 'bob',
  age: 22
}
function introduce({ name, age }) {
  console.log(`我是 ${name} ，今天 ${age} 岁了!`);
}
console.log(introduce(person));// 我是 bob ，今天 22 岁了!
```

### 对象 和数组转换

```js
Object.keys({name:'张三',age:14}) //['name','age']
Object.values({name:'张三',age:14}) //['张三',14]
Object.entries({name:'张三',age:14}) //[[name,'张三'],[age,14]]
Object.fromEntries([name,'张三'],[age,14]) //ES10的api,Chrome不支持 , firebox输出{name:'张三',age:14}
```

### 生成随机十六进制代码（生成随机颜色）

使用JavaScript简洁代码生成随机十六进制代码

```js
// 生成随机十六进制代码 如：'#c618b2'
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"
```

### filter() 过滤不符合项

```js
let arr = [1,2,3]
let newArr = arr.filter(item => item>=3)  
console.log(newArr)
```

### filter() 去掉空字符串、undefined、null

```js
let arr = ['','1','2',undefined,'3.jpg',undefined]
let newArr = arr.filter(item => item)
console.log(newArr)
```

### filter 过滤空值：undefined、null、""、0、false、NaN

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

### filter过滤数组空位

```js
[1,2,3,4,5,,6,,7].length //9
[1,2,3,4,5,,6,,7].filter(el=> el).length //7
```

### filter() 数组去重

```js
let arr = [1, 2, 2, 3, 4, 5, 5, 6];
let newArr = arr.filter((x, index,self)=>self.indexOf(x)===index) 
console.log(newArr)
```

### set数组去重

```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

const distinctValuesOfArray = arr => [...new Set(arr)];
distinctValuesOfArray([1, 2, 2, 3, 4, 4, 5]); // [1,2,3,4,5]
```

### filter() 筛选数组对象

```js
let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ]
console.log(arr.filter(item => item.a=== '苹果' ))//[{a:'苹果',b:'面包',c:'吃'},{a:'苹果',b:'香蕉',c:'不吃'}]
```

### map数组映射  // from 也可以

```js
var users = [
{ name : "Yagyu",weapon:"shuriken"},
{ name : "Yoshi",weapon:"katana"},
{ name : "Kuma",weapon:"wakizashi"}
];
const mapUsers = users.map(obj => obj.name)  // [ 'Yagyu', 'Yoshi', 'Kuma' ]
const fromUsers = Array.from(users, ({name}) => name)  // [ 'Yagyu', 'Yoshi', 'Kuma' ]
```

### window.location.search 转 JS 对象

```js
//`https://www.baidu.com?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907`
const searchObj = search => JSON.parse(`{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
let search = '?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907'
let obj = searchObj(search)
{
  ie: 'utf-8',
  f: '8',
  rsv_bp: '1',
  rsv_idx: '1',
  tn: 'baidu',
  wd: 'js',
  rsv_pq: 'a86b5e5f0007bceb',
  rsv_t: '1e1fAVan+VlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50',
  rqlang: 'cn',
  rsv_enter: '0',
  inputT: '1287',
  rsv_sug3: '5',
  rsv_sug1: '3',
  rsv_sug7: '101',
  rsv_sug2: '0',
  rsv_sug4: '1907'
}
```

### 直接获取location.search某参数

```js
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=yajun&sex=female"
params.has("yajun"); // true
params.get("sex"); // "female"
```

### JS 对象转 url 查询字符串

```js
const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
objectToQueryString({name: 'Jhon', age: 18, address: 'beijing'})
// name=Jhon&age=18&address=beijing
```

### 一维数组交集

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
```

### 二维对象数组交集/差集

```js
let a = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' }
];
 
let b = [
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' }
];
 
const c = (arr1, arr2, id) => {
    let arr = [];
    for(let item of arr1){
        if(arr2.find(v => v[id] === item[id])) {
        	arr.push(item);
        }
    }
    return arr;
}
const d = (arr1, arr2, id) => {
    let arr = [];
    for(let item of arr1){
        if(arr2.find(v => v[id] === item[id])) {
            continue;
        }
        	arr.push(item);
    }
    return arr;
}
console.log(c(a, b, 'id'));  //交集
console.log(d(a, b, 'id'));  //差集
```

### 二维纯数组交集

```js
//方法1
const similar = function(arrs) {
	  var arr = arrs.shift(); 
	  for(var i=arrs.length;i--;){
	     var p = {"boolean":{}, "number":{}, "string":{}}, obj = [];
	     arr = arr.concat(arrs[i]).filter(function (x) {
	       var t = typeof x;
	       return !((t in p) ? !p[t][x] && (p[t][x] = 1) : obj.indexOf(x) < 0 && obj.push(x));
	     });
	     if(!arr.length) return null; 
	  }
	  return arr;
}
//方法2
const similar = function getTheSame(arr) {
  return arr.reduce(function(a, b) {
    return a.filter(function(item) {
      return b.includes(item);
    });
  });
}

console.log(similar([[1,2,3,5], [2,3,4], [2,3], [2,3,6,7]]))  //[2,3]
console.log(similar([[0,1,2,3,5],[-1,1,4,5,6,7],[1,2,3,5,6]])) //[1,5]
```

### 两（yyyy-MM-dd）日期时间差

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); 
// 9
```

### 判断dom是否有某个className

```js
const  hasClass = (el, className) => new RegExp(`(^|\\s)${className}(\\s|$)`).test(el.className);
```

### 是否为空数组

```js
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true
```

### 是否为数组

```js
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

### 数组首部插入成员

```js
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
// arr => [0, 1, 2]
```

### 统计数组成员个数

```js
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, c) => {
    t[c] = t[c] ? ++ t[c] : 1;
    return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

### 是否为空对象

```js
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true
```

### isType

```js
let isType = type => obj => {
  return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}

isType('String')('123');		// true
isType('Array')([1, 2, 3]);	// true
isType('Number')(123);			// true

```

### 多重三元

```js
export function toString (val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

//解析
export function toString (val: any): string {
  return 当变量值为 null 时
    ? 返回空字符串
    : 否则，判断当变量类型为 object时
      ? 返回 JSON.stringify(val, null, 2)
      : 否则 String(val)
}
```

### Object.is()判断两个值是否相等

```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

### 判断数据类型

> undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap

```js
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("yajun"); // "string"
DataType(19941112); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

### 判断是否null或undefined

```js
const isNil = val => val === undefined || val === null;

isNil(null); // true
isNil(undefined); // true
```

### 验证是否有效数字

```js
const isValidNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n;
```

### 验证是否json字符串

```js
const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
```

### 对象字面量(获取环境变量时必用此方法)

```js
const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"
```

### 对象变量属性(可变属性名1)

```js
const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

### 动态属性名(可变属性名2)

```js
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
console.log(user); // outputs { name: "John", email: "john@doe.com" }
```

### 有条件的对象属性

```js
nst getUser = (emailIncluded) => {
  return {
    name: 'John',
    surname: 'Doe',
    ...emailIncluded && { email : 'john@doe.com' }
  }
}

const user = getUser(true);
console.log(user); // outputs { name: "John", surname: "Doe", email: "john@doe.com" }

const userWithoutEmail = getUser(false);
console.log(userWithoutEmail); // outputs { name: "John", surname: "Doe" }

```

### 对象匹配赋值 ，obj2属性值来自obj1相同属性的值

```js
var obj1 = {
    name:'bob',
    age:21,
    gender:1,
    hobby:'song'
}
var obj2 = {
    name:'',
    age:''
}
Object.keys(obj1).forEach((key) => {
    if(key in obj2) {
        obj2[key] = obj1[key]
    }
})
console.log(obj2)
//{ name: 'bob', age: 21 }
//在确定需要哪些属性值的情况下，针对属性值数量上的不同可以采取解构赋值的方法
let obj3 = { name:userName,age } = obj1
console.log(userName)  //bob
console.log(age)  //21
let obj4 = {...obj1,isLogin:false}  //浅拷贝并添加新属性 
//{ name: 'bob', age: 21, gender: 1, hobby: 'song', isLogin: false }
let {hobby,...filterInfo} = obj1 //去除hobby
console.log(filterInfo)  //{ name: 'bob', age: 21, gender: 1 }
```

### 删除对象无用属性（扩展运算符）

```js
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```

### es6隐式返回值

```js
const Func = function(name) {
    return "I Love " + name;
};
// 换成
const Func = name => "I Love " + name;
```

### 检测非空参数

创建方法时方式使用者忽略掉必要的参数

```js
function IsRequired() {
    throw new Error("param is required");
}
function Func(name = IsRequired()) {
    console.log("I Love " + name);
}
Func(); // "param is required"
Func("雅君妹纸"); // "I Love 雅君妹纸"
```

### 优雅处理错误信息

```js
try {
    Func();
} catch (e) {
    location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}
```

### 优雅处理Async/Await参数

```js
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());
```

### 存取LocalStorage：反序列化取，序列化存(JSON)

```js
const love = JSON.parse(localStorage.getItem("love"));
localStorage.setItem("love", JSON.stringify("I Love 雅君妹纸"));
```

### 自调用函数

```js
(function(){
    // 置于此处的代码将自动执行
})();  
(function(a,b){
    var result = a+b;
    return result;
})(10,20)
```

### 从数组种随机获取成员

```js
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
var randomItem = items[Math.floor(Math.random() * items.length)];
```

###  字符串去空格

```js
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
```

### 获取数组最大/最小值

```js
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);

const maxElementsFromArray = (array, number = 1) => [...array].sort((x, y) => y -x).slice(0, number)

// 事例
maxElementsFromArray([1, 2, 3, 4, 5]) // [5]

maxElementsFromArray([7, 8, 9, 10, 10], 2) // [10, 10]
```

### 不要直接从数组中delete或remove元素

###  精确到指定位数的小数

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(1.345, 2)                 // 1.35
round(1.345, 1)                 // 1.3
```

### 数字补零操作

```js
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart( len   , '0')
addZero1(3) // '03'
addZero2(32,4)  // '0032'
```

### 统计数组中相同项的个数

```js
var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
```

### 接收函数返回的多个结果

```js
async function getFullPost(){
  return await Promise.all([
     fetch('/post'),
     fetch('/comments')
  ]);
}
const [post, comments] = getFullPost();
```

### 将数组平铺到指定深度

```js
const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
flatten([1, [2], 3, 4]);                             // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);           // [1, 2, 3, [4, 5], 6, 7, 8]
```

### 数组扁平化

```js
let arr = [1,2,3,[4,5,6,[7,8]]]
let arrStr  = JSON.stringgify(arr)
arr.flat(Infinity)   //  [1, 2, 3, 4, 5, 6, 7, 8]
arrStr.replace(/(\[|\])/g,'').split(',')  //  [1, 2, 3, 4, 5, 6, 7, 8]
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray())) {
  ary = [].concat(...ary);
}
```

### reduce求和

```js
result = [
    {subject: 'math',score: 88},
    {subject: 'chinese',score: 95},
    {subject: 'english',score: 90}
];
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
```

### reduce求和1

```js
let shoppingCart = [
  { productTitle: "Product 1", amount: 10 },
  { productTitle: "Product 2", amount: 30 },
  { productTitle: "Product 3", amount: 20 },
  { productTitle: "Product 4", amount: 60 }
];

const sumAmount = (currentTotalAmount, order) => currentTotalAmount + order.amount;
const getTotalAmount = (shoppingCart) => shoppingCart.reduce(sumAmount, 0);
getTotalAmount(shoppingCart); // 120
```

### eval对一维数组求和的骚操作

```js
eval(arr.join("+"))
```

### 数组中某元素出现次数

```js
function countOccurrences(arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
}

let arr = [1,2,3,4,1,2,4]
countOccurrences(arr, 1) // 2
```

### 数组分页算法

```js
data.slice([每页数据量 *（当前页码 - 1）, 每页数据量 *（当前页码 - 1） + 每页数据量])
```

### 根据数组中某一属性排序

```js
// 本例根据publishTime排序
let data = [
{
  id: 1,
  publishTime: "2019-05-14 18:10:29"
},
{
  id: 2,
  publishTime: "2019-05-14 18:17:29"
},
{
  id: 3,
  publishTime: "2019-05-14 15:09:25"
}]

data.sort((a, b) => b.publishTime - a.publishTime);

// 0: {id: 2, publishTime: "2019-05-14 18:17:29"}
// 1: {id: 1, publishTime: "2019-05-14 18:10:29"}
// 2: {id: 3, publishTime: "2019-05-14 15:09:25"}
```

### 对象合并

```js
//ES6方法
let obj1 = {
    a:1,
    b:{
        b1:2
    }
}

let obj2 = {
    c:3,
    d:4
}
console.log({...obj1, ...obj2}) // {a: 1, b: {…}, c: 3, d: 4}
// Obj.assign()：可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
let o1 = { a: 1 };
let o2 = { b: 2 };

let obj = Object.assign(o1, o2);
console.log(obj); // { a: 1, b: 2 }
console.log(o1);  // { a: 1, b: 2 }, 且 **目标对象** 自身也会改变（也就是assign第一个对象）
console.log(o2); // { b: 2 } 不改变

// 备注：Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值
// 备注：数组合并用 concat() 方法
```

### 对象数组每一项添加新属性

```js
var arry= [{a:11,b:22,c:33,d:44},{a:11,b:0,c:0,d:44},{a:11,b:22,c:99,d:99}];
var arry2=[];
arry.map(((item, index)=> {
arry2.push(Object.assign({},item,{mess1:item.c,mess2:item.d}))
}))
// arry2 -> [{"a":11,"b":22,"c":33,"d":44,"mess1":33,"mess2":44},{"a":11,"b":0,"c":0,"d":44,"mess1":0,"mess2":44},{"a":11,"b":22,"c":99,"d":99,"mess1":99,"mess2":99}]
var users = [
{ name : "Yagyu",weapon:"shuriken"},
{ name : "Yoshi",weapon:"katana"},
{ name : "Kuma",weapon:"wakizashi"}
];
const addNewArgs = users.map((el,index) => {
	return Object.assign(el,{age:20})
})
//addNewArgs -> [{ name: 'Yagyu', weapon: 'shuriken', age: 20 },{ name: 'Yoshi', weapon: 'katana', age: 20 },{ name: 'Kuma', weapon: 'wakizashi', age: 20 }]
```

### 根据键值将一个对象的值映射到另一个数组对象中

```js
var obj ={
  apple: 1,
  banana:2,
  li:30
}
var arr = [
  {id:'1',text:'苹果',key:'apple', value:''},
  {id:'2',text:'梨', key:'li',value:''},
  {id:'3',text:'香蕉', key:'banana', value:''}
]

const newArr = arr.map(o => {
  o.value = obj[o.key]
  return o
})
```

### 根据索引将一个数组的值映射到另一个数组对象中

```js
var arr = [
  {id:'1',text:'苹果',key:'apple', value:''},
  {id:'2',text:'梨', key:'li',value:''},
  {id:'3',text:'香蕉', key:'banana', value:''}
]

var arr1 = [1,2,1]
arr.map((el,index)=>{
	el.value = arr1[index]
})
```

### 将一个对象数组数据拿出来变成另一个对象

```js
var arry= [{a:11,b:22,c:33,d:44},{a:11,b:0,c:0,d:44},{a:11,b:22,c:99,d:99}];
var arry2=[];
arry.map(((item, index)=> {
arry2.push(Object.assign({},{mess1:item.c,mess2:item.d}))
}))
//  arry2 ->   [{"mess1":33,"mess2":44},{"mess1":0,"mess2":44},{"mess1":99,"mess2":99}]
```

### 对象中属性个数

```js
let obj = {name: '朱昆鹏', age: 21}

// ES6
Object.keys(obj).length // 2

// ES5
let attributeCount = obj => {
    let count = 0;
    for(let i in obj) {
        if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
            count++;
        }
    }
    return count;
}

attributeCount(obj) // 2
```

### ob j?.attribute判断对象及对象属性有效性 (可选链)

```js
let obj = {
  name:"bob",
  age:22
}
obj?.name //bob
let obj1 = null //假设obj1是对象之外的其他任何类型
obj1?.name // undefined 	而直接使用obj1.name 会报错



// 变体 ?.() ?.[]
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

user1.admin?.(); // I am admin
user2.admin?.();

----------------------
let user1 = {
  firstName: "John"
};

let user2 = null; // 假设，我们不能授权此用户

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined

//还可以将?.和delete一起使用
delete user?.name; // 如果 user 存在，则删除 user.name

//可选链可以安全的读取和删除属性，但是不能写入
let user = null;

user?.name = "John"; // Error，不起作用
// 因为它在计算的是 undefined = "John"
```

### 全屏

```js
//进入全屏
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

launchFullscreen(document.documentElement) // 整个页面进入全屏
launchFullscreen(document.getElementById("id")) //某个元素进入全屏
//退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

exitFullscreen()
//全屏事件
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    console.log('进入全屏')
  } else {
    console.log('退出全屏')
  }
})
```

### 获取滚动条位置

```js
function getScrollPosition(el = window) {
  return {
    x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
  }
}

getScrollPosition() // {x: 0, y: 692}
```

### 检测设备类型

```js
const detectDeviceType = () =>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

detectDeviceType() // "Desktop"
```

### 防抖

```js
//适应大部分场景普通防抖
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}

debounce(fn) // 使用

//可配置时间防抖
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

//第一次立即执行，之后开始防抖
// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
      
      	// ------ 新增部分 start ------ 
      	// immediate 为 true 表示第一次触发后执行
      	// timer 为空表示首次触发
        if (immediate && !timer) {
            fn.apply(this, args)
        }
      	// ------ 新增部分 end ------ 
      	
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true)
// 第一次触发 scroll 执行一次 fn，后续只有在停止滑动 1 秒后才执行函数 fn
document.addEventListener('scroll', betterFn)
```

### 节流

```js
//适应大部分场景普通节流
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}

throttle(fn) // 使用

//可配置时间节流
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}
```

### 计算函数执行时间

```js

const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
```

### 去除空格（多种形式）

```js
/**
 * trim 去除空格
 * param1  string str 待处理字符串
 * param2  number type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 * return  string str 处理后的字符串
 */
function trim(str, type = 1) {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
        case 1:
            return str.replace(/\s/g, "");
        case 2:
            return str.replace(/(^\s)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s)/g, "");
        case 4:
            return str.replace(/(\s$)/g, "");
        default:
            return str;
    }
}
```

### 连字符/驼峰互转

```js
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
//camelize('aa-bb') // aaBb

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
	
```

### 随机16进制颜色

```js
function hexColor() {
    let str = '#';
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
        let index = Number.parseInt(Math.random() * 16);
        str += arr[index]
    }
    return str;
}
```

### 随机RGB颜色

```js
function RandomColor() {
           let r, g, b;
           r = Math.floor(Math.random() * 256);
           g = Math.floor(Math.random() * 256);
           b = Math.floor(Math.random() * 256);
           return "rgb(" +r + ',' +g+ ',' +b+ ")";
}
```

### 统计指定文字出现次数

```js
/**
 * 关键词统计：统计一段文字中指定文字出现次数 keywordsCount
 * param1 string text 进行统计的文本
 * param2 string keywords 进行统计的关键词
 * return number count 关键词出现次数
 * tip:param1 document.body.innerText--全文统计
 */

function keywordsCount(text, keywords) {
    return text.split(keywords).length - 1
}
```

### 获取数组第N个元素

```js
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'
```

### 返回数组指定元素的所有索引

```js
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```

### 设置CSS样式

```js
const setStyle = (el, ruleName, val) => (el.style[ruleName] = val);
setStyle(document.querySelector('p'), 'font-size', '20px'); // The first <p> element on the page will have a font-size of 20px
```

### 获取CSS样式

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
getStyle(document.querySelector('p'), 'font-size'); // '16px'
```

### 切换元素样式类

```js
const toggleClass = (el, className) => el.classList.toggle(className);
toggleClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```

### 确保函数只被调用一次

使用一个闭包，使用一个成为 `called` 的标志，并在第一次调用该函数时将其设置为 `true` ，以防止它被再次调用。 为了允许函数改变它的 `this` 上下文（比如在一个事件监听器中），必须使用`function` 关键字，并且提供的函数必须应用上下文。 允许使用 rest（剩余）/spread（展开） (`...`) 运算符为函数提供任意数量的参数。

```js
const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};
//eg
const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp)); // only runs `startApp` once upon click
```

### 初级表单验证

```js
[
    { selector: '#type', msg: '请选择请假类别' },
    { selector: '#start_datetime_picker', msg: '请选择开始日期' }
    // ...
].some(function (item) {
    if ($(item.selector).val() == "") {
        $.toast(item.msg)
        return true;
    }
});
```

### 查看网页布局

```js
//控制台  
$$('*').forEach(a=>{a.style.outline='1px solid red'})
```

### `find()`  `findIndex()`  `some()`  `includes()`

```js
const array = [{ id: 1, checked: true }, { id: 2 }];
arr.find(item => item.id === 2) // { id: 2 }
arr.findIndex(item => item.id === 2) // 1
arr.some(item => item.checked) // true
[1,2,3,''].some(item => !item)   //true //用于查找数组中是否有空值
const numberArray = [1,2,3,4];
numberArray.includes(2) // true
```

### `promise` and `await`

```js
async function getItems() {
  try {
    const user = await getUser();
    const order = await getOrderByUser(user);
    const items = await getOrderItemsByOrder(order);
    return items;
  } catch(err) {
    // 在这里处理错误，建议返回某个值或者重新抛出错误
  }
}

getItems().then(items => {
  // 处理排序后的成员
})
```

### `export` 模块

```js
// math.js

export function add(a,b) { return a + b; }
export function sub(a,b) { return a - b; }

export default mult(a,b) => a * b;

// main.js
import mult, { add, sub } from './math';

mult(2, 4) // 8
add(1,1)   // 2
sub(1,2)   // -1
```

### 屏蔽生产环境的console.log

```js
console.log=function(){}
```

### 平滑滚动至页面指定位置

```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
  
smoothScroll('#fooBar'); 
smoothScroll('.fooBar'); 
```

### h5 滚动至页面顶部，全面兼容

```js
const scrollToTop = () => {
    let scrollTop = document.documentElement.scrollTo || document.body.scrollTop
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollTop)
        window.scrollTop(0, scrollTop - scrollTo / 8)
    }
}
```

### 访jquery链式操作css html

```js
function $ (option) {
    var t = typeof(option)
    if (t == 'function') {
        window.onload = option
    } else if (t.toLowerCase() == 'string') {
        var ele = option.substring(1, option.length)
        el = document.getElementById(ele)
    }
    var obj = {
        css: function (attr, val) {
            el.style[attr] = val
            return obj;
        },
        html: function (val) {
            el.innerHTML = val
            return obj
        }
    }
    return obj
}
$('#box').css('backgroundColor','red').html('hello');
```

### 一行代码获取当前 yyyy-MM-dd hh:mm:ss格式时间

```js
new Date().toJSON().split("T")[0] + ' ' + new Date().toJSON().split("T")[1].slice(0,-5)
```

### 什么是 IIFE（立即调用的函数表达式）

```js
(function IIFE(){
    console.log( "Hello!" );
})();
// "Hello!"
//常常使用此模式来避免污染全局命名空间，因为在IIFE中使用的所有变量(与任何其他普通函数一样)在其作用域之外都是不可见的。
```

### 复杂判断优雅解决方式1
```js
    const actions = newMap([
      ['guest_1', ()=>{/*do sth*/}],
      ['guest_2', ()=>{/*do sth*/}],
      ['guest_3', ()=>{/*do sth*/}],
      ['guest_4', ()=>{/*do sth*/}],
      ['guest_5', ()=>{/*do sth*/}],
      ['master_1', ()=>{/*do sth*/}],
      ['master_2', ()=>{/*do sth*/}],
      ['master_3', ()=>{/*do sth*/}],
      ['master_4', ()=>{/*do sth*/}],
      ['master_5', ()=>{/*do sth*/}],
      ['default', ()=>{/*do sth*/}],
    ])
    
    /**
     * 按钮点击事件
     * @param {string} identity 身份标识：guest客态 master主态
     * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
     */const onButtonClick = (identity,status)=>{
      let action = actions.get(`${identity}_${status}`) || actions.get('default')
      action.call(this)
    }
```
### 上述方法的另一种玩法
```js
    const actions = newMap([
      [{identity:'guest',status:1},()=>{/*do sth*/}],
      [{identity:'guest',status:2},()=>{/*do sth*/}],
      //...
    ])
    
    const onButtonClick = (identity,status)=>{
      let action = [...actions].filter(([key,value])=>(key.identity == identity && key.status == status))
      action.forEach(([key,value])=>value.call(this))
    }
```

### console.table

```js
//console.table第一个参数为想要打印的对象，数组，类数组，第二个参数为需要的列名
console.table(JSON.parse(JSON.stringify(this.tableData)), ["personnel"]);   //此方法打印vue变量没有省略号
```

### 根据某属性过滤树形数据

```js
/*
arr 需要被过滤的数组
selectedKey 满足条件的树形值
ieCheck  用于限定条件的属性
*/
filterCheck(arr, selectedKey) {
      return arr.filter(item => item.isCheck !== selectedKey).map(item => {
        item = Object.assign({}, item)
        if (item.children) {
          item.children = this.filterCheck(item.children, selectedKey)
        }
        return item
      })
},
    
```

### 是否全部验证通过every

```js
[true,true,false].every(el=>el==true)  //false
```

### 递归搜索

```js
function find(arr, fn, result) {
  arr.forEach(item => {
    if (item.children) {
      find(item.children, fn, result)
    } else {
      if (fn(item)) {
        result.push(item)
      }
    }
  })
}

var result = []
find(carr, item => {
  return item.name === '啦啦啦'
}, result)

```

### 四则运算符

只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。

```js
1 + '1' // '11'
2 * '2' // 4
[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = '1,22,1'
对于加号需要注意这个表达式 'a' + + 'b'
'a' + + 'b' // -> "aNaN"
// 因为 + 'b' -> NaN
// 你也许在一些代码中看到过 + '1' -> 1
```

### 生成n个和为sum的数

```js
function randGenerator(n, sum) {
  var aryRet = [];
  var fSumTmp = sum;
  var iAcc = 0;
  for (var i = 0; i < (n -1); i++) {
    var iTmp = Math.ceil(Math.random() * (fSumTmp / 2));
    aryRet.push(iTmp);
    fSumTmp -= iTmp;
    iAcc += iTmp;
  }
  aryRet.push(sum-iAcc);
  return aryRet;
}
 
console.log(randGenerator(7, 100)); 
```

### 加法函数（精度丢失问题）

```js
/**
 * @param { number } arg1
 * @param { number } arg2
 */
export function add(arg1, arg2) {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
}
```

### 减法函数（精度丢失问题）

```js
/**
 * @param { number } arg1
 * @param { number } arg2
 */
export function sub(arg1, arg2) {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

```

###  除法函数（精度丢失问题）

```js
/**
 * @param { number } num1
 * @param { number } num2
 */
export function division(num1,num2){
    let t1,t2,r1,r2;
    try{
        t1 = num1.toString().split('.')[1].length;
    }catch(e){
        t1 = 0;
    }
    try{
        t2=num2.toString().split(".")[1].length;
    }catch(e){
        t2=0;
    }
    r1=Number(num1.toString().replace(".",""));
    r2=Number(num2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}

```

### 乘法函数（精度丢失问题）

```js
/**
 * @param { number } num1
 * @param { number } num2
 */
export function mcl(num1,num2){
    let m=0,s1=num1.toString(),s2=num2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
```

### JSON数据分类

```js
function groupBy(array, f) {
  const groups = {};
  array.forEach(function(o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

 groupBy(this.frsSSOInfo.user_list, el => {
        return [el.user_type];
 });
```

### 找出对象中属性值匹配的key

```js
const findKey = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find(k => compare(obj[k], value));
};
let { user_type, role_type, agency_code, agency_type } = this.currentUser;

 const conditionOpt = {
        1: user_type == 1 && role_type == 4, //校长
        2: user_type == 1 && role_type == 5, //班主任
        3: agency_code && agency_type == 3, //县级
        4: agency_code && agency_type == 2 //州级
      };
 return findKey(conditionOpt,true)
```

### 使用两个非

两个感叹号会确保参数为非值时只能为false，不会是0、空字符串、undefined等非值

```js
//在vue里
if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
```

### async 返回值

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
```

### 浏览器停止滚动后执行操作

```js
var scrollTimer
const timeout = 400
function handler () {
  // ...
}
document.addEventListener('scroll', () => {
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(handler, timeout)
})
```

#### 优化if场景1

```js

if(status===1&&type===1){
    console.log('普通用户在预售中参与活动，赠送700积分')
}
else if(status===1&&type===2){
    console.log('vip用户在预售中参与活动，赠送1000积分')
}
else if(status===2&&type===1){
    console.log('普通用户在进行中参与活动，赠送300积分')
}
else if(status===2&&type===2){
    console.log('vip用户在进行中参与活动，赠送800积分')
}

================================================>

let obj={
   'status=1&type=1':'普通用户在预售中参与活动，赠送700积分',
   'status=1&type=2':'vip用户在预售中参与活动，赠送1000积分',
   'status=2&type=1':'普通用户在进行中参与活动，赠送300积分',
   'status=2&type=2':'普通用户在进行中参与活动，赠送800积分'
}

console.log(obj[`status=${status}&type=${type}`])
```

### 解决各种运算精度丢失

```js
Math.signFigures = function(num, rank = 6) {
  if (!num) return 0;
  const sign = num / Math.abs(num);
  const number = num * sign;
  const temp = rank - 1 - Math.floor(Math.log10(number));
  let ans;
  if (temp > 0) {
    ans = parseFloat(number.toFixed(temp));
  } else if (temp < 0) {
    ans = Math.round(number / Math.pow(10, temp)) * temp;
  } else {
    ans = Math.round(number);
  }
  return ans * sign;
};
0.56 * 100;                    //56.00000000000001
Math.signFigures(0.56 * 100);  //56

0.2 + 0.1;                     //0.30000000000000004
Math.signFigures(0.2 + 0.1);   //0.3

1.09 * 100;                    //109.00000000000001
Math.signFigures(1.09 * 100);  //109
```

#### storage封装

```js
export default {
  setItem(key, value) {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value)
  },
  getItem(key, defaultValue) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value);
    } catch {}
    return value || defaultValue
  },
  removeItem(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}
```

###  indexOf() 不需要再比较数字 

```js
// 原
const arr = [1,2,4,5]
if(arr.indexOf(1)>-1) {   // -1
	//TODO
}
//现
if(~arr.indexOf(1)) {  // false
	//TODO
}
```

### input限制数字并且限制长度

```js
 <input
        type="text"
        placeholder="手机号"
        onfocus="this.placeholder = '' "
        onblur="this.placeholder = '手机号'"
        @focus="isFocus('phone')"
        oninput="value=value.replace(/[^\d]/g,'')"
        maxlength="11"
      />
```

